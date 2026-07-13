const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:5174/#products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * { animation-play-state: paused !important; }
      [class*="wordmarkBg"] { opacity: 1 !important; transform: none !important; }
      [class*="wordChange"], [class*="wordMan"], [class*="registered"] { clip-path: none !important; }
      [class*="clipChange"] { width: 138px !important; }
      [class*="clipMan"] { width: 124px !important; }
      [class*="clipRegistered"] { width: 20px !important; }
    `;
    document.head.appendChild(style);
  });
  
  await page.screenshot({ path: '/tmp/products-debug.png' });
  await browser.close();
})();
