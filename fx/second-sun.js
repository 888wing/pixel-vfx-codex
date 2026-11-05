// 第二太陽 / Second Sun — Scale Ladder pack (original design), tier 10000: a star ignites over an army of ten thousand, swells into a sun and its heat wave vaporises the army ring by ring
PXFX.define({
  id: 'second-sun',
  loop: 6,
  beats: [{ t: 1.0, kind: 'cast', power: .7 }, { t: 2.6, kind: 'hit', power: 1.5 }, { t: 3.1, kind: 'pulse', power: .5 }],
  view: { r: 6.6, h: 4 },
  stage: { ground: 'grass' },
  modules: ['figure', 'charge', 'core', 'domain', 'crowd', 'troops', 'tally', 'shockwave', 'impact', 'aftermath'],
  palette: {
    sun: ['#6a2a08', '#c0560e', '#ff9a26', '#ffd25a', '#fff2b0', '#ffffff'],
    corona: ['#5a1e10', '#a8401a', '#f08a30', '#ffc860', '#fff0c0'],
    heat: ['#c0501a', '#ff8a30', '#ffc860', '#fff0b0', '#ffffff'],
    shield: ['#2a4a8a', '#5a8ae0', '#a8d0ff', '#f0f8ff'],
    ember: ['#5a1a08', '#c04a10', '#ff9a30', '#ffe08a'],
    // on the bleached sky light must not start from a dark step, or it draws brown rings
    bright: ['#ffb24a', '#ffcc70', '#ffe4a0', '#fff6dc', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .6], zh: '起手：細小的施法者（高約 1.3）站在島的近邊，舉起雙手指向天空；對面是一萬人的大軍（100×100 方陣，每人 1–2 像素，一片頭盔海）', en: 'pose: a small caster (~1.3 tall) at the near edge of the island raises both arms to the sky, facing an army of ten thousand (a 100×100 block, 1–2 px per soldier, a sea of helmets)' },
    { k: 'charge', t: [.6, 2.6], zh: '集氣：天空由大軍中心上方向外抹成深紫黃昏（0.8 秒），1.0 秒時在大軍中心正上方高 5 處亮起一顆小星（十字閃光），之後 1.6 秒內按三次緩入膨脹成半徑 1.7 的太陽（硬邊白熱核心、橙色日冕、12 條旋轉光芒），地面光池同步擴大；大軍抬頭發抖；最後 0.25 秒太陽先收縮 12% 再變亮（吸氣）', en: 'charge: the sky wipes out from above the army into a deep violet dusk (0.8 s); at 1.0 s a small star sparks (a cross flare) 5 units above the army centre and swells over 1.6 s (cubic ease-in) into a sun of radius 1.7 (hard white-hot core, orange corona, 12 rotating rays) while a light pool grows on the ground; the army looks up and trembles; in the last 0.25 s the sun contracts 12% and brightens (an inhale)' },
    { k: 'shape', t: [2.5, 2.6], zh: '成形：太陽下方出現一道直落地面的白色光柱（寬 0.5），地面中心一點白熱', en: 'shape: a white light pillar (0.5 wide) drops from the sun to the ground and the spot under it turns white-hot' },
    { k: 'motion', t: [2.6, 3.8], zh: '推進：熱浪由太陽正下方向外擴散，速度 5 單位／秒，前緣是一圈白金色地面光帶（寬 0.6）加上升的火星；熱浪半徑上限 = radius（預設 5.6，剛好蓋住方陣的四角）', en: 'motion: the heat wave spreads from directly under the sun at 5 units/s; its front is a white-gold ground band (0.6 wide) with rising embers; it stops at `radius` (default 5.6, just past the corners of the block)' },
    { k: 'impact', t: [2.6, 3.0], zh: '命中：1 格白金色衝擊格＋頓幀，天空翻成白金色烈日天；判定：與太陽正下方點的距離 ≤ radius 的敵兵中招，命中時間 = 2.65 + 距離 ÷ 5 + 隨機 0–0.04 秒；中招者閃白 2 格、通體發白 0.3 秒，再以抖色溶解消失（蒸發），一圈圈向外掃過整片大軍；範圍外的敵兵向外傾斜發抖但倖存；擊殺計數隨熱浪即時上升，全滅時變金色', en: 'impact: one white-gold impact frame and a hit-stop, the sky flips to a bleached white-gold; area test: soldiers whose distance from the point under the sun ≤ radius are hit at 2.65 + distance / 5 + 0–0.04 s; each flashes white for 2 frames, glows white for 0.3 s, then dissolves through a dither (vaporised), ring after ring across the whole army; soldiers outside lean away and tremble but survive; the kill counter climbs with the wave and turns gold on a full wipe' },
    { k: 'after', t: [3.0, 6], zh: '餘波：地面留下熱浪範圍內的焦土（深褐色、邊緣發橙光的裂紋，1.5 秒冷卻），火星升起；太陽在 3.3–3.9 秒縮成一點熄滅，天空 3.4–4.4 秒恢復；焦土 4.4–5.2 秒淡出，擊殺計數 4.3–4.5 秒淡出，新的大軍 4.6–5.9 秒原地淡入', en: 'aftermath: scorched earth inside the wave radius (dark brown with orange-glowing cracks cooling over 1.5 s) and rising embers; the sun shrinks to a point and goes out at 3.3–3.9 s, the sky returns at 3.4–4.4 s; the scorch fades at 4.4–5.2 s, the counter at 4.3–4.5 s, and a fresh army fades in on the spot at 4.6–5.9 s' },
  ],
  layers: [
    { zh: '大軍與陣型：敵兵按陣型（預設方陣）排在中心 (0.8, 0)、半深 3.8、半寬 3.8 的範圍內，兵距決定大小；一萬人時每人 1–2 像素寬：頭盔像素按單位隨機深淺、偶有矛尖反光，整體是一片深紅頭盔海；角落 3×5 像素字擊殺計數「骷髏 已擊殺/總數」', en: 'army and formation: soldiers stand in a formation (default block) inside a 3.8 half-depth × 3.8 half-width area around (0.8, 0), the spacing sets their size; at ten thousand each is 1–2 px wide with per-unit helmet shades and the odd spear glint, a dark red sea of helmets; a 3×5 pixel kill counter "skull killed/total" in the corner' },
    { zh: '範圍判定：熱浪是以太陽正下方為圓心的實心圓，半徑隨時間 = min(5 × (t − 2.6), radius)；距離 ≤ radius 才中招，命中時間 = 熱浪到達該點的時間；radius 調小時外圈的敵兵倖存，計數停在實際數字', en: 'area test: the heat wave is a filled circle centred under the sun, radius over time = min(5 × (t − 2.6), radius); only soldiers within radius are hit, at the time the wave reaches them; with a smaller radius the outer ranks survive and the counter stops at the real number' },
    { zh: '太陽：硬邊白熱核心（半徑 1.7 × size）＋1.6 倍大的橙色日冕光暈＋12 條沿鏡頭平面旋轉、長短交替的光芒；表面有慢慢流動的亮斑；出現時先是一點十字閃光', en: 'sun: a hard white-hot core (radius 1.7 × size), an orange corona 1.6× wider and 12 alternating long and short rays rotating in the camera plane; slow drifting bright spots on the surface; it starts as a cross-shaped spark' },
    { zh: '天空：領域模組先由太陽位置向外抹成深紫黃昏（令太陽在白天頁面也讀得出），命中瞬間被白色衝擊格遮住翻成白金色烈日天，地面同步換成金黃受光色，之後抖色淡回原本的天空', en: 'sky: the domain module first wipes out from the sun into a deep violet dusk (so the sun reads on the white day page), flips to a bleached white-gold under the white impact frame at the hit with the ground remapped to sunlit gold, then dithers back to the normal sky' },
    { zh: '熱浪前緣：地面上半徑隨時間擴大的白金色光帶（寬 0.6），前緣後方一圈較暗的橙色餘熱；光帶經過的地面變焦土；約 260 粒火星由焦土中隨機升起', en: 'wave front: a white-gold ground band (0.6 wide) whose radius grows with time, a dimmer orange afterglow behind it, scorched ground wherever it has passed, and about 260 embers rising from the scorch' },
    { zh: '中招反應（自訂，每人只改材質與透明度，一萬人也便宜）：閃白 → 通體白色 0.3 秒 → 抖色溶解 0.25 秒後消失；不加每人光暈', en: 'hit reaction (custom, only material and alpha per unit so ten thousand stay cheap): white flash → glowing white for 0.3 s → dithered dissolve over 0.25 s, then gone; no per-unit glow' },
    { zh: '施法者護盾：熱浪經過施法者附近時，施法者周圍亮起半透明的藍色半球護盾（半徑 0.9），熱浪不會傷到施法者', en: 'caster shield: when the wave passes near the caster a translucent blue dome (radius 0.9) lights up around them, so the wave never hurts the caster' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 2000, max: 12000, step: 1, value: 10000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    radius: { zh: '熱浪半徑', en: 'heat wave radius', min: 2, max: 7, step: .1, value: 5.6 },
    size: { zh: '太陽大小', en: 'sun size', min: .6, max: 1.6, step: .05, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  skies: {
    dusk: { top: '#0b0a1c', bottom: '#2c1838', nebula: '#3c2050', stars: .008, star: '#ffe6b0' },
    blaze: { top: '#ffe6a6', bottom: '#fffaf0', nebula: '#fff2cc', stars: 0 },
  },
  draw(p, t) {
    const PL = this.palette, CAST = 1.0, HIT = 2.6, V = 5;
    const CX = .8, CY = 0, SZ = 5.2, size = p.param('size'), RAD = p.param('radius'), RS = 1.7 * size;
    const FX0 = -5.2, FY0 = 0;
    // ---- caster ----
    let pose;
    if (t < .6) pose = { a: 'idle', b: 'bothUp', k: p.easeOutBack(p.ph(t, .1, .6), 1.2) };
    else if (t < 3.6) pose = 'bothUp';
    else pose = { a: 'bothUp', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.6, 4.4)) };
    const fig = p.figure(FX0, FY0, { pose, scale: .7 });
    // ---- the army: a filled circle of heat, honest radius ----
    const front = a => Math.min(V * Math.max(0, a), RAD);
    const states = p.crowd({
      n: Math.round(p.param('crowd')), seed: 11, formation: PXFX.TROOPS[p.param('formation') | 0].id,
      area: { x: CX, y: CY, rx: 3.8, ry: 3.8 }, faceTo: [FX0, FY0], t, scale: 'auto',
      hit: u => { const d = Math.hypot(u.x - CX, u.y - CY); return d <= RAD ? HIT + .05 + d / V + u.r1 * .04 : null; },
      react: (s, a) => {
        s.walk = null; s.spear = false; s.mat = 'white';
        if (a > .35) s.alpha = 1 - p.ph(a, .35, .6);
        if (a > .6) s.hide = true;
      },
      fear: u => (t < HIT ? p.ph(t, 1.5, 2.4) * (.4 + .4 * u.r3) : Math.hypot(u.x - CX, u.y - CY) > RAD ? .5 * (1 - p.ph(t, 3.4, 4.2)) : 0),
      at: [CX, CY, 0], respawn: [4.6, 5.9], clear: [4.3, 4.6], enter: 'fade',
    });
    // ---- growth of the sun ----
    const grow = p.easeInCubic(p.ph(t, CAST, HIT - .25)), inhale = 1 - .12 * p.env(t, HIT - .25, HIT - .08, HIT - .04, HIT);
    const death = p.ph(t, 3.3, 3.9), sr = RS * Math.max(0, grow * inhale * (1 - p.easeInCubic(death)));
    const a = t - HIT;
    // scorched earth: everywhere the wave has passed (drawn with the ground, before the sky change)
    const burnA = a > 0 ? 1 - p.ph(t, 4.4, 5.2) : 0, Fr = front(a - .05);
    if (burnA > 0 && Fr > .05) {
      p.stain(CX, CY, Fr, (dx, dy, rho) => (rho < Fr ? .4 + .6 * p.noise(dx * 1.7 + 3, dy * 1.7) : 0), '#2a1a14', burnA);
    }
    // ---- sky: violet dusk while the star grows, white-gold blaze after the hit ----
    if (t < HIT) {
      const amt = p.easeOutCubic(p.ph(t, .55, 1.4));
      if (amt > .01) p.domain({ amt, c: [CX, CY, SZ], sky: this.skies.dusk, ground: amt > .5 ? ['#12121e', '#1a1c2c', '#24283a', '#30364a'] : null, solids: .25, t });
    } else {
      const amt = 1 - p.ph(t, 3.4, 4.4);
      if (amt > .01) p.domain({ amt, fade: true, sky: this.skies.blaze, ground: t < 3.9 ? ['#9a6a3a', '#c89452', '#ecc078', '#fff0c4'] : null, t: 0 });   // a static sky: no rebuild every 0.2 s
    }
    // ---- light ----
    if (t > .5 && t < 1.2) {   // charge on the raised hands
      const ch = p.ph(t, .5, 1.0), hz = Math.max(fig.hand[2], fig.handL[2]) + .15;
      p.charge(fig.hand[0], fig.hand[1], hz, ch, { n: 8, R: .7, ramp: PL.ember, up: .5 });
      p.glow(fig.hand[0], fig.hand[1], hz, .15 + .1 * ch, PL.ember, .8 * (1 - p.ph(t, 1.0, 1.2)));
    }
    if (t >= CAST - .05 && t < 1.25) p.sparkle(CX, CY, SZ, 3 + 6 * p.ph(t, CAST - .05, CAST + .1) * (1 - p.ph(t, 1.1, 1.25)), PL.sun, 1);
    if (sr > .02) {
      const c = p.cam(), hot = 1 + .4 * p.env(t, HIT - .2, HIT - .05, HIT + .05, HIT + .4), CR = t < HIT ? PL.corona : PL.bright;
      p.glow(CX, CY, SZ, sr * 2.3, CR, .75 * hot, { pow: 1.5 });
      p.orb(CX, CY, SZ, sr, PL.sun, 1.1 * hot);
      p.shell(CX, CY, SZ, sr * 1.01, (nx, ny, nz) => (p.noise(nx * 2.2 + t * .6, ny * 2.2 + nz * 1.7 - t * .4) > .62 ? 1 : 0), PL.sun, .9, { back: 0 });
      for (let k = 0; k < 12; k++) {
        const ang = k / 12 * p.TAU + t * .35, L = sr * (k & 1 ? 1.05 : 1.75) * (.9 + .1 * Math.sin(t * 5 + k));
        const dx = c.right[0] * Math.cos(ang) + c.up[0] * Math.sin(ang), dy = c.right[1] * Math.cos(ang) + c.up[1] * Math.sin(ang), dz = c.right[2] * Math.cos(ang) + c.up[2] * Math.sin(ang);
        const s0 = [CX + dx * sr * 1.05, CY + dy * sr * 1.05, SZ + dz * sr * 1.05];
        p.line(s0, [s0[0] + dx * L, s0[1] + dy * L, s0[2] + dz * L], sr * .2, CR, .8 * hot, { w1: .01, i1: .05 });
      }
      p.light(CX, CY, 0, 1.5 + 3.5 * grow, CR, .55 * grow * (1 - death));
    }
    // light pillar from the sun to the ground at the release
    const pil = p.env(t, HIT - .12, HIT - .02, HIT + .12, HIT + .45);
    if (pil > 0) {
      p.line([CX, CY, SZ], [CX, CY, 0], .55 * size, PL.heat, 1.2 * pil, { w1: .35 * size });
      p.glow(CX, CY, .1, 1.2, PL.heat, 1.2 * pil, { pow: 1.4 });
    }
    // ---- impact and the heat wave ----
    if (a >= 0 && a < .03 + 1 / 30) p.impactFrame({ ink: '#3a1a08', paper: '#fffaf0', accent: '#ffb040' });
    if (a >= 0) {
      const F = front(a), live = F < RAD - .01 ? 1 : 1 - p.ph(a, RAD / V, RAD / V + .35);
      if (live > 0 && F > .05) {
        p.ring(CX, CY, .02, F, .6, PL.heat, 1.15 * live);
        p.ring(CX, CY, .02, Math.max(.05, F - .7), .9, PL.ember, .55 * live);
        p.light(CX, CY, 0, F + .6, PL.heat, .5 * live);
      }
      if (a < .3) p.speedLines(CX, CY, .4, { n: 20, R0: 1.2, R1: 6.5, ramp: PL.heat, I: 1 - a / .3, seed: Math.floor(t * 30) });
      // cooling cracks in the scorch
      if (burnA > 0 && Fr > .3) p.aftermath(CX, CY, Fr * .95, 'crack', { amt: burnA, n: 11, ramp: PL.ember, glow: (1 - p.ph(a, .3, 2)) * burnA, seed: 7, color: '#2a1a14' });
      // embers rising from the scorched ground behind the front
      const nE = Math.round(260 * p.density);
      for (let k = 0; k < nE; k++) {
        const r0 = Math.sqrt(p.r(k, 41)) * RAD, ang = p.r(k, 42) * p.TAU, born = .05 + r0 / V + p.r(k, 43) * .5, age = (a - born) / (.8 + .6 * p.r(k, 44));
        if (age < 0 || age > 1) continue;
        p.dot(CX + Math.cos(ang) * r0, CY + Math.sin(ang) * r0, .05 + age * (1.2 + p.r(k, 45)), PL.ember, 1 - age);
      }
      // the caster's shield when the wave comes near
      const dC = Math.hypot(FX0 - CX, FY0 - CY), sh = p.env(F, dC - 1.4, dC - .6, 99, 100) * (1 - p.ph(a, RAD / V, RAD / V + .5));
      if (sh > 0) p.shell(FX0, FY0, 0, .9, (nx, ny, nz) => (Math.abs(nz) < .9 && (p.noise(nx * 4 + t, ny * 4 + nz * 3) > .55 || nz < .12) ? 1 : .35), PL.shield, .7 * sh, { back: 0 });
    }
    // ---- the kill counter goes last ----
    if (p.param('tally')) p.tally(states, { t, alpha: 1 - p.ph(t, 4.3, 4.5) });
  },
});
