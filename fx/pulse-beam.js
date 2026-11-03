// 環脈射線 / Ringpulse Ray — pixel version of 00GameDevs "pulse-beam" (MIT)
PXFX.define({
  id: 'pulse-beam',
  loop: 3.6,
  beats: [
    { t: .02, kind: 'cast', power: .45 }, { t: .6, kind: 'hit', power: .8 },
    { t: 1.2, kind: 'pulse', power: .55 }, { t: 1.8, kind: 'pulse', power: .55 }, { t: 2.4, kind: 'pulse', power: .55 }, { t: 3.0, kind: 'pulse', power: .5 },
  ],
  view: { r: 3.1, h: 2.4 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    pulse: ['#2f8a96', '#3fb4b4', '#71e7dc', '#a6f4ea', '#dcfffa', '#ffffff'],
    crystal: ['#1f4a5a', '#2a6a78', '#3c9a9e', '#71e7dc', '#c8fff6'],
    stone: ['#4a4552', '#625c69', '#7b7480', '#958d96', '#aea6ab'],
  },
  timeline: [
    { t: [0, .3], zh: '起始：水晶前方三圈同心小光環彈出（超出再回彈），細光線由水晶尖起步急衝後加速伸向木人', en: 'start: three small concentric rings pop out in front of the crystal (with overshoot), a thin ray kicks off from the tip and accelerates to the dummy' },
    { t: [.1, 2.6], zh: '持續：每 0.3 秒射出一顆光球（大小交替，大球在 0.1、0.7、1.3… 秒射出），每顆一出膛先急衝再減速、之後加速撞向木人（0.5 秒到達），速度快時拉成短光痕；每 0.45 秒彈出一對豎立光環，同樣先衝後加速沿光束前進；每次射出水晶前光環一閃，虛線光流跟著向前一推', en: 'sustain: a ball every 0.3 s (alternating big and small, big ones at 0.1, 0.7, 1.3 s...), each kicks out of the muzzle, eases, then accelerates into the dummy (arrives in 0.5 s), smearing into a short streak when fast; a pair of upright rings pops out every 0.45 s and rides the beam the same way; each shot flashes the source rings and shoves the dashed flow forward' },
    { t: [.6, 3.0], zh: '命中：每顆光球到達時命中光環瞬間脹大再以三次方衰減回落；大球（0.6、1.2、1.8、2.4、3.0 秒）另外彈出一圈 ease-out-expo 擴張、越擴越細的震波環', en: 'impact: each arriving ball pops the impact ring at once, then it settles with cubic decay; big balls (0.6, 1.2, 1.8, 2.4, 3.0 s) also fire a shock ring that expands with ease-out-expo and thins as it grows' },
    { t: [2.6, 3.2], zh: '停止：不再發射，光束尾端由水晶以 ease-in 收向木人，起點光環急縮熄滅，剩下的光球與光環跑完後消失', en: 'stop: emission ends, the ray tail retracts towards the dummy with ease-in, the source rings collapse, remaining balls and rings run out and vanish' },
    { t: [3.2, 3.6], zh: '命中光環與上升光點淡出', en: 'the impact ring and rising motes fade out' },
  ],
  layers: [
    { zh: '光源：石台座上浮著一顆青綠水晶，前方三圈半徑 0.08 / 0.14 / 0.2 的同心光環輪流閃，每次射出時一起閃亮', en: 'source: a teal crystal floating above a stone plinth, three concentric rings of radius 0.08 / 0.14 / 0.2 blinking in turn, all flaring at each shot' },
    { zh: '光束：寬 0.03 的細芯＋每 0.3 單位一段、長 0.12 的亮虛線，基本每秒 3 單位向前流動，每次射出時向前一推', en: 'ray: a 0.03-wide core plus bright 0.12-long dashes every 0.3 units, flowing forward at a base 3 units/s and shoved ahead at each shot' },
    { zh: '光球：大球半徑 0.12 白熱球＋0.3 青色光暈，小球 0.08＋0.2；高速時身後拉出一條光痕', en: 'balls: big ones a white-hot orb of radius 0.12 in a 0.3 teal halo, small ones 0.08 in 0.2; a streak trails behind them at speed' },
    { zh: '光環：面向飛行方向、半徑 0.22 的白青色細環，兩個一組（間距 0.12），出膛時由 0 彈出', en: 'rings: thin white-teal rings of radius 0.22 facing the flight, in pairs 0.12 apart, popping out from zero at the muzzle' },
    { zh: '命中：木人身前半徑 0.25 的光環（光球到達時脹大再回落）＋大球震波環＋10 粒先快後慢上升的光點', en: 'impact: a 0.25 radius ring in front of the dummy (swells at each arrival, then settles), shock rings from big balls, 10 motes that rise fast then slow' },
  ],
  params: {
    beamWidth: { zh: '光束粗細', en: 'ray width', min: .5, max: 2.5, step: .05, value: 1 },
    ballSize: { zh: '光球大小', en: 'ball size', min: .5, max: 1.8, step: .05, value: 1 },
    ringSize: { zh: '光環大小', en: 'ring size', min: .5, max: 2, step: .05, value: 1 },
    motes: { zh: '上升光點數量', en: 'rising motes', min: 0, max: 30, step: 1, value: 10 },
  },
  draw(p, t) {
    const C = this.palette.pulse, CR = this.palette.crystal, ST = this.palette.stone;
    const OX = -2.2, TX = 2.1, hz = 1.0, ON = .3, OFF = 2.6, END = 3.2, L = TX - OX, TT = .5, TR = .9;
    const bw = p.param('beamWidth'), bs = p.param('ballSize'), rs = p.param('ringSize');
    p.dummy(2.45, 0);
    p.box(-2.75, -.2, 0, -2.35, .2, .74, ST);
    p.shard(-2.52, 0, hz + Math.sin(t * 2.4) * .03, .64, .3, [1, 0, 0], CR, { back: .5, spin: t * 1.5 });

    // muzzle kick, a short ease, then acceleration into the target
    const travel = u => .15 * p.easeOutCubic(u / .2) + .85 * Math.pow(p.clamp(u, 0, 1), 2.2);
    const f = p.ph(t, .02, ON), head = p.lerp(OX, TX, .25 * p.easeOutCubic(f / .25) + .75 * f * f);
    const tail = p.lerp(OX, TX, p.easeInCubic(p.ph(t, OFF, END)));
    const inBeam = x => x >= tail - 1e-6 && x <= head + 1e-6;
    const balls = [];
    for (let n = 0; .1 + n * .3 <= OFF; n++) balls.push({ ts: .1 + n * .3, big: n % 2 === 0 });

    // each shot shoves the dashed flow forward
    let flow = 3 * t, srcPop = 0;
    for (const b of balls) if (t > b.ts) { flow += .6 * (1 - Math.exp(-8 * (t - b.ts))); srcPop = Math.max(srcPop, (b.big ? 1 : .6) * Math.pow(1 - p.ph(t, b.ts, b.ts + .2), 3)); }
    if (t < END && head - tail > .02) {
      p.line([tail, 0, hz], [head, 0, hz], .03 * bw, C, .7);
      p.line([tail, 0, hz], [head, 0, hz], .12 * bw, C, .3 + .2 * srcPop, { pow: 2 });
      for (let d = 0; d < 15; d++) {
        const x = OX + ((d * .3 + flow) % L);
        if (!inBeam(x) || !inBeam(x - .12)) continue;
        p.line([x - .12, 0, hz], [x, 0, hz], .045 * bw, C, 1.05);
      }
      for (let k = 0; k < 6; k++) p.light(p.lerp(tail, head, (k + .5) / 6), 0, hz, .9, C, .3);
    }
    // travelling ring pairs: pop out at the muzzle, ride the beam with kick + acceleration
    for (let n = 0; .15 + n * .45 <= OFF; n++) {
      const ts = .15 + n * .45;
      if (t < ts) continue;
      const u = (t - ts) / TR, pop = p.easeOutBack(p.ph(t, ts, ts + .12), 2.5);
      if (u >= 1) continue;
      for (let j = 0; j < 2; j++) {
        const x = OX + .05 + (L - .05) * travel(u) - j * .12;
        if (x > TX - .05 || x < OX || !inBeam(x)) continue;
        p.ring(x, 0, hz, .22 * rs * pop, .04, C, 1.15, { axis: [1, 0, 0] });
      }
    }
    // balls: kick out, ease, accelerate; remember the last arrival for the impact
    let last = null;
    for (const b of balls) {
      if (t < b.ts) continue;
      const u = (t - b.ts) / TT;
      if (u >= 1) { last = b; continue; }
      const x = OX + L * travel(u);
      if (!inBeam(x)) continue;
      const v = L * (travel(u) - travel(u - .04)) / (.04 * TT), sm = Math.min(.9, v / 18) * bs;
      const r0 = (b.big ? .12 : .08) * bs, h0 = (b.big ? .3 : .2) * bs;
      if (sm > .05) p.line([Math.max(tail, x - sm), 0, hz], [x, 0, hz], r0 * 1.6, C, .9, { w1: r0 * .4 + .02, i1: .1 });
      p.glow(x, 0, hz, h0, C, b.big ? .85 : .7);
      p.orb(x, 0, hz, r0, C, 1);
    }
    // source rings: pop in, flare at each shot, collapse at the stop
    const src = p.easeOutBack(p.ph(t, 0, .15), 2.6) * (1 - p.easeInCubic(p.ph(t, OFF - .05, OFF + .2)));
    if (src > .02) {
      for (let r = 0; r < 3; r++) {
        const blink = (Math.floor(t * 8) + r) % 3 === 0 ? 1 : .6;
        p.ring(OX + .05, 0, hz, (.08 + r * .06) * src * (1 + .35 * srcPop), .025, C, Math.min(1, src) * Math.max(blink, srcPop * 1.2), { axis: [1, 0, 0] });
      }
      if (srcPop > 0) p.glow(OX + .05, 0, hz, .12 + .12 * srcPop, C, srcPop);
    }
    // impact: each arrival pops the ring (sharp attack, cubic decay); big ones also fire a shock ring
    const hit = p.env(t, .45, .55, END - .05, END + .3);
    let pop = 0;
    if (last) { const arr = last.ts + TT; pop = (last.big ? 1 : .55) * Math.pow(1 - p.ph(t, arr, arr + .3), 3); }
    if (hit > 0) {
      p.ring(TX - .05, 0, hz, (.25 + .3 * pop) * rs, .04 + .03 * pop, C, hit * (.75 + .5 * pop), { axis: [1, 0, 0] });
      p.glow(TX - .1, 0, hz, .2 + .25 * pop, C, hit * (.8 + .8 * pop));
      p.light(TX - .3, 0, hz, 1.4, C, (.6 + .3 * pop) * hit);
    }
    for (const b of balls) {
      if (!b.big) continue;
      const u = p.ph(t, b.ts + TT, b.ts + TT + .45);
      if (u <= 0 || u >= 1) continue;
      p.ring(TX - .1, 0, hz, (.3 + p.easeOutExpo(u) * .7) * rs, .07 * Math.pow(1 - u, 1.5) + .02, C, 1.1 * (1 - u), { axis: [1, 0, 0] });
    }
    // rising motes: quick lift, then drift
    const nM = Math.round(p.param('motes') * p.density);
    for (let m = 0; m < nM; m++) {
      const P = .9, ph = p.r(m, 1) * P, age = ((t + ph) % P) / P, born = t - age * P;
      if (born < .5 || born > END - .3) continue;
      const ang = p.r(m + Math.floor((t + ph) / P) * 10, 2) * p.TAU;
      p.dot(TX - .15 - p.r(m, 3) * .2, Math.cos(ang) * .3 * rs, hz + Math.sin(ang) * .2 * rs + p.easeOutCubic(age) * .9, C, 1 - age);
    }
  },
});
