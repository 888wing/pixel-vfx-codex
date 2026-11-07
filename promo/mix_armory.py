# Audio for the Armory promos (armory.html?v=1|2|3|b): a 150 bpm bgm edited by bars, SFX from cues-a<part>.json
# (PAGE=armory.html PREFIX=a node cues.mjs <part>), a limiter and a two-pass linear loudnorm to -14 LUFS.
# Run from promo/: python3 -I mix_armory.py 1
import subprocess, json, sys
part = sys.argv[1] if len(sys.argv) > 1 else '1'
BAR = 1.6
# (track, [(song bar from, song bar to)], 1-based inclusive): the music edit for each part
EDITS = {
    '1': ('bgm7', [(1, 14.5)]),
    '2': ('bgm8', [(1, 13.5)]),
    '3': ('bgm9', [(1, 14)]),     # the song's break (bar 8) lands on the endless blade's joke beat, the drop on its sweep
    'b': ('bgm10', [(1, 12)]),
}
track, spans = EDITS[part]
spec = json.load(open(f'cues-a{part}.json'))
DUR, cues = spec['duration'], spec['cues']
chains, labels = [], []
for k, (a, b) in enumerate(spans):
    chains.append(f"[0]atrim={(a - 1) * BAR}:{b * BAR + (.4 if k == len(spans) - 1 else .01)},asetpts=PTS-STARTPTS[m{k}]")
cur = 'm0'
for k in range(1, len(spans)):
    chains.append(f'[{cur}][m{k}]acrossfade=d=0.01:c1=tri:c2=tri[x{k}]'); cur = f'x{k}'
chains.append(f'[{cur}]volume=0.6,aformat=channel_layouts=stereo[a0]')
args = ['ffmpeg', '-hide_banner', '-y', '-i', f'audio/{track}.wav']
labels = ['[a0]']
for k, c in enumerate(cues, start=1):
    args += ['-i', f"audio/{c['f']}.wav"]
    ln = c.get('len')
    cut = f"atrim=0:{ln},afade=t=out:st={ln - .25}:d=0.25," if ln else ''
    chains.append(f"[{k}]{cut}aformat=channel_layouts=stereo,adelay={int(round(c['t'] * 1000))}:all=1,volume={c['v']}[a{k}]")
    labels.append(f'[a{k}]')
graph = ';'.join(chains) + ';' + ''.join(labels) + \
    f'amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{DUR},afade=t=out:st={DUR - .6}:d=0.6,volume=0.5,alimiter=limit=0.5:level=false[mix]'
subprocess.run(args + ['-filter_complex', graph, '-map', '[mix]', '-ar', '48000', '-ac', '2', '-c:a', 'pcm_f32le', f'mix-a{part}_raw.wav'], check=True, capture_output=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', f'mix-a{part}_raw.wav', '-af', 'loudnorm=I=-14:TP=-1:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
ln = f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-hide_banner', '-y', '-i', f'mix-a{part}_raw.wav', '-af', ln, '-ar', '48000', f'mix-a{part}.wav'], check=True, capture_output=True)
print(part, 'measured', j['input_i'], 'LUFS, peak', j['input_tp'], '-> -14 LUFS (linear)')
