import {$,$$,on,showToast} from './core.js';
const states=[
  {type:'maltipu',icon:'🐶',line:'сьогодні ти мальтіпу'},
  {type:'bibizyana',icon:'🐒',line:'сьогодні ти бібізяна'},
  {type:'pugolovok',icon:'🐸',line:'сьогодні ти пуголовок'},
  {type:'nopod',icon:'🚫',line:'макс сьогодні без пода'}
];
export function initZoo(){
  on('#spinZooBtn','click',()=>{const idx=Math.floor(Math.random()*states.length),state=states[idx];$('#zooWheel').style.transform=`rotate(${900+idx*120}deg)`;$('#zooWheel .wheel-center').textContent=state.icon;$('#zooResult').textContent=state.line;showToast(state.line);$$('.lore-card').forEach(c=>c.classList.remove('active'));$(`.lore-card[data-type="${state.type}"]`)?.classList.add('active')});
  on('#zooSecretBtn','click',()=>showToast('а якщо серйозно — ти для мене просто моя людина'));
}
