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
  const frameBox = await card.boundingBox();
  const infoDiv = await card.$('[class*="info"]');
  const infoBox = await infoDiv.boundingBox();
  const h4 = await card.$('h4');
  const role = await card.$('[class*="role"]');
  const p = await card.$('[class*="info"] p');
  const tags = await card.$('[class*="tags"]');
  const h4H = await h4.evaluate(el=>el.getBoundingClientRect().height);
  const roleH = await role.evaluate(el=>el.getBoundingClientRect().height);
  const pH = await p.evaluate(el=>el.getBoundingClientRect().height);
  const tagsH = await tags.evaluate(el=>el.getBoundingClientRect().height);
  info.push({ frameHeight: frameBox.height, infoHeight: infoBox.height, h4H, roleH, pH, tagsH });
}
console.log(JSON.stringify(info, null, 2));
await browser.close();
