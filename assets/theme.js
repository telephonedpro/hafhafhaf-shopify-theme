document.addEventListener('DOMContentLoaded',()=>{
  const mainAnnouncement=document.querySelector('#MainContent > .announcement');
  if(mainAnnouncement) mainAnnouncement.remove();
  const els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
    els.forEach(el=>io.observe(el));
  }else els.forEach(el=>el.classList.add('is-visible'));
  document.querySelectorAll('.announcement__track').forEach(track=>{track.innerHTML+=track.innerHTML});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id&&id.length>1){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}}}));
  document.querySelectorAll('img').forEach(img=>{if(img.complete) img.classList.add('is-loaded'); else img.addEventListener('load',()=>img.classList.add('is-loaded'),{once:true})});
});