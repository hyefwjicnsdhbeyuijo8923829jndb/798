import {$,$$,on} from './core.js';
let current=null;
export function initArchive(){
  $$('.archive-filter .chip').forEach(chip=>chip.addEventListener('click',()=>{ $$('.archive-filter .chip').forEach(c=>c.classList.remove('active'));chip.classList.add('active');const f=chip.dataset.filter;$$('.shot-card').forEach(card=>{const tags=card.dataset.filterItem.split(' ');card.style.display=(f==='all'||tags.includes(f))?'':'none'}) }));
  $$('.shot-card').forEach(card=>card.addEventListener('click',()=>{current={focus:card.dataset.img,full:card.dataset.full,showingFull:false};$('#lightboxImg').src=current.focus;$('#lightboxTitle').textContent=card.dataset.title;$('#lightboxFullBtn').textContent='показати весь скрін';$('#lightbox').classList.remove('hidden')}));
  on('#lightboxFullBtn','click',()=>{if(!current)return;current.showingFull=!current.showingFull;$('#lightboxImg').src=current.showingFull?current.full:current.focus;$('#lightboxFullBtn').textContent=current.showingFull?'повернути акцент':'показати весь скрін'});
  on('#closeLightbox','click',()=>$('#lightbox')?.classList.add('hidden'));
  $('#lightbox')?.addEventListener('click',e=>{if(e.target.id==='lightbox')$('#lightbox').classList.add('hidden')});
  on('#archivePrev','click',()=>$('#archiveGrid')?.scrollBy({left:-360,behavior:'smooth'}));
  on('#archiveNext','click',()=>$('#archiveGrid')?.scrollBy({left:360,behavior:'smooth'}));
}
