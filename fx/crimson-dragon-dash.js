// 赤龍突 / Crimson Dragon Dash — Ultimates pack (original design): red steam gathers into a dragon silhouette that charges with a dash kick, compresses to a point and explodes
PXFX.define({
  id: 'crimson-dragon-dash',
  loop: 4.2,
  beats: [{ t: 1.75, kind: 'cast', power: .9 }, { t: 1.92, kind: 'hit', power: 1.2 }, { t: 2, kind: 'burst', power: 1.3 }],
  view: { r: 3.3, h: 3.5 },
  stage: { ground: 'ash', tiles: true },
  modules: ['figure', 'charge', 'creature', 'impact', 'shockwave', 'grade', 'aftermath'],
  palette: {
    steam: ['#4a1018', '#741a26', '#9c2a34', '#c4444a', '#e27272'],
    glow: ['#b0202a', '#ff3a2a', '#ff7a5a', '#ffc0a0', '#fff0e6'],
    dragon: ['#240910', '#360e17', '#4c141f', '#661c28'],
    ghost: ['#4a0e18', '#6a1622', '#8a202c', '#aa3038'],
  },
  timeline: [
    { k: 'pose', t: [0, .3], zh: '起手：施法者在 x=−2.1 由站姿壓低成蓄力蹲姿', en: 'pose: at x = −2.1 the caster drops from idle into a low crouch' },
    { k: 'charge', t: [.3, 1.5], zh: '集氣：全身不斷噴出紅色蒸氣團（粗糙抖色實心球，半徑 0.14–0.3），上升並沿龍身曲線聚攏；身後上方的龍形剪影由小長大（深紅實心身體＋亮紅輪廓、頭有角、張口），龍身緩慢起伏', en: 'charge: red steam puffs pour off the body (rough dithered solid balls, radius 0.14–0.3), rising and gathering along the dragon curve; behind and above the caster a dragon silhouette grows in (dark-red solid body, bright red rim, horned open-jawed head), its body undulating slowly' },
    { k: 'shape', t: [1.5, 1.75], zh: '成形：龍形完全成形並張口，施法者先向後再壓低 0.13 秒反向蓄勢（easeInBack）', en: 'shape: the dragon is fully formed with its jaw open; the caster sinks back for a 0.13 s counter-crouch (easeInBack)' },
    { k: 'motion', t: [1.75, 1.92], zh: '推進：突然衝刺，0.17 秒內平移約 3.6 單位到目標前；與路徑平行的 18 條隧道速度線、身後 4 個紅色殘影、身前小範圍空間扭曲；龍形拉直跟著施法者衝向目標；接觸前 0.06 秒衝刺姿勢急切換成飛踢', en: 'motion: a sudden dash covering ~3.6 units in 0.17 s; 18 tunnel speed lines parallel to the path, 4 red afterimages, a small lens warp in front; the dragon straightens and charges along with the caster; 0.06 s before contact the dash pose snaps into a flying kick' },
    { k: 'impact', t: [1.92, 2.45], zh: '命中：0.08 秒內整條龍與環境光一起收縮到腳尖一個極小極亮的白點（場景壓暗 45%），然後爆開：白紅閃光、地面衝擊環擴到半徑 2.2、豎立光環、18 團紅色蒸氣向外急噴再減速、火星四濺', en: 'impact: within 0.08 s the whole dragon and the light contract into one tiny white-hot point at the foot (scene darkened 45%), then it explodes: a white-red flash, a ground shock ring to radius 2.2, an upright ring, 18 red steam puffs bursting out and slowing, sparks' },
    { k: 'after', t: [2.45, 4.2], zh: '餘波：蒸氣慢慢上升變淡，命中點留下發紅裂紋；飛踢姿勢停留後施法者後躍回原位並回到待機', en: 'aftermath: the steam rises slowly and thins, red-glowing cracks at the hit point; the kick holds, then the caster leaps back to the start and returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→蓄力蹲→衝刺→（0.06 秒）飛踢→後躍→待機，位置用先慢後極快的緩動曲線', en: 'caster: faceless mannequin, idle → crouch → dash → (0.06 s) flying kick → back-leap → idle, moved along a slow-then-very-fast eased path' },
    { zh: '紅蒸氣：約 26 團粗糙實心球（抖色透明度淡出），由身體冒出，上升時移向龍身上的目標點，半徑隨時間變大', en: 'red steam: ~26 rough solid balls (dithered alpha fade) emitted from the body, drifting up towards target points on the dragon body, growing as they rise' },
    { zh: '龍形：沿 S 形曲線取樣 26 節深紅平塗實心球，每節後面放 1.45 倍的亮紅光暈形成輪廓，頭部用三角形拼出上顎、下顎、雙角與發光眼', en: 'dragon: 26 flat dark-red solid balls sampled along an S-curve, each with a 1.45× bright red glow behind it forming the rim; the head is built from triangles (upper and lower jaw, two horns) with glowing eyes' },
    { zh: '衝刺：龍身曲線改為施法者身後拉直的波浪線，頭部在腳尖前；隧道速度線 18 條平行於 x 軸，每格重排；殘影為同一人偶紅色抖色重畫 4 次，間隔 0.025 秒', en: 'dash: the dragon curve becomes a straightened wave trailing the caster with the head ahead of the foot; 18 tunnel speed lines parallel to x, reshuffled every frame; afterimages are the mannequin redrawn 4 times in dithered red at 0.025 s steps' },
    { zh: '收縮與爆發：龍的所有取樣點向接觸點插值並縮小，接觸點只剩一個 1–2 像素的白點＋十字星芒；爆發時大光暈、地面衝擊環、豎立光環與 18 團向外的蒸氣球', en: 'compress and burst: every dragon sample lerps into the contact point and shrinks until only a 1–2 px white point with a cross flare remains; the burst is a big glow, a ground shock ring, an upright ring and 18 outward steam balls' },
    { zh: '地面：命中點 5 向放射裂紋貼花（發紅後冷卻），蒸氣與龍光照亮地面', en: 'ground: a 5-way radial crack decal at the hit (red-hot, then cooling); the steam and the dragon light the ground' },
  ],
  params: {
    steam: { zh: '蒸氣量', en: 'steam amount', min: .3, max: 2, step: .1, value: 1 },
    dragonSize: { zh: '龍形大小', en: 'dragon size', min: .6, max: 1.3, step: .05, value: 1 },
    speedLines: { zh: '速度線數量', en: 'speed lines', min: 0, max: 36, step: 1, value: 18 },
    afterimages: { zh: '殘影數量', en: 'afterimages', min: 0, max: 6, step: 1, value: 4 },
  },
  // caster position: crouch, dash (slow start, very fast), hold the kick, leap back
  pos(p, t, X0, X1) {
    const CAST = 1.75, HIT = 1.92;
    if (t < CAST) return [X0 - .08 * p.easeOutCubic(p.ph(t, 1.62, CAST)), 0];
    if (t < HIT) return [p.lerp(X0 - .08, X1, p.easeInCubic(p.ph(t, CAST, HIT)) * .85 + .15 * p.ph(t, CAST, HIT)), 0];
    if (t < 2.6) return [X1 - p.drag(.9, 5, t - HIT), 0];
    const u = p.ph(t, 2.6, 3.25), xh = X1 - p.drag(.9, 5, 2.6 - HIT);
    return [p.lerp(xh, X0, p.ease(u)), Math.sin(Math.PI * u) * .6];
  },
  pose(p, t) {
    const CAST = 1.75, HIT = 1.92;
    if (t < .3) return { a: 'idle', b: 'charge', k: p.easeOutCubic(t / .3) };
    if (t < 1.62) return 'charge';
    if (t < CAST) return { a: 'charge', b: 'dash', k: p.easeInBack(p.ph(t, 1.62, CAST), 1.5) };
    if (t < HIT - .06) return 'dash';
    if (t < HIT) return { a: 'dash', b: 'kick', k: p.easeOutCubic((t - HIT + .06) / .06) };
    if (t < 2.6) return 'kick';
    if (t < 3.25) return { a: 'kick', b: 'float', k: p.easeOutCubic(p.ph(t, 2.6, 2.85)) };
    if (t < 3.4) return { a: 'float', b: 'ready', k: p.easeOutCubic(p.ph(t, 3.25, 3.4)) };
    return { a: 'ready', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.4, 3.95)) };
  },
  // dragon curve, s = 0 head ... 1 tail. Coiled up behind the caster and arching over them while charging (Catmull-Rom
  // through fixed control points, local to the caster), straightened into a wave trailing the caster in the dash
  CP: [[.95, -.2, 2.45], [.55, -.3, 2.8], [0, -.4, 2.9], [-.45, -.45, 2.6], [-.6, -.5, 2.1], [-.3, -.5, 1.65], [.15, -.5, 1.25], [.1, -.5, .85], [-.35, -.45, .55], [-.85, -.35, .35], [-1.3, -.2, .25]],
  dragon(p, t, s, x, size, dash) {
    const P = this.CP, n = P.length - 1, f = Math.min(n - 1e-6, Math.max(0, s * n)), i = Math.floor(f), u = f - i;
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(n, i + 2)];
    const cr = j => .5 * (2 * p1[j] + (p2[j] - p0[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u * u + (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * u * u * u);
    const w = .07 * Math.sin(t * 3 - s * 9) * s;
    // the coil lies in a plane facing the isometric camera (axis e = (x - y)/√2), depth along (x + y)/√2
    const A = cr(0) * 1.2, Bd = cr(1) + w, k = size * .7071;
    const cx = x + (A + Bd) * k, cy = (Bd - A) * k, cz = .9 + (cr(2) * 1.15 - .9 + w) * size;
    if (dash <= 0) return [cx, cy, cz];
    const dx = x + 1 - s * 3.8 * size, dy = -.2 + .35 * Math.sin(s * 9 - t * 18) * s * size, dz = 1.15 + (Math.min(1, s * 5) * .55 + s * .5 + .25 * Math.sin(s * 7 - t * 14) * s) * size;
    return [p.lerp(cx, dx, dash), p.lerp(cy, dy, dash), p.lerp(cz, dz, dash)];
  },
  draw(p, t) {
    const SM = this.palette.steam, GL = this.palette.glow, DR = this.palette.dragon, GH = this.palette.ghost;
    const HX = 2.35, X0 = -2.1, CAST = 1.75, HIT = 1.92, BURST = 2, C = [HX - .32, -.1, .75], X1 = C[0] - .55;
    const steam = p.param('steam'), size = p.param('dragonSize'), fr = Math.floor(t * 30), a = t - HIT, b = t - BURST;
    // ---- target recoils on the burst ----
    p.dummy(HX + (b > 0 ? .2 * Math.exp(-5 * b) * Math.cos(b * 20) * Math.min(1, b * 40) : 0), 0);
    // ---- afterimages (stretched behind the dash) ----
    const nG = Math.round(p.param('afterimages'));
    if (t > CAST && t < HIT + .01) for (let k = nG; k >= 1; k--) {
      const tk = t - k * .025;
      if (tk < CAST - .02) continue;
      const pk = this.pos(p, tk, X0, X1), f = t > HIT - .03 ? 1 - p.ph(t, HIT - .03, HIT + .01) : 1;
      p.figure(pk[0], 0, { pose: this.pose(p, tk), color: GH, alpha: (.75 - k / (nG + 1) * .6) * f });
    }
    const ps = this.pos(p, t, X0, X1);
    const fig = p.figure(ps[0], 0, { pose: this.pose(p, t), lift: ps[1] });
    // ---- ground cracks (scene marks) ----
    if (b > 0) p.aftermath(C[0], 0, 1.4, 'crack', { amt: 1 - p.ph(t, 3.3, 3.95), ramp: GL, glow: Math.pow(1 - p.ph(b, 0, 1.4), 1.5), seed: 9, n: 5 });
    // ---- the dragon: grows out of the steam, charges, compresses into the contact point ----
    const form = p.easeOutCubic(p.ph(t, .55, 1.5)), dash = p.easeOutCubic(p.ph(t, CAST - .05, CAST + .1));
    const comp = p.easeInCubic(p.ph(t, HIT - .035, HIT + .015));   // fully contracted by the hit-stop frame (HIT + 0.02)
    const dX = t < CAST ? X0 : ps[0];
    if (form > .02 && t < BURST) {
      const sc = (.35 + .65 * form) * size * (1 - comp), anchor = [dX, -.4, .6];
      const path = s => {
        const q = this.dragon(p, t, s, dX, size, dash);
        const r = [anchor[0] + (q[0] - anchor[0]) * (.35 + .65 * form), q[1] * (.35 + .65 * form), anchor[2] + (q[2] - anchor[2]) * (.35 + .65 * form)];
        return comp > 0 ? p.v3.lerp(r, C, comp) : r;
      };
      p.serpent(path, { n: 34, w: .3 * sc, ramp: GL, dark: DR, t, jaw: .55 + .25 * Math.sin(t * 4), I: (.6 + .4 * form) * (1 - comp * .5), headScale: 2 });
      if (comp <= 0) p.light(dX - .6 * size, 0, 0, 2.4 * size, GL, .55 * form);
    }
    // ---- red steam pouring off the body and gathering into the dragon ----
    const nS = Math.round(26 * steam * p.density);
    if (t > .25 && t < CAST + .4) for (let k = 0; k < nS; k++) {
      const life = .9 + .3 * p.r(k, 1), ph = (t - .25) / life + p.r(k, 2);
      const cyc = Math.floor(ph), u = ph - cyc;
      const born = .25 + (cyc - p.r(k, 2)) * life;
      if (born < .25 || born > 1.65) continue;
      const src = p.v3.lerp(fig.hip, fig.head, p.r(k + cyc, 3));
      const s0 = [src[0] + (p.r(k + cyc, 4) - .5) * .3, src[1] + (p.r(k + cyc, 5) - .5) * .3, src[2]];
      const tgt = this.dragon(p, t, p.r(k + cyc * 7, 6), X0, size * (.35 + .65 * form), 0);
      const e = p.easeOut(u), q = [p.lerp(s0[0], tgt[0], e) - (t > CAST ? (t - CAST) * 3 : 0), p.lerp(s0[1], tgt[1], e), p.lerp(s0[2], tgt[2], e) + Math.sin(u * Math.PI) * .3];
      const al = (1 - Math.pow(u, 2.2)) * (t > CAST ? 1 - p.ph(t, CAST, CAST + .25) : 1) * .9;
      p.ball(q[0], q[1], q[2], (.14 + .26 * u) * (.8 + .4 * p.r(k, 7)), SM, { alpha: al, rough: .55, shadow: false, seed: k });
    }
    // ---- charge glow on the body ----
    if (t > .3 && t < CAST) {
      const ch = p.ph(t, .3, 1.5);
      p.charge(fig.chest[0], fig.chest[1], fig.chest[2], ch, { n: 12, R: 1.2, ramp: GL, seed: 4, up: .4 });
      p.light(fig.hip[0], 0, 0, 1.4, GL, .6 * ch);
    }
    // ---- dash: tunnel speed lines, lens warp in front ----
    if (t > CAST - .02 && t < HIT) {
      const nL = Math.round(p.param('speedLines') * Math.min(1.5, p.density)), xb = ps[0];
      for (let k = 0; k < nL; k++) {
        const ang = p.r(k + fr * 5, 11) * p.TAU, rr = .35 + p.r(k + fr * 3, 12) * .9, L = .8 + p.r(k + fr, 13) * 2;
        const x1 = xb + .4 - p.r(k + fr * 7, 14) * 1.2, ly = Math.cos(ang) * rr, lz = Math.max(.08, .9 + Math.sin(ang) * rr);
        p.line([x1, ly, lz], [x1 - L, ly, lz], .04, GL, .85, { w1: .01, i1: .1 });
      }
    }
    if (t > CAST && t < HIT - .01) {
      const xf = ps[0] + .95;
      p.warp(xf, 0, .9, .5, (dx, dy, rho) => [-dx * .35 * (1 - rho), -dy * .35 * (1 - rho)]);
    }
    // ---- compression: the scene dims and everything shrinks into one point ----
    // (the point sits on the far side of the target for most cameras: draw it pulled towards the viewer)
    const cf = p.cam().fwd, CF = [C[0] + cf[0] * .6, C[1] + cf[1] * .6, C[2] + cf[2] * .6];
    if (t > HIT - .035 && b < 0) {
      if (a >= 0) p.grade({ dark: .45, desat: .3 });
      p.orb(CF[0], CF[1], CF[2], .04 + .12 * (1 - comp), GL, 2);
      p.sparkle(CF[0], CF[1], CF[2], 2 + 4 * comp, GL, 1.5);
    }
    // ---- burst ----
    if (b >= 0 && b < 1.6) {
      const fl = Math.pow(1 - p.ph(b, 0, .16), 2);
      if (fl > 0) {
        p.glow(CF[0], CF[1], CF[2] + .1, .25 + .55 * fl, GL, 1.6 * fl, { pow: 1.3 });
        const c = p.cam();
        for (let r = 0; r < 8; r++) {
          const ang = r / 8 * p.TAU + .2, len = (.8 + p.r(r, 41) * 1) * (.35 + fl), d = [c.right[0] * Math.cos(ang) + c.up[0] * Math.sin(ang), c.right[1] * Math.cos(ang) + c.up[1] * Math.sin(ang), c.right[2] * Math.cos(ang) + c.up[2] * Math.sin(ang)];
          p.line(CF, [CF[0] + d[0] * len, CF[1] + d[1] * len, CF[2] + d[2] * len], .1, GL, 1.2 * fl, { w1: .01, i1: .3 });
        }
      }
      p.shock(C[0], 0, 0, p.ph(b, 0, .55), { R: 2.2, w: .26, ramp: GL, ground: true });
      p.shock(C[0], 0, C[2], p.ph(b, .02, .4), { R: 1.4, w: .18, ramp: GL, axis: [1, 0, 0], light: false });
      const nB = Math.round(18 * steam * p.density);
      for (let k = 0; k < nB; k++) {
        const d = p.rdir(k, 21, .45), life = 1 + .5 * p.r(k, 22), u = b / life;
        if (u >= 1) continue;
        const dist = p.drag(8 + 4 * p.r(k, 23), 5, b);
        const q = [C[0] + d[0] * dist * .8, C[1] + d[1] * dist, Math.max(.15, C[2] + d[2] * dist * .6 + b * .5)];
        p.ball(q[0], q[1], q[2], .16 + .3 * p.easeOutCubic(u), SM, { alpha: .8 * (1 - u), rough: .6, shadow: false, seed: k + 30, lit: .12 * (1 - u) });
      }
      const nP = Math.round(16 * p.density);
      for (let k = 0; k < nP; k++) {
        const life = .3 + p.r(k, 31) * .35, u = b / life;
        if (u >= 1) continue;
        const d = p.rdir(k, 32, .3), d1 = p.drag(6, 6, b), d0 = p.drag(6, 6, Math.max(0, b - .04));
        p.line([C[0] + d[0] * d1, C[1] + d[1] * d1, C[2] + d[2] * d1 - b * b * 2], [C[0] + d[0] * d0, C[1] + d[1] * d0, C[2] + d[2] * d0], .05, GL, 1 - u * .6);
      }
      p.light(C[0], 0, 0, 2.6, GL, Math.max(fl, .5 * (1 - p.ph(b, 0, 1))));
    }
  },
});
