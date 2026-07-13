const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const el = await page.$('section:nth-of-type(4)');
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: '/tmp/about_zh_timeline.png' });
  } else {
    await page.screenshot({ path: '/tmp/about_zh_full.png', fullPage: true });
  }
  await browser.close();
})();
