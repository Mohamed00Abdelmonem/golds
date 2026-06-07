import re

with open('workout.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_style = '''
    /* Premium Dark Theme */
    :root{--gold:#ffd400; --bg-main:#09090b; --bg-card:#18181b; --border-glass:rgba(255,255,255,0.08)}
    html,body{height:100%; overflow-x:hidden}
    body{font-family:Poppins,system-ui,-apple-system,sans-serif; background:var(--bg-main); color:#fff; margin:0; padding:0}
    * { box-sizing:border-box }
    .glass { background:var(--bg-card); border:1px solid var(--border-glass); border-radius:1rem; }
    .hover-lift:hover{ transform:translateY(-2px); box-shadow:0 10px 40px -10px rgba(0,0,0,0.5); border-color:rgba(255,255,255,0.15) }
    .fast-trans{transition:all 200ms ease-out}
    .text-gold{color:var(--gold) !important}
    .bg-gold,.from-gold{background-image:linear-gradient(135deg,#fff173 0%,#ffd400 100%) !important; color:#000 !important}
    
    /* Split Tabs */
    .split-tabs{overflow-x:auto; scrollbar-width:none; padding:4px}
    .split-tabs::-webkit-scrollbar{display:none}
    .tab-btn{background:transparent; color:#a1a1aa; padding:8px 16px; border-radius:99px; font-size:0.875rem; font-weight:600; transition:all 200ms}
    .tab-btn.active-tab{background:rgba(255,212,0,0.1); color:var(--gold); border:1px solid rgba(255,212,0,0.2)}
    
    /* Input styling */
    input[type="number"], input[type="text"] { background:transparent; border-bottom:1px solid rgba(255,255,255,0.1); color:#fff; text-align:center; transition:border-color 0.2s; border-radius:0 }
    input:focus { outline:none; border-bottom-color:var(--gold); }
    
    /* Accordion */
    .accordion-enter{max-height:0;overflow:hidden;transition:max-height 220ms ease}
    .accordion-open{max-height:800px}
    
    /* Mobile Bottom Nav */
    .mobile-bottom-nav,.mobile-bottom-sheet{display:none}
    @media (max-width:767px){
      body{padding-bottom:0 !important}
      #page-main{padding-bottom:calc(6.5rem + env(safe-area-inset-bottom)) !important}
      .mobile-bottom-nav{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:999;width:100%;padding:0;background:transparent;pointer-events:none}
      .mobile-bottom-nav__inner{pointer-events:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0.3rem;width:100%;border-radius:0;padding:0.45rem 0.75rem;background:rgba(15,15,17,0.85);border-top:1px solid rgba(255,255,255,0.08);box-shadow:0 -8px 24px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.05);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%)}
      .mobile-bottom-nav__item{display:flex;flex-direction:column;align-items:center;justify-content:center;width:3rem;height:3rem;border-radius:9999px;color:#a1a1aa;transition:all 280ms cubic-bezier(0.34,1.56,0.64,1);border:none;cursor:pointer;position:relative;text-decoration:none}
      .mobile-bottom-nav__item svg{width:1.45rem;height:1.45rem;transition:transform 200ms}
      .mobile-bottom-nav__item:active svg{transform:scale(0.85)}
      .mobile-bottom-nav__item::after{content:'';position:absolute;bottom:0.3rem;width:4px;height:4px;border-radius:50%;background:#f5b041;opacity:0;transform:scale(0);transition:all 250ms cubic-bezier(0.34,1.56,0.64,1)}
      .mobile-bottom-nav__item.is-active::after{opacity:1;transform:scale(1)}
      .mobile-bottom-nav__item.is-active{background:rgba(255,212,0,0.12);color:#ffd400;box-shadow:0 4px 16px rgba(255,212,0,0.15),inset 0 0 0 1px rgba(255,212,0,0.25);transform:translateY(-2px)}
      .mobile-bottom-nav__item.more-active{background:rgba(255,212,0,0.2);color:#ffd400}
      .mobile-bottom-sheet{display:block;position:fixed;inset:0;z-index:1000;opacity:0;pointer-events:none;transition:opacity 220ms ease}
      .mobile-bottom-sheet.is-open{opacity:1;pointer-events:auto}
      .mobile-bottom-sheet__scrim{position:absolute;inset:0;background:rgba(0,0,0,.62);backdrop-filter:blur(10px)}
      .mobile-bottom-sheet__panel{position:absolute;left:0;right:0;bottom:0;transform:translateY(100%);transition:transform 260ms cubic-bezier(.2,.9,.2,1);border-radius:1.5rem 1.5rem 0 0;background:linear-gradient(180deg,rgba(16,16,18,.98),rgba(10,10,12,.98));border:1px solid rgba(255,255,255,0.08);box-shadow:0 -28px 80px rgba(0,0,0,.5);padding-bottom:calc(1rem + env(safe-area-inset-bottom));max-height:min(82vh,42rem);display:flex;flex-direction:column}
      .mobile-bottom-sheet.is-open .mobile-bottom-sheet__panel{transform:translateY(0)}
      .mobile-bottom-sheet__handle{width:3.25rem;height:.28rem;border-radius:999px;background:rgba(255,255,255,.18);margin:0.7rem auto 0}
      .mobile-bottom-sheet__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.65rem;padding:0 1rem 1rem;overflow:auto}
      .mobile-bottom-sheet__link{display:flex;align-items:center;padding:0.75rem 1rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:1rem;color:#e4e4e7;font-size:0.9rem;font-weight:500;transition:all 200ms ease;text-decoration:none}
      .mobile-bottom-sheet__link:active{background:rgba(255,255,255,0.05);transform:scale(0.98)}
    }
'''

content = re.sub(r'<style>.*?</style>', f'<style>{new_style}</style>', content, flags=re.DOTALL)

with open('workout.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully replaced <style> block.")
