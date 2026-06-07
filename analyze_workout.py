import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

ids = set(re.findall(r'id=\"([^\"]+)\"', content))
print('IDs found:')
for id_ in sorted(ids):
    print(f"  #{id_}")

print('\nJS Event Listeners in script:')
scripts = re.findall(r'<script.*?>(.*?)</script>', content, re.DOTALL)
for script in scripts:
    listeners = re.findall(r'\.getElementById\([\'"](.*?)[\'"]\)', script)
    selectors = re.findall(r'\.querySelector\([\'"](.*?)[\'"]\)', script)
    all_targets = set(listeners + selectors)
    if all_targets:
        print('Elements queried by JS:')
        for target in sorted(all_targets):
            print(f"  {target}")
