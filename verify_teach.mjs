import { chromium } from 'playwright';
const browser = await chromium.launch();

async function check(locale) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
  await page.evaluate((l) => window.localStorage.setItem('hcd-locale', l), locale);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#teaching');
  await page.evaluate(() => document.querySelector('#teaching').scrollIntoView());
  await page.waitForTimeout(1000);

  const cards = await page.$$('[class*="teaching"] [class*="card"][class*="online"], [class*="teaching"] [class*="card"][class*="offline"], [class*="teaching"] [class*="card"][class*="blended"]');
  const info = [];
  for (const card of cards) {
    const icon = await card.$('[class*="cardIcon"]');
    const h3 = await card.$('h3');
    const p = await card.$('p');
    const tags = await card.$('[class*="tags"]');
    const iconBox = await icon.boundingBox();
    const h3Box = await h3.boundingBox();
    const pBox = await p.boundingBox();
    const tagsBox = await tags.boundingBox();
    const h3FontSize = await h3.evaluate(el => getComputedStyle(el).fontSize);
    const h3Text = await h3.textContent();
    info.push({ h3Text, iconBox, h3Box, pBox, tagsBox, h3FontSize });
  }
  console.log(locale, JSON.stringify(info, null, 2));
  await page.close();
}

await check('zh');
await check('en');
await browser.close();
