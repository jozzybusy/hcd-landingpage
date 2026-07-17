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

  const h3s = await page.$$('[class*="teaching"] h3');
  for (const h3 of h3s) {
    const info = await h3.evaluate(el => ({ lines: Math.round(el.scrollHeight/parseFloat(getComputedStyle(el).lineHeight)), text: el.textContent }));
    console.log(locale, JSON.stringify(info));
  }
  await page.close();
}
await check('zh');
await check('en');
await browser.close();
