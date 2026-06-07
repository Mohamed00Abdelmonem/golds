import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Clear out the hardcoded placeholder HTML inside #exerciseList so it doesn't flash the old UI
list_pattern = r'(<div id="exerciseList"[^>]*>).*?(</div>\s*</div>\s*<!-- Sticky workout tracking widget -->)'
if re.search(list_pattern, content, re.DOTALL):
    content = re.sub(list_pattern, r'\1\n        </div>\n      </div>\n\n      <!-- Sticky workout tracking widget -->', content, flags=re.DOTALL)
    print("Cleared hardcoded exercise list")

# 2. Add some nice padding to the layout container (margins)
layout_pattern = r'<section class="workout-layout grid grid-cols-1 lg:grid-cols-12"[^>]*>'
new_layout = '<section class="workout-layout grid grid-cols-1 lg:grid-cols-12 px-4 md:px-8 max-w-[1400px] mx-auto py-6" style="gap:clamp(1.5rem,4vw,3rem)">'
if re.search(layout_pattern, content):
    content = re.sub(layout_pattern, new_layout, content)
    print("Updated layout margins")

# 3. Add the Music Player Widget right before the Smart predictions widget
music_widget = """<!-- Music Player Widget -->
          <div class="glass hover-lift fast-trans mb-6 relative overflow-hidden backdrop-blur-2xl p-4 md:p-5 flex items-center justify-between gap-4">
            <div class="flex items-center gap-4 min-w-0">
              <div class="w-12 h-12 rounded-lg bg-zinc-900 overflow-hidden shrink-0 flex items-center justify-center border border-white/5 relative group cursor-pointer" id="musicToggleBtn">
                <img src="https://i.scdn.co/image/ab67616d0000b273b1c4b76e21014f9d0cba6a9e" class="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition" />
                <div class="absolute inset-0 flex items-center justify-center text-white">
                  <svg id="playIcon" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  <svg id="pauseIcon" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                </div>
              </div>
              <div class="min-w-0">
                <div class="text-white font-bold text-sm truncate">Workout Phonk Mix</div>
                <div class="text-zinc-500 text-xs font-medium truncate flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Ready to play
                </div>
              </div>
            </div>
            <audio id="workoutAudio" loop preload="metadata">
              <source src="https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3" type="audio/mpeg">
            </audio>
          </div>

          <!-- Smart predictions -->"""

if '<!-- Music Player Widget -->' not in content:
    content = content.replace('<!-- Smart predictions -->', music_widget)
    print("Added music widget")

with open('workout.html', 'w', encoding='utf-8') as f:
    f.write(content)
