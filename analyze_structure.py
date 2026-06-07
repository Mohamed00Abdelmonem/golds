with open('workout.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_main = False
for i, line in enumerate(lines):
    if '<main' in line:
        in_main = True
    if in_main:
        if '<section' in line or '<div class="glass' in line or 'id="tracker"' in line or 'id="exerciseList"' in line:
            print(f"Line {i}: {line.strip()[:100]}")
