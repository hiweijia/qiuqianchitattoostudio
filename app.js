function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector('.doc-area').scrollTop=0;
}

function togglePalette(e) {
  if (e) e.stopPropagation();
  const bar = document.getElementById('paletteBar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    setTimeout(() => document.addEventListener('click', closePalette, { once: true }), 10);
  }
}
function closePalette() {
  document.getElementById('paletteBar').classList.remove('open');
}

/* ════ THEME ENGINE ════ */
const THEMES = {
  white:       { paper:'#ffffff', ink:'#111111', ink2:'#555', ink3:'#aaa', border:'#ddd', border2:'#111', accent:'#000', accent2:'#fff', desk:'#bebebe', chrome:'#e8e8e8', bar:'#000', bartext:'#fff' },
  black:       { paper:'#111111', ink:'#f0f0f0', ink2:'#bbb', ink3:'#666', border:'#333', border2:'#eee', accent:'#fff', accent2:'#000', desk:'#222', chrome:'#1a1a1a', bar:'#f0f0f0', bartext:'#111' },
  cream:       { paper:'#f8f4ec', ink:'#2c2416', ink2:'#7a6a50', ink3:'#b8a88a', border:'#e0d4be', border2:'#2c2416', accent:'#2c2416', accent2:'#f8f4ec', desk:'#d8cdb8', chrome:'#e8e0d0', bar:'#2c2416', bartext:'#f8f4ec' },
  linen:       { paper:'#f5f0e8', ink:'#1a1209', ink2:'#6b5c40', ink3:'#b0a090', border:'#ddd0bc', border2:'#1a1209', accent:'#1a1209', accent2:'#f5f0e8', desk:'#cec4b4', chrome:'#e0d8cc', bar:'#1a1209', bartext:'#f5f0e8' },
  blush:       { paper:'#fef1f4', ink:'#4a1020', ink2:'#a0506a', ink3:'#dba0b0', border:'#f5ccd8', border2:'#c2185b', accent:'#c2185b', accent2:'#fff', desk:'#f0c0cc', chrome:'#f9dde6', bar:'#c2185b', bartext:'#fff' },
  pink:        { paper:'#fff0f5', ink:'#3a0818', ink2:'#ad2060', ink3:'#e090b8', border:'#f8c8de', border2:'#e91e8c', accent:'#e91e8c', accent2:'#fff', desk:'#f4b0cc', chrome:'#fcdde8', bar:'#e91e8c', bartext:'#fff' },
  sky:         { paper:'#f0f8ff', ink:'#0a1a2e', ink2:'#2060a0', ink3:'#80b0d8', border:'#c8e0f4', border2:'#1565c0', accent:'#1565c0', accent2:'#fff', desk:'#b8d4ee', chrome:'#dceefb', bar:'#1565c0', bartext:'#fff' },
  mint:        { paper:'#f0faf4', ink:'#0a2010', ink2:'#207040', ink3:'#80c0a0', border:'#c8ecd8', border2:'#1b5e20', accent:'#2e7d32', accent2:'#fff', desk:'#b4e0c4', chrome:'#d8f0e4', bar:'#2e7d32', bartext:'#fff' },
  lemon:       { paper:'#fffef0', ink:'#1a1400', ink2:'#6a5a00', ink3:'#c0b040', border:'#f0e890', border2:'#f57f17', accent:'#f57f17', accent2:'#fff', desk:'#e8dc70', chrome:'#f8f4c0', bar:'#f57f17', bartext:'#fff' },
  lavender:    { paper:'#faf5ff', ink:'#1a0a28', ink2:'#6a3a9a', ink3:'#c0a0e0', border:'#e8d0f8', border2:'#7b1fa2', accent:'#7b1fa2', accent2:'#fff', desk:'#dcc0f4', chrome:'#eeddf8', bar:'#7b1fa2', bartext:'#fff' },
  peach:       { paper:'#fff7f2', ink:'#2a0e00', ink2:'#8a4020', ink3:'#d0a080', border:'#f4d8c8', border2:'#bf360c', accent:'#bf360c', accent2:'#fff', desk:'#ecc8b4', chrome:'#f8e4d8', bar:'#bf360c', bartext:'#fff' },
  hotpink:     { paper:'#ff4081', ink:'#ffffff', ink2:'#ffe0ec', ink3:'#ffaacb', border:'#ff80ab', border2:'#fff', accent:'#fff', accent2:'#ff4081', desk:'#e91e6a', chrome:'#f5387a', bar:'#fff', bartext:'#ff4081' },
  red:         { paper:'#e53935', ink:'#ffffff', ink2:'#ffcdd2', ink3:'#ef9a9a', border:'#ef5350', border2:'#fff', accent:'#fff', accent2:'#e53935', desk:'#c62828', chrome:'#d32f2f', bar:'#fff', bartext:'#c62828' },
  orange:      { paper:'#ff6d00', ink:'#ffffff', ink2:'#ffe0b2', ink3:'#ffb74d', border:'#ff8f00', border2:'#fff', accent:'#fff', accent2:'#ff6d00', desk:'#e65100', chrome:'#ef6c00', bar:'#fff', bartext:'#bf360c' },
  yellow:      { paper:'#ffd600', ink:'#1a1000', ink2:'#5a4200', ink3:'#a08000', border:'#f0c000', border2:'#1a1000', accent:'#1a1000', accent2:'#ffd600', desk:'#e0b800', chrome:'#f0cc00', bar:'#1a1000', bartext:'#ffd600' },
  green:       { paper:'#00c853', ink:'#ffffff', ink2:'#ccffdd', ink3:'#80e8aa', border:'#00e676', border2:'#fff', accent:'#fff', accent2:'#00c853', desk:'#00a040', chrome:'#00b848', bar:'#fff', bartext:'#004d20' },
  blue:        { paper:'#0091ea', ink:'#ffffff', ink2:'#cce8ff', ink3:'#80c8f8', border:'#40a8ff', border2:'#fff', accent:'#fff', accent2:'#0091ea', desk:'#0070c8', chrome:'#0080d8', bar:'#fff', bartext:'#003870' },
  purple:      { paper:'#aa00ff', ink:'#ffffff', ink2:'#eebbff', ink3:'#cc80ff', border:'#cc44ff', border2:'#fff', accent:'#fff', accent2:'#aa00ff', desk:'#8800d8', chrome:'#9900ee', bar:'#fff', bartext:'#440088' },
  midnight:    { paper:'#1a1a2e', ink:'#e8e8f8', ink2:'#9090c0', ink3:'#505080', border:'#2a2a4a', border2:'#e8e8f8', accent:'#7c7cff', accent2:'#1a1a2e', desk:'#10101e', chrome:'#161628', bar:'#7c7cff', bartext:'#1a1a2e' },
  forest:      { paper:'#1b4332', ink:'#d8f3dc', ink2:'#95d5b2', ink3:'#52b788', border:'#2d6a4f', border2:'#d8f3dc', accent:'#95d5b2', accent2:'#1b4332', desk:'#081c15', chrome:'#143c27', bar:'#95d5b2', bartext:'#1b4332' },
  ultraviolet: { paper:'#2d1b69', ink:'#ede7f6', ink2:'#b39ddb', ink3:'#7e57c2', border:'#4a1f8a', border2:'#ede7f6', accent:'#ce93d8', accent2:'#2d1b69', desk:'#1a0f3e', chrome:'#251560', bar:'#ce93d8', bartext:'#2d1b69' },
  espresso:    { paper:'#3e2723', ink:'#efebe9', ink2:'#bcaaa4', ink3:'#8d6e63', border:'#5d4037', border2:'#efebe9', accent:'#d7ccc8', accent2:'#3e2723', desk:'#231815', chrome:'#321e1a', bar:'#d7ccc8', bartext:'#3e2723' },
  slate:       { paper:'#37474f', ink:'#eceff1', ink2:'#b0bec5', ink3:'#78909c', border:'#546e7a', border2:'#eceff1', accent:'#cfd8dc', accent2:'#37474f', desk:'#263238', chrome:'#2e3c44', bar:'#cfd8dc', bartext:'#263238' },
};

