import {$,$$,on,showToast} from './core.js';

const flowers={rose:'assets/polished/flowers/spray-rose.webp',peony:'assets/polished/flowers/peony.webp',ranunculus:'assets/polished/flowers/blush.webp',eustoma:'assets/polished/flowers/eustoma.webp'};
const slots=[
  {x:50,r:0,s:1.00,z:6,y:132},{x:39,r:-7,s:.86,z:5,y:124},{x:61,r:7,s:.88,z:5,y:126},
  {x:29,r:-11,s:.76,z:4,y:116},{x:71,r:11,s:.78,z:4,y:118},{x:44,r:-4,s:.82,z:7,y:134},
  {x:56,r:4,s:.82,z:8,y:134},{x:20,r:-14,s:.66,z:3,y:110},{x:80,r:14,s:.66,z:3,y:110}
];
let flowerCount=0;
export function initFavorites(){
  $$('[data-flower]').forEach(btn=>btn.addEventListener('click',()=>{
    const holder=$('#bouquetFlowers'); if(!holder)return;
    $('#bouquetFinal')?.classList.remove('visible');
    holder.classList.remove('finished');
    $('#bouquetCanvas')?.classList.remove('is-finished');
    if(holder.children.length>=slots.length)holder.firstElementChild.remove();
    const slot=slots[flowerCount%slots.length];
    const img=document.createElement('img'); img.className=`bouquet-stem flower-${btn.dataset.flower}`; img.src=flowers[btn.dataset.flower];img.alt=btn.dataset.flower;
    img.style.setProperty('--x',`${slot.x}%`);img.style.setProperty('--rot',`${slot.r}deg`);img.style.setProperty('--scale',slot.s);img.style.zIndex=slot.z;img.style.setProperty('--y',`${slot.y}px`);
    holder.appendChild(img); flowerCount++;
    if($('#finishBouquet')) $('#finishBouquet').disabled=flowerCount<4;
    if(flowerCount===1) showToast('початок є 🌸'); if(flowerCount===4) showToast('мімімі, вже дуже гарно 🥺'); if(flowerCount===7) showToast('ще трохи — і можна нести тобі');
  }));
  on('#finishBouquet','click',()=>{if(flowerCount<4)return;$('#bouquetCanvas')?.classList.add('is-finished');$('#bouquetFlowers')?.classList.add('finished');$('#bouquetFinal')?.classList.add('visible');showToast('оце вже букет для Сонечка 🥰')});
  on('#clearBouquet','click',()=>{$('#bouquetCanvas')?.classList.remove('is-finished');$('#bouquetFlowers')?.replaceChildren();$('#bouquetFlowers')?.classList.remove('finished');$('#bouquetFinal')?.classList.remove('visible');flowerCount=0;if($('#finishBouquet'))$('#finishBouquet').disabled=true});
  on('#bouquetHeart','click',()=>{const h=$('#bouquetHeart');h?.classList.remove('heart-wiggle');void h?.offsetWidth;h?.classList.add('heart-wiggle');showToast('цей букет я б реально приніс тобі 🥺')});
  on('#gummyBtn','click',()=>{const g=$('.gummy-gallery');g?.classList.remove('gummy-bounce');void g?.offsetWidth;g?.classList.add('gummy-bounce');const lines=['кислі теж зараховано','желейки — абсолютна база','ще одну пачку сюди','тут без обмежень'];const t=lines[Math.floor(Math.random()*lines.length)];if($('#gummyText'))$('#gummyText').textContent=t;showToast(t)});
  on('#raceBtn','click',()=>{const b=$('#mustangRun'),a=$('#audiRun');if(!b||!a)return;b.style.transition='none';a.style.transition='none';b.style.left='6px';a.style.left='6px';if($('#raceText'))$('#raceText').textContent='';requestAnimationFrame(()=>requestAnimationFrame(()=>{b.style.transition='left 3s cubic-bezier(.18,.8,.2,1)';a.style.transition='left 3.35s cubic-bezier(.18,.8,.2,1)';b.style.left='calc(100% - 100px)';a.style.left='calc(100% - 100px)';setTimeout(()=>{if($('#raceText'))$('#raceText').textContent='сьогодні BMW вирвалась вперед. Audi теж виглядає дуже достойно.';showToast('фініш. без сварок через машини :)')},3500)}))});
  $$('.secret-snack').forEach(card=>card.addEventListener('click',()=>{const lines={snickers:'Snickers — тут взагалі без питань 😛',syrki:'карамель + ваніль. я запам’ятав.',milk:'полуничне молоко — теж у списку, Сонечко 🥰'};showToast(lines[card.dataset.snack]||'смакота')}));
  $$('.secret-car').forEach(card=>card.addEventListener('dblclick',()=>showToast(card.dataset.car==='bmw'?'добре, тут твоя BMW 😛':'а тут я все ще стою за Audi')));
}
