import {$,on,sleep,showToast} from './core.js';
import {spawnSparkles} from './effects.js';

const missedMessages=[
  {time:'03:43',who:'right',text:'Так ти куди зараз'},
  {time:'03:44',who:'right',text:'Бо я нічо не поняв'},
  {time:'03:44',who:'left',text:'До дому і паходу йдем кудась'},
  {time:'03:44',who:'right',text:'Куда йдете'},
  {time:'03:44',who:'right',text:'Давай я біля тебе зараз буду'},
  {time:'03:45',who:'left',text:'Нашо'},
  {time:'03:45',who:'right',text:'Я скучив'},
  {time:'03:45',who:'right',text:'На пару хвилин'},
  {time:'03:46',who:'right',text:'Давай зараз буду біля тебе'},
  {time:'03:46',who:'left',text:'Я буду біля Оліка'},
  {time:'03:46',who:'right',text:'Окей'}
];
let running=false;
function missedTyping(who){const d=document.createElement('div');d.className=`miss-msg ${who} miss-typing`;d.innerHTML='<span class="typing-dots"><i></i><i></i><i></i></span>';return d;}
export async function playMissed(){
  if(running)return; running=true;
  const replay=$('#playMissedChat'),wrap=$('#missedMessages');
  if(!wrap){running=false;return}
  if(replay) replay.textContent='переписка йде…'; wrap.innerHTML='';
  for(const msg of missedMessages){
    $('#missedClock').textContent=msg.time;
    const typing=missedTyping(msg.who); wrap.appendChild(typing); wrap.scrollTo({top:wrap.scrollHeight,behavior:'smooth'});
    await sleep(msg.text==='Я скучив'?1250:760+Math.min(420,msg.text.length*9));
    typing.remove();
    const div=document.createElement('div'); div.className=`miss-msg ${msg.who}`; div.innerHTML=`<span>${msg.text}</span><small>${msg.time}</small>`;
    if(msg.text==='Я скучив') div.classList.add('miss-heart-line');
    wrap.appendChild(div); wrap.scrollTo({top:wrap.scrollHeight,behavior:'smooth'});
    await sleep(msg.text==='Я скучив'?2100:1450);
  }
  running=false; if(replay) replay.textContent='ще раз';
}
export function buildRain(){
  const rain=$('#missedRain'); if(!rain||rain.dataset.done)return;
  for(let i=0;i<42;i++){ const d=document.createElement('i'); d.style.left=Math.random()*100+'%'; d.style.animationDelay=(-Math.random()*8)+'s'; d.style.animationDuration=(3.5+Math.random()*3.5)+'s'; d.style.opacity=.08+Math.random()*.14; rain.appendChild(d); }
  rain.dataset.done='1';
}
function moveTickle(){ const btn=$('#tickleText'),zone=btn?.parentElement;if(!btn||!zone)return;const x=(Math.random()*.6-.3)*zone.clientWidth;const y=(Math.random()*.5-.25)*zone.clientHeight;btn.style.transform=`translate(${x}px,${y}px) rotate(${(Math.random()-.5)*8}deg)`; }
export function initMissed(){
  on('#playMissedChat','click',playMissed);
  on('#gooseBtn','click',()=>{ $('#gooseMoment')?.classList.add('goose-active'); $('#gooseText').textContent='бля, мурашки'; setTimeout(()=>$('#gooseMoment')?.classList.remove('goose-active'),2200); });
  on('#kissBtn','click',()=>{ const el=$('#kissMoment');el?.classList.remove('kiss-active');void el?.offsetWidth;el?.classList.add('kiss-active');spawnSparkles(el,12);showToast('цьом 💋');setTimeout(()=>el?.classList.remove('kiss-active'),3200); });
  on('#tickleText','pointerenter',moveTickle); on('#tickleText','click',()=>{moveTickle();showToast('ага. звичайно 😛')});
}