function setTheme(name) {
  const t = THEMES[name]; if (!t) return;
  const r = document.documentElement.style;
  r.setProperty('--t-paper',   t.paper);
  r.setProperty('--t-ink',     t.ink);
  r.setProperty('--t-ink2',    t.ink2);
  r.setProperty('--t-ink3',    t.ink3);
  r.setProperty('--t-border',  t.border);
  r.setProperty('--t-border2', t.border2);
  r.setProperty('--t-accent',  t.accent);
  r.setProperty('--t-accent2', t.accent2);
  r.setProperty('--t-desk',    t.desk);
  r.setProperty('--t-chrome',  t.chrome);
  r.setProperty('--c-toolbar-bg', t.chrome);
  r.setProperty('--c-chrome-border', t.border);
  r.setProperty('--t-bar',     t.bar);
  r.setProperty('--t-bartext', t.bartext);
  document.querySelectorAll('.swatch').forEach(s =>
    s.classList.toggle('active', s.getAttribute('onclick')?.includes("'"+name+"'"))
  );
  document.getElementById('paletteBar').classList.remove('open');
  const chrome = t.chrome;
  const tb = document.querySelector('.toolbar');
  const tl = document.querySelector('.titlebar');
  const pb = document.querySelector('.palette-bar');
  const rl = document.querySelector('.ruler');
  if (tb) tb.style.background = `linear-gradient(to bottom,${lighten(chrome,10)},${darken(chrome,5)})`;
  if (tl) tl.style.background = `linear-gradient(to bottom,${lighten(chrome,12)},${darken(chrome,8)})`;
  if (pb) pb.style.background = `linear-gradient(to bottom,${lighten(chrome,8)},${darken(chrome,4)})`;
  if (rl) rl.style.background = `linear-gradient(to bottom,${lighten(chrome,6)},${darken(chrome,10)})`;
}
function lighten(hex,pct){const n=parseInt(hex.slice(1),16);return'#'+[n>>16,n>>8&255,n&255].map(v=>Math.min(255,v+Math.round(2.55*pct)).toString(16).padStart(2,'0')).join('')}
function darken(hex,pct){const n=parseInt(hex.slice(1),16);return'#'+[n>>16,n>>8&255,n&255].map(v=>Math.max(0,v-Math.round(2.55*pct)).toString(16).padStart(2,'0')).join('')}
setTheme('white');

