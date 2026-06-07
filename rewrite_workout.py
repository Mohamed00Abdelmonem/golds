import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the HTML returned by renderExercises
new_template = """      <article class="exercise-card glass hover-lift fast-trans mb-4" data-target="${ex.target}" data-detail-video="${getDetailVideo(ex)}" data-name="${ex.name}" data-sets="${ex.sets}" data-completed-sets="0" data-rest="${parseRestSeconds(ex.rest)}" data-rest-label="${ex.rest}">
        <!-- Header -->
        <div class="flex items-center gap-4 p-4 md:p-5">
          <img src="${ex.image}" alt="${ex.name}" class="w-14 h-14 object-cover rounded-xl border border-white/5" />
          <div class="flex-1 min-w-0">
            <h3 class="text-white font-bold text-base md:text-lg truncate">${ex.name}</h3>
            <div class="text-zinc-400 text-xs md:text-sm mt-0.5">${ex.target}</div>
          </div>
          <button class="expand-btn w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
          </button>
        </div>

        <!-- Dense Table Header -->
        <div class="grid grid-cols-12 gap-2 px-4 pb-2 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-white/5">
          <div class="col-span-2 text-center">Set</div>
          <div class="col-span-3 text-center">kg</div>
          <div class="col-span-3 text-center">Reps</div>
          <div class="col-span-4 text-center">Action</div>
        </div>

        <!-- Logging Form / Mock Rows -->
        <form class="flex flex-col gap-1 p-2">
          ${Array.from({length: ex.sets}).map((_, i) => `
            <div class="grid grid-cols-12 gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-zinc-800/40 transition group">
              <div class="col-span-2 text-center text-zinc-400 font-bold text-sm">${i + 1}</div>
              <div class="col-span-3">
                <input type="number" class="w-full bg-zinc-900/50 text-center text-white font-bold rounded-md py-1 border border-transparent focus:border-gold focus:bg-zinc-900 transition" value="${typeof ex.weight === 'string' ? '' : ex.weight}" placeholder="-" />
              </div>
              <div class="col-span-3">
                <input type="number" class="w-full bg-zinc-900/50 text-center text-white font-bold rounded-md py-1 border border-transparent focus:border-gold focus:bg-zinc-900 transition" value="${ex.reps.split('-')[0]}" placeholder="-" />
              </div>
              <div class="col-span-4 flex items-center justify-center gap-1">
                ${i === 0 ? `<button type="button" class="rest-btn w-7 h-7 rounded bg-zinc-800 text-gold flex items-center justify-center hover:bg-zinc-700 transition" aria-label="Start rest timer" data-rest-action="start">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-3.5 h-3.5"><path d="M12 8v4l3 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="8.5" stroke-width="2"/></svg>
                </button>` : `<div class="w-7 h-7"></div>`}
                <!-- We map the original 'set-btn' to this checkmark so existing JS works exactly the same -->
                <button type="button" class="set-btn w-7 h-7 rounded bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-gold hover:border-gold transition flex items-center justify-center" data-action="start-set">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                </button>
              </div>
            </div>
          `).join('')}
        </form>

        <div class="px-4 pb-3 flex justify-between items-center border-t border-white/5 pt-3 mt-1">
          <span class="set-progress text-xs text-zinc-500 font-semibold bg-zinc-900 px-2 py-1 rounded">Progress 0/${ex.sets}</span>
          <span class="text-xs text-zinc-500 font-semibold">Rest ${ex.rest}</span>
        </div>

        <!-- Collapsible Details -->
        <div class="details accordion-enter fast-trans bg-zinc-900/50 border-t border-white/5">
          <div class="p-4 md:p-5">
            <div class="text-zinc-400 text-sm mb-4 leading-relaxed">${ex.instructions}</div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div class="bg-zinc-800/50 rounded-xl p-3 border border-white/5">
                <div class="text-zinc-300 font-semibold text-xs uppercase tracking-wider mb-2">Common Mistakes</div>
                <ul class="text-zinc-400 text-sm space-y-1 list-disc list-inside">${ex.mistakes.map(m => `<li>${m}</li>`).join('')}</ul>
              </div>
              <div class="bg-zinc-800/50 rounded-xl p-3 border border-white/5">
                <div class="text-zinc-300 font-semibold text-xs uppercase tracking-wider mb-2">Safety Tips</div>
                <ul class="text-zinc-400 text-sm space-y-1 list-disc list-inside">${ex.safety.map(s => `<li>${s}</li>`).join('')}</ul>
              </div>
            </div>

            <div class="rounded-xl overflow-hidden mb-4 border border-white/5">
              <video class="exercise-detail-video w-full object-cover aspect-video bg-black" muted playsinline webkit-playsinline controls preload="metadata" poster="${ex.image}">
                <source src="https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495645/Back_xndmi1.mp4" type="video/mp4" />
              </video>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <button class="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition" data-action="qr">Scan QR</button>
              <button class="tutorial-btn bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition" data-video="${ex.video || ('https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780496704/Everyday_peaceful_debate_ideas_and_clever_inspiration_for_beginners_that_keep_things_grounded_zivxrz.mp4')}" data-title="${ex.name}" data-subtitle="${ex.target}">Watch Tutorial</button>
              <div class="text-zinc-500 text-xs font-semibold ml-auto">Machine: ${ex.machine}</div>
            </div>
          </div>
        </div>
      </article>"""

# Find the template string in renderExercises and replace it
# The original template starts at `<article class="exercise-card` inside the innerHTML assignment.
pattern = r'<article class="exercise-card.*?</article>'

if re.search(pattern, content, re.DOTALL):
    content = re.sub(pattern, new_template, content, count=1, flags=re.DOTALL)
    with open('workout.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced JS template")
else:
    print("Failed to find pattern")
