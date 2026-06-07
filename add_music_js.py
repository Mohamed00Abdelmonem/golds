import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add JS logic for the music player
js_logic = """
  // Music Player logic
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const workoutAudio = document.getElementById('workoutAudio');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  
  if (musicToggleBtn && workoutAudio) {
    musicToggleBtn.addEventListener('click', () => {
      if (workoutAudio.paused) {
        workoutAudio.play().catch(e => console.error("Audio play failed:", e));
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
      } else {
        workoutAudio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
      }
    });
  }
"""

if 'Music Player logic' not in content:
    content = content.replace('updateRestPanel(null, 0);', 'updateRestPanel(null, 0);\n' + js_logic)
    with open('workout.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added JS logic")
else:
    print("JS logic already present")
