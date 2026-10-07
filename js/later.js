import {$,$$,on,showToast,sleep} from './core.js';
import {spawnSparkles,heartBurst} from './effects.js';
import {
  sitePulsePhrases,nightPulsePhrases,returnVisitPhrases,aboutUsPoints,initiativeMoments,loveThings,noticedThings,
  savedHeadMemories,changedMeLines,beforeAfterPairs,dailyPhraseBank,wantNowPhrases,
  allMemories,monthMainKeys,monthCallbackKeys
} from '../data/later-data.js';

function show(el){ if(el) el.hidden=false; }
function hide(el){ if(el) el.hidden=true; }
function pick(arr,last=-1){
  if(!arr.length) return {value:'',index:-1};
  let index=Math.floor(Math.random()*arr.length);
  if(arr.length>1 && index===last) index=(index+1)%arr.length;
  return {value:arr[index],index};
}
function escapeHtml(value=''){
  return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function initSitePulse(){
  const el=$('#sitePulse'); if(!el)return;
  const now=new Date(),hour=now.getHours(),minute=now.getMinutes();
  const night=(hour===23&&minute>=30)||hour<5;
  el.textContent=pick(night?nightPulsePhrases:sitePulsePhrases).value;
  el.classList.toggle('night-pulse',night);
}

function initReturnVisit(){
  let gap=0;
  try{
    const key='tanya798-last-visit',now=Date.now(),previous=Number(localStorage.getItem(key)||0);
    if(previous)gap=now-previous;
    localStorage.setItem(key,String(now));
  }catch(_){}
  if(gap<48*60*60*1000)return;
  const showReturn=()=>setTimeout(()=>showToast(pick(returnVisitPhrases).value,4200),1100);
  const enter=$('#enterWorld');
  if(enter)enter.addEventListener('click',showReturn,{once:true});
  else showReturn();
}

function initCode798(){
  const pulse=$('#sitePulse'),modal=$('#code798Modal'),display=$('#code798Display'),result=$('#code798Result'),keypad=$('#code798Keypad');
  if(!pulse||!modal||!display||!result||!keypad)return;
  let taps=[],code='';
  const render=()=>{display.textContent=[0,1,2].map(i=>code[i]||'·').join(' ')};
  const close=()=>{modal.hidden=true;document.body.classList.remove('code798-open');code='';render();result.textContent='підказки не буде 😛';modal.classList.remove('wrong-code')};
  const open=()=>{modal.hidden=false;document.body.classList.add('code798-open');code='';render();result.textContent='підказки не буде 😛';setTimeout(()=>$('.code798-keypad button',modal)?.focus(),30)};
  pulse.addEventListener('pointerup',()=>{
    const now=Date.now();taps=taps.filter(t=>now-t<1100);taps.push(now);
    if(taps.length>=3){taps=[];open()}
  });
  keypad.addEventListener('click',e=>{
    const btn=e.target.closest('button');if(!btn)return;
    if(btn.dataset.codeClear!==undefined){code=btn.textContent.includes('⌫')?code.slice(0,-1):'';render();return}
    const digit=btn.dataset.codeDigit;if(digit===undefined)return;
    if(code.length>=3)code='';code+=digit;render();
    if(code.length===3){
      if(code==='798'){
        result.textContent='правильно. 798 still running ❤️';
        modal.classList.add('code-ok');spawnSparkles(display,12);
        setTimeout(()=>{modal.classList.remove('code-ok');close()},1800);
      }else{
        result.textContent='нє. в нас все не як в людей 😭';
        modal.classList.remove('wrong-code');void modal.offsetWidth;modal.classList.add('wrong-code');
        setTimeout(()=>{code='';render();modal.classList.remove('wrong-code')},650);
      }
    }
  });
  on('#code798Close','click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()});
}

function initSupportLetter(){
  const envelope=$('#supportEnvelope'), body=$('#supportLetterBody');
  if(!envelope||!body) return;
  envelope.addEventListener('click',()=>{
    const opening=body.hidden;
    envelope.classList.toggle('open',opening);
    envelope.setAttribute('aria-expanded',String(opening));
    if(opening){show(body);spawnSparkles(envelope,9)}else hide(body);
  });
}

function initSudoku(){
  const grid=$('#sudokuGrid'); if(!grid)return;
  const inputs=$$('input',grid),editable=inputs.filter(input=>!input.disabled),solution='1234341221434321';
  editable.forEach(input=>input.addEventListener('input',()=>{
    input.value=input.value.replace(/[^1-4]/g,'').slice(0,1);grid.classList.remove('wrong');
  }));
  on('#checkSudoku','click',()=>{
    const value=inputs.map(input=>input.value).join(''),note=$('#sudokuNote');
    if(value.length<16){if(note)note.textContent='ще кілька клітинок — і можна спати о 21:30';return}
    if(value===solution){
      grid.classList.add('solved');grid.classList.remove('wrong');
      if(note)note.textContent='Ну все. Тепер можна йти спати о 21:30. Офіційно пенсіонери.';spawnSparkles(grid,14);
    }else{
      grid.classList.remove('wrong');void grid.offsetWidth;grid.classList.add('wrong');
      if(note)note.textContent='десь пенсіонери помилились 😭';
    }
  });
  on('#resetSudoku','click',()=>{
    editable.forEach(input=>input.value='');grid.classList.remove('solved','wrong');
    const note=$('#sudokuNote');if(note)note.textContent='4×4. без фанатизму 😭';
  });
}

function initBook(){
  const pop=$('#bookPopover'),page=$('#bookPage');if(!pop||!page)return;
  const pages=['— Шо шо робив?\n— Читав.','Вона, здається, реально не очікувала, що я її почну 😭','50 сторінка.\nОтут, кажуть, вже цікаво.'];
  let current=0;
  const render=()=>{page.textContent=pages[current];$('#bookNext').textContent=current===pages.length-1?'спочатку':'далі'};
  on('#bookSecret','click',()=>{current=0;render();show(pop);spawnSparkles($('#bookSecret'),7)});
  on('#bookClose','click',()=>hide(pop));
  on('#bookNext','click',()=>{current=(current+1)%pages.length;render()});
}

function initPodGame(){
  const start=$('#podStart'),arena=$('#podArena'),pod=$('#podRunner'),result=$('#podResult');if(!start||!arena||!pod||!result)return;
  const positions=[['16%','18%'],['68%','16%'],['18%','52%'],['66%','48%']];
  let tries=0,closeTimer;
  const reset=()=>{tries=0;pod.classList.remove('caught');pod.style.left='48%';pod.style.top='32%';result.textContent='Операція «Под»'};
  start.addEventListener('click',()=>{clearTimeout(closeTimer);reset();show(arena);showToast('о, знайшла 😭')});
  pod.addEventListener('click',async()=>{
    if(tries<3){const [left,top]=positions[tries];pod.style.left=left;pod.style.top=top;tries++;result.textContent=tries===1?'не так швидко':'ще раз';return}
    pod.classList.add('caught');result.textContent='Забрав.';spawnSparkles(pod,8);
    await sleep(900);if(!arena.hidden)result.textContent='…але обіцяв повернути.';
    await sleep(1200);if(!arena.hidden)result.textContent='Повернув 😔';
    closeTimer=setTimeout(()=>hide(arena),2600);
  });
  arena.addEventListener('click',e=>{if(e.target===arena)hide(arena)});
}

function initSwans(){on('#swansBtn','click',()=>{const card=$('#swansCard'),answer=$('#swanAnswer');card?.classList.add('revealed');show(answer);heartBurst($('#swansBtn'),6)})}
function initPhone(){on('#callButton','click',()=>{const btn=$('#callButton'),copy=$('#callCopy');btn?.classList.remove('ringing');void btn?.offsetWidth;btn?.classList.add('ringing');show(copy);requestAnimationFrame(()=>copy?.classList.add('show'))})}

function initChatMoments(){
  const card=$('#chatMomentsCard');if(!card)return;
  card.addEventListener('click',e=>{
    const tab=e.target.closest('.chat-tab');if(!tab)return;
    $$('.chat-tab',card).forEach(btn=>btn.classList.toggle('active',btn===tab));
    $$('.chat-scene',card).forEach(scene=>scene.classList.toggle('active',scene.dataset.chatScene===tab.dataset.chatMoment));
  });
}

function initTinySecrets(){
  on('#micellarBtn','click',()=>{const pop=$('#micellarPop');if(!pop)return;pop.hidden=!pop.hidden;if(!pop.hidden)spawnSparkles($('#micellarBtn'),6)});
  on('#cabbageSecret','click',()=>{const dialog=$('#cabbageDialog');if(dialog)dialog.hidden=!dialog.hidden});
  on('#tongueSecret','click',()=>{const btn=$('#tongueSecret'),note=$('#tongueNote');btn?.classList.remove('wiggle');void btn?.offsetWidth;btn?.classList.add('wiggle');if(note)note.hidden=!note.hidden});
  on('#finalKissSecret','click',()=>{const reply=$('#finalKissReply');if(!reply)return;reply.hidden=!reply.hidden;if(!reply.hidden)heartBurst($('#finalKissSecret'),5)});
}

function initSystems(){
  const list=$('#systemsList'),done=$('#systemsDone'),button=$('#systemsCheck');if(!list||!button)return;
  const items=$$('li',list);let running=false;
  button.addEventListener('click',async()=>{
    if(running)return;running=true;hide(done);items.forEach(item=>item.classList.remove('checked'));
    for(const item of items){await sleep(380);item.classList.add('checked')}
    await sleep(250);show(done);spawnSparkles(button,8);running=false;
  });
}

function initVideos(){
  const items=$$('.video-item');
  items.forEach(item=>{
    const video=$('video',item),button=$('.video-toggle',item);if(!video||!button)return;
    const sync=()=>{item.classList.toggle('playing',!video.paused);button.textContent=video.paused?'▶':'Ⅱ';button.setAttribute('aria-label',video.paused?'відтворити відео':'поставити на паузу')};
    button.addEventListener('click',async()=>{if(video.paused){$$('.video-item video').forEach(other=>{if(other!==video)other.pause()});try{await video.play()}catch(_){}}else video.pause();sync()});
    video.addEventListener('play',sync);video.addEventListener('pause',sync);video.addEventListener('ended',sync);
  });
  const carousel=$('#tiktokCarousel'),dots=$$('.carousel-dots span');
  if(carousel&&dots.length){let raf=0;carousel.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const cards=$$('.tiktok-item',carousel);if(!cards.length)return;const center=carousel.scrollLeft+carousel.clientWidth/2;let best=0,diff=Infinity;cards.forEach((card,i)=>{const d=Math.abs(card.offsetLeft+card.offsetWidth/2-center);if(d<diff){diff=d;best=i}});dots.forEach((dot,i)=>dot.classList.toggle('active',i===best))})},{passive:true})}
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting){const video=$('video',entry.target);video?.pause()}}),{threshold:.15});items.forEach(item=>io.observe(item))}
}

