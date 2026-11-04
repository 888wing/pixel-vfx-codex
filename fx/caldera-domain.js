// 熔獄火山 / Caldera Domain — Ultimates pack (original design): the battlefield becomes the inside of a volcano: rock walls rise around it, the floor cracks into lava, geysers erupt and fireballs rain onto the target
PXFX.define({
  id: 'caldera-domain',
  loop: 4.8,
  beats: [{ t: .7, kind: 'cast', power: .9 }, { t: 1.55, kind: 'pulse', power: .5 }, { t: 2.05, kind: 'pulse', power: .6 }, { t: 2.5, kind: 'pulse', power: .6 }, { t: 3.05, kind: 'hit', power: 1.4 }],
  view: { r: 3.4, h: 3.0 },
  stage: { ground: 'dirt', tiles: true },
  modules: ['figure', 'charge', 'domain', 'growth', 'debris', 'impact', 'shockwave', 'aftermath'],
  palette: {
    lava: ['#8a1f14', '#c8361a', '#ff5a1c', '#ff9a3c', '#ffd27a', '#fff6dc'],
    rock: ['#1e1418', '#2e1f22', '#432c2a', '#5c3c34', '#7a5040'],
    basalt: ['#1a1012', '#261618', '#33201f', '#432a26'],
    smoke: ['#2c2226', '#3e3236', '#524448', '#66585a'],
  },
  timeline: [
    { k: 'pose', t: [0, .55], zh: '起手：施法者單手高舉（ease-out-back）', en: 'pose: the caster raises one hand high (ease-out-back)' },
    { k: 'charge', t: [.3, .7], zh: '集氣：10–20 粒火星沿短光線匯聚到高舉的手，手心一團橙白熱光，腳下地面泛紅', en: 'charge: 10–20 embers streak into the raised hand, an orange-white hot glow forms in the palm, the ground under the feet glows red' },
    { k: 'shape', t: [.7, 1.3], zh: '成形：雙手一舉（0.06 秒），背景以施法者為圓心 0.35 秒擦除成熔岩天空；14 塊高 1.6–2.6 的暗色岩壁沿半徑 2.8 由施法者一側起依次升起（ease-out-back，各 0.35 秒），面向鏡頭的岩壁只升到三成高，避免擋住人物；地面由施法者向外裂開，裂縫流出會流動的熔岩', en: 'shape: both hands go up (0.06 s) and a 0.35 s wipe from the caster turns the sky to embers; 14 dark rock walls (1.6–2.6 tall) rise in turn around radius 2.8 starting on the caster\'s side (ease-out-back, 0.35 s each), the walls facing the camera rise only to a third so the figures stay visible; the floor cracks open outwards from the caster and the cracks fill with flowing lava' },
    { k: 'motion', t: [1.3, 3.0], zh: '推進：1.55、1.95、2.4 秒三處地面噴發熔岩柱（高 1.8，帶落下的熔岩團、碎石與火星）；6 顆火球由岩壁頂與天空拋物線飛向目標（各 0.45 秒、加速），命中時間錯開 2.05–2.9 秒；全程熱浪扭曲畫面', en: 'motion: lava geysers burst from the floor at 1.55, 1.95 and 2.4 s (1.8 tall, with falling lava blobs, rock bits and sparks); 6 fireballs arc from the wall tops and the sky onto the target (0.45 s each, accelerating), impacts staggered over 2.05–2.9 s; heat haze wobbles the frame throughout' },
    { k: 'impact', t: [3.05, 3.4], zh: '命中：目標腳下最後大噴發：粗 1.2 高 2.8 的熔岩光柱、地面衝擊環、14 塊碎石與 24 粒火星向外飛散', en: 'impact: a final big eruption under the target: a lava pillar 1.2 wide and 2.8 tall, a ground shock ring, 14 rocks and 24 sparks flying out' },
    { k: 'after', t: [3.3, 4.8], zh: '餘波：岩壁 0.7 秒內沉回地面，天空由外向施法者退回原狀，熔岩裂縫冷卻成暗色裂紋並淡出，黑煙上升散去，施法者放下雙手', en: 'aftermath: the walls sink back in 0.7 s, the sky wipes back towards the caster, the lava cracks cool into dark cracks and fade, black smoke rises away, the caster lowers both hands' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，待機→單手高舉→雙手高舉→待機', en: 'caster: faceless mannequin, idle → one hand raised → both hands up → idle' },
    { zh: '領域：熔岩天空預設（暗紅漸層＋橙紅雲＋少量火星），地面映射到 4 階暗玄武岩色', en: 'domain: the ember sky preset (dark red gradient, orange-red clouds, a few embers) and the ground remapped to 4 dark basalt tones' },
    { zh: '岩壁：14 個雙錐體岩石（5 面、寬 0.95–1.35）圍成一圈並略向內傾，底部加 2 塊碎石；面向鏡頭的按朝向降到三成高（切面視角）；每塊近側畫一條發光熔岩脈', en: 'walls: 14 five-sided bipyramid rocks (0.95–1.35 wide) in a ring leaning slightly inwards with 2 boulders at each base; walls facing the camera are cut down to a third by their facing (cut-away view); a glowing lava vein on each near face' },
    { zh: '熔岩地面：兩層噪聲脊線組成的裂縫網貼花，亮度用往前捲動的噪聲調變（流動感），由施法者向外展開；冷卻後留下同形狀的暗色裂紋', en: 'lava floor: a crack network decal from two layers of noise ridges, its brightness modulated by scrolling noise (flow), spreading out from the caster; it cools into dark cracks of the same shape' },
    { zh: '噴發：3 處熔岩柱（寬 0.42 收細到 0.16 的光線，底部一團光暈），8 團熔岩受重力落下、3 塊碎石、10 粒火星', en: 'geysers: 3 lava columns (a beam tapering from 0.42 to 0.16 wide with a glow at its foot), 8 lava blobs falling under gravity, 3 rocks and 10 sparks each' },
    { zh: '火球：核心亮球＋光暈＋6 節漸小的尾巴，沿拋物線加速；命中時橙白閃光、8 粒火星與一圈小火環', en: 'fireballs: hot orb, halo and a 6-step shrinking tail on an accelerating arc; on impact an orange-white flash, 8 sparks and a small ring of fire' },
    { zh: '熱浪：以戰場為中心的像素錯位扭曲，水平方向按高度做正弦抖動（約 1 像素）', en: 'heat haze: a pixel-offset warp over the field, a sine wobble along x that varies with height (about 1 px)' },
  ],
  params: {
    walls: { zh: '岩壁數量', en: 'wall count', min: 8, max: 20, step: 1, value: 14 },
    fireballs: { zh: '火球數量', en: 'fireball count', min: 1, max: 10, step: 1, value: 6 },
    cracks: { zh: '熔岩裂縫密度', en: 'lava crack density', min: .5, max: 1.6, step: .05, value: 1 },
    haze: { zh: '熱浪強度', en: 'heat haze', min: 0, max: 1, step: .05, value: .6 },
  },
  SKY: { top: '#140605', bottom: '#3c1309', nebula: '#5a1d0d', stars: .007, star: '#ffb050' },
  GEYSERS: [[-.55, 1.35, 1.55], [.75, -1.35, 1.95], [1.25, 1.15, 2.4]],
  // lava crack network: 0 outside a crack, up to 1 on its centre line
  crack(p, x, y, dens) {
    const w = .028 * dens, a = Math.abs(p.noise(x * 1.25 + 3, y * 1.25 - 2) - .5), b = Math.abs(p.noise(x * 2.4 - 7, y * 2.4 + 5) - .5);
    return Math.max(a < w ? 1 - a / w : 0, b < w * .55 ? .7 * (1 - b / (w * .55)) : 0);
  },
  draw(p, t) {
    const P = this.palette, LV = P.lava, RK = P.rock, TAU = p.TAU;
    const X0 = -2.1, HX = 2.35, CAST = .7, FINAL = 3.05, SINK = 3.3;
    // ---- caster ----
    let pose;
    if (t < .55) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(t / .55, 1.4) };
    else if (t < CAST) pose = 'raise';
    else if (t < CAST + .06) pose = { a: 'raise', b: 'bothUp', k: p.easeInCubic((t - CAST) / .06) };
    else if (t < 3.45) pose = 'bothUp';
    else pose = { a: 'bothUp', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.45, 4.35)) };
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose });

    // ---- the caldera walls: rise in turn from the caster's side, near-camera ones cut down ----
    const cm = p.cam(), fl = Math.hypot(cm.fwd[0], cm.fwd[1]) || 1, fh = [cm.fwd[0] / fl, cm.fwd[1] / fl];
    const nW = Math.round(p.param('walls')), sink = p.easeInCubic(p.ph(t, SINK, SINK + .7)), tops = [];
    for (let k = 0; k < nW; k++) {
      const ang = k / nW * TAU + p.r(k, 1) * .25, rad = 2.75 + p.r(k, 2) * .25, cx = Math.cos(ang) * rad, cy = Math.sin(ang) * rad;
      const order = Math.abs(((ang - Math.PI) % TAU + TAU) % TAU - Math.PI) / Math.PI;      // 0 at the caster's side, 1 opposite
      const born = CAST + .05 + (1 - order) * 0 + order * .3, g = p.easeOutBack(p.ph(t, born, born + .35), 1.6);
      const facing = Math.cos(ang) * fh[0] + Math.sin(ang) * fh[1], cut = 1 - .72 * p.smooth(-.1, .45, facing);
      const hh = (1.6 + p.r(k, 3) * 1) * cut * g * (1 - sink), wid = .95 + p.r(k, 4) * .4;
      if (hh < .04) continue;
      const lean = p.v3.norm([-Math.cos(ang) * .18 + (p.r(k, 5) - .5) * .15, -Math.sin(ang) * .18 + (p.r(k, 6) - .5) * .15, 1]);
      p.shard(cx + lean[0] * hh * .3, cy + lean[1] * hh * .3, hh * .3, hh * 1.35, wid, lean, RK, { back: .3, sides: 5, spin: ang });
      if (g > .3) for (let m = 0; m < 2; m++) {
        const ba = ang + (m - .5) * .35, br = rad - .25 - p.r(k * 2 + m, 7) * .2;
        p.rock(Math.cos(ba) * br, Math.sin(ba) * br, .1, (.18 + p.r(k * 2 + m, 8) * .12) * Math.min(1, g) * (1 - sink), RK, k * 2 + m);
      }
      tops.push({ cx, cy, hh, lean, wid, facing, ang });
    }
    // ---- rocks and lava blobs (solids) from the geysers and the final eruption ----
    for (const [gx, gy, g0] of this.GEYSERS) {
      const a = t - g0;
      if (a < .08 || a > 1.2) continue;
      for (let m = 0; m < 3; m++) {
        const ang = p.r(m + g0 * 10, 21) * TAU, vz = 3 + p.r(m + g0 * 10, 22) * 1.5, aa = a - .08, s = .5 + p.r(m, 23) * .6;
        const z = vz * aa - 5 * aa * aa;
        if (z > -.05) p.rock(gx + Math.cos(ang) * s * aa, gy + Math.sin(ang) * s * aa, Math.max(.06, z), .07, RK, m + 3);
      }
    }
    const fa = t - FINAL;
    if (fa >= 0 && fa < 1.3) {
      const nR = Math.round(14 * p.density);
      for (let k = 0; k < nR; k++) {
        const ang = p.r(k, 31) * TAU, sp = 1.2 + p.r(k, 32) * 1.8, vz = 2.5 + p.r(k, 33) * 2.5, d = p.drag(sp, 1.5, fa);
        const z = .3 + vz * fa - 5 * fa * fa;
        if (z < -.1) continue;
        p.rock(HX + Math.cos(ang) * (.2 + d), Math.sin(ang) * (.2 + d), Math.max(.07, z), .07 + p.r(k, 34) * .08, RK, k);
      }
    }
    // smoke after the final eruption (soft solids)
    if (fa > .15 && fa < 1.4) for (let k = 0; k < Math.round(7 * p.density); k++) {
      const u = p.ph(fa, .15 + k * .03, 1.15 + k * .03);
      if (u <= 0 || u >= 1) continue;
      const ang = k / 7 * TAU;
      p.ball(HX + Math.cos(ang) * .35 * (1 + u), Math.sin(ang) * .4 * (1 + u), .5 + u * 1.8, .2 + u * .35, P.smoke, { alpha: (1 - u) * .85, rough: .5, shadow: false, seed: k });
    }

    // ---- the volcano world: ember sky, basalt ground ----
    const amt = t < SINK + .2 ? p.easeOutCubic(p.ph(t, CAST, CAST + .35)) : 1 - p.easeInCubic(p.ph(t, SINK + .2, SINK + .8));
    if (amt > 0) p.domain({ amt, c: [X0, 0, .8], sky: this.SKY, ground: P.basalt, solids: .15 * amt, t });
    // cooled cracks: dark marks left where the lava was, fading out
    const dens = p.param('cracks'), heat = t < FINAL + .3 ? 1 : 1 - p.ph(t, FINAL + .3, 4.2);
    const reveal = 5.2 * p.easeOutCubic(p.ph(t, CAST + .05, CAST + .75));
    const cool = t < FINAL + .3 ? 0 : 1 - p.ph(t, 4.0, 4.7);
    if (cool > 0) p.stain(.1, 0, 2.8, (x, y) => this.crack(p, x + .1, y, dens) > .2 ? 1.2 : 0, '#1a0e0c', cool);

    // ---- light ----
    if (t > .3 && t < CAST + .15) {
      const u = p.ph(t, .3, CAST), h = fig.hand;
      p.charge(h[0], h[1], h[2], u, { n: 14, R: 1.2, ramp: LV, I: 1, len: .2 });
      p.glow(h[0], h[1], h[2], .12 + .15 * u, LV, .7 + .5 * u);
      p.light(X0, 0, 0, 1.2, LV, .6 * u);
    }
    // lava floor: crack network with flowing brightness, spreading from the caster
    if (reveal > 0 && heat > 0) {
      p.decal(.1, 0, 0, 2.8, (x, y) => {
        const wx = x + .1, dc = Math.hypot(wx - X0, y);
        if (dc > reveal) return 0;
        const c = this.crack(p, wx, y, dens);
        if (c <= 0) return 0;
        const flow = .55 + .45 * p.noise(wx * 2.2 - t * 1.6, y * 2.2 + t * .7);
        return c * flow * (dc > reveal - .3 ? 1.3 : 1);
      }, LV, 1.05 * heat);
      p.light(0, 0, 0, 2.8, LV, .22 * heat * Math.min(1, reveal / 3));
    }
    // lava veins on the near faces of the walls
    for (const w of tops) {
      if (w.facing < -.6 || w.hh < .3) continue;
      const toCam = [cm.fwd[0] * w.wid * .45, cm.fwd[1] * w.wid * .45, cm.fwd[2] * w.wid * .45];
      const b0 = [w.cx + toCam[0], w.cy + toCam[1], .05 + toCam[2]], b1 = [w.cx + w.lean[0] * w.hh * .7 + toCam[0] * .6, w.cy + w.lean[1] * w.hh * .7 + toCam[1] * .6, w.hh * .7 + toCam[2] * .6];
      p.line(b0, b1, .06, LV, .75 * heat * (1 - sink), { w1: .015, i1: .2 });
    }
    // heat haze over the field (resolves the scene so far)
    const hz = p.param('haze') * Math.min(amt, heat);
    if (hz > .02) p.warp(.1, 0, .45, 2.2, (dx, dy, rho) => {
      const s = Math.sin(dy * 34 + t * 11 + Math.sin(dx * 9) * 1.5) * .017 * hz * (1 - rho * rho);
      return Math.abs(s) * 60 < .5 ? null : [s, 0];
    });
    // geysers
    for (const [gx, gy, g0] of this.GEYSERS) {
      const a = t - g0;
      if (a < -.15 || a > 1.1) continue;
      if (a < 0) { p.glow(gx, gy, .05, .35, LV, .8 * (1 + a / .15)); continue; }
      const up = p.easeOutExpo(p.ph(a, 0, .18)), down = p.easeInCubic(p.ph(a, .35, .7)), top = 1.8 * up * (1 - down);
      if (top > .05) {
        p.line([gx, gy, 0], [gx, gy, top], .42, LV, 1.3, { w1: .16, i1: .85 });
        p.glow(gx, gy, .15, .45, LV, .7 * (1 - down));
      }
      for (let m = 0; m < Math.round(8 * p.density); m++) {
        const aa = a - .05 - p.r(m, 41) * .15;
        if (aa <= 0) continue;
        const ang = p.r(m, 42) * TAU, s = .4 + p.r(m, 43) * .9, vz = 2.6 + p.r(m, 44) * 2.2, z = .3 + vz * aa - 5 * aa * aa;
        if (z < 0) continue;
        p.orb(gx + Math.cos(ang) * s * aa, gy + Math.sin(ang) * s * aa, z, .05, LV, .8);
      }
      for (let m = 0; m < Math.round(10 * p.density); m++) {
        const life = .35 + p.r(m, 46) * .4, u = a / life;
        if (u >= 1) continue;
        const ang = p.r(m, 47) * TAU, sp = 2.5 + p.r(m, 48) * 2.5, d = p.drag(sp, 4, a), dp = p.drag(sp, 4, Math.max(0, a - .04));
        const el = .6 + p.r(m, 49) * .8, z = .2 + Math.sin(el) * d - 2 * a * a, zp = .2 + Math.sin(el) * dp - 2 * (a - .04) * (a - .04);
        p.line([gx + Math.cos(ang) * Math.cos(el) * d, gy + Math.sin(ang) * Math.cos(el) * d, z], [gx + Math.cos(ang) * Math.cos(el) * dp, gy + Math.sin(ang) * Math.cos(el) * dp, zp], .04, LV, 1 - u);
      }
      p.light(gx, gy, 0, 1.4, LV, .9 * (1 - p.ph(a, .2, .9)));
    }
    // fireballs from the wall tops and the sky, staggered onto the target
    const nF = Math.round(p.param('fireballs')), tgt = [HX, 0, .95];
    for (let k = 0; k < nF; k++) {
      const hit = 2.05 + (nF > 1 ? k / (nF - 1) : 0) * .85, launch = hit - .45, u = p.ph(t, launch, hit);
      const ang = 1.7 + k * .9 + p.r(k, 51) * .4, fromSky = k % 2 === 1;
      const src = fromSky ? [-1.2 + p.r(k, 52) * 2.6, (p.r(k, 53) - .5) * 3, 4.2] : [Math.cos(ang) * 2.8, Math.sin(ang) * 2.8, 2.2];
      const dst = [tgt[0] - .1, tgt[1] + (p.r(k, 54) - .5) * .3, tgt[2] + (p.r(k, 55) - .5) * .4];
      if (u > 0 && u < 1) {
        const e = p.easeIn(u), pos = p.arcPos(src, dst, e, fromSky ? .3 : 1.2);
        for (let s = 6; s >= 1; s--) {
          const q = p.arcPos(src, dst, Math.max(0, e - s * .035 * (.4 + u)), fromSky ? .3 : 1.2);
          p.glow(q[0], q[1], q[2], .22 - s * .025, LV, .9 - s * .12);
        }
        p.glow(pos[0], pos[1], pos[2], .34, LV, .7);
        p.orb(pos[0], pos[1], pos[2], .13, LV, 1);
        p.light(pos[0], pos[1], 0, 1.2, LV, .5);
      }
      const a = t - hit;
      if (a >= 0 && a < .45) {
        const f = Math.pow(1 - p.ph(a, 0, .18), 2);
        if (f > 0) p.glow(dst[0] - .25, dst[1], dst[2], .3 + .45 * f, LV, 1.4 * f, { pow: 1.3 });
        p.ring(dst[0] - .2, dst[1], dst[2], .2 + .7 * p.easeOutExpo(p.ph(a, 0, .35)), .08 * (1 - a / .45) + .02, LV, 1 - a / .45, { axis: [1, 0, 0] });
        for (let m = 0; m < Math.round(8 * p.density); m++) {
          const ang2 = p.r(m + k * 9, 61) * TAU, d = p.drag(3 + p.r(m, 62) * 2, 5, a), dp = p.drag(3 + p.r(m, 62) * 2, 5, Math.max(0, a - .04));
          const dir = [-.6, Math.cos(ang2), Math.sin(ang2) + .3];
          p.line([dst[0] + dir[0] * d, dst[1] + dir[1] * d, dst[2] + dir[2] * d - 2 * a * a], [dst[0] + dir[0] * dp, dst[1] + dir[1] * dp, dst[2] + dir[2] * dp], .04, LV, 1 - a / .45);
        }
        p.light(HX, 0, 0, 1.8, LV, f);
      }
    }
    // the final big eruption under the target
    if (fa >= 0 && fa < 1) {
      const f = Math.pow(1 - p.ph(fa, 0, .2), 2), col = 1 - p.easeInCubic(p.ph(fa, .15, .6));
      if (col > 0) {
        p.line([HX, 0, 0], [HX, 0, 2.8 * p.easeOutExpo(p.ph(fa, 0, .1))], 1.2 * (.6 + .4 * col), LV, 1.4 * col, { w1: .4, i1: .9 * col });
        p.glow(HX, 0, 1, .5 + .7 * f, LV, 1.2 * Math.max(f, col * .5), { pow: 1.3 });
      }
      p.shock(HX, 0, .05, p.ph(fa, 0, .7), { R: 2.4, w: .35, ramp: LV, ground: true });
      for (let m = 0; m < Math.round(24 * p.density); m++) {
        const life = .4 + p.r(m, 71) * .5, u = fa / life;
        if (u >= 1) continue;
        const ang = p.r(m, 72) * TAU, sp = 3 + p.r(m, 73) * 4, el = .3 + p.r(m, 74) * 1.1, d = p.drag(sp, 3.5, fa), dp = p.drag(sp, 3.5, Math.max(0, fa - .04));
        const z = .4 + Math.sin(el) * d - 3 * fa * fa, zp = .4 + Math.sin(el) * dp - 3 * (fa - .04) * (fa - .04);
        if (z < 0) continue;
        p.line([HX + Math.cos(ang) * Math.cos(el) * d, Math.sin(ang) * Math.cos(el) * d, z], [HX + Math.cos(ang) * Math.cos(el) * dp, Math.sin(ang) * Math.cos(el) * dp, zp], .05, LV, 1.1 * (1 - u));
      }
      p.light(HX, 0, 0, 2.8, LV, Math.max(f, col * .7));
    }
  },
});
