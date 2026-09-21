import {$,on,showToast} from './core.js';

export function initGoodbye(){
  let seconds=0;
  const notes=['ну ше трішки','ще буквально хвилинка','ну реально не хочу йти','і ще один раз обійнятись','ладно, ще трішки стоїмо','ну все, остання... майже'];
  on('#delayBtn','click',()=>{
    seconds+=120;
    const mm=String(Math.floor(seconds/60)).padStart(2,'0');
    const time=$('#goodbyeTime'); if(time){time.textContent=`${mm}:00`;time.classList.remove('time-pop');void time.offsetWidth;time.classList.add('time-pop')}
    $('#goodbyePeople')?.classList.add('closer'); setTimeout(()=>$('#goodbyePeople')?.classList.remove('closer'),1900);
    const note=notes[Math.min(notes.length-1,Math.max(0,seconds/120-1))];
    if($('#goodbyeNote')) $('#goodbyeNote').textContent=note;
    showToast(note);
  });
}
