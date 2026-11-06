// 解析度崩壞 / Downscale — Twist pack (original design): the caster snaps and the picture's resolution halves on every beat; a thousand-strong block melts into ever bigger crimson pixels until the army is one pixel, which the caster flicks off the map
PXFX.define({
  id: 'downscale',
  loop: 6,
  beats: [
    { t: .9, kind: 'cast', power: .6 },
    { t: 1.1, kind: 'pulse', power: .7 }, { t: 1.42, kind: 'pulse', power: .45 }, { t: 1.74, kind: 'pulse', power: .5 },
    { t: 2.06, kind: 'pulse', power: .55 }, { t: 2.38, kind: 'pulse', power: .6 }, { t: 2.7, kind: 'pulse', power: .9 },
    { t: 3.2, kind: 'hit', power: 1.35 }, { t: 3.7, kind: 'pulse', power: .6 },
  ],
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'stone' },
  modules: ['figure', 'crowd', 'troops', 'tally', 'impact'],
  palette: {
    // the merged "army pixel": flat crimson tones (solid)
    pixel: ['#3c0f1c', '#5e1824', '#82242c', '#a43634', '#c85444'],
    // the flying slab: its lit top face lands on the same crimson as the painted pixel
    slab: ['#2a0a14', '#46121e', '#6a1c26', '#82242c', '#962e30'],
    // the caster's snap, the selection marquee and the flick: cool cyan light
    snap: ['#2a5f96', '#3b94c8', '#7fe0ff', '#c8f6ff', '#ffffff'],
    crumb: ['#5e1824', '#82242c', '#a43634', '#d8704e'],
  },
  timeline: [
    { k: 'pose', t: [0, .9], zh: '起手：施法者（縮放 0.85，站在 x = −4.3）待機，對面是千人方陣（預設 1000 人，中心 (1.0, 0)、半深 2.8、半寬 2.6，3–5 像素高的像素小兵，紅頭盔）；0.5–0.85 秒施法者舉起右手', en: 'pose: the caster (scale 0.85, at x = −4.3) idles facing a block of 1000 (centre (1.0, 0), half depth 2.8, half width 2.6, 3–5 px pixel soldiers with red helmets); at 0.5–0.85 s the caster raises the right hand' },
    { k: 'charge', t: [.9, 1.1], zh: '集氣：0.9 秒彈指（指尖青色十字閃光＋小光環），一個 5.6 × 5.6 的正方形選取框（繪圖軟件的虛線「行軍蟻」框，青色虛線每段 0.25，沿邊流動）由彈指點彈出，框住大軍；這個正方形就是網格的原點與最後一格的大小', en: 'charge: at 0.9 s the caster snaps (a cyan cross flare and a small ring at the fingertip) and a 5.6 × 5.6 square selection marquee (a paint program’s dashed "marching ants", cyan dashes 0.25 long crawling along the edge) pops out around the army; this square anchors the grid and is the size of the last cell' },
    { k: 'shape', t: [1.1, 2.7], zh: '成形：判定網格固定在世界座標，第 L 級的格邊長 = 0.175 × 2^(L−1)（第 1 級 0.175，第 6 級 5.6 = 整支軍隊一格）；levels（預設 6）級平均分佈在 1.1–2.7 秒，每一拍整個畫面（後製：每個螢幕像素用反投影找到地面點，同一格的像素換成該格的平均色）解析度減半；施法者在後製之後才畫，所以永遠清晰', en: 'shape: the rule grid is fixed in world space; the cell side at level L = 0.175 × 2^(L−1) (level 1: 0.175, level 6: 5.6 = the whole army in one cell); `levels` (default 6) beats spread evenly over 1.1–2.7 s and on each beat the whole picture drops to that resolution (post pass: every screen pixel finds its ground point with the inverse projection and takes the average colour of its cell); the caster is drawn after the post pass, so it stays sharp' },
    { k: 'motion', t: [1.1, 2.7], zh: '推進：判定：第 L 級的格若裝有 ≥ max(2, threshold × 格面積 ÷ 兵距²) 名士兵（threshold 預設 0.85，兵距 = 陣型的士兵間距），該格被「吞併」，格內所有士兵在第 L 拍死亡（命中時間 = 1.1 + (L − 1) × 1.6 ÷ (levels − 1)）；被吞併的格在畫面上是一塊平塗的深紅色大像素（每格三種紅色之一），越來越大：預設方陣第 1 級吞掉 18%、第 2 級 92%，邊緣最後 4% 在第 6 級（整支軍隊變成一格）才被吞；以地面為主的稀疏格不被吞併，格內士兵只是被平均進地面顏色，解析度恢復後仍然站著', en: 'motion: rule: a level-L cell holding ≥ max(2, threshold × cell area / spacing²) soldiers (threshold default 0.85, spacing = the formation’s soldier spacing) is swallowed and every soldier in it dies on beat L (hit time = 1.1 + (L − 1) × 1.6 / (levels − 1)); a swallowed cell is drawn as one flat dark-crimson pixel (one of three reds per cell) that grows level by level — 18% of the default block at level 1, 92% at level 2, and the last 4% along its edges only at level 6, when the whole army becomes one cell; cells that are mostly ground are never swallowed and their soldiers are merely averaged into the ground colour and stand again when the resolution returns' },
    { k: 'impact', t: [2.7, 3.45], zh: '命中：2.7 秒最後一級：整支軍隊只剩一個深紅像素（擊殺計數 1000/1000 變金色），停 0.5 秒；施法者後拉手指，3.2 秒彈指：指尖到像素一道青色細光、像素近邊白色衝擊點＋頓幀＋放射速度線，那一格（或其他陣型裡每一塊合併後的大像素）變成實心厚板（厚 0.35）向右上翻滾飛出畫面（0.5 秒），掉下 14 粒深紅像素碎屑', en: 'impact: the last level at 2.7 s leaves the army as a single dark-crimson pixel (the counter reads 1000/1000 and turns gold), held for 0.5 s; the caster cocks a finger and flicks at 3.2 s: a thin cyan streak from fingertip to pixel, a white contact flash on its near edge, hit-stop and radial speed lines, and the cell (or, in other formations, every merged block) lifts as a solid slab (0.35 thick) that tumbles up and to the right off screen in 0.5 s, shedding 14 crimson pixel crumbs' },
    { k: 'after', t: [3.45, 6], zh: '餘波：3.7 秒解析度在 0.25 秒內一級級彈回原狀，原本站滿士兵的地面空空如也，只剩一個淡青色方框殘影淡出；施法者拍拍手回到待機；擊殺計數 4.3–4.55 秒淡出，新的大軍 4.6–5.9 秒原地淡入', en: 'aftermath: at 3.7 s the resolution snaps back level by level within 0.25 s and the ground where the army stood is empty except for a fading pale cyan square outline; the caster dusts off and returns to idle; the counter fades at 4.3–4.55 s and a fresh army fades in on the spot at 4.6–5.9 s' },
  ],
  layers: [
    { zh: '大軍與陣型：敵兵數量 500–2000（預設 1000），按陣型（預設方陣）排在中心 (1.0, 0)、半深 2.8、半寬 2.6 的範圍內，兵距決定大小並自動換成像素小兵；左上角擊殺計數（骷髏＋已擊殺/總數，3×5 像素字）在後製之後才畫，永遠清晰，全滅時變金色', en: 'army and formation: 500–2000 soldiers (default 1000) in a formation (default block) inside centre (1.0, 0), half depth 2.8, half width 2.6; the spacing sets their size and swaps them to pixel soldiers; the kill counter (skull + killed/total in 3×5 pixel digits) is drawn after the post pass so it is never pixelated, and turns gold on a full wipe' },
    { zh: '判定與倖存者：世界座標網格，原點在選取框角 (−1.8, −2.8)，第 L 級格邊 0.175 × 2^(L−1)；每級數格內士兵，≥ max(2, threshold × 格面積 ÷ 兵距²) 即吞併，士兵在第一個吞併它的級數死亡；最後一格 5.6 × 5.6 的「滿度」= 陣型實際佔地比例（方陣約 0.86，散兵橢圓約 0.69，橫列約 0.22），所以 threshold 0.85 時方陣全滅；其他陣型的密集處在前幾級被吞，散兵邊緣、分隊外圍、橫列與縱隊的部分士兵、圓陣內外的士兵倖存（預設下分別倖存約 6%、16%、36%、25%、18%）；levels 少於 6 時軍隊永遠變不成一格，方陣邊緣也有人倖存；陣型、levels、threshold 不變時判定只算一次並快取', en: 'rule and survivors: a world grid anchored at the marquee corner (−1.8, −2.8), level-L cell side 0.175 × 2^(L−1); per level count the soldiers per cell and swallow it at ≥ max(2, threshold × cell area / spacing²); a soldier dies at the first level that swallows him; the last 5.6 × 5.6 cell is only as "full" as the area the formation really covers (block ~0.86, scatter ellipse ~0.69, line ~0.22), so at threshold 0.85 the block is wiped; other formations lose their dense cores in the early levels while the scatter’s ragged edge, the squads’ outskirts, parts of a line or column and parts of a ring survive (about 6%, 16%, 36%, 25% and 18% at the defaults); with fewer than 6 levels the army never becomes one cell and the block’s edge survives too; the result is cached per layout, levels and threshold' },
    { zh: '降解析度後製：每行用兩次反投影算出地面點的線性步進，每個像素落入目前級數的格；第一遍按格累加顏色（已吞併區域按深紅色計），第二遍把每個像素換成格的平均色，吞併格換成平塗深紅（按格雜湊三選一）；斜 45° 視角下格子是菱形大像素，2D 是扁長方形', en: 'downscale post pass: per row two inverse projections give a linear ground step, each pixel falls in a cell of the current level; pass one sums colours per cell (swallowed regions count as crimson), pass two paints every pixel with its cell’s mean colour, swallowed cells with a flat crimson (one of three by cell hash); cells read as diamond pixels at 45° and as wide flat rectangles in 2D' },
    { zh: '施法者與選取框在後製之後才畫：施法者清晰地舉手、彈指、指向、後拉、彈飛；選取框是 45 段青色短線，沿正方形周邊以 0.6 單位／秒流動', en: 'the caster and the marquee are drawn after the post pass: the caster stays sharp as it raises a hand, snaps, points, cocks and flicks; the marquee is 45 cyan dashes crawling round the square at 0.6 units/s' },
    { zh: '彈飛的像素：每一塊合併後的大像素（被吞併、而上一級沒有再被吞併的格；預設方陣只有最後那一格）變成實心厚板（厚 = 格邊 × 0.1，0.05–0.35；頂面深紅、側面更暗），繞自身 y 軸加速翻滾，初速約 (17, −4, 17)（每塊 ±15%）、重力 9，0.5 秒飛出畫面；14 粒深紅小方塊碎屑掉回地面', en: 'the flicked pixel: every merged block (a swallowed cell whose parent was not swallowed; for the default block only the last cell) becomes a solid slab (thickness = cell side × 0.1, 0.05–0.35; crimson top, darker sides) that tumbles faster and faster about its own y axis with launch velocity about (17, −4, 17) (±15% per slab) and gravity 9, leaving the frame in 0.5 s; 14 crimson cube crumbs fall back to the ground' },
    { zh: '節奏：每一級一個脈衝拍（閃光），最後一級加重；彈指是主命中（頓幀 1.35）；解析度回彈是一個脈衝拍', en: 'rhythm: a pulse beat (flash) on every level, the last one heavier; the flick is the main hit (hit-stop power 1.35); the snap-back of the resolution is a pulse' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    levels: { zh: '降解析度級數', en: 'resolution levels', min: 3, max: 6, step: 1, value: 6 },
    threshold: { zh: '吞併門檻', en: 'merge threshold', min: .4, max: 1.2, step: .05, value: .85 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  CASTER: [-4.3, 0],
  A: 5.6, C1: .175, T1: 1.1, SPAN: 1.6, TF: 3.2, TR: 3.7,
  ckey: (a, b) => (a + 2048) * 4096 + (b + 2048),
  // the honest rule, cached per layout + levels + threshold: the level each unit dies at and a raster of dead regions
  rule(units, Lmax, thr) {
    const key = Lmax + '|' + thr;
    if (this._r && this._r.units === units && this._r.key === key) return this._r;
    const Ox = this.AREA.x - this.A / 2, Oy = this.AREA.y - this.A / 2, c1 = this.C1, s2 = Math.max(1e-4, units.spacing * units.spacing);
    const n = units.length, lvl = new Int8Array(n), ix = new Int32Array(n), iy = new Int32Array(n), ck = this.ckey;
    for (let i = 0; i < n; i++) { ix[i] = Math.floor((units[i].x - Ox) / c1); iy[i] = Math.floor((units[i].y - Oy) / c1); }
    const sets = [];
    for (let L = 1; L <= Lmax; L++) {
      const f = 1 << (L - 1), c = c1 * f, need = Math.max(2, thr * c * c / s2), cnt = new Map();
      for (let i = 0; i < n; i++) { const k = ck(Math.floor(ix[i] / f), Math.floor(iy[i] / f)); cnt.set(k, (cnt.get(k) || 0) + 1); }
      const S = new Set();
      for (const [k, m] of cnt) if (m >= need) S.add(k);
      sets.push(S);
      for (let i = 0; i < n; i++) if (!lvl[i] && S.has(ck(Math.floor(ix[i] / f), Math.floor(iy[i] / f)))) lvl[i] = L;
    }
    // dead raster over level-1 cells: the first level at which that little cell is swallowed (99 = never)
    const G0 = -48, GN = 160, dead = new Uint8Array(GN * GN).fill(99);
    for (let b = 0; b < GN; b++) for (let a = 0; a < GN; a++) {
      for (let L = 1; L <= Lmax; L++) {
        const f = 1 << (L - 1);
        if (sets[L - 1].has(ck(Math.floor((a + G0) / f), Math.floor((b + G0) / f)))) { dead[b * GN + a] = L; break; }
      }
    }
    // the cells of the last level that hold the army: they become the flying slabs
    // the merged blocks the caster flicks away: every swallowed cell whose parents were never swallowed
    // ([level, ia, ib]; for the default block this is the single last-level cell, the army's one pixel)
    const fly = [];
    for (let L = Lmax; L >= 1; L--) for (const k of sets[L - 1]) {
      const a = Math.floor(k / 4096) - 2048, b = (k % 4096) - 2048;
      let covered = false;
      for (let M = L + 1; M <= Lmax && !covered; M++) { const f = 1 << (M - L); covered = sets[M - 1].has(ck(Math.floor(a / f), Math.floor(b / f))); }
      if (!covered) fly.push([L, a, b]);
    }
    this._r = { units, key, lvl, sets, dead, G0, GN, fly, Ox, Oy };
    return this._r;
  },
  // the downscale post pass at level Lc (cells of side C1 * 2^(Lc-1)); lifted: the army pixel has been flicked away
  mosaic(p, R, Lc, lifted) {
    const self = this, c1 = this.C1, f = 1 << (Lc - 1), PIX = this.palette.pixel;
    p.post(({ pix, W, H, Q, hex, rgb }) => {
      const N = W * H;
      if (!self._buf || self._buf.N !== N) {
        const M = 512 * 512;
        self._buf = { N, key: new Int32Array(N), sr: new Float32Array(M), sg: new Float32Array(M), sb: new Float32Array(M), sn: new Float32Array(M), col: new Uint32Array(M), fl: new Uint8Array(M), touched: new Int32Array(M), tones: null };
      }
      const B = self._buf, KEY = B.key, sr = B.sr, sg = B.sg, sb = B.sb, sn = B.sn, col = B.col, fl = B.fl, touched = B.touched;
      if (!B.tones) B.tones = [1, 2, 3].map(k => { const c = hex(PIX[k]); return [c[0], c[1], c[2]]; });
      const tones = B.tones.map(c => rgb(c[0], c[1], c[2])), crim = B.tones[1];
      const K = 256, dead = R.dead, G0 = R.G0, GN = R.GN, Sl = R.sets[Lc - 1];
      let nt = 0;
      for (let sy = 0; sy < H; sy++) {
        const q0 = Q(.5, sy + .5), q1 = Q(1.5, sy + .5);
        if (!q0 || !q1) { for (let sx = 0; sx < W; sx++) KEY[sy * W + sx] = -1; continue; }
        const dx = q1[0] - q0[0], dy = q1[1] - q0[1];
        for (let sx = 0; sx < W; sx++) {
          const i = sy * W + sx, c = pix[i];
          const gx = q0[0] + dx * sx, gy = q0[1] + dy * sx;
          const a = Math.floor((gx - R.Ox) / c1), b = Math.floor((gy - R.Oy) / c1);
          const ca = Math.floor(a / f) + K / 2, cb = Math.floor(b / f) + K / 2;
          if (!(c >>> 24) || ca < 0 || cb < 0 || ca >= K || cb >= K) { KEY[i] = -1; continue; }
          const k = cb * K + ca;
          KEY[i] = k;
          if (!sn[k]) {
            touched[nt++] = k;
            fl[k] = !lifted && Sl.has(self.ckey(ca - K / 2, cb - K / 2)) ? 1 : 0;
          }
          // swallowed regions count as crimson in the average (until the pixel is flicked away)
          const da = a - G0, db = b - G0, dl = !lifted && da >= 0 && db >= 0 && da < GN && db < GN ? dead[db * GN + da] : 99;
          if (dl <= Lc) { sr[k] += crim[0]; sg[k] += crim[1]; sb[k] += crim[2]; }
          else { sr[k] += c & 255; sg[k] += c >> 8 & 255; sb[k] += c >> 16 & 255; }
          sn[k]++;
        }
      }
      // mean colour per cell, written once
      for (let j = 0; j < nt; j++) {
        const k = touched[j], m = sn[k];
        col[k] = fl[k] ? tones[(self.hash2(k) * 3) | 0] : rgb(sr[k] / m, sg[k] / m, sb[k] / m);
      }
      for (let i = 0; i < N; i++) {
        const k = KEY[i];
        if (k < 0) continue;
        pix[i] = col[k];
      }
      for (let j = 0; j < nt; j++) { const k = touched[j]; sr[k] = sg[k] = sb[k] = sn[k] = 0; fl[k] = 0; }
    });
  },
  hash2: k => { const s = Math.sin(k * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); },
  draw(p, t) {
    const PL = this.palette, T1 = this.T1, TF = this.TF, TR = this.TR, A = this.A;
    const Lmax = p.param('levels') | 0, thr = p.param('threshold');
    const form = PXFX.TROOPS[p.param('formation') | 0].id, n = Math.round(p.param('crowd'));
    const units = p.crowdLayout({ n, seed: 17, formation: form, area: this.AREA, faceTo: this.CASTER });
    const R = this.rule(units, Lmax, thr);
    const step = this.SPAN / (Lmax - 1), TL = L => T1 + (L - 1) * step;
    // current resolution level: climbs on the beats, holds, then snaps back in five quick steps after TR
    let Lc = 0;
    if (t >= T1 && t < TR) Lc = Math.min(Lmax, 1 + Math.floor((t - T1) / step + 1e-6));
    else if (t >= TR && t < TR + .25) Lc = Math.max(0, Lmax - 1 - Math.floor((t - TR) / .05));
    const lifted = t >= TF;
    // ---- the army ----
    const st = p.crowd({
      n, seed: 17, formation: form, area: this.AREA, faceTo: this.CASTER, t, scale: 'auto',
      hit: u => (R.lvl[u.i] ? TL(R.lvl[u.i]) : null),
      react: s => { s.hide = true; },
      fear: u => (R.lvl[u.i] ? p.env(t, .95, 1.1, 9, 10) * .25 : p.env(t, TR + .2, TR + .4, 4.3, 4.9) * .7),
      at: [this.CASTER[0], this.CASTER[1], 0], respawn: [4.6, 5.9], clear: [4.0, 4.2], enter: 'fade',
    });
    // ---- the picture loses its resolution ----
    if (Lc > 0) this.mosaic(p, R, Lc, lifted);
    // ---- the caster (drawn after the post pass: never pixelated) ----
    let pose;
    if (t < .5) pose = 'idle';
    else if (t < .86) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .5, .82), 1.3) };
    else if (t < 1.05) pose = { a: 'raise', b: 'point', k: p.easeInCubic(p.ph(t, .86, .92)) };
    else if (t < 2.9) pose = 'point';
    else if (t < TF) pose = { a: 'point', b: 'windup', k: p.easeOutCubic(p.ph(t, 2.9, TF - .04)) };
    else if (t < 3.9) pose = { a: 'windup', b: 'swing', k: p.easeOutExpo(p.ph(t, TF, TF + .06)) };
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.9, 4.6)) };
    const fig = p.figure(this.CASTER[0], this.CASTER[1], { pose, scale: .85 });
    const hand = fig.hand;
    // the snap: a cross flare and a ring at the fingertip
    const sn = t - .9;
    if (sn >= 0 && sn < .35) {
      p.sparkle(hand[0], hand[1], hand[2] + .05, 6 * (1 - sn / .35), PL.snap, 1.2 * (1 - sn / .35));
      p.ring(hand[0], hand[1], hand[2], .1 + .5 * p.easeOutExpo(sn / .35), .05, PL.snap, .9 * (1 - sn / .35), { axis: p.cam().fwd });
    }
    // a tick of light at the fingertip on every level beat
    for (let L = 1; L <= Lmax; L++) {
      const a = t - TL(L);
      if (a >= 0 && a < .2) p.sparkle(hand[0], hand[1], hand[2] + .05, 3 + (L === Lmax ? 3 : 0), PL.snap, 1 - a / .2);
    }
    // ---- the selection marquee: marching ants around the grid square ----
    const mq = t < TR ? p.easeOutBack(p.ph(t, .9, 1.08), 1.4) : 1 - p.ph(t, TR + .1, TR + .7);
    const Ox = R.Ox, Oy = R.Oy;
    if (mq > .01 && t >= .9) {   // (a zero-size marquee would divide by zero)
      const cx = Ox + A / 2, cy = Oy + A / 2, hs = A / 2 * (t < TR ? mq : 1), I = t < TR ? 1 : .7 * mq;
      const C = [[cx - hs, cy - hs], [cx + hs, cy - hs], [cx + hs, cy + hs], [cx - hs, cy + hs]], per = 8 * hs, dl = .25, off = (t * .6) % (2 * dl);
      for (let s0 = -off; s0 < per; s0 += 2 * dl) {
        const a0 = Math.max(0, s0), a1 = Math.min(per, s0 + dl);
        if (a1 <= a0) continue;
        const at = s => { const e = Math.min(3, Math.floor(s / (2 * hs))), u = (s - e * 2 * hs) / (2 * hs), P0 = C[e], P1 = C[(e + 1) % 4]; return [P0[0] + (P1[0] - P0[0]) * u, P0[1] + (P1[1] - P0[1]) * u, .03]; };
        // split dashes at the corners
        const e0 = Math.floor(a0 / (2 * hs)), e1 = Math.floor((a1 - 1e-6) / (2 * hs));
        if (e0 === e1) p.line(at(a0), at(a1), .06, PL.snap, I);
        else { const m = e1 * 2 * hs; p.line(at(a0), at(m - 1e-4), .06, PL.snap, I); p.line(at(m), at(a1), .06, PL.snap, I); }
      }
    }
    // ---- the flick: every merged block lifts as a solid slab and tumbles off screen ----
    const a = t - TF;
    if (a >= -.06 && a < .9) {
      if (a >= 0) {
        const g = 9, k = a, so = { shadow: false }, big = R.fly.length <= 24;
        R.fly.forEach(([L, ia, ib], q) => {
          const c = this.C1 * (1 << (L - 1)), th = Math.max(.05, Math.min(.35, c * .1)), hq = this.hash2(q * 7.7 + L);
          const vx = 17 * (.85 + .3 * hq), vy = -4 + 3 * (this.hash2(q * 3.1) - .5), vz = 17 * (.85 + .3 * this.hash2(q * 5.3 + 1));
          const ox = vx * k, oy = vy * k, oz = vz * k - .5 * g * k * k, ang = (1.6 + hq) * p.TAU * p.easeInCubic(Math.min(1, k * 2.2)) * (1 + k);
          const ca = Math.cos(ang), sa = Math.sin(ang);
          const x0 = Ox + ia * c, y0 = Oy + ib * c, mx = x0 + c / 2, my = y0 + c / 2;
          // tumble about the cell's y axis while it flies
          const P = (lx, ly, lz) => { const rx = lx * ca - lz * sa, rz = lx * sa + lz * ca; return [mx + rx + ox, my + ly + oy, rz + oz + th / 2]; };
          const h = c / 2, z0 = -th / 2, z1 = th / 2;
          const v = [P(-h, -h, z0), P(h, -h, z0), P(h, h, z0), P(-h, h, z0), P(-h, -h, z1), P(h, -h, z1), P(h, h, z1), P(-h, h, z1)];
          p.quad(v[4], v[5], v[6], v[7], PL.slab, so); p.quad(v[0], v[3], v[2], v[1], PL.slab, so);
          p.quad(v[0], v[1], v[5], v[4], PL.slab, so); p.quad(v[1], v[2], v[6], v[5], PL.slab, so);
          p.quad(v[2], v[3], v[7], v[6], PL.slab, so); p.quad(v[3], v[0], v[4], v[7], PL.slab, so);
          if (big && oz < 3) p.shadow(mx + ox, my + oy, 0, c * .5);
        });
        // crumbs knocked off the near edge of the slabs: short arcs back down
        const nC = Math.round(14 * p.density), FL = R.fly;
        for (let q = 0; q < nC && FL.length; q++) {
          const born = .02 + p.r(q, 31) * .14, age = a - born, life = .45 + .15 * p.r(q, 35);
          if (age < 0 || age > life) continue;
          const cell = FL[q % FL.length], c = this.C1 * (1 << (cell[0] - 1)), x0 = Ox + cell[1] * c, y0 = Oy + cell[2] * c;
          const bx = x0 + c * .15 * p.r(q, 32) + 17 * born * .6, by = y0 + c * p.r(q, 33), bz = 17 * born * .5;
          const z = bz + (3 + 2 * p.r(q, 36)) * age - 12 * age * age;
          if (z < 0) continue;
          const sz = .07 + .05 * p.r(q, 34), dx = (2 + 3 * p.r(q, 37)) * age;
          p.box(bx + dx - sz, by - sz, z, bx + dx + sz, by + sz, z + 2 * sz, PL.crumb, { shadow: false });
        }
      }
      // contact: a cyan streak from the fingertip and a white flash on the near edge of the pixel
      if (a >= -.06 && a < .12) {
        const near = [Ox + .1, Oy + A / 2, .3];
        const I = a < 0 ? .6 : 1.3 * (1 - a / .12);
        p.line(hand, near, .05, PL.snap, I, { w1: .12 });
        if (a >= 0) {
          p.glow(near[0], near[1], near[2], .9, PL.snap, 1.4 * (1 - a / .12));
          p.sparkle(near[0], near[1], near[2] + .2, 10, PL.snap, 1.3);
        }
      }
      if (a >= 0 && a < .3) p.speedLines(Ox + A / 2 + 4 * a, Oy + A / 2, .5 + 4 * a, { n: 18, R0: 1.5, R1: 6, ramp: PL.snap, I: 1 - a / .3, seed: Math.floor(t * 30) });
    }
    // aftermath: the pale outline of the hole where the army pixel was
    const ghost = p.env(t, TR, TR + .15, TR + .4, TR + 1.1);
    if (ghost > 0) {
      for (const [L, ia, ib] of R.fly.length <= 16 ? R.fly : []) {
        const c = this.C1 * (1 << (L - 1)), x0 = Ox + ia * c, y0 = Oy + ib * c;
        const Q4 = [[x0, y0, .02], [x0 + c, y0, .02], [x0 + c, y0 + c, .02], [x0, y0 + c, .02]];
        for (let e = 0; e < 4; e++) p.line(Q4[e], Q4[(e + 1) % 4], .05, PL.snap, .55 * ghost);
      }
    }
    // ---- the kill counter goes last, on top of the downscaled picture ----
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.3, 4.55) });
  },
});
