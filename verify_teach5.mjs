import { chromium } from 'playwright';
const browser = await chromium.launch();

async function check(locale) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
  await page.evaluate((l) => window.localStorage.setItem('hcd-locale', l), locale);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#teaching');
  await page.evaluate(() => document.querySelector('#teaching').scrollIntoView());
  await page.waitForTimeout(500);

  const cardBoxes = await page.$$eval('[class*="teaching"] [class*="grid"] > div', els => els.map(el => {
    const r = el.getBoundingClientRect();
    return { height: r.height, y: r.y, cls: el.className };
  }));
  console.log(locale, JSON.stringify(cardBoxes, null, 2));
  await page.close();
}
await check('zh');
await check('en');
await browser.close();
