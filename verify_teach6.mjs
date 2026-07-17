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

  const cards = await page.$$('[class*="teaching"] [class*="grid"] > div');
  const info = [];
  for (const card of cards) {
    const p = await card.$('p');
    const pInfo = await p.evaluate(el => Math.round(el.scrollHeight/parseFloat(getComputedStyle(el).lineHeight)));
    info.push({ pLines: pInfo });
  }
  console.log(locale, JSON.stringify(info));
  await page.close();
}
await check('zh');
await check('en');
await browser.close();