function initOfficialMode(){
  const wrap=$('.topbar-branding'),brand=$('.brand'),sub=$('.brand-sub');if(!wrap||!brand||!sub)return;
  const originalBrand=brand.textContent,originalSub=sub.textContent;let taps=[],restoreTimer;
  wrap.addEventListener('pointerup',()=>{
    const now=Date.now();taps=taps.filter(t=>now-t<850);taps.push(now);if(taps.length<3)return;
    taps=[];clearTimeout(restoreTimer);brand.textContent='Максим Андрійович & пані Тетяна';sub.textContent='Все офіційно.';wrap.classList.add('official-mode');document.body.classList.add('official-active');
    showToast('Добрий день, Максиме Андрійовичу. Все офіційно.',2500);setTimeout(()=>showToast('Добре, пані.',2200),2100);
    restoreTimer=setTimeout(()=>{brand.textContent=originalBrand;sub.textContent=originalSub;wrap.classList.remove('official-mode');document.body.classList.remove('official-active')},4800);
  });
}

function initHomeToast(){
  const sentinel=$('#homeToastSentinel');if(!sentinel||!('IntersectionObserver' in window))return;
  let already=false;try{already=sessionStorage.getItem('home-toast-seen')==='1'}catch(_){}if(already)return;
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;if($('#finalLetter')?.classList.contains('hidden'))return;showToast('Напишеш як будеш вдома',4200);try{sessionStorage.setItem('home-toast-seen','1')}catch(_){}io.disconnect()}),{threshold:.6});
  io.observe(sentinel);
}

