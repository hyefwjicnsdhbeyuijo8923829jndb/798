import {$,on,daysCalc} from './core.js';
import {loadSections} from './loader.js';
import {go,initNavigation,setNavigationHooks} from './navigation.js';
import {buildStars,buildAmbientFx,initHeart,initScrollReveal,initTapGlow,initAnimationVisibility} from './effects.js';
import {initStory} from './story.js';
import {initNights,startNightMeteors} from './nights.js';
import {initMissed,buildRain,playMissed} from './missed.js';
import {initGoodbye} from './goodbye.js';
import {initTouch} from './touch.js';
import {initFavorites} from './favorites.js';
import {initZoo} from './zoo.js';
import {initArchive} from './archive.js';
import {initSecrets,initFinal} from './secrets.js';
import {initCuteStuff} from './cute.js';

function initIntro(){
  on('#normalChoice','click',()=>$('#wrongAnswer')?.classList.add('show'));
  on('#bathChoice','click',()=>{ $('#intro')?.classList.remove('active'); $('#reveal')?.classList.add('active'); setTimeout(()=>$('#reveal')?.classList.add('shuffled'),1200); });
  on('#enterWorld','click',()=>{ $('#reveal')?.classList.remove('active'); $('#app')?.classList.remove('hidden'); go('hub'); });
}

async function boot(){
  try{
    initIntro();
    initHeart();
    await loadSections();
    daysCalc();
    initNavigation();
    setNavigationHooks({
      nights:()=>startNightMeteors(),
      missed:()=>{buildRain(); if(!$('#missedMessages')?.children.length) setTimeout(()=>{if($('#missed')?.classList.contains('active-page'))playMissed()},350);}
    });
    buildAmbientFx();
    buildStars('#heroStars',42);
    initStory();
    initNights();
    initMissed();
    initGoodbye();
    initTouch();
    initFavorites();
    initZoo();
    initArchive();
    initSecrets();
    initFinal();
    initCuteStuff();
    initScrollReveal();
    initTapGlow();
    initAnimationVisibility();
  }catch(err){
    console.error(err);
    document.body.insertAdjacentHTML('beforeend','<div style="position:fixed;inset:auto 16px 16px;z-index:9999;padding:14px 16px;border-radius:16px;background:#24151c;color:white;font:14px system-ui">Щось не завантажилося. Онови сторінку, будь ласка.</div>');
  }
}
boot();
