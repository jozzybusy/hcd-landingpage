import { chromium } from 'playwright';
const browser = await chromium.launch();

async function check(locale) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
  await page.evaluate((l) => window.localStorage.setItem('hcd-locale', l), locale);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#lecturers');
  await page.evaluate(() => document.querySelector('#lecturers').scrollIntoView());
  await page.waitForTimeout(1000);

  const cards = await page.$$('[class*="cardFrame"]');
  const info = [];
  for (const card of cards) {
    const role = await card.$('[class*="role"]');
    const p = await card.$('[class*="info"] p');
    const roleInfo = await role.evaluate(el => ({ lines: Math.round(el.scrollHeight/parseFloat(getComputedStyle(el).lineHeight)), text: el.textContent }));
    const pInfoData = await p.evaluate(el => ({ lines: Math.round(el.scrollHeight/parseFloat(getComputedStyle(el).lineHeight)), text: el.textContent }));
    info.push({ roleInfo, pInfoData });
  }
  console.log(locale, JSON.stringify(info, null, 2));
  await page.close();
}
await check('zh');
await check('en');
await browser.close();
