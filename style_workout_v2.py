import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_template = """      <article class="exercise-card relative overflow-hidden bg-zinc-900/60 border border-white/10 rounded-2xl mb-6 shadow-2xl" data-target="${ex.target}" data-detail-video="${getDetailVideo(ex)}" data-name="${ex.name}" data-sets="${ex.sets}" data-completed-sets="0" data-rest="${parseRestSeconds(ex.rest)}" data-rest-label="${ex.rest}">
        <!-- Congratulations Overlay -->
        <div class="congrats-overlay absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-500/90 to-emerald-600/90 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-500 scale-105">
          <div class="text-center transform translate-y-8 transition-transform duration-500 delay-100">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-white font-black text-3xl tracking-tight mb-2 drop-shadow-md">Congratulations!</h3>
            <p class="text-white/95 font-semibold text-lg drop-shadow-md">You completed all sets!</p>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="relative w-full h-56 sm:h-64">
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent z-10"></div>
          <img src="${ex.image}" alt="${ex.name}" class="w-full h-full object-cover" />
          <div class="absolute bottom-4 left-4 right-4 z-20">
            <h3 class="text-white font-black text-2xl md:text-3xl tracking-tight">${ex.name}</h3>
            <div class="text-zinc-300 font-medium text-sm mt-1.5 flex items-center gap-2">
              <span class="bg-gold/20 text-gold px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-gold/10">${ex.target}</span>
              <span class="text-white/30">•</span>
              <span class="text-white font-semibold">${ex.reps} reps</span>
            </div>
          </div>
        </div>

        <div class="p-4 md:p-6">
          <div class="flex items-center justify-between mb-5">
            <div class="flex flex-wrap gap-2">
              <span class="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/5 shadow-sm">Sets: ${ex.sets}</span>
              <span class="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/5 shadow-sm">Machine: ${ex.machine}</span>
              <span class="set-progress bg-gold/10 text-gold px-3 py-1.5 rounded-lg text-xs font-bold border border-gold/20 shadow-sm">Progress 0/${ex.sets}</span>
            </div>
            <div class="text-right pl-4">
              <div class="text-white font-black text-xl md:text-2xl">${ex.weight}${typeof ex.weight === 'string' ? '' : ' kg'}</div>
              <div class="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Rest ${ex.rest}</div>
            </div>
          </div>

          <div class="flex items-center gap-3 mb-6">
            <button class="set-btn flex-1 bg-gradient-to-r from-gold to-[#f5b041] hover:brightness-110 text-black rounded-xl py-4 font-extrabold shadow-[0_8px_20px_rgba(245,176,65,0.25)] transition-all active:scale-[0.98] text-sm md:text-base uppercase tracking-wider" data-action="start-set">
              Start Set
            </button>
            <button class="expand-btn bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5 rounded-xl py-4 px-6 md:px-8 font-bold shadow-sm transition-all active:scale-[0.98] text-sm md:text-base">
              Details
            </button>
          </div>

          <div class="details accordion-enter fast-trans mb-4 bg-zinc-800/40 rounded-xl overflow-hidden border border-white/5">
            <div class="p-4 md:p-5">
              <div class="text-zinc-300 text-sm mb-5 leading-relaxed font-medium">${ex.instructions}</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div class="bg-zinc-900/50 rounded-xl p-4 border border-white/5">
                  <div class="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    Common Mistakes
                  </div>
                  <ul class="text-zinc-300 text-sm space-y-1.5 list-disc list-inside">${ex.mistakes.map(m => `<li>${m}</li>`).join('')}</ul>
                </div>
                <div class="bg-zinc-900/50 rounded-xl p-4 border border-white/5">
                  <div class="text-green-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    Safety Tips
                  </div>
                  <ul class="text-zinc-300 text-sm space-y-1.5 list-disc list-inside">${ex.safety.map(s => `<li>${s}</li>`).join('')}</ul>
                </div>
              </div>
              <div class="rounded-xl overflow-hidden mb-5 border border-white/10 shadow-2xl bg-black">
                <video class="exercise-detail-video w-full object-cover aspect-video" muted playsinline webkit-playsinline controls preload="metadata" poster="${ex.image}">
                  <source src="https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495645/Back_xndmi1.mp4" type="video/mp4" />
                </video>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button class="bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold px-4 py-3 rounded-lg transition active:scale-[0.98]" data-action="qr">Scan QR</button>
                <button class="tutorial-btn bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold px-4 py-3 rounded-lg transition active:scale-[0.98] flex items-center gap-1.5" data-video="${ex.video || ('https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780496704/Everyday_peaceful_debate_ideas_and_clever_inspiration_for_beginners_that_keep_things_grounded_zivxrz.mp4')}" data-title="${ex.name}" data-subtitle="${ex.target}">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Watch Tutorial
                </button>
              </div>
            </div>
          </div>

          <form class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div class="relative">
              <label class="absolute -top-2 left-3 bg-zinc-900 px-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest z-10">Weight (kg)</label>
              <input type="number" class="w-full bg-zinc-900/50 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition font-semibold" value="${typeof ex.weight === 'string' ? 0 : ex.weight}" />
            </div>
            <div class="relative">
              <label class="absolute -top-2 left-3 bg-zinc-900 px-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest z-10">Reps</label>
              <input type="number" class="w-full bg-zinc-900/50 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition font-semibold" value="${ex.reps.split('-')[0]}" />
            </div>
            <div class="relative">
              <label class="absolute -top-2 left-3 bg-zinc-900 px-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest z-10">Notes</label>
              <input type="text" class="w-full bg-zinc-900/50 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition font-semibold" placeholder="Optional" />
            </div>
          </form>

          <button class="rest-btn w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 rounded-xl py-3.5 font-bold transition flex items-center justify-center gap-2 active:scale-[0.98]" aria-label="Start rest timer" title="Start rest" data-rest-action="start">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-5 h-5 text-gold"><path d="M12 8v4l3 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="8.5" stroke-width="2"/></svg>
            Start Rest Timer
          </button>
        </div>
      </article>"""

