import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
await page.evaluate((l) => window.localStorage.setItem('hcd-locale', l), 'en');
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#teaching');
await page.evaluate(() => document.querySelector('#teaching').scrollIntoView());
await page.waitForTimeout(1000);

const h3s = await page.$$('[class*="teaching"] h3');
for (const h3 of h3s) {
  const info = await h3.evaluate(el => {
    const cs = getComputedStyle(el);
    return {
      text: el.textContent,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      fontFamily: cs.fontFamily,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
    };
  });
  console.log(JSON.stringify(info));
}
await browser.close();
