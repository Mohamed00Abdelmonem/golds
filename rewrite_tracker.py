import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

tracker_pattern = r'<aside class="workout-rail w-full lg:col-span-4">.*?</aside>'

new_tracker = """<!-- Sticky workout tracking widget -->
      <aside class="workout-rail w-full lg:col-span-4 relative">
        <div id="tracker" class="sticky top-6">
          <div class="glass shadow-2xl hover-lift fast-trans mb-6 relative overflow-hidden backdrop-blur-2xl">
            <!-- decorative gradient -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between mb-6">
              <div>
                <div class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Workout Tracker</div>
                <div class="text-white font-extrabold text-lg">Push Day</div>
              </div>
              <div class="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                In Progress
              </div>
            </div>
            
            <!-- Progress Arc & Sets -->
            <div class="flex items-center gap-6 mb-6">
              <div class="relative flex items-center justify-center w-20 h-20 shrink-0">
                <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
                  <path d="M18 2a16 16 0 1 0 0 32a16 16 0 1 0 0 -32" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3"/>
                  <path id="progArc" d="M18 2a16 16 0 1 0 0 32a16 16 0 1 0 0 -32" fill="none" stroke="var(--gold)" stroke-width="3" stroke-dasharray="0 100" stroke-linecap="round" class="transition-all duration-500 ease-out"/>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <div id="progressPct" class="text-white font-bold text-sm">0%</div>
                </div>
              </div>
              
              <div class="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Completed</div>
                  <div class="text-white font-bold text-xl leading-none"><span id="completedCount">0</span><span class="text-zinc-600 text-sm">/<span id="totalSets">0</span></span></div>
                  <div class="hidden"><span id="completedSets">0</span></div>
                </div>
                <div>
                  <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Remaining</div>
                  <div id="remainingCount" class="text-white font-bold text-xl leading-none">0</div>
                </div>
              </div>
            </div>
            
            <!-- Rest Timer Section -->
            <div class="bg-zinc-900/50 rounded-xl p-4 border border-white/5 mb-6">
              <div class="flex justify-between items-end mb-2">
                <div>
                  <div class="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Rest Timer</div>
                  <div id="restCountdown" class="text-white font-bold text-2xl font-mono leading-none">Ready</div>
                </div>
                <div class="text-right">
                  <div id="activeExerciseLabel" class="text-zinc-400 text-xs font-medium max-w-[120px] truncate">Tap Start</div>
                </div>
              </div>
              <div class="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div id="restTimeBar" class="rest-time-bar h-full bg-gold rounded-full transition-all duration-1000 ease-linear"></div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="grid grid-cols-2 gap-3">
              <button id="timerToggle" class="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-3 font-semibold transition text-sm">Start Timer</button>
              <button id="endWorkout" class="bg-gradient-to-br from-gold to-[#f5b041] hover:brightness-110 text-black rounded-xl py-3 font-semibold shadow-lg shadow-gold/20 transition text-sm">End Workout</button>
            </div>
          </div>
          
          <!-- Smart predictions -->
          <div class="glass hover-lift fast-trans mb-6 relative overflow-hidden backdrop-blur-2xl">
            <div class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Smart Predictions</div>
            <div class="text-white font-extrabold mb-4">Estimates & Recovery</div>
            <div class="grid grid-cols-1 gap-3">
              <div class="bg-zinc-900/50 rounded-xl p-3 border border-white/5 flex justify-between items-center">
                <div class="text-zinc-400 text-sm font-medium">Next PR</div>
                <div class="text-white font-bold">Bench +2.5 kg</div>
              </div>
              <div class="bg-zinc-900/50 rounded-xl p-3 border border-white/5 flex justify-between items-center">
                <div class="text-zinc-400 text-sm font-medium">Recovery</div>
                <div class="text-white font-bold text-gold">76%</div>
              </div>
            </div>
          </div>
          
          <!-- Muscle visualization -->
          <div class="glass hover-lift fast-trans mb-6 relative overflow-hidden backdrop-blur-2xl">
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Target Muscles</div>
                <div id="muscleActiveLabel" class="text-white font-extrabold">Active: Shoulder</div>
              </div>
              <div id="muscleSessionFocus" class="text-gold text-xs font-bold bg-gold/10 px-2 py-1 rounded-md">Session focus</div>
            </div>
            <div class="muscle-video-wrap rounded-xl overflow-hidden border border-white/5 aspect-video bg-zinc-900">
              <video id="muscleVideo" src="assets/videos/bush2.mp4" autoplay loop muted class="w-full h-full object-cover"></video>
            </div>
          </div>
        </div>
      </aside>"""

if re.search(tracker_pattern, content, re.DOTALL):
    content = re.sub(tracker_pattern, new_tracker, content, count=1, flags=re.DOTALL)
    with open('workout.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced Tracker widget")
else:
    print("Failed to find tracker pattern")
