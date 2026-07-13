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
    `;
    document.head.appendChild(style);
    // Remove SVG clip-path attributes to reveal full wordmark for measurement
    document.querySelectorAll('[class*="wordChange"], [class*="wordMan"], [class*="registered"]').forEach(el => {
      el.removeAttribute('clip-path');
    });
  });
  
  await page.screenshot({ path: '/tmp/products-debug.png' });
  await browser.close();
})();