function initKissStory(){
  const card=$('#kissStoryCard'),phases=card?$$('.kiss-phase',card):[],dots=card?$$('.kiss-dots span',card):[],next=$('#kissStoryNext');if(!card||!phases.length||!next)return;
  let current=0;
  const render=()=>{phases.forEach((phase,i)=>phase.classList.toggle('active',i===current));dots.forEach((dot,i)=>dot.classList.toggle('active',i===current));next.textContent=current===phases.length-1?'спочатку ↺':'далі →';card.dataset.phase=String(current)};
  next.addEventListener('click',()=>{current=(current+1)%phases.length;render();spawnSparkles(next,5)});
  const door=$('#tinyDoor');door?.addEventListener('click',()=>{door.classList.remove('open');void door.offsetWidth;door.classList.add('open');heartBurst(door,7);showToast('відкрились 😭')});

  const secret=$('#neckSecretBtn'),note=$('#neckSecretNote'),nature=$('#natureSecret'),natureNote=$('#natureNote');
  if(secret&&note){
    const lines=['Опаснєнько.','Мене коли в шию цілують, ноги починають мліти.','Я вже давно хотів це робити. Просто не знав, чи тобі це взагалі сподобається.','Бля, мурашки.'];
    let step=0,timer=0;
    secret.addEventListener('click',()=>{
      clearTimeout(timer);note.hidden=false;note.textContent=lines[step];note.classList.remove('secret-pop');void note.offsetWidth;note.classList.add('secret-pop');secret.classList.remove('peek-pop');void secret.offsetWidth;secret.classList.add('peek-pop');
      if(step===3){spawnSparkles(secret,8);step=0;timer=setTimeout(()=>{note.hidden=true;if(nature){nature.hidden=false;nature.classList.add('nature-appear');setTimeout(()=>nature.classList.remove('nature-appear'),900)}},1700)}else step++;
    });
  }
  if(nature&&natureNote){
    let nstep=0,hideTimer=0;
    nature.addEventListener('click',()=>{
      clearTimeout(hideTimer);natureNote.hidden=false;natureNote.textContent=nstep===0?'Кров йде туди, де не треба.':'Це природа. 🌿';natureNote.classList.remove('secret-pop');void natureNote.offsetWidth;natureNote.classList.add('secret-pop');
      if(nstep===1){spawnSparkles(nature,5);hideTimer=setTimeout(()=>{nature.hidden=true;natureNote.hidden=true;nstep=0},2200)}else nstep=1;
    });
  }
}

