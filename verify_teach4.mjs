import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
await page.evaluate((l) => window.localStorage.setItem('hcd-locale', l), 'en');
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#teaching');
await page.evaluate(() => document.querySelector('#teaching').scrollIntoView());
await page.waitForTimeout(500);

for (const fs of [26,25,24,23,22]) {
  const info = await page.$$eval('[class*="teaching"] h3', (els, fsz) => els.map(el => {
    el.style.fontSize = fsz + 'px';
    el.style.lineHeight = '1.3';
    const cs = getComputedStyle(el);
    const lines = Math.round(el.scrollHeight / parseFloat(cs.lineHeight));
    return { text: el.textContent.slice(0,20), lines, scrollHeight: el.scrollHeight };
  }), fs);
  console.log(fs, JSON.stringify(info));
}
await browser.close();
