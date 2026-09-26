document.addEventListener('DOMContentLoaded',()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets=document.querySelectorAll('.home-hero__copy,.home-hero__media,.product-card,.editorial__media,.editorial__copy,.color-story__copy,.color-story__blocks,.review-cards article,.newsletter,.product-gallery__item,.product-summary');
  if(!reduce && 'IntersectionObserver' in window){
    revealTargets.forEach(el=>el.classList.add('js-reveal'));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -40px'});
    revealTargets.forEach(el=>observer.observe(el));
  }

  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){event.preventDefault();target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});}
  }));

  const menu=document.querySelector('.mobile-menu');
  const nav=document.querySelector('.main-nav');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('mobile-open',!open);});}

  const toast=document.createElement('div');
  toast.className='toast';
  toast.setAttribute('role','status');
  document.body.appendChild(toast);
  let timer;
  const showToast=message=>{toast.textContent=message;toast.classList.add('is-visible');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('is-visible'),2200)};
  const updateCount=cart=>document.querySelectorAll('.header-tools sup').forEach(node=>node.textContent=cart.item_count);

  document.querySelectorAll('[data-product-form]').forEach(form=>form.addEventListener('submit',async event=>{
    event.preventDefault();
    const button=form.querySelector('button[type="submit"]');
    if(button){button.disabled=true;button.textContent='Adding…';}
    try{
      const response=await fetch('/cart/add.js',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
      if(!response.ok)throw new Error('cart');
      const cart=await (await fetch('/cart.js',{headers:{Accept:'application/json'}})).json();
      updateCount(cart);showToast('Added to your bag');
    }catch(error){showToast('Please try again');}
    finally{if(button){button.disabled=false;button.textContent='Add to bag';}}
  }));
});
