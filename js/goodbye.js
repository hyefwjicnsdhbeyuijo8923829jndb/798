import {$,on,showToast} from './core.js';
import {goodbyeReasons} from '../data/later-data.js';

export function initGoodbye(){
  let clicks=0;
  const steps=[
    {time:'00:05',note:'ще 5 хвилин',button:'ще буквально трошки'},
    {time:'00:17',note:'ще буквально трошки',button:'та вже реально треба'},
    {time:'00:31',note:'та вже реально треба',button:'останній цьом'},
    {time:'00:46',note:'останній цьом',button:'ну ще один'},
    {time:'00:46',note:'ну ще один',button:'всьо. точно йдемо'}
  ];
  on('#delayBtn','click',()=>{
    const button=$('#delayBtn'),time=$('#goodbyeTime'),note=$('#goodbyeNote'),people=$('#goodbyePeople');
    const step=steps[Math.min(clicks,steps.length-1)];
    if(time){time.textContent=step.time;time.classList.remove('time-pop');void time.offsetWidth;time.classList.add('time-pop')}
    if(note)note.textContent=step.note;
    if(button){button.textContent=step.button;button.classList.remove('goodbye-shift-1','goodbye-shift-2','goodbye-shift-3');button.classList.add(`goodbye-shift-${(clicks%3)+1}`)}
    people?.classList.add('closer');setTimeout(()=>people?.classList.remove('closer'),1500);
    showToast(step.note);
    clicks++;
    if(clicks>=5){
      const reveal=$('#everytimeReveal');
      if(reveal){reveal.hidden=false;reveal.classList.remove('show');void reveal.offsetWidth;reveal.classList.add('show')}
      showToast('та кожного разу ❤️',2500);
      clicks=0;
    }
  });

  const chooseStay=()=>{document.querySelector('#delayBtn')?.click();const text=$('#goodbyeChoiceText');if(text)text.textContent='ага. ще 5 хвилин 😭'};
  on('#stayChoice','click',chooseStay);
  on('#leaveChoice','click',()=>{chooseStay();const text=$('#goodbyeChoiceText');if(text)text.textContent='неправильна відповідь. ще 5 хвилин 😭'});

  on('#speedKiss','click',()=>{
    const value=$('#nextKissValue');if(value)value.textContent='працює тільки наживо 😭';
    showToast('ну тут сайт безсилий');
  });

  let reasonIndex=-1;
  on('#whyStillBtn','click',()=>{
    if(!goodbyeReasons.length)return;
    reasonIndex=(reasonIndex+1)%goodbyeReasons.length;
    const text=$('#whyStillText');if(text){text.textContent=goodbyeReasons[reasonIndex];text.classList.remove('reason-pop');void text.offsetWidth;text.classList.add('reason-pop')}
  });
}
