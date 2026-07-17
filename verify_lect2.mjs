import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
await page.evaluate((l) => window.localStorage.setItem('hcd-locale', l), 'en');
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#lecturers');
await page.evaluate(() => document.querySelector('#lecturers').scrollIntoView());
await page.waitForTimeout(1500);

const cards = await page.$$('[class*="cardFrame"]');
const info = [];
for (const card of cards) {
  const avatarArea = await card.$('[class*="avatarArea"]');
  const p = await card.$('[class*="info"] p');
  const avatarBox = await avatarArea.boundingBox();
  const pInfo = await p.evaluate(el => ({ scrollHeight: el.scrollHeight, lineHeight: getComputedStyle(el).lineHeight, text: el.textContent }));
  info.push({ avatarHeight: avatarBox.height, pInfo });
}
console.log(JSON.stringify(info, null, 2));
await browser.close();