/* ════ DRAW ENGINE ════ */
let drawMode=false,isEraser=false,brushSize=2,drawColor='#111111',painting=false,lastX=0,lastY=0;
const canvas=document.getElementById('drawCanvas');
const ctx=canvas.getContext('2d');
const docArea=document.getElementById('docArea');
const cursor=document.getElementById('drawCursor');

function resizeCanvas(){
  const tmp=document.createElement('canvas');
  tmp.width=canvas.width;tmp.height=canvas.height;
  tmp.getContext('2d').drawImage(canvas,0,0);
  const wrap=document.getElementById('drawWrap');
  canvas.width=wrap.clientWidth;canvas.height=wrap.clientHeight;
  ctx.drawImage(tmp,0,0);ctx.lineCap='round';ctx.lineJoin='round';
}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();

function toggleDraw(){
  drawMode=!drawMode;
  const btn=document.getElementById('drawToggle');
  btn.classList.toggle('on',drawMode);
  btn.textContent=drawMode?'✏️ 画 ON':'✏️ 画';
  canvas.classList.toggle('draw-on',drawMode);
  docArea.style.overflow=drawMode?'hidden':'auto';
  cursor.style.display='none';
  if(!drawMode)isEraser=false;
  document.getElementById('eraserBtn').classList.remove('on');
}
function toggleEraser(){if(!drawMode)toggleDraw();isEraser=!isEraser;document.getElementById('eraserBtn').classList.toggle('on',isEraser);}
function setBrush(size,btnId){brushSize=size;document.querySelectorAll('.brush-btn').forEach(b=>b.classList.remove('on'));document.getElementById(btnId).classList.add('on');}
function setDrawColor(hex,el){drawColor=hex;isEraser=false;document.getElementById('drawCurColor').style.background=hex;document.querySelectorAll('.draw-color').forEach(d=>d.classList.remove('on'));el.classList.add('on');document.getElementById('eraserBtn').classList.remove('on');}
function clearDraw(){ctx.clearRect(0,0,canvas.width,canvas.height);}

