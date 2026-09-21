export async function loadSections(){ return [...document.querySelectorAll('.page')].map(p=>p.id); }
export function loadPageImages(page){
  page?.querySelectorAll('img[data-src]').forEach((img,index)=>{
    if(index<2) img.loading='eager';
    img.src=img.dataset.src;
    delete img.dataset.src;
  });
}