template_pattern = r'<article class="exercise-card.*?</article>'
if re.search(template_pattern, content, re.DOTALL):
    content = re.sub(template_pattern, new_template, content, count=1, flags=re.DOTALL)
    print("Replaced template")

# Replace JS logic for set-btn
js_target = """        if (completedSets >= totalSets) {
          const title = card.dataset.name || 'Exercise';
          showAchievement('Exercise Complete', `${title} all sets finished`);
        } else {
          showAchievement('Set Logged', `${card.dataset.name} ${completedSets}/${totalSets}`);
        }"""

js_replacement = """        if (completedSets >= totalSets) {
          const title = card.dataset.name || 'Exercise';
          showAchievement('Exercise Complete', `${title} all sets finished`);
          
          // CONGRATS ANIMATION
          const overlay = card.querySelector('.congrats-overlay');
          if (overlay) {
            overlay.classList.remove('opacity-0', 'pointer-events-none', 'scale-105');
            overlay.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
            
            // animate inner div
            const inner = overlay.querySelector('div');
            inner.classList.remove('translate-y-8');
            inner.classList.add('translate-y-0');

            setTimeout(() => {
              overlay.classList.add('opacity-0', 'pointer-events-none', 'scale-105');
              overlay.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
              inner.classList.add('translate-y-8');
              inner.classList.remove('translate-y-0');
            }, 3000);
          }
        } else {
          showAchievement('Set Logged', `${card.dataset.name} ${completedSets}/${totalSets}`);
        }"""

content = content.replace(js_target, js_replacement)

# Also ensure "pointer-events-none" class isn't accidentally removed globally if it conflicts
with open('workout.html', 'w', encoding='utf-8') as f:
    f.write(content)
