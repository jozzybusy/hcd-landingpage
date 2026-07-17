const { chromium } = require('playwright')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const PORT = 5174
const BASE_URL = `http://localhost:${PORT}`
const ROOT = path.resolve(__dirname, '..')

const PAGES = [
  { path: '/', slug: 'index' },
  { path: '/about', slug: 'about' },
  { path: '/products/leadership', slug: 'products-leadership' },
  { path: '/products/custom', slug: 'products-custom' },
  { path: '/products/skill-accelerator', slug: 'products-skill-accelerator' },
  { path: '/cases', slug: 'cases' },
  { path: '/cases/huawei-leadership', slug: 'cases-huawei-leadership' },
  { path: '/cases/tencent-digital', slug: 'cases-tencent-digital' },
  { path: '/cases/retail-sales', slug: 'cases-retail-sales' },
  { path: '/contact', slug: 'contact' },
]

const LOCALES = ['zh', 'en']

function waitForServer(url, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const net = require('net')
    const tick = () => {
      const socket = new net.Socket()
      socket.setTimeout(2000)
      socket.once('connect', () => {
        socket.destroy()
        resolve()
      })
      socket.once('error', () => {
        socket.destroy()
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server at ${url} did not start within ${timeoutMs}ms`))
        } else {
          setTimeout(tick, 500)
        }
      })
      socket.once('timeout', () => {
        socket.destroy()
        if (Date.now() - start > timeoutMs) reject(new Error('timeout'))
        else setTimeout(tick, 500)
      })
      const port = new URL(url).port
      socket.connect(parseInt(port, 10), 'localhost')
    }
    tick()
  })
}

async function exportPage(browser, pagePath, slug, locale, cssContent) {
  const browserCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await browserCtx.newPage()

  try {
    // Set locale in localStorage BEFORE any page load, so I18nProvider initializes correctly
    await page.addInitScript((loc) => {
      window.localStorage.setItem('hcd-locale', loc)
    }, locale)

    // Navigate to the page — I18nProvider will read the locale on mount
    await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' })

    // Wait for network to settle (images, fonts, lottie)
    try {
      await page.waitForLoadState('networkidle', { timeout: 15000 })
    } catch (e) {
      // networkidle may timeout on lottie loops; continue anyway
    }
    await page.waitForTimeout(2000)

    // Trigger all Reveal animations by scrolling through the entire page
    const totalHeight = await page.evaluate(() => document.body.scrollHeight)
    const steps = Math.ceil(totalHeight / 600)
    for (let i = 0; i <= steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * 600)
      await page.waitForTimeout(150)
    }
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1000)

    // Force-reveal any remaining hidden framer-motion elements (opacity:0 inline)
    // and force-load lazy images by removing loading="lazy"
    await page.evaluate(() => {
      document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.removeAttribute('loading')
      })
    })
    await page.waitForTimeout(500)

    // After removing lazy loading, wait for images to actually load
    try {
      await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'))
        return Promise.all(imgs.map((img) => {
          if (img.complete) return Promise.resolve()
          return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true })
            img.addEventListener('error', resolve, { once: true })
            setTimeout(resolve, 3000)
          })
        }))
      })
    } catch (e) {
      // continue
    }
    await page.waitForTimeout(500)

    // Get rendered HTML
    const html = await page.content()

    // Inject CSS into <head> and add <base> for local image loading
    const publicDir = path.join(ROOT, 'public')
    // Rewrite root-absolute asset paths (/logo.png -> ./logo.png) so <base> resolves them correctly
    const assetFixedHtml = html
      .replace(/(src=["'])\//g, '$1./')
      .replace(/(href=["'])\//g, '$1./')
    // Strip Vite dev artifacts (client script, module script tags, react-refresh) that break static HTML
    const cleanedHtml = assetFixedHtml
      .replace(/<script[^>]*src="\.\/@vite\/client"[^>]*><\/script>/gi, '')
      .replace(/<script[^>]*type="module"[^>]*src="\.\/src\/[^"]*"[^>]*><\/script>/gi, '')
      .replace(/<script[^>]*src="\.\/src\/[^"]*"[^>]*><\/script>/gi, '')
      .replace(/<script[^>]*type="module"[^>]*>[^<]*@react-refresh[^<]*<\/script>/gi, '')
      .replace(/<script[^>]*>[^<]*@react-refresh[^<]*<\/script>/gi, '')
    const styledHtml = cleanedHtml
      .replace(
        /<head([^>]*)>/,
        `<head$1>\n    <base href="file://${publicDir}/">\n    <style>\n${cssContent}\n    </style>`
      )

    // Write file
    const outDir = path.join(ROOT, 'exports', locale)
    fs.mkdirSync(outDir, { recursive: true })
    const outFile = path.join(outDir, `${slug}.html`)
    fs.writeFileSync(outFile, styledHtml, 'utf8')

    console.log(`  ✓ ${locale}/${slug}.html`)
  } finally {
    await browserCtx.close()
  }
}

async function main() {
  console.log('Starting dev server on port', PORT)
  const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'pipe',
    detached: true,
  })

  let serverOutput = ''
  server.stdout.on('data', (d) => { serverOutput += d.toString() })
  server.stderr.on('data', (d) => { serverOutput += d.toString() })

  try {
    await waitForServer(BASE_URL, 30000)
    console.log('Dev server ready')
  } catch (e) {
    console.error('Failed to start dev server:', e.message)
    console.error('Server output:', serverOutput)
    server.kill('SIGTERM')
    process.exit(1)
  }

  // Read the built CSS file once before the export loop
  const distAssetsDir = path.join(ROOT, 'dist', 'assets')
  const cssFiles = fs.readdirSync(distAssetsDir).filter((f) => f.endsWith('.css'))
  if (cssFiles.length === 0) {
    throw new Error('No CSS file found in dist/assets. Run npm run build first.')
  }
  const cssContent = fs.readFileSync(path.join(distAssetsDir, cssFiles[0]), 'utf8')

  const browser = await chromium.launch()
  console.log('Exporting 20 pages (10 paths × 2 locales)...')

  for (const locale of LOCALES) {
    console.log(`\n[${locale}]`)
    for (const { path: pagePath, slug } of PAGES) {
      try {
        await exportPage(browser, pagePath, slug, locale, cssContent)
      } catch (e) {
        console.error(`  ✗ ${locale}/${slug}.html — ${e.message}`)
      }
    }
  }

  await browser.close()
  console.log('\nDone. Files saved to exports/zh/ and exports/en/')

  // Kill the entire process group (dev server + vite) and wait for exit
  try {
    process.kill(-server.pid, 'SIGTERM')
  } catch (e) {
    server.kill('SIGTERM')
  }
  await new Promise((resolve) => {
    server.on('exit', resolve)
    setTimeout(resolve, 3000)
  })
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
