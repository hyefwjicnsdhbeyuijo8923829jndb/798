import {$,$$,showToast} from './core.js';

export function buildStars(selector,n){
  const el=$(selector); if(!el||el.dataset.done) return;
  n=matchMedia('(max-width:600px)').matches?Math.min(n,36):n;
  for(let i=0;i<n;i++){
    const s=document.createElement('span');
    s.className='gen-star';
    s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
    const size=Math.random()*2.4+1;
    s.style.width=size+'px'; s.style.height=size+'px';
    s.style.opacity=.25+Math.random()*.7;
    s.animate([{opacity:s.style.opacity,transform:'scale(1)'},{opacity:.18,transform:'scale(.55)'},{opacity:s.style.opacity,transform:'scale(1)'}],{duration:3000+Math.random()*4200,iterations:Infinity,delay:Math.random()*2400});
    el.appendChild(s);
  }
  el.dataset.done='1';
}

export function buildAmbientFx(){
  const wrap=$('#ambientFx'); if(!wrap||wrap.dataset.done) return;
  for(let i=0;i<10;i++){
    const el=document.createElement('span');
    el.className=i%5===0?'ambient-heart':'ambient-star';
    el.style.left=Math.random()*100+'%'; el.style.top=Math.random()*100+'%';
    el.style.animationDelay=(-Math.random()*12)+'s'; el.style.animationDuration=(13+Math.random()*14)+'s';
    wrap.appendChild(el);
  }
  wrap.dataset.done='1';
}

export function heartBurst(button,count=12){
  if(!button || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  count=Math.min(count,6);
  const rect=button.getBoundingClientRect();
  for(let i=0;i<count;i++){
    const h=document.createElement('span'); h.className='heart-burst'; h.textContent=i%3===0?'💗':'❤️';
    h.style.left=(rect.left+rect.width/2)+'px'; h.style.top=(rect.top+rect.height/2)+'px';
    h.style.setProperty('--hx',((Math.random()-.5)*190)+'px');
    h.style.setProperty('--hy',(-60-Math.random()*170)+'px');
    h.style.setProperty('--hr',(Math.random()*80-40)+'deg');
    document.body.appendChild(h); setTimeout(()=>h.remove(),1800);
  }
}

export function initHeart(){
  let clicks=0;
  $('#miniHeart')?.addEventListener('click',()=>{
    clicks++; heartBurst($('#miniHeart'),12);
    const arr=['мімімі 🥰','Сонечко ❤️','Зайчик 💋','Киця 🥺','люблю тебе ❤️','ти дуже гарна'];
    if(clicks===7){
      showToast('десь щось відкрилось… 7 · 9 · 8');
      const unlock=$('#secretUnlock'); unlock?.classList.remove('hidden'); unlock?.classList.add('secret-flash');
      setTimeout(()=>{unlock?.classList.remove('secret-flash');},8000); clicks=0;
    } else showToast(arr[Math.floor(Math.random()*arr.length)]);
  });
}

export function initScrollReveal(){
  const targets=$$('.story-card, .hub-card, .touch-card, .mood-card, .bouquet-panel, .snacks-panel, .garage-panel, .shot-card, .lore-panel, .wheel-panel, .goodbye-visual, .goodbye-list, .missed-moment, .missed-chat, .missed-final, .tanya-shot');
  targets.forEach(el=>el.classList.add('reveal-on-scroll'));
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}}),{threshold:.1,rootMargin:'0px 0px -35px 0px'});
  targets.forEach(el=>io.observe(el));
}

export function initTapGlow(){
  $$('button').forEach(btn=>btn.addEventListener('pointerdown',e=>{
    const r=document.createElement('span'); r.className='tap-glow'; const rect=btn.getBoundingClientRect();
    r.style.left=(e.clientX-rect.left)+'px'; r.style.top=(e.clientY-rect.top)+'px'; btn.appendChild(r); setTimeout(()=>r.remove(),850);
  }));
}


export function spawnButterflies(anchor,count=8){
  if(!anchor) return;
  const r=anchor.getBoundingClientRect();
  for(let i=0;i<count;i++){
    const b=document.createElement('span');
    b.className='butterfly-fx';
    b.textContent=i%3===0?'🦋':'♡';
    b.style.left=(r.left+r.width*(.25+Math.random()*.5))+'px';
    b.style.top=(r.top+r.height*.45)+'px';
    b.style.setProperty('--bx',((Math.random()-.5)*170)+'px');
    b.style.setProperty('--by',(-70-Math.random()*150)+'px');
    b.style.setProperty('--br',((Math.random()-.5)*55)+'deg');
    b.style.animationDelay=(Math.random()*.18)+'s';
    document.body.appendChild(b);
    setTimeout(()=>b.remove(),2600);
  }
}

export function spawnSparkles(anchor,count=10){
  if(!anchor) return;
  const r=anchor.getBoundingClientRect();
  for(let i=0;i<count;i++){
    const s=document.createElement('span');
    s.className='sparkle-fx';
    s.textContent=i%2?'✦':'·';
    s.style.left=(r.left+r.width/2)+'px';
    s.style.top=(r.top+r.height/2)+'px';
    s.style.setProperty('--sx',((Math.random()-.5)*190)+'px');
    s.style.setProperty('--sy',((Math.random()-.5)*150)+'px');
    s.style.animationDelay=(Math.random()*.12)+'s';
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),1900);
  }
}

export function initAnimationVisibility(){
  const controlled=new Set();
  function sync(){
    document.body.classList.toggle('motion-paused',document.hidden);
    document.querySelectorAll('.gen-star').forEach(star=>{
      const visible=!document.hidden && star.closest('.active-page') && !document.querySelector('#app.hidden');
      star.getAnimations().forEach(animation=>{
        if(!visible){animation.pause();controlled.add(animation);}
        else if(controlled.has(animation)){animation.play();controlled.delete(animation);}
      });
    });
  }
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('pagechange',sync);
  document.querySelector('#enterWorld')?.addEventListener('click',sync);
  sync();
}
