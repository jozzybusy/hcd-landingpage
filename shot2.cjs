const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
  await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' });
  const el = await page.$('[class*="grid"]');
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await el.screenshot({ path: '/tmp/lecturers_grid.png' });
  await browser.close();
})();
