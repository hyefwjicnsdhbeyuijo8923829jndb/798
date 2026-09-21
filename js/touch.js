import {$,on,showToast} from './core.js';

export function initTouch(){
  let heat=10;
  on('#warmBtn','click',()=>{
    heat=Math.min(100,heat+20);
    const fill=$('#thermoFill'); if(fill) fill.style.height=`${Math.max(12,heat)}px`;
    const text=heat<60?'ще прохолодний':heat<95?'о, вже краще':'✓ успішно зігрітий пуголовок';
    if($('#warmText')) $('#warmText').textContent=text;
    showToast(heat>=80?'пуголовок майже зігрівся':'гріємо далі');
  });
  on('#hugBtn','click',()=>{
    $('#hugBox')?.classList.toggle('hugged');
    if($('#hugText')) $('#hugText').textContent=$('#hugBox')?.classList.contains('hugged')?'от. так уже правильно.':'';
    showToast('мімімі 🥺');
  });
  on('#shoulderBtn','click',()=>{
    $('#shoulderBox')?.classList.toggle('done');
    if($('#shoulderText')) $('#shoulderText').textContent='«в мене такі мурашки пішли»';
    showToast('цей момент я б повторював ще і ще');
  });
  on('#blinkBtn','click',()=>{
    const box=$('#eyesBox'); box?.classList.remove('blink'); void box?.offsetWidth; box?.classList.add('blink');
    setTimeout(()=>box?.classList.remove('blink'),1100);
    showToast('це в мене сірувато-блакитні 😛');
  });
}
