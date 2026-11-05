# Audio for the X promo #3 (scale.html): bgm3 song bars 1-12, then bar 15 as the ending (150 bpm), SFX on the hits,
# a chime on every counter that turns gold, two-pass loudnorm. Run from promo/: python3 -I mix3.py
import subprocess, json
BAR = 1.6
DUR = 13 * BAR
cues = [  # (video time, file, volume, max length or None)
    # hook: 10, 100, 1,000, 10,000 on the four beats
    (0.0, 'slash', 1.0, None), (0.0, 'hit', .7, None), (0.4, 'zap', .9, None), (0.4, 'hit', .6, None),
    (0.8, 'stone', .8, .6), (0.8, 'hit', .6, None), (1.2, 'boom', .9, 1.2), (1.2, 'hit', .9, None),
    # 10: blade ring snaps out on 2.4 s
    (1.6, 'whoosh', .45, None), (2.4, 'slash', 1.0, None), (2.4, 'hit', 1.0, None), (2.52, 'slash', .7, None), (2.64, 'tally', .45, .9),
    # 100: the lens beam lands on 4.4 s and burns along the crescent
    (4.0, 'whoosh', .4, None), (4.4, 'laser', 1.0, None), (4.4, 'hit', .8, None), (4.6, 'rumble', .5, 1.4), (5.84, 'tally', .45, .9),
    # 1,000: the pillar, the stone spreading, the blink on 8.8 s
    (6.4, 'whoosh', .45, None), (6.8, 'laser', .7, None), (7.0, 'stone', .9, None), (8.08, 'tally', .45, .9),
    (8.8, 'boom', .7, 1.4), (8.8, 'hit', .9, None),
    # 10,000: the sun swells through the breakdown, goes off on the drop (12.8 s)
    (9.6, 'whoosh', .4, None), (10.4, 'rumble', .45, None), (11.6, 'rumble', .7, None), (12.4, 'whoosh', .8, None),
    (12.8, 'boom', 1.0, None), (12.8, 'hit', 1.0, None), (13.2, 'rumble', .8, None), (14.24, 'tally', .5, 1.1),
    # same spell, other formation
    (15.2, 'zap', .8, None), (15.2, 'whoosh', .4, None), (16.98, 'hit', .55, None), (17.14, 'tally', .45, .9),
    # end card
    (17.6, 'boom', .7, 1.6), (17.6, 'hit', .6, None), (19.2, 'hit', .5, None),
]
# music: song 0-19.2 s (bars 1-12) then 22.4-24.0 s (bar 15), 10 ms crossfade at the splice
music = ("[0]atrim=0:19.21,asetpts=PTS-STARTPTS[m1];[0]atrim=22.4:24.4,asetpts=PTS-STARTPTS[m2];"
         "[m1][m2]acrossfade=d=0.01:c1=tri:c2=tri,volume=0.6[a0]")
args = ['ffmpeg', '-hide_banner', '-y', '-i', 'audio/bgm3.wav']
chains, labels = [music], ['[a0]']
for k, (t, f, v, ln) in enumerate(cues, start=1):
    args += ['-i', f'audio/{f}.wav']
    cut = f'atrim=0:{ln},afade=t=out:st={ln - .25}:d=0.25,' if ln else ''
    chains.append(f'[{k}]{cut}aformat=channel_layouts=stereo,adelay={int(round(t * 1000))}:all=1,volume={v}[a{k}]')
    labels.append(f'[a{k}]')
graph = ';'.join(chains) + ';[a0]aformat=channel_layouts=stereo[a0s];' + ''.join(['[a0s]'] + labels[1:]) + \
    f'amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{DUR},afade=t=out:st={DUR - .6}:d=0.6,volume=0.5,alimiter=limit=0.5:level=false[mix]'
subprocess.run(args + ['-filter_complex', graph, '-map', '[mix]', '-ar', '48000', '-ac', '2', '-c:a', 'pcm_f32le', 'mix3_raw.wav'], check=True, capture_output=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', 'mix3_raw.wav', '-af', 'loudnorm=I=-14:TP=-1:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
ln = f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-hide_banner', '-y', '-i', 'mix3_raw.wav', '-af', ln, '-ar', '48000', 'mix3.wav'], check=True, capture_output=True)
print('measured', j['input_i'], 'LUFS, peak', j['input_tp'], '-> -14 LUFS (linear)')
