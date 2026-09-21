export const $ = (s, root=document) => root.querySelector(s);
export const $$ = (s, root=document) => [...root.querySelectorAll(s)];
export const sleep = ms => new Promise(r=>setTimeout(r,ms));
export const on = (sel, evt, fn, root=document) => {
  const el = typeof sel === 'string' ? $(sel, root) : sel;
  if(el) el.addEventListener(evt, fn);
  return el;
};
export function showToast(text, ms=3000){
  const toast=$('#toast');
  if(!toast) return;
  toast.textContent=text;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),ms);
}
export function daysCalc(){
  const start=new Date('2026-09-07T00:00:00');
  const now=new Date();
  const a=new Date(start.getFullYear(),start.getMonth(),start.getDate());
  const b=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const d=Math.max(0,Math.floor((b-a)/86400000));
  const days=$('#daysTogether'), word=$('#daysWord');
  if(days) days.textContent=d;
  if(word){
    const m10=d%10,m100=d%100;
    word.textContent=(m10===1&&m100!==11)?'день разом':([2,3,4].includes(m10)&&![12,13,14].includes(m100)?'дні разом':'днів разом');
  }
}
