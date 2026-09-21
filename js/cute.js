import {$,$$,on,showToast} from './core.js';
import {heartBurst,spawnButterflies,spawnSparkles} from './effects.js';

const tinyLines=['цьом 💋','іди сюди 🥺','мімімі','обіймаю','Сонечко ❤️','ну шо ти така гарна'];
let tinyIndex=0;

function floatNote(anchor,text){
  if(!anchor) return;
  const r=anchor.getBoundingClientRect();
  const n=document.createElement('span');
  n.className='cute-float-note'; n.textContent=text;
  n.style.left=(r.left+r.width/2)+'px'; n.style.top=(r.top-2)+'px';
  document.body.appendChild(n); setTimeout(()=>n.remove(),2500);
}

export function initCuteStuff(){
  on('#littleThingBtn','click',()=>{
    const btn=$('#littleThingBtn');
    const line=tinyLines[tinyIndex++%tinyLines.length];
    floatNote(btn,line); spawnSparkles(btn,7);
  });

  const badge03=$('.hero-badge.one');
  badge03?.addEventListener('click',()=>{spawnButterflies(badge03,11);showToast('метелики. кожен раз 🦋')});

  const mimimi=$('.hero-badge.two');
  mimimi?.addEventListener('click',()=>{heartBurst(mimimi,9);mimimi.classList.remove('badge-bounce');void mimimi.offsetWidth;mimimi.classList.add('badge-bounce')});

  const badge798=$('.hero-badge.three');
  badge798?.addEventListener('click',()=>{spawnSparkles(badge798,13);showToast('7 · 9 · 8 ✦')});

  $$('.tanya-shot').forEach(shot=>shot.addEventListener('click',()=>{
    shot.classList.remove('photo-pop'); void shot.offsetWidth; shot.classList.add('photo-pop');
    heartBurst(shot,6);
  }));

  let subClicks=0;
  $('.brand-sub')?.addEventListener('click',()=>{
    subClicks++;
    if(subClicks===4){spawnButterflies($('.topbar-branding'),14);showToast('ну та. в нас реально все не як в людей ❤️');subClicks=0;}
  });

  let grechkaClicks=0;
  $('#grechkaSecret')?.addEventListener('click',()=>{
    grechkaClicks++;
    if(grechkaClicks===3){
      const hero=$('.hero-copy');
      const sticker=document.createElement('span');sticker.className='grechka-sticker';sticker.textContent='гречка ✓';hero?.appendChild(sticker);
      spawnSparkles($('#grechkaSecret'),10);setTimeout(()=>sticker.remove(),2800);grechkaClicks=0;
    }
  });

  document.addEventListener('dblclick',e=>{
    const card=e.target.closest('.comfort-hub-card');
    if(!card) return;
    spawnButterflies(card,12); showToast('подвійний обійм 🥺');
  });
}