function initPublicMoments(){
  const btn=$('#publicMomentsBtn'),label=$('#publicMomentText');if(!btn||!label)return;
  const moments=['сидимо поруч','тримаємось за руки','обіймаю за талію','гладжу твою руку','цілую твою руку','ти закидаєш ноги на мене','ти притуляєшся','короткий цьом у щоку'];
  let i=0;btn.addEventListener('click',()=>{i=(i+1)%moments.length;label.textContent=moments[i];btn.classList.remove('moment-pop');void btn.offsetWidth;btn.classList.add('moment-pop');if(i===moments.length-1)heartBurst(btn,5)});
}

function initInitiative(){
  const stage=$('#initiativeStage'),tag=$('#initiativeTag'),title=$('#initiativeTitle'),text=$('#initiativeText');
  if(!stage||!tag||!title||!text||!initiativeMoments.length)return;
  let index=0;
  const render=()=>{
    const item=initiativeMoments[index];
    tag.textContent=item.tag;title.textContent=item.title;text.textContent=item.text;
    stage.classList.remove('initiative-pop');void stage.offsetWidth;stage.classList.add('initiative-pop');
  };
  stage.addEventListener('click',()=>{index=(index+1)%initiativeMoments.length;render();spawnSparkles(stage,4)});
}

function initFreedomLog(){
  const terminal=$('#freedomTerminal'),button=$('#runFreedomLog'),result=$('#freedomResult');if(!terminal||!button||!result)return;
  const rows=$$('.log-line, .log-status',terminal);let running=false;
  button.addEventListener('click',async()=>{if(running)return;running=true;result.hidden=true;rows.forEach(row=>row.classList.remove('shown'));button.textContent='аналізую…';for(const row of rows){await sleep(250);row.classList.add('shown')}await sleep(420);result.hidden=false;result.classList.remove('result-pop');void result.offsetWidth;result.classList.add('result-pop');button.textContent='ще раз';spawnSparkles(button,7);running=false});
  const devil=$('#devilSecret'),pop=$('#devilPop');
  if(devil&&pop){const lines=['Я дуже люблю дражнити.','Тобі так здається.','То все на ділі стається.'],shifts=[[-28,9],[-58,-8],[-22,-24]];let step=0;devil.addEventListener('click',()=>{if(devil.classList.contains('gone'))return;const [x,y]=shifts[step];devil.style.setProperty('--devil-x',`${x}px`);devil.style.setProperty('--devil-y',`${y}px`);devil.classList.remove('devil-hop');void devil.offsetWidth;devil.classList.add('devil-hop');pop.hidden=false;pop.textContent=lines[step];pop.classList.remove('secret-pop');void pop.offsetWidth;pop.classList.add('secret-pop');if(step===2){setTimeout(()=>{devil.classList.add('gone');pop.hidden=true},1800)}else step++})}
}

