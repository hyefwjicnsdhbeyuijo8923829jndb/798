import {$,$$,on,showToast} from './core.js';

export function initStory(){
  const bathLines=[
    'пізніше ти сама казала, що зазвичай не любиш мати справу з п’яними / хворими людьми. а тут чомусь залишилась.',
    'і так, руки в мене були холодні вже тоді. це був ранній спойлер до пуголовка.',
    'дуже дивний старт. але я за нього вдячний.'
  ];
  let bathIndex=0;
  on('#bathFactBtn','click',()=>{ const t=$('#bathFact'); if(t) t.textContent=bathLines[bathIndex++%bathLines.length]; });
  on('#benchBtn','click',()=>$('.bench')?.classList.toggle('close'));
  on('#handConnectBtn','click',()=>{
    $('#handMoment')?.classList.add('connected');
    const line=$('#handLine'); if(line) line.textContent='ти сама взяла мене за руку. і це я дуже добре пам’ятаю.';
    showToast('07.09 — офіційно ми ♡');
  });
  $$('.love-stop').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.love-stop').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const c=$('#loveCaption'); if(c) c.textContent=btn.dataset.love;
  }));
  on('#milkaSecret','click',()=>showToast('«дякую за шоколадку» 💋'));
  on('.bench-card .moon','click',()=>showToast('ще 10 хвилин і йдемо… ага'));
}
