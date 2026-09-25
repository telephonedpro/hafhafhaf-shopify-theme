document.addEventListener('DOMContentLoaded',()=>{
  const targets=document.querySelectorAll('.lux-heading,.lux-card,.lux-story__image,.lux-story__copy,.lux-flagship__copy,.lux-flagship__image,.lux-review-grid article,.lux-news,.product-gallery__item,.product-summary');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -30px'});
    targets.forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=Math.min(i*30,180)+'ms';io.observe(el)});
  }else targets.forEach(el=>el.classList.add('is-visible'));

  document.querySelectorAll('.announcement__track').forEach(track=>{track.innerHTML+=track.innerHTML});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{const target=document.querySelector(a.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

  const toast=document.createElement('div');
  toast.className='toast';
  toast.setAttribute('role','status');
  document.body.appendChild(toast);
  let timer;
  const showToast=message=>{toast.textContent=message;toast.classList.add('is-visible');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('is-visible'),2200)};
  const updateCartCount=cart=>document.querySelectorAll('.cart-count').forEach(node=>node.textContent=cart.item_count);

  document.querySelectorAll('[data-quick-add],[data-product-form]').forEach(form=>form.addEventListener('submit',async event=>{
    event.preventDefault();
    const button=form.querySelector('button');
    if(button)button.classList.add('is-loading');
    try{
      const response=await fetch('/cart/add.js',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
      if(!response.ok)throw new Error('cart');
      const cart=await (await fetch('/cart.js',{headers:{Accept:'application/json'}})).json();
      updateCartCount(cart);
      showToast('Added to your bag');
    }catch(error){showToast('Please try again');}
    finally{if(button)button.classList.remove('is-loading');}
  }));

  document.querySelectorAll('img').forEach(image=>{if(image.complete)image.classList.add('is-loaded');else image.addEventListener('load',()=>image.classList.add('is-loaded'),{once:true})});
});
