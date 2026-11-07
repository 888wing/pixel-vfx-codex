// Render promo/reel.html frame by frame into promo/frames/f0000.png ... (headless Chrome on file://)
// usage: [PAGE=ult.html] [LAYOUT=wide] [OUT=frames-x] [ONLY=1,2,3] node promo/render.mjs [from] [to]
import puppeteer from 'puppeteer';
import fsx from 'node:fs';
// set CHROME to use a local Chrome; otherwise puppeteer's own browser is used
const CHROME = process.env.CHROME || (fsx.existsSync('/Applications/Google Chrome.app') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
const wide = process.env.LAYOUT === 'wide', page0 = process.env.PAGE || 'reel.html', frameDir = process.env.OUT || (wide ? 'frames-wide' : 'frames');
await page.setViewport(wide ? { width: 1920, height: 1080 } : { width: 1080, height: 1920 });
await page.goto('file://' + path.join(dir, page0) + (wide ? '?layout=wide' : ''));
await page.waitForFunction('window.REEL');
const fonts = await page.evaluate(() => ({ zh: document.fonts.check('600 40px "PingFang TC"'), mono: document.fonts.check('700 40px "SF Mono"') }));
const total = await page.evaluate('REEL.FRAMES');
const only = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : null;
const from = +(process.argv[2] || 0), to = Math.min(total, +(process.argv[3] || total));
const list = only || Array.from({ length: to - from }, (_, k) => from + k);
const outDir = path.isAbsolute(frameDir) ? frameDir : path.join(dir, frameDir);
fs.mkdirSync(outDir, { recursive: true });
const t0 = Date.now();
for (const i of list) {
  const url = await page.evaluate(n => REEL.frame(n), i);
  fs.writeFileSync(path.join(outDir, `f${String(i).padStart(4, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
}
console.log(JSON.stringify({ fonts, total, rendered: list.length, seconds: ((Date.now() - t0) / 1000).toFixed(1) }), errors.length ? errors.slice(0, 5).join('\n') : 'no errors');
await browser.close();
