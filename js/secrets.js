import {$,$$,on,showToast} from './core.js';

const comfortLines=[
  'я десь тут. навіть якщо зараз не поруч.',
  'якщо ти це відкрила — цьом тебе 💋',
  'я теж, скоріш за все, скучив.',
  'ще трохи — і знову будемо сидіти довше, ніж планували.',
  'мімімі 🥺',
  'Сонечко, все добре. я поруч ❤️'
];
let comfortIndex=0;
let cowTimer;
export function initSecrets(){
  const openComfort=()=>{ $('#comfortModal')?.classList.remove('hidden'); if($('#comfortText')) $('#comfortText').textContent=comfortLines[comfortIndex%comfortLines.length]; };
  on('#comfortHub','click',openComfort);
  on('#comfortMore','click',()=>{comfortIndex=(comfortIndex+1)%comfortLines.length;const t=$('#comfortText');if(!t)return;t.classList.remove('comfort-swap');void t.offsetWidth;t.classList.add('comfort-swap');t.textContent=comfortLines[comfortIndex]});
  on('#comfortClose','click',()=>$('#comfortModal')?.classList.add('hidden'));
  $('#comfortModal')?.addEventListener('click',e=>{if(e.target.id==='comfortModal')e.currentTarget.classList.add('hidden')});

  on('#secretCowBtn','click',()=>{const stage=$('#secretCowStage');clearTimeout(cowTimer);stage?.classList.remove('visible');void stage?.offsetWidth;stage?.classList.add('visible');cowTimer=setTimeout(()=>stage?.classList.remove('visible'),4200)});
  on('#dateSecretBtn','click',()=>{const t=$('#dateSecretText');if(t){t.textContent='2 + 6 = 8. тому 07 · 09 · 26 → 7 · 9 · 8. в нас все не як в людей 😛';t.classList.add('show')}showToast('математика стосунків працює саме так')});
  on('#grechkaSecret','click',()=>showToast('а каша яка? гречана? 😛'));
  on('#finalSecret','click',()=>showToast('«дуже дуже. ті моменти це просто… ну словами не описати» 🥺'));
  $$('.tanya-shot').forEach((shot,i)=>shot.addEventListener('click',()=>showToast(['Сонечко 🥰','Зайчик 💋','Киця ❤️'][i]||'мімімі')));
}

export function initFinal(){
  on('#openLetterBtn','click',()=>{
    const gate=$('#finalGate'),letter=$('#finalLetter');gate?.classList.add('opening');
    for(let i=0;i<18;i++){const h=document.createElement('span');h.className='letter-heart';h.textContent='♡';h.style.left=(40+Math.random()*20)+'%';h.style.top=(45+Math.random()*10)+'%';h.style.setProperty('--dx',((Math.random()-.5)*260)+'px');h.style.setProperty('--dy',(-80-Math.random()*180)+'px');document.body.appendChild(h);setTimeout(()=>h.remove(),1500)}
    setTimeout(()=>{gate?.classList.add('hidden');letter?.classList.remove('hidden');requestAnimationFrame(()=>{letter?.classList.add('letter-visible');$('.final-footer-secret')?.classList.add('visible')})},700);
  });
}