function getPos(e){const r=canvas.getBoundingClientRect();if(e.touches)return{x:e.touches[0].clientX-r.left,y:e.touches[0].clientY-r.top};return{x:e.clientX-r.left,y:e.clientY-r.top};}
function startDraw(e){if(!drawMode)return;e.preventDefault();painting=true;const p=getPos(e);lastX=p.x;lastY=p.y;ctx.beginPath();ctx.arc(lastX,lastY,(isEraser?brushSize*4:brushSize)/2,0,Math.PI*2);if(isEraser){ctx.globalCompositeOperation='destination-out';ctx.fillStyle='rgba(0,0,0,1)';}else{ctx.globalCompositeOperation='source-over';ctx.fillStyle=drawColor;}ctx.fill();ctx.globalCompositeOperation='source-over';}
function draw(e){if(!drawMode||!painting)return;e.preventDefault();const p=getPos(e);ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=isEraser?brushSize*4:brushSize;ctx.globalCompositeOperation=isEraser?'destination-out':'source-over';ctx.strokeStyle=isEraser?'rgba(0,0,0,1)':drawColor;ctx.beginPath();ctx.moveTo(lastX,lastY);ctx.lineTo(p.x,p.y);ctx.stroke();lastX=p.x;lastY=p.y;}
function stopDraw(){painting=false;cursor.style.display='none';ctx.globalCompositeOperation='source-over';}

canvas.addEventListener('mousedown',startDraw,{passive:false});
canvas.addEventListener('mousemove',draw,{passive:false});
canvas.addEventListener('mouseup',stopDraw);
canvas.addEventListener('mouseleave',stopDraw);
canvas.addEventListener('touchstart',startDraw,{passive:false});
canvas.addEventListener('touchmove',draw,{passive:false});
canvas.addEventListener('touchend',stopDraw);
canvas.addEventListener('touchcancel',stopDraw);
canvas.addEventListener('mousemove',e=>{if(!drawMode)return;cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.style.display='block';const csz=isEraser?brushSize*4:brushSize;cursor.style.width=csz+'px';cursor.style.height=csz+'px';cursor.style.background=isEraser?'rgba(255,255,255,0.4)':drawColor+'55';});
canvas.addEventListener('mouseleave',()=>{cursor.style.display='none';});


/* ════ SPLASH: FINDER ANIMATION ════ */
(function(){
  let done = false;

  function endSplash() {
    if (done) return;
    done = true;
    const s = document.getElementById('splash');
    s.classList.add('fade-out');
    setTimeout(() => {
      s.classList.add('gone');
      // Show language select
      const ls = document.getElementById('langSelect');
      if (ls) {
        ls.style.display = '';
        requestAnimationFrame(() => requestAnimationFrame(() => ls.classList.add('show')));
      }
    }, 650);
  }
  window.endSplash = endSplash;

  function runFinder() {
    const wrap = document.getElementById('finderWrap');
    const cursor = document.getElementById('fnCursor');
    const file = document.getElementById('fnFile');
    const win = document.getElementById('finderWin');

    // Step 1: Finder appears
    setTimeout(() => { wrap.classList.add('show'); }, 300);

    // Step 2: cursor moves onto the RTF file
    setTimeout(() => {
      const wr = wrap.getBoundingClientRect();
      const fr = file.getBoundingClientRect();
      const cx = fr.left - wr.left + fr.width / 2 - 9;
      const cy = fr.top - wr.top + fr.height / 2 - 9;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    }, 1000);

    // Step 3: first click (select)
    setTimeout(() => {
      file.classList.add('fn-selected');
      cursor.classList.add('click');
      setTimeout(() => cursor.classList.remove('click'), 120);
    }, 1700);

    // Step 4: second click (open)
    setTimeout(() => {
      cursor.classList.add('click');
      setTimeout(() => cursor.classList.remove('click'), 120);
    }, 2000);

    // Step 5: window flies open → endSplash
    setTimeout(() => {
      wrap.classList.add('open-file');
      setTimeout(endSplash, 480);
    }, 2300);
  }

  // Start after fonts load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFinder);
  } else {
    runFinder();
  }
})();

