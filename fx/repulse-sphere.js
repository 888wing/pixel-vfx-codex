// 斥力天球 / Repulse Sphere — Ultimates pack (original design): a hovering caster opens both hands and a huge transparent force sphere bursts out, flinging debris and pushing a dust wall to the island edge
PXFX.define({
  id: 'repulse-sphere',
  loop: 4.4,
  beats: [{ t: 2.05, kind: 'burst', power: 1.3 }, { t: 2.3, kind: 'pulse', power: .5 }],
  view: { r: 3.4, h: 3.4 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'shockwave', 'debris', 'impact'],
  palette: {
    force: ['#5a6ac0', '#8496e0', '#b4c4f4', '#d8e4ff', '#f6f9ff'],
    dust: ['#6e6a78', '#8c8894', '#aaa6ae', '#c8c4c8', '#e2dee0'],
    rock: ['#3e3a48', '#56505e', '#706a78', '#8e8894', '#aca6b0'],
  },
  timeline: [
    { k: 'pose', t: [0, 1.0], zh: '起手：施法者站在場中央（x = 0），以緩動在 0.8 秒內懸浮升高 0.7，姿勢轉為懸浮', en: 'pose: the caster stands at the centre (x = 0) and hovers up 0.7 over 0.8 s with easing, shifting into the float pose' },
    { k: 'charge', t: [1.0, 2.05], zh: '集氣：雙手在 0.8 秒內慢慢張開；四周碎石與石柱輕微顫動，腳下淡藍光圈收縮；最後 0.25 秒完全靜止，只有胸前一點光逐漸變亮', en: 'charge: the hands open slowly over 0.8 s; the rocks and pillars around tremble and a pale blue circle under the feet contracts; the last 0.25 s is total stillness, only a point of light at the chest brightens' },
    { k: 'shape', t: [2.05, 2.2], zh: '成形：以胸口為中心爆出透明力場球（白藍閃光 0.15 秒、頓幀、震屏），以 easeOutExpo 急速膨脹；球面只有菲涅耳亮邊，邊緣一圈像素向內取樣造成空間扭曲', en: 'shape: a transparent force sphere bursts from the chest (a 0.15 s white-blue flash, hit-stop, shake) and swells very fast with easeOutExpo; only a fresnel rim is lit and a band at the rim samples pixels from further in, warping space' },
    { k: 'motion', t: [2.2, 2.5], zh: '推進：球在 0.45 秒內漲到半徑 2.6；地面衝擊環 0.35 秒掃到半徑 3.1，0.25 秒後第二道較小脈衝環；球面掃到哪裡，該處碎石與石柱就起飛', en: 'motion: the sphere reaches radius 2.6 within 0.45 s; a ground shock ring sweeps to radius 3.1 in 0.35 s with a smaller second pulse 0.25 s later; each rock and pillar launches the moment the sphere front reaches it' },
    { k: 'impact', t: [2.5, 3.0], zh: '衝擊：7 件碎石／短石柱向外拋飛（翻滾、拋物線、阻力），越過島邊的直接墜落；塵牆環以較慢速度推到島邊，力場球淡出', en: 'impact: 7 rocks and short pillars are flung outwards (tumbling, ballistic arc, drag) and the ones past the island edge drop away; the dust wall pushes more slowly to the edge as the sphere fades' },
    { k: 'after', t: [3.0, 4.4], zh: '餘波：力場球淡出，塵牆上升變薄並抖色消散，施法者緩緩降落回待機；碎石與石柱在原位抖色淡入（循環）', en: 'aftermath: the sphere fades, the dust wall rises, thins and dithers away, the caster drifts down to idle; the rocks and pillars dither back in at their places (loop)' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，懸浮（離地 0.7）＋姿勢 待機→懸浮→張開雙手→待機，爆發時身體後仰', en: 'caster: faceless mannequin hovering 0.7 off the ground, poses idle → float → arms spread → idle, leaning back at the burst' },
    { zh: '力場球：球殼只畫 rim^5（菲涅耳亮邊，低於 0.16 不畫），地面以下部分裁掉；同時用螢幕扭曲，在邊緣 45% 的帶內把像素向球心方向取樣（最大偏移 0.15 半徑）', en: 'force sphere: the shell draws only rim^5 (fresnel edge, nothing below 0.16), clipped below the ground; a screen warp samples pixels towards the centre in the outer 45% band (up to 0.15 of the radius)' },
    { zh: '地面衝擊環：極快擴張再減速的光環＋地面光帶，越大越細越暗', en: 'ground shock: a ring that expands very fast then slows, with a ground band, thinning and dimming as it grows' },
    { zh: '碎片：預先擺放的低多邊形岩石與 0.26×0.26×0.5 的短石柱，被球面掃中時才起飛（以膨脹曲線反推觸發時間），翻滾＋拋物線＋阻力，越過島邊後下墜，0.8–1.3 秒後抖色淡出', en: 'debris: pre-placed low-poly rocks and 0.26×0.26×0.5 short pillars that launch only when the sphere front reaches them (trigger time solved from the swell curve), tumbling on a ballistic arc with drag, falling past the island edge, dithering out after 0.8–1.3 s' },
    { zh: '塵牆：34 團抖色粗糙塵球排成上下兩層圓環，以 easeOutCubic 在 1.3 秒內推到半徑 3.2，邊推邊升高變薄', en: 'dust wall: 34 dithered rough dust balls in a two-tier ring, pushed out to radius 3.2 in 1.3 s with easeOutCubic, rising and thinning as it goes' },
    { zh: '靜止拍：爆發前 0.25 秒全部停止，只有胸前光點變亮，製造時間對比', en: 'stillness beat: everything stops for 0.25 s before the burst except a brightening point at the chest, for timing contrast' },
  ],
  params: {
    sphereRadius: { zh: '力場球半徑', en: 'sphere radius', min: 1.6, max: 3, step: .1, value: 2.6 },
    debris: { zh: '碎片數量', en: 'debris count', min: 0, max: 12, step: 1, value: 7 },
    dust: { zh: '塵土量', en: 'dust amount', min: 0, max: 2, step: .1, value: 1 },
  },
  // low-poly rock with a full tumble (yaw + pitch)
  rockT(p, x, y, z, r, ramp, seed, yaw, pitch, o) {
    const j = k => .7 + p.r(seed, k) * .55, cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const P = (a, b, c) => { const a2 = a * cp + c * sp, c2 = -a * sp + c * cp; return [x + a2 * cy - b * sy, y + a2 * sy + b * cy, z + c2]; };
    const v = [P(r * j(1), 0, 0), P(-r * j(2), 0, 0), P(0, r * j(3), 0), P(0, -r * j(4), 0), P(0, 0, r * .8 * j(5)), P(0, 0, -r * .6 * j(6))];
    const F = [[4, 0, 2], [4, 2, 1], [4, 1, 3], [4, 3, 0], [5, 2, 0], [5, 1, 2], [5, 3, 1], [5, 0, 3]];
    for (const [a, b, c] of F) p.tri(v[a], v[b], v[c], ramp, o);
    if (z > -.05 && (!o || !(o.alpha < .5))) p.shadow(x, y, Math.max(0, z), r * .85);
  },
  // box with half sizes h = [hx, hy, hz], tumbled by pitch (about its local y) then yaw (about z)
  cube(p, x, y, z, h, ramp, yaw, pitch, o) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const P = (a, b, c) => { const a2 = a * cp + c * sp, c2 = -a * sp + c * cp; return [x + a2 * cy - b * sy, y + a2 * sy + b * cy, z + c2]; };
    const V = [];
    for (const c of [-1, 1]) for (const b of [-1, 1]) for (const a of [-1, 1]) V.push(P(a * h[0], b * h[1], c * h[2]));
    const F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
    for (const f of F) p.quad(V[f[0]], V[f[1]], V[f[2]], V[f[3]], ramp, o);
    if (z > -.05 && (!o || !(o.alpha < .5))) p.shadow(x, y, Math.max(0, z), Math.max(h[0], h[1]) * 1.2);
  },
  draw(p, t) {
    const FO = this.palette.force, DU = this.palette.dust, RK = this.palette.rock;
    const B = 2.05, SR = p.param('sphereRadius'), EDGE = 3.05;
    // ---- caster: hover up, open the hands slowly, stillness, burst, drift down ----
    const lift = .7 * (p.ease(p.ph(t, .2, 1.0)) - p.ease(p.ph(t, 3.0, 3.8)));
    let pose;
    if (t < .2) pose = 'idle';
    else if (t < 1.0) pose = { a: 'idle', b: 'float', k: p.easeOutCubic(p.ph(t, .2, 1.0)) };
    else if (t < 1.8) pose = { a: 'float', b: 'spread', k: p.ease(p.ph(t, 1.0, 1.8)) * .8 };
    else if (t < B) pose = { a: 'float', b: 'spread', k: .8 };
    else if (t < 3.0) pose = { a: 'float', b: 'spread', k: .8 + .2 * p.easeOutBack(p.ph(t, B, B + .08), 2) };
    else pose = { a: 'spread', b: 'idle', k: p.ease(p.ph(t, 3.0, 3.85)) };
    const bob = t > .9 && t < 1.8 ? Math.sin((t - .9) * 5) * .025 * (1 - p.ph(t, 1.4, 1.8)) : 0;
    const lean = t >= B && t < 3.2 ? -.12 * Math.pow(1 - p.ph(t, B, 3.2), 2) * p.ph(t, B, B + .06) : 0;
    const fig = p.figure(0, 0, { pose, lift: lift + bob, lean });
    const CC = [fig.chest[0], fig.chest[1], fig.chest[2]];
    // ---- sphere radius over time and when its front reaches a distance ----
    const a = t - B, GROW = .45;
    const sphR = a < 0 ? 0 : SR * p.easeOutExpo(a / GROW);
    const hitAt = d => (d >= SR * .999 ? .35 : Math.min(.35, GROW * -Math.log2(1 - d / SR) / 10));
    // ---- props: rocks and short pillars, flung outwards when the front passes ----
    const np = Math.round(p.param('debris'));
    for (let k = 0; k < np; k++) {
      const ang = k / Math.max(1, np) * p.TAU + .5 + (p.r(k, 1) - .5) * .5, rad = 1.25 + .75 * p.r(k, 2);
      const isBox = k % 3 === 1, rr = .16 + .09 * p.r(k, 3), bh = [.13, .13, .22 + .08 * p.r(k, 4)];
      const z0 = isBox ? bh[2] : rr * .55, cx = Math.cos(ang), cy = Math.sin(ang);
      let x = cx * rad, y = cy * rad, z = z0, yaw = p.r(k, 5) * 3, pitch = 0, alpha = 1;
      const pre = p.ph(t, 1.0, B);
      if (a < 0 && pre > 0) { const j = .012 * pre * Math.sin(t * 61 + k * 7); x += j; z += Math.abs(j) * .8 + .05 * p.easeInCubic(pre) * p.r(k, 6); }
      const s = a - hitAt(rad);
      if (a >= 0 && s > 0) {
        const v0 = 5.2 * (1.25 - rad / 3.6) * (.8 + .4 * p.r(k, 7)), out = p.drag(v0, 2.2, s), vz = 1.6 + 1.2 * p.r(k, 8);
        const land = 2 * vz / 9.8, now = rad + out;
        x = cx * now; y = cy * now;
        z = z0 + Math.max(0, vz * s - 4.9 * s * s);
        if (now > EDGE && s > land * .6) z -= 4 * Math.pow(s - land * .6, 2);
        const spinv = (5 + 6 * p.r(k, 9)) * (1 - Math.exp(-2.5 * s)) / 2.5;
        pitch = spinv * (isBox ? 1 : 1.3); yaw += spinv * .4;
        alpha = 1 - p.ph(s, .8 + .3 * p.r(k, 10), 1.25 + .2 * p.r(k, 10));
      }
      if (t > 3.6) alpha = p.ph(t, 3.85, 4.3);
      if (alpha <= 0) continue;
      const o = alpha < 1 ? { alpha } : undefined;
      if (isBox) this.cube(p, x, y, z, bh, RK, yaw, pitch, o);
      else this.rockT(p, x, y, z, rr, RK, k * 5 + 2, yaw, pitch, o);
    }
    // ---- dust wall: a two-tier ring pushed out to the island edge ----
    const dust = p.param('dust');
    if (a >= 0 && a < 2 && dust > 0) {
      const nd = Math.round(34 * dust * p.density), u = p.ph(a, 0, 1.3), rw = .5 + 2.7 * p.easeOutCubic(u);
      const fade = 1 - p.ph(a, .7, 1.9);
      for (let d = 0; d < nd; d++) {
        const ang = d / nd * p.TAU + p.r(d, 11) * .3, tier = d % 2, jit = (p.r(d, 12) - .5) * .25;
        const rd = rw * (1 + jit * .4) - tier * .18, sz = (tier ? .13 : .2) + .13 * p.r(d, 13) + .12 * u * (.5 + p.r(d, 15));
        const z = (tier ? .42 : .16) + .45 * u * (tier ? 1.3 : .8) + .18 * p.r(d, 14);
        const al = fade * (tier ? .7 : .9) * (.6 + .4 * p.ph(a, 0, .1));
        if (al <= .02) continue;
        p.ball(Math.cos(ang) * rd, Math.sin(ang) * rd, z, sz, DU, { alpha: al, rough: .55, shadow: false, seed: d });
      }
    }
    // ---- pre-burst: contracting circle under the caster, the chest point ----
    if (t > 1.0 && t < B) {
      const u = p.ph(t, 1.0, B);
      p.ring(0, 0, .02, 1.6 - 1.2 * p.easeInCubic(u), .05, FO, .55 * p.ph(t, 1.0, 1.3));
      const still = p.ph(t, B - .25, B);
      p.glow(CC[0] + .12, CC[1], CC[2], .1 + .12 * still, FO, .4 + .9 * still);
      if (still > 0) p.sparkle(CC[0] + .14, CC[1], CC[2], Math.round(2 + 4 * still), FO, .8 + .5 * still);
    }
    // ---- the sphere: warp at the rim, fresnel shell clipped at the ground ----
    const life = a < 0 ? 0 : 1 - p.easeInCubic(p.ph(a, GROW * .6, GROW + .4));
    if (sphR > .05 && life > 0) {
      const R = sphR, amp = .15 * life;
      p.warp(CC[0], CC[1], CC[2], R, (dx, dy, rho) => {
        if (rho < .55) return null;
        const k = amp * Math.sin(Math.PI * (rho - .55) / .45) / (rho || 1);
        return [-dx * k, -dy * k];
      });
      const zmin = -Math.min(1, CC[2] / R);
      p.shell(CC[0], CC[1], CC[2], R, (nx, ny, nz, rim) => { const v = Math.pow(rim, 5); return v > .16 ? v : 0; }, FO, 1.3 * life, { zmin, back: .3 });
      p.light(0, 0, 0, Math.min(3.2, R + .3), FO, .4 * life);
    }
    // ---- burst flash, ground shock, second pulse ----
    if (a >= 0 && a < 1) {
      const fl = Math.pow(1 - p.ph(a, 0, .15), 2);
      if (fl > 0) { p.glow(CC[0], CC[1], CC[2], .3 + .6 * fl, FO, 1.4 * fl, { pow: 1.3 }); p.sparkle(CC[0] + .1, CC[1], CC[2], Math.round(10 * fl), FO, 1.3 * fl); }
      p.shock(0, 0, .02, p.ph(a, 0, .35), { R: 3.1, w: .35, ramp: FO, ground: true });
      const a2 = a - .25;
      if (a2 > 0) p.shock(0, 0, .02, p.ph(a2, 0, .5), { R: 2.4, w: .18, ramp: FO, I: .7, light: false });
      if (a < .18) p.speedLines(CC[0], CC[1], CC[2], { n: 16, R0: 1, R1: 3, ramp: FO, I: .7 * (1 - a / .18), seed: Math.floor(t * 30) });
    }
  },
});