function initKudykQuestions(){
  const deck=$('#questionDeck');if(!deck)return;
  deck.addEventListener('click',e=>{const card=e.target.closest('.question-card');if(!card||!deck.contains(card))return;const opening=!card.classList.contains('flipped');card.classList.toggle('flipped',opening);card.setAttribute('aria-label',opening?'сховати відповідь':'показати відповідь');if(opening)spawnSparkles(card,4)});
}

function renderAboutUs(){
  const grid=$('#aboutUsGrid'),conclusion=$('#aboutUsConclusion');if(!grid)return;
  grid.innerHTML=aboutUsPoints.map((item,i)=>`<button class="about-us-item" data-about-index="${i}" aria-expanded="false"><span>${item.icon}</span><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.text)}</p><small>тапни</small></button>`).join('');
  let opened=0;
  grid.addEventListener('click',e=>{
    const item=e.target.closest('.about-us-item');if(!item)return;const was=item.classList.contains('open');item.classList.toggle('open',!was);item.setAttribute('aria-expanded',String(!was));
    opened=$$('.about-us-item.open',grid).length;if(!was)spawnSparkles(item,4);
    if(conclusion && opened>=4){conclusion.hidden=false;conclusion.classList.add('visible')}
  });
}

function renderLikes(){
  const grid=$('#likesGrid'),button=$('#moreLikes');if(!grid||!button)return;
  let shown=0,order=[...loveThings],noticedLast=-1;
  const renderMore=(count=12)=>{
    const chunk=order.slice(shown,shown+count);
    chunk.forEach((text,i)=>{
      const el=document.createElement('button');el.type='button';el.className='like-chip';el.textContent=text;el.dataset.like=text;el.style.setProperty('--delay',`${i*28}ms`);grid.appendChild(el)
    });
    shown+=chunk.length;button.textContent=shown>=order.length?'перемішати':'ще трохи';
  };
  renderMore(14);
  button.addEventListener('click',()=>{
    if(shown>=order.length){order=[...loveThings].sort(()=>Math.random()-.5);shown=0;grid.innerHTML='';renderMore(14)}else renderMore(8);
    spawnSparkles(button,5);
  });
  grid.addEventListener('click',e=>{
    const chip=e.target.closest('.like-chip');if(!chip)return;
    chip.classList.remove('like-tap');void chip.offsetWidth;chip.classList.add('like-tap');spawnSparkles(chip,3);
    if(chip.dataset.like==='твої очі')showToast('«Про очі» — саме цей комплімент ти тоді запам’ятала 🥺',3600);
  });
  const noticed=$('#noticedThing'),next=$('#noticedNext');
  const changeNoticed=()=>{
    if(!noticed||!noticedThings.length)return;
    const r=pick(noticedThings,noticedLast);noticedLast=r.index;noticed.textContent=r.value;
    noticed.classList.remove('noticed-pop');void noticed.offsetWidth;noticed.classList.add('noticed-pop');
  };
  next?.addEventListener('click',()=>{changeNoticed();spawnSparkles(next,3)});
  noticed?.addEventListener('click',changeNoticed);
}