/* ════ JACK IN THE BOX ════ */
const JACK_FRAMES = [
   "        __________\n        |        ||\n        |        ||\n        | tattoo?||\n        :________|/",
  "        ____     __\n        |        ||\n        |        ||\n        | tattoo?||\n        :________|/",
  "         __ ______\n        /         |\n        |        ||\n        | tattoo?||\n        :________|/",
  "         ___   ___\n        |  ^^^^  ||\n        |   ||   ||\n        | tattoo?||\n        :________|/",
  "           _,;;.,_\n        | ;,',,,'''@\n        |  ^^^    ||\n        | tattoo? ||\n        :________ |/",
  "              _,;;.,_\n     ,-;;,_  ;,',,,'''@\n        ,;;^^-:;,.\n        | ;^^^;  ||\n        |  \\ u /  ||\n        | tattoo? ||\n        :________ |/",
  "              _,;;.,_\n     ,-;;,_  ;,',,,'''@\n  ,;;^^  \\|/^^-:;,.\n@^         ;^^^;      ^^@\n           :- @:\n           \\ u /\n  ,=,------)^^^(------,=I,\n  '-'-----/=====\\-----'-'\n          \\_____/\n      ^\\ /_____\\\n      ^\\ \\_____/_\n        \\//_____\\/|\n        |         ||\n        | tattoo? ||\n        :________ |/",
  "              _,;;.,_\n     ,-;;,_  ;,',,,'''@\n  ,;;^^  `\\|//^^-:;,.\n@`         ;^^^;      `'@\n           :- @:\n           \\ u /\n  ,=,------)^^^(------,=I,\n  '-'-----/=====\\-----'-'\n          \\_____/\n      '`\\ /_____\\\n      `\\ \\_____/_\n        \\//_____\\/|\n        |         ||\n        | tattoo? ||\n        :________ |/",
  "         Surprise!\n\n\n              _,;;.,_\n     ,-;;,_  ;,',,,'''@\n  ,;;^^  `\\|//^^-:;,.\n@`         ;^^^;      `'@\n           :- @:\n           \\ u /\n  ,=,------)^^^(------,=I,\n  '-'-----/=====\\-----'-'\n          \\_____/\n      '`\\ /_____\\\n      `\\ \\_____/_\n        \\//_____\\/|\n        |        ||\n        | tattoo？|'\n        :________:"
];

const JACK_TIMING = [800, 150, 150, 200, 250, 350, 100, 100,99999];
let jackTimer = null;


