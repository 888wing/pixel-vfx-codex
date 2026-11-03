// 流光刃影 / Gleaming Blade Trail — pixel version of 00GameDevs "weapon-smear" (MIT)
PXFX.define({
  id: 'weapon-smear',
  loop: 3.2,
  view: { r: 2.3, h: 2.2 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    smear: ['#2b3a9c', '#2454d4', '#2878ff', '#5ea8ff', '#aee6ff', '#f2fcff'],
    cloth: ['#272a48', '#363d66', '#4a5684', '#62709c', '#8290b4'],
    steel: ['#4c5068', '#6e7490', '#9aa2ba', '#c8d0e0', '#eef2f8'],
  },
  timeline: [
    { t: [0, .25], zh: '起手：劍士把劍向右後方拉開（ease-out 停在蓄力位）', en: 'wind-up: the swordsman draws the blade back to the right (ease-out into the cocked pose)' },
    { t: [.25, .53], zh: '第一刀：ease-in-back，先再往後拉一點，然後在最後約 0.1 秒內加速橫斬約 220 度到命中位（0.53 秒命中），掃過的扇面留下藍色半透明光痕', en: 'swing 1 (ease-in-back): a small extra draw-back, then the blade accelerates through a ~220 degree horizontal slash, most of it in the last ~0.1 s, connecting at 0.53 s; the swept area leaves a translucent blue smear' },
    { t: [.53, .85], zh: '命中後：刀身急停，刀尖白閃、火花沿揮動方向噴出；再以 ease-out 慢慢帶完最後約兩成弧度，光痕由尾端收走', en: 'after contact: the blade stops hard, the tip flashes and sparks spray along the swing; it then eases out through the last ~20 % of the arc while the smear drains from its tail' },
    { t: [.85, 1.62], zh: '第二刀：由右下拉到蓄力位，同樣先微拉再急撩向左上（1.33 秒命中），之後慢慢收勢', en: 'swing 2: back to a low-right cock, the same small draw-back and snap into a rising backhand diagonal (contact 1.33 s), then a slow follow-through' },
    { t: [1.62, 2.5], zh: '第三刀：高舉過頭蓄力，急劈而下（2.13 秒命中，最重的一下），之後慢慢壓到最低', en: 'swing 3: raised overhead, then a sudden vertical chop (contact 2.13 s, the heaviest hit), easing down to the lowest point' },
    { t: [2.5, 3.2], zh: '停手：光痕在 0.26 秒內由尾端收走，劍士平順地回到起手姿勢', en: 'stop: the trail drains from its tail within 0.26 s and the swordsman eases back to guard' },
  ],
  layers: [
    { zh: '拖影：記錄最近 0.26 秒的刀根與刀尖位置（約 28 組），只記錄揮斬與收勢段，連成帶狀面；越舊越淡（(1−age)^1.35）', en: 'trail: blade base and tip positions from the last 0.26 s (about 28 pairs), recorded only during swings and follow-throughs, joined into a strip; older samples fade as (1 - age)^1.35' },
    { zh: '刀面：半透明藍，靠近刀尖較亮；剛揮過的前段整片提亮，命中瞬間再加亮', en: 'body: translucent blue, brighter towards the tip; the freshest section is lifted as a whole, and lifted further on contact' },
    { zh: '細線：刀面內 4 條平行於刀尖的細線', en: 'lines: 4 thin lines inside the face, parallel to the tip path' },
    { zh: '亮刃：刀尖軌跡 1–2 像素白線，下方一圈藍色光暈', en: 'edge: 1–2 px white line along the tip path with a blue halo just inside it' },
    { zh: '命中火花：每刀 6 道短光線由刀尖沿揮動方向噴出，先快後慢（阻力）並受重力下墜；刀尖四角星 0.15 秒內由大縮小', en: 'contact sparks: 6 short streaks per swing spray from the tip along the swing, fast then slow (drag) and falling; a tip star shrinks back within 0.15 s' },
    { zh: '劍士：膠囊身體，劍長約 1.1，身體跟著揮劍方向扭轉', en: 'swordsman: capsule body, sword about 1.1 long, torso twists with the swing' },
  ],
  beats: [{ t: .53, kind: 'hit', power: .8 }, { t: 1.33, kind: 'hit', power: .9 }, { t: 2.13, kind: 'hit', power: 1.2 }],
  params: {
    arc: { zh: '揮斬幅度', en: 'swing arc scale', min: .6, max: 1.4, step: .05, value: 1 },
    bladeLength: { zh: '劍身長度', en: 'blade length', min: .7, max: 1.6, step: .05, value: 1.1 },
    trailLife: { zh: '拖影長度（秒）', en: 'trail length (s)', min: .1, max: .5, step: .02, value: .26 },
    sparks: { zh: '命中火花數量', en: 'contact sparks', min: 0, max: 16, step: 1, value: 6 },
  },
  // three swings as flat arcs: the blade direction turns about axis n through the middle direction m (yaw, pitch)
  // by -h..+h radians (scaled by the arc knob); contact (the hit) is at 82 % of the way. tw = torso twist at start/end
  swings: [
    { n: [0, 0, -1], m: [-.15, .08], h: 2.05, tw: [1.9, -2.2] },               // horizontal slash
    { n: [-.378, -.866, -.328], m: [-.73, .74], h: 1.62, tw: [-.6, 1.9] },      // rising backhand, low right -> high left
    { n: [-.0998, .995, 0], m: [.1, .225], h: 1.275, tw: [.15, .05] },          // overhead chop
  ],
  times: [[.25, .53, .85], [1.05, 1.33, 1.62], [1.85, 2.13, 2.5]],   // cocked, contact (hit beat), end of follow-through
  dir(yaw, pitch) { return [Math.cos(pitch) * Math.cos(yaw), Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch)]; },
  rot(j, th) {                                                        // swing j's blade direction at angle th
    const S = this.swings[j], n = S.n, m = this.dir(S.m[0], S.m[1]), c = Math.cos(th), s = Math.sin(th);
    const x = [n[1] * m[2] - n[2] * m[1], n[2] * m[0] - n[0] * m[2], n[0] * m[1] - n[1] * m[0]], k = (n[0] * m[0] + n[1] * m[1] + n[2] * m[2]) * (1 - c);
    return [m[0] * c + x[0] * s + n[0] * k, m[1] * c + x[1] * s + n[1] * k, m[2] * c + x[2] * s + n[2] * k];
  },
  // keyframes [time, direction, torso twist, ease of the segment ending here, recorded into the trail, swing, angle]
  keys(arc) {
    if (this._k && this._ka === arc) return this._k;
    const G = this.dir(.5, .35), K = [[0, G, .5, 's', 0]];
    let last;
    this.swings.forEach((S, j) => {
      const h = S.h * arc, tm = (S.tw[0] + S.tw[1]) / 2, tS = tm + (S.tw[0] - tm) * arc, tE = tm + (S.tw[1] - tm) * arc;
      const [tc, th, te] = this.times[j], aC = -h + 1.64 * h;
      K.push([tc, this.rot(j, -h), tS, 'o', 0, j, -h], [th, this.rot(j, aC), tS + (tE - tS) * .82, 'b', 1, j, aC], [te, this.rot(j, h), tE, 'f', 1, j, h]);
      last = K[K.length - 1];
    });
    K.push([2.65, last[1], last[2], 's', 0], [3.1, G, .5, 's', 0], [3.2, G, .5, 's', 0]);
    this._ka = arc;
    return (this._k = K);
  },
  pose(t, arc, len) {
    const K = this.keys(arc);
    let k = 0;
    while (k < K.length - 2 && t >= K[k + 1][0]) k++;
    const a = K[k], b = K[k + 1], u = Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0])));
    // o: ease-out into a pose, b: ease-in-back (draw back, then snap into the contact), f: ease-out follow-through
    const e = b[3] === 'o' || b[3] === 'f' ? 1 - (1 - u) ** 3 : b[3] === 'b' ? u * u * (2.4 * u - 1.4) : u * u * (3 - 2 * u);
    let d;
    if (b[3] === 'b' || b[3] === 'f') d = this.rot(b[5], a[6] + (b[6] - a[6]) * e);
    else {
      d = [a[1][0] + (b[1][0] - a[1][0]) * e, a[1][1] + (b[1][1] - a[1][1]) * e, a[1][2] + (b[1][2] - a[1][2]) * e];
      const l = Math.hypot(d[0], d[1], d[2]) || 1;
      d = [d[0] / l, d[1] / l, d[2] / l];
    }
    const yaw = a[2] + (b[2] - a[2]) * e, sh = [Math.cos(yaw * .5) * .06, Math.sin(yaw * .5) * .06 - .05, .8], L = .3 + len;
    return { yaw, d, swing: b[4] && e > 0 ? 1 : 0, base: [sh[0] + d[0] * .3, sh[1] + d[1] * .3, sh[2] + d[2] * .3], tip: [sh[0] + d[0] * L, sh[1] + d[1] * L, sh[2] + d[2] * L], sh };
  },
  draw(p, t) {
    const B = this.palette.smear, CL = this.palette.cloth, ST = this.palette.steel;
    const arc = p.param('arc'), len = p.param('bladeLength'), LIFE = p.param('trailLife');
    const now = this.pose(t, arc, len);
    this.hero(p, now, CL, ST);
    // contact: time since the latest hit, flash biggest on the first frames
    let ah = -1, sw = -1;
    this.times.forEach((T, j) => { if (t >= T[1]) { ah = t - T[1]; sw = j; } });
    const fl = ah >= 0 && ah < .15 ? Math.pow(1 - ah / .15, 2) : 0;
    // contact sparks: out of the tip along the swing, fast then slow (drag), falling
    const nS = Math.round(p.param('sparks') * p.density);
    if (ah >= 0 && ah < .6 && nS > 0) {
      const th = this.times[sw][1], P0 = this.pose(th, arc, len).tip, Pm = this.pose(th - .012, arc, len).tip;
      let T = [P0[0] - Pm[0], P0[1] - Pm[1], P0[2] - Pm[2]];
      const tl = Math.hypot(T[0], T[1], T[2]) || 1;
      T = T.map(v => v / tl);
      for (let k = 0; k < nS; k++) {
        const key = sw * 40 + k, age = ah - p.r(key, 1) * .03, life = .25 + p.r(key, 2) * .3;
        if (age <= 0 || age >= life) continue;
        let D = [T[0] + (p.r(key, 3) - .5) * 1.1, T[1] + (p.r(key, 4) - .5) * 1.1, T[2] + (p.r(key, 5) - .3) * .9];
        const dl = Math.hypot(D[0], D[1], D[2]) || 1, v0 = 3 + p.r(key, 6) * 2.5;
        D = D.map(v => v / dl);
        const at = q => { const s = p.drag(v0, 8, q); return [P0[0] + D[0] * s, P0[1] + D[1] * s, P0[2] + D[2] * s - 3 * q * q]; };
        const A = at(age), Bq = at(Math.max(0, age - .03)), u = age / life;
        if (A[2] > .02) p.line(A, Bq, .045, B, 1 - u * .7, { w1: .02, i1: .3 });
      }
    }
    // trail from the pose history: u = 0 newest .. 1 oldest, v = 0 base .. 1 tip
    const M = Math.max(12, Math.round(28 * LIFE / .26)), base = [], tip = [], on = [];
    for (let k = 0; k <= M; k++) {
      const q = this.pose(((t - k / M * LIFE) % this.loop + this.loop) % this.loop, arc, len);
      base.push(q.base); tip.push(q.tip); on.push(q.swing);
    }
    if (on.every(x => !x)) return;
    p.ribbon(base, tip, (u, v) => {
      const fade = Math.pow(1 - u, 1.35) * on[Math.round(u * M)], head = 1 - p.smooth(0, .28, u);
      if (!fade) return 0;
      if (v > .93) return fade * .9 + .1 + .3 * fl;                                 // tip edge
      let lines = 0;
      for (let i = 0; i < 4; i++) lines += p.hard(v, .12 + i * .105, .016);
      const body = p.lerp(.55 * v * v, .2 + .4 * v * v + .3 * fl, head);
      const halo = Math.exp(-Math.pow((1 - v) * 6, 2)) * .7;
      const val = Math.max(body + lines * .14, halo) * p.smooth(0, .08, v) * fade;
      return val < .09 ? 0 : val;                                                   // hard cut: 2D has no dither
    }, B, 1);
    // light under the freshest part of the smear, tip star on contact
    const sp = Math.hypot(tip[0][0] - tip[3][0], tip[0][1] - tip[3][1], tip[0][2] - tip[3][2]);
    if ((sp > .05 || fl > 0) && on[0]) {
      p.light(tip[0][0] * .7, tip[0][1] * .7, tip[0][2], .8 + .4 * fl, B, Math.min(.4, sp) + .4 * fl);
      p.sparkle(tip[0][0], tip[0][1], tip[0][2], 2 + 4 * fl, B, Math.min(1, sp * 2 + fl));
    }
  },
  hero(p, q, CL, ST) {
    const f = q.yaw * .5, c = Math.cos(f), s = Math.sin(f), px = -s, py = c;
    p.capsule([px * .1, py * .1, .02], [px * .05, py * .05, .42], .055, .065, CL);
    p.capsule([-px * .1 + c * .08, -py * .1 + s * .08, .02], [-px * .05, -py * .05, .42], .055, .065, CL);
    p.capsule([0, 0, .42], [0, 0, .76], .13, .11, CL);
    p.ball(0, 0, .93, .1, ST, { lit: .1 });
    const hand = q.base;
    p.capsule([q.sh[0], q.sh[1], .74], hand, .045, .04, CL, { shadow: false });
    const d = q.d, gx = -d[1] * .07, gy = d[0] * .07;
    p.capsule([hand[0] - gx, hand[1] - gy, hand[2]], [hand[0] + gx, hand[1] + gy, hand[2]], .03, .03, ST, { shadow: false });
    p.capsule([hand[0] + d[0] * .03, hand[1] + d[1] * .03, hand[2] + d[2] * .03], q.tip, .036, .022, ST, { shadow: false, lit: .35 });
  },
});