function renderSavedHead(){
  const files=$('#savedFiles'),detail=$('#savedDetail');if(!files||!detail)return;
  files.innerHTML=savedHeadMemories.map((item,i)=>`<button type="button" class="saved-file" data-saved-index="${i}"><small>${escapeHtml(item.tag)}</small><b>${escapeHtml(item.title)}</b></button>`).join('');
  files.addEventListener('click',e=>{
    const btn=e.target.closest('.saved-file');if(!btn)return;
    const item=savedHeadMemories[Number(btn.dataset.savedIndex)];if(!item)return;
    $$('.saved-file',files).forEach(x=>x.classList.toggle('active',x===btn));
    detail.innerHTML=`<small>${escapeHtml(item.tag)}</small><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.text)}</p>`;
    detail.classList.remove('saved-pop');void detail.offsetWidth;detail.classList.add('saved-pop');spawnSparkles(btn,4);
  });
}

function renderChangedMe(){
  const wrap=$('#changedList');if(!wrap)return;
  wrap.innerHTML=changedMeLines.map((line,i)=>`<div class="changed-line"><span>${String(i+1).padStart(2,'0')}</span><p>${escapeHtml(line)}</p></div>`).join('');
}

function renderBeforeAfter(){
  const wrap=$('#beforeAfterList');if(!wrap)return;
  wrap.innerHTML=beforeAfterPairs.map(([before,after],i)=>`<article class="ba-pair"><div><small>до тебе</small><p>${escapeHtml(before)}</p></div><i>→</i><div><small>з тобою</small><p>${escapeHtml(after)}</p></div></article>`).join('');
}

function initRandomMemory(){
  const out=$('#randomMemoryOutput'),button=$('#randomMemoryBtn');if(!out||!button)return;let last=-1;
  const next=()=>{const result=pick(allMemories,last);last=result.index;const m=result.value,short=m.summary||m.text.split(/\n\n|\n/)[0];out.innerHTML=`<small>${escapeHtml(m.tag)}</small><b>${escapeHtml(m.title)}</b><span>${escapeHtml(short)}</span>`;out.classList.remove('memory-pop');void out.offsetWidth;out.classList.add('memory-pop');spawnSparkles(button,5)};
  button.addEventListener('click',next);out.addEventListener('click',next);
}

function initTodayPhrase(){
  const out=$('#todayPhrase'),button=$('#todayPhraseBtn');if(!out||!button)return;let last=-1;
  const next=()=>{const result=pick(dailyPhraseBank,last);last=result.index;out.textContent=result.value;out.classList.remove('phrase-pop');void out.offsetWidth;out.classList.add('phrase-pop')};
  next();button.addEventListener('click',()=>{next();spawnSparkles(button,4)});
  document.addEventListener('pagechange',e=>{if(e.detail==='later')next()});
}

function initNowWant(){
  const out=$('#nowWant'),button=$('#nowWantBtn');if(!out||!button)return;let last=-1;
  const next=()=>{const r=pick(wantNowPhrases,last);last=r.index;out.textContent=r.value;out.classList.remove('want-pop');void out.offsetWidth;out.classList.add('want-pop')};
  button.addEventListener('click',()=>{next();spawnSparkles(button,3)});out.addEventListener('click',next);
}

