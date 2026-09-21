import {loadPageImages} from './loader.js';
import {$,$$,showToast} from './core.js';

const labels={hub:'наш маленький світ',story:'наша історія',nights:'нічні розмови',missed:'я просто скучив',goodbye:'не хочу йти',touch:'тактильність',tanya:'твої улюблені штуки',zoo:'хто сьогодні Макс?',archive:'Telegram-архів',secret:'секретна кімната',final:'на кінець'};
let hooks={};
export function setNavigationHooks(map){ hooks=map||{}; }
export function go(id){
  const current=$('.page.active-page'),next=document.getElementById(id);
  if(!next)return;
  loadPageImages(next);
  if(current===next)return;
  current?.classList.remove('active-page');
  next.classList.add('active-page');
  const label=$('#sectionLabel');if(label)label.textContent=labels[id]||'7 · 9 · 8';
  window.scrollTo({top:0,behavior:'instant'});
  hooks[id]?.();
  document.dispatchEvent(new CustomEvent('pagechange',{detail:id}));
}
export function initNavigation(){
  $$('[data-go]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.go)));
}
