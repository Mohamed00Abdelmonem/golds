import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

header_pattern = r'<!-- Workout header -->.*?<!-- Split tabs -->'
new_header = """<!-- Workout header -->
        <div class="mb-6 px-2">
          <div class="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Active Program
          </div>
          <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Push Pull Legs</h1>
          <div class="text-zinc-400 font-medium">Day 5 • Focus: Chest & Shoulders</div>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div class="bg-zinc-900/50 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
              <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Duration</div>
              <div class="text-white font-bold">52 min</div>
            </div>
            <div class="bg-zinc-900/50 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
              <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Est. Cal</div>
              <div class="text-white font-bold">420 kcal</div>
            </div>
            <div class="bg-zinc-900/50 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
              <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Difficulty</div>
              <div class="text-white font-bold">Advanced</div>
            </div>
            <div class="bg-zinc-900/50 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
              <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Progress</div>
              <div class="text-white font-bold">45%</div>
            </div>
          </div>
        </div>

        <!-- Split tabs -->"""

content = re.sub(header_pattern, new_header, content, flags=re.DOTALL)

with open('workout.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Header rewritten")
