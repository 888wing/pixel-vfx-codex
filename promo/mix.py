# Build the ffmpeg audio mix: BGM + one-shot SFX placed at music times (seconds), then two-pass loudnorm.
import subprocess, json, sys
cues = [  # (time, file, volume)
    (0.23, 'boom', .8), (1.12, 'whoosh', .55),
    (2.143, 'zap', .9), (3.0, 'zap', .7), (3.857, 'zap', .7), (4.714, 'zap', .85),
    (5.48, 'whoosh', .7),
    (8.60, 'whoosh', .5), (10.26, 'hit', .35), (11.36, 'hit', .35),
    (12.857, 'hit', 1.0), (13.297, 'boom', .5), (15.217, 'hit', .9),
    (15.95, 'whoosh', .6), (18.857, 'zap', .7), (18.857, 'hit', 1.0), (22.286, 'boom', 1.0), (22.286, 'hit', 1.0),
    (23.95, 'whoosh', .5),
]
args = ['ffmpeg', '-hide_banner', '-y', '-i', 'audio/bgm.wav']
chains, labels = ['[0]volume=0.55[a0]'], ['[a0]']
for k, (t, f, v) in enumerate(cues, start=1):
    args += ['-i', f'audio/{f}.wav']
    ms = int(round(t * 1000))
    chains.append(f'[{k}]adelay={ms}:all=1,volume={v}[a{k}]')
    labels.append(f'[a{k}]')
graph = ';'.join(chains) + ';' + ''.join(labels) + f'amix=inputs={len(labels)}:normalize=0:duration=first,atrim=0:28.4,afade=t=out:st=27.6:d=0.8[mix]'
subprocess.run(args + ['-filter_complex', graph, '-map', '[mix]', '-ar', '48000', '-ac', '2', 'mix_raw.wav'], check=True, capture_output=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', 'mix_raw.wav', '-af', 'loudnorm=I=-14:TP=-1:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
ln = f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-hide_banner', '-y', '-i', 'mix_raw.wav', '-af', ln, '-ar', '48000', 'mix.wav'], check=True, capture_output=True)
print('measured', j['input_i'], 'LUFS ->', 'normalised (linear)')
