import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the end of the header's grid and insert the buttons
pattern = r'(<div class="text-white font-bold">45%</div>\s*</div>\s*</div>)'
replacement = r"""\1
          <div class="flex items-center gap-3 mt-4">
            <button id="startWorkout" class="bg-gold text-black px-6 py-3 rounded-xl font-bold hover:brightness-110 transition shadow-[0_0_20px_rgba(255,212,0,0.2)]">Start Workout</button>
            <button id="resumeWorkout" class="bg-zinc-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-700 transition border border-white/5">Resume Rest</button>
          </div>"""

if re.search(pattern, content):
    content = re.sub(pattern, replacement, content, count=1)
    with open('workout.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added missing buttons")
else:
    print("Pattern not found")
