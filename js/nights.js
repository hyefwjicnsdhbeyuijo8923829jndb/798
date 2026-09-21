import {$,$$,on,sleep,showToast} from './core.js';
import {buildStars,spawnButterflies,spawnSparkles} from './effects.js';
import {nightChat} from '../data/night-chat.js';

let nightRunning=false;
let meteorLoop=null;

function renderTyping(who){
  const div=document.createElement('div');
  div.className=`nmsg ${who} typing-row`;
  div.innerHTML='<div class="nmsg-body typing-bubble"><span></span><span></span><span></span></div>';
  return div;
}

function renderMessage(msg){
  const div=document.createElement('div');
  div.className=`nmsg ${msg.who}`;
  const bubble=document.createElement('div');
  bubble.className='nmsg-body';
  if(msg.replyTo){
    const reply=document.createElement('div');
    reply.className='nmsg-reply';
    reply.textContent=msg.replyTo;
    bubble.appendChild(reply);
  }
  const text=document.createElement('span');
  text.className='nmsg-text';
  text.textContent=msg.text;
  bubble.appendChild(text);
  const meta=document.createElement('small');
  meta.className='nmsg-meta';
  meta.textContent=`${msg.sender} · ${msg.time}`;
  bubble.appendChild(meta);
  div.appendChild(bubble);
  return div;
}

export async function playNightChat(){
  if(nightRunning) return;
  nightRunning=true;
  const wrap=$('#nightMessages'), playBtn=$('#playNightBtn');
  if(!wrap){nightRunning=false;return;}
  if(playBtn) playBtn.textContent='ніч прокручується…';
  wrap.innerHTML='';
  for(const msg of nightChat){
    $('#nightClock').textContent=msg.time;

    const typing=renderTyping(msg.who);
    wrap.appendChild(typing);
    wrap.scrollTo({top:wrap.scrollHeight,behavior:'smooth'});
    const typingPause=Math.min(1450,650+msg.text.length*7+(msg.replyTo?180:0));
    await sleep(typingPause);
    typing.remove();

    const node=renderMessage(msg);
    if(msg.text.toLowerCase().includes('метелики')){
      node.classList.add('butterfly-message');
      node.title='тиць';
      node.addEventListener('click',()=>spawnButterflies(node,10));
    }
    wrap.appendChild(node);
    wrap.scrollTo({top:wrap.scrollHeight,behavior:'smooth'});

    const pause=msg.text.length>180?2350:msg.text.length>100?1950:msg.replyTo?1700:1350;
    await sleep(pause);
  }
  nightRunning=false;
  if(playBtn) playBtn.textContent='ще раз';
}

export function spawnMeteor(delay=0){
  const sky=$('#nightSky'); if(!sky) return;
  setTimeout(()=>{
    const line=document.createElement('span');
    line.className='meteor-line';
    line.style.left=(50+Math.random()*38)+'%';
    line.style.top=(4+Math.random()*42)+'%';
    line.style.setProperty('--travel',(180+Math.random()*180)+'px');
    line.style.setProperty('--meteor-scale',(.8+Math.random()*.5));
    sky.appendChild(line);
    setTimeout(()=>line.remove(),2400);
  },delay);
}

export function startNightMeteors(){
  buildStars('#nightSky',160);
  if(meteorLoop) return;
  meteorLoop=setInterval(()=>{
    if(!$('#nights')?.classList.contains('active-page')) return;
    spawnMeteor(0);
    if(Math.random()>.45) spawnMeteor(520);
  },4400);
}

export function initNights(){
  on('#playNightBtn','click',playNightChat);
  on('#showConstellations','click',()=>{
    $('#constellationMap')?.classList.toggle('revealed');
    showToast('Велика і Мала ведмедиці ✦');
  });
  on('#shootingStarBtn','click',()=>{
    [0,260,620,980,1420,1880].forEach(spawnMeteor);
    const wishes=['тільки не кажи вголос, бо не збудеться ✦','бажання загадане. тепер чекаємо.','зоря впала. значить можна ще одне бажання.'];
    const t=$('#starWish'); if(t) t.textContent=wishes[Math.floor(Math.random()*wishes.length)];
  });
  on('#nightClock','click',()=>showToast('03:13 — ті моменти словами не описати'));
  let moonClicks=0;
  on('.night-moon','click',()=>{
    moonClicks++; showToast('місяць теж сьогодні все бачив ✦'); spawnMeteor(120);
    if(moonClicks===4){ spawnSparkles($('.night-moon'),18); showToast('ти його дотицяла. тепер він наш 🌙'); moonClicks=0; }
  });
}
