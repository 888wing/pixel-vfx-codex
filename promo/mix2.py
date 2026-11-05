# Audio for the X promo #2 (ult.html): bgm2 cut to bar 2 + bars 3-5 + bars 9-16 (150 bpm), SFX on the cuts, two-pass loudnorm.
import subprocess, json
BAR = 1.6
DUR = 12 * BAR + .4
cues = [  # (video time, file, volume)
    (0.0, 'boom', .9), (0.0, 'hit', .7), (0.4, 'slash', 1.0), (0.4, 'hit', .5), (0.8, 'boom', .7), (1.2, 'laser', .8), (1.2, 'hit', .6), (1.48, 'whoosh', .45),
    (2.4, 'laser', 1.0), (2.55, 'hit', 1.0), (2.55, 'boom', .45),
    (4.0, 'zap', .9), (4.8, 'zap', .7), (5.6, 'zap', .7), (6.15, 'whoosh', .5),
    (7.2, 'whoosh', .6), (7.6, 'rumble', .7), (8.7, 'rumble', .9), (9.6, 'boom', 1.0), (9.6, 'hit', 1.0),
    (10.4, 'whoosh', .4), (11.2, 'boom', .6), (11.6, 'slash', .9), (12.0, 'slash', .9), (12.4, 'slash', 1.0), (12.4, 'hit', 1.0),
    (12.8, 'whoosh', .6), (12.8, 'boom', .45), (14.4, 'boom', .5), (15.2, 'boom', .45), (15.6, 'boom', .45), (16.0, 'boom', 1.0), (16.0, 'hit', 1.0),
    (17.6, 'hit', .8),
]
# music: wav 1.6-8.0 s (bars 2-5) then 12.8 s onward (bars 9-16), 10 ms crossfade at the splice
music = ("[0]atrim=1.6:8.0,asetpts=PTS-STARTPTS[m1];[0]atrim=12.8:26.6,asetpts=PTS-STARTPTS[m2];"
         "[m1][m2]acrossfade=d=0.01:c1=tri:c2=tri,volume=0.6[a0]")
args = ['ffmpeg', '-hide_banner', '-y', '-i', 'audio/bgm2.wav']
chains, labels = [music], ['[a0]']
for k, (t, f, v) in enumerate(cues, start=1):
    args += ['-i', f'audio/{f}.wav']
    chains.append(f'[{k}]aformat=channel_layouts=stereo,adelay={int(round(t * 1000))}:all=1,volume={v}[a{k}]')
    labels.append(f'[a{k}]')
graph = ';'.join(chains) + ';[a0]aformat=channel_layouts=stereo[a0s];' + ''.join(['[a0s]'] + labels[1:]) + \
    f'amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{DUR},afade=t=out:st={DUR - .5}:d=0.5[mix]'
subprocess.run(args + ['-filter_complex', graph, '-map', '[mix]', '-ar', '48000', '-ac', '2', 'mix2_raw.wav'], check=True, capture_output=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', 'mix2_raw.wav', '-af', 'loudnorm=I=-14:TP=-1:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
ln = f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-hide_banner', '-y', '-i', 'mix2_raw.wav', '-af', ln, '-ar', '48000', 'mix2.wav'], check=True, capture_output=True)
print('measured', j['input_i'], 'LUFS, peak', j['input_tp'], '-> -14 LUFS (linear)')