/* ════ ASCII CONFETTI ════ */
function launchConfetti() {
  const chars = ['*','·','✦','✧','+','×','◦','°'];
  const container = document.getElementById('jackBox');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const headY = rect.top + rect.height * 0.55;
  const headX = rect.left + rect.width * 0.5;

  for (let i = 0; i < 36; i++) {
    const el = document.createElement('span');
    el.textContent = chars[Math.floor(Math.random()*chars.length)];
    const angle = (-120 + Math.random()*100) * Math.PI/180;
    const speed = 60 + Math.random()*120;
    const dx = Math.cos(angle)*speed;
    const dy = Math.sin(angle)*speed;
    el.style.cssText = `
      position:fixed;
      left:${headX + (Math.random()-0.5)*20}px;
      top:${headY}px;
      font-family:'Courier Prime',monospace;
      font-size:${8+Math.random()*10}px;
      color:var(--t-ink);
      opacity:1;
      pointer-events:none;
      z-index:9999;
      transition:transform 1s cubic-bezier(.2,.8,.4,1);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      el.style.transform=`translate(${dx}px,${dy}px) rotate(${(Math.random()-0.5)*480}deg)`;
    }));
    setTimeout(()=>el.remove(), 1000);
  }
}


function replayJack() {
  if (jackTimer) clearTimeout(jackTimer);
  const el = document.getElementById('jackBox');
  if (!el) return;
  let i = 0;
  function step() {
    el.textContent = JACK_FRAMES[i];
    if (i === JACK_FRAMES.length - 2) setTimeout(launchConfetti, 0);
    if (i < JACK_FRAMES.length - 1) {
      jackTimer = setTimeout(() => { i++; step(); }, JACK_TIMING[i]);
    }
  }
  step();
}

// override show() to replay when returning home
const _origShow = show;
show = function(id) {
  _origShow(id);
  if (id === 'home') setTimeout(replayJack, 200);
  if (id === 'flash') {
    // Pass current language via URL param — gallery skips its own lang selector
    var frame = document.getElementById('galleryFrame');
    if (frame) frame.src = 'gallery.html?lang=' + (currentLang || 'en');
  }
};

// autoplay after splash
setTimeout(replayJack, 3500);

/* ════ LANGUAGE SYSTEM ════ */
let currentLang = 'en';

const LANG_LABELS = {
  en: '🌐 EN',
  es: '🌐 ES',
  zh: '🌐 中文'
};

// Which CSS classes to show per language
// Each entry: [show-class, hide-class-1, hide-class-2]
const LANG_CLASSES = {
  en: { show: 'en', hide: ['es', 'zh'] },
  es: { show: 'es', hide: ['en', 'zh'] },
  zh: { show: 'zh', hide: ['en', 'es'] },
};

// Class suffix mappings across all element types
const SUFFIXES = ['en', 'es', 'zh'];
const PREFIXES = ['ni-', 'hbio-', 'doc-title-', 'desc-', 's-', 'sli-', 'hb-', 'lbl-'];

function applyLang(lang) {
  currentLang = lang;

  // Update toolbar button
  const btn = document.getElementById('langToggleBtn');
  if (btn) btn.textContent = LANG_LABELS[lang];

  // Show/hide by prefix+suffix classes
  PREFIXES.forEach(prefix => {
    SUFFIXES.forEach(suffix => {
      const els = document.querySelectorAll('.' + prefix + suffix);
      els.forEach(el => {
        el.style.display = (suffix === lang) ? '' : 'none';
      });
    });
  });

  // lbl- spans (inside sec-lbl)
  SUFFIXES.forEach(suffix => {
    document.querySelectorAll('.lbl-' + suffix).forEach(el => {
      el.style.display = (suffix === lang) ? 'inline' : 'none';
    });
  });

  // cta-es, cta-zh spans inside buttons
  document.querySelectorAll('.cta-es').forEach(el => {
    el.style.display = (lang === 'es') ? '' : 'none';
  });
  document.querySelectorAll('.cta-zh').forEach(el => {
    el.style.display = (lang === 'zh') ? '' : 'none';
  });

  // doc-back button
  const backTexts = { en: '← Back', es: '← Volver', zh: '← 返回' };
  document.querySelectorAll('.doc-back').forEach(el => {
    el.textContent = backTexts[lang];
  });

  // home bottom buttons: hb-en/es/zh already handled by prefix loop
  // but also update hbio-loc
  const locTexts = {
    en: 'Based in Barcelona · Available worldwide',
    es: 'Basada en Barcelona · Disponible en todo el mundo',
    zh: '常驻巴塞罗那 · 全球可约旅扎'
  };
  document.querySelectorAll('.hbio-loc').forEach(el => {
    el.textContent = locTexts[lang];
  });

  // doc-p (shop description) — has .en .es .zh spans inside
  SUFFIXES.forEach(suffix => {
    document.querySelectorAll('.doc-p .'+suffix).forEach(el => {
      el.style.display = (suffix === lang) ? 'inline' : 'none';
    });
  });

  // Shopify / shop CTA primary text (first text node)
  // CTA main text spans
  ['en','es','zh'].forEach(suffix => {
    document.querySelectorAll('.cta-main-' + suffix).forEach(el => {
      el.style.display = (suffix === lang) ? '' : 'none';
    });
  });

  // Store preference
  try { localStorage.setItem('qqc_lang', lang); } catch(e) {}
  // Sync lang to gallery iframe if open
  var _gf = document.getElementById('galleryFrame');
  if (_gf && _gf.contentWindow) _gf.contentWindow.postMessage({ type: 'setLang', lang: lang }, '*');
}

function setLang(lang) {
  applyLang(lang);
  // Hide language select
  const ls = document.getElementById('langSelect');
  ls.classList.remove('show');
  setTimeout(() => {
    ls.style.display = 'none';
    // Start jack animation now that app is visible
    if (typeof replayJack === 'function') setTimeout(replayJack, 200);
  }, 500);
}

function cycleLang() {
  const order = ['en', 'es', 'zh'];
  const next = order[(order.indexOf(currentLang) + 1) % 3];
  applyLang(next);
}

// Lang select is shown directly by endSplash in finder IIFE

// On load: check saved lang preference
(function() {
  try {
    const saved = localStorage.getItem('qqc_lang');
    if (saved) currentLang = saved;
  } catch(e) {}
  // Apply immediately so elements start in right state
  // (will be re-applied when lang is chosen)
  applyLang('en'); // default hidden state: show EN
})();



/* ════ GALLERY ════ */
function galSelect(el, num) {
  document.querySelectorAll('.gal-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  const msg = encodeURIComponent(`Hi! I want to book a flash tattoo — design #${num}`);
  const url = `https://wa.me/34661329006?text=${msg}`;
  ['galNum','galNum2','galNum3'].forEach(id => {
    const el2 = document.getElementById(id);
    if (el2) el2.textContent = num;
  });
  const waBtn = document.getElementById('galWaBtn');
  if (waBtn) waBtn.href = url;
  const sel = document.getElementById('galSelected');
  if (sel) sel.style.display = 'flex';

  // Apply current language to newly shown elements
  if (typeof applyLang === 'function') applyLang(currentLang);
}