function initDontPress(){
  const button=$('#dontPress'),note=$('#dontPressNote');if(!button||!note)return;
  const lines=['я ж сказав не натискати','Таня.','серйозно?','ну добре'],shifts=[[12,-2],[-9,5],[7,-5],[0,0]];let step=0,timer=0;
  button.addEventListener('click',()=>{
    clearTimeout(timer);const [x,y]=shifts[Math.min(step,shifts.length-1)];button.style.setProperty('--dont-x',`${x}px`);button.style.setProperty('--dont-y',`${y}px`);
    note.textContent=lines[Math.min(step,lines.length-1)];note.classList.remove('secret-pop');void note.offsetWidth;note.classList.add('secret-pop');
    if(step===3){timer=setTimeout(()=>{note.textContent='люблю тебе ❤️';heartBurst(button,8);button.style.setProperty('--dont-x','0px');button.style.setProperty('--dont-y','0px');step=0},650)}else step++;
  });
}

function renderMonth(){
  const main=$('#monthMainGrid'),callbacks=$('#monthCallbackChips');if(!main||!callbacks)return;
  const byKey=new Map(allMemories.map(m=>[m.key,m]));
  main.innerHTML=monthMainKeys.map(key=>{const m=byKey.get(key),short=m.summary||m.text.split(/\n\n|\n/)[0];return `<button class="month-main-memory" data-month-memory="${m.key}"><small>${escapeHtml(m.tag)}</small><b>${escapeHtml(m.title)}</b><span>${escapeHtml(short)}</span></button>`}).join('');
  callbacks.innerHTML=monthCallbackKeys.map(key=>{const m=byKey.get(key);return `<button class="month-callback" data-month-memory="${m.key}">${escapeHtml(m.title)}</button>`}).join('');
}

function initMonthPage(){
  const page=$('#month'),overlay=$('#monthMemoryOverlay');if(!page||!overlay)return;
  const byKey=new Map(allMemories.map(m=>[m.key,m]));
  let lastFocus=null;
  const close=()=>{
    overlay.hidden=true;document.body.classList.remove('memory-overlay-open');
    lastFocus?.focus?.({preventScroll:true});lastFocus=null;
  };
  const openMemory=(trigger)=>{
    const m=byKey.get(trigger.dataset.monthMemory);if(!m)return;
    lastFocus=trigger;$('#monthOverlayTag').textContent=m.tag;$('#monthOverlayTitle').textContent=m.title;$('#monthOverlayText').textContent=m.text;
    overlay.hidden=false;document.body.classList.add('memory-overlay-open');
    requestAnimationFrame(()=>$('#monthOverlayClose')?.focus({preventScroll:true}));
    spawnSparkles(trigger,5);
  };
  page.addEventListener('click',e=>{const memory=e.target.closest('[data-month-memory]');if(memory)openMemory(memory)});
  overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.closest('#monthOverlayClose'))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)close()});

  const seq=$('#ifSequence');if(seq){const reveal=()=>seq.classList.add('visible');if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){reveal();io.disconnect()}}),{threshold:.18});io.observe(seq)}else reveal()}

  const last=$('#futureLast'),hidden=$('#futureHidden');if(last&&hidden){let taps=[];last.addEventListener('pointerup',()=>{const now=Date.now();taps=taps.filter(t=>now-t<1800);taps.push(now);last.classList.add('future-tap');setTimeout(()=>last.classList.remove('future-tap'),260);if(taps.length>=4){taps=[];hidden.hidden=false;hidden.classList.remove('future-reveal');void hidden.offsetWidth;hidden.classList.add('future-reveal');heartBurst(last,8)}})}
}

export function initLater(){
  initSitePulse();initReturnVisit();initCode798();
  initSupportLetter();initSudoku();initBook();initPodGame();initSwans();initPhone();initChatMoments();initTinySecrets();initSystems();initVideos();initOfficialMode();initHomeToast();
  renderAboutUs();initInitiative();initKissStory();initPublicMoments();initFreedomLog();initKudykQuestions();
  renderLikes();renderSavedHead();renderChangedMe();renderBeforeAfter();initRandomMemory();initTodayPhrase();initNowWant();initDontPress();
  renderMonth();initMonthPage();
}
