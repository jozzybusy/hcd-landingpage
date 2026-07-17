import { chromium } from 'playwright';
const browser = await chromium.launch();

async function check(locale) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
  await page.evaluate((l) => window.localStorage.setItem('hcd-locale', l), locale);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#lecturers');
  await page.evaluate(() => document.querySelector('#lecturers').scrollIntoView());
  await page.waitForTimeout(500);

  const cards = await page.$$('[class*="cardFrame"]');
  const info = [];
  for (const card of cards) {
    const avatarArea = await card.$('[class*="avatarArea"]');
    const infoDiv = await card.$('[class*="info"]');
    const h4 = await card.$('h4');
    const p = await card.$('[class*="info"] p');
    const avatarBox = await avatarArea.boundingBox();
    const infoBox = await infoDiv.boundingBox();
    const h4Box = await h4.boundingBox();
    const pInfo = await p.evaluate(el => ({ scrollHeight: el.scrollHeight, clientHeight: el.clientHeight, text: el.textContent.slice(0,30) }));
    info.push({ avatarBox, infoBox, h4Box, pInfo });
  }
  console.log(locale, JSON.stringify(info, null, 2));
  await page.close();
}
await check('zh');
await check('en');
await browser.close();
