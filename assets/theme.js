document.addEventListener('DOMContentLoaded',()=>{
  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
    reveals.forEach(el=>io.observe(el));
  }else reveals.forEach(el=>el.classList.add('is-visible'));

  document.querySelectorAll('.announcement__track').forEach(track=>{track.innerHTML+=track.innerHTML});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');const target=id&&document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

  const toast=document.createElement('div');toast.className='toast';toast.setAttribute('role','status');document.body.appendChild(toast);
  let toastTimer;
  const showToast=(message)=>{toast.textContent=message;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2600)};
  const updateCart=(cart)=>{document.querySelectorAll('.cart-count').forEach(el=>el.textContent=cart.item_count)};

  const addToCart=async(form)=>{
    const button=form.querySelector('button');
    if(button)button.classList.add('is-loading');
    try{
      const response=await fetch('/cart/add.js',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
      if(!response.ok)throw new Error('cart');
      await response.json();
      const cartResponse=await fetch('/cart.js',{headers:{Accept:'application/json'}});
      const cart=await cartResponse.json();
      updateCart(cart);
      showToast('Added to your bag');
    }catch(error){showToast('Something went wrong. Please try again.')}finally{if(button)button.classList.remove('is-loading')}
  };
  document.querySelectorAll('[data-quick-add],[data-product-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();addToCart(form)}));

  const hasFinePointer=window.matchMedia('(pointer:fine)').matches;
  if(hasFinePointer){
    document.body.classList.add('has-pointer');
    const dot=document.createElement('div');dot.className='cursor-dot';
    const ring=document.createElement('div');ring.className='cursor-ring';
    document.body.append(dot,ring);
    let mx=0,my=0,rx=0,ry=0;
    window.addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
    const animate=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animate)};animate();
    document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px'});el.addEventListener('mouseleave',()=>{ring.style.width='36px';ring.style.height='36px'})});
  }

  document.querySelectorAll('img').forEach(img=>{if(img.complete)img.classList.add('is-loaded');else img.addEventListener('load',()=>img.classList.add('is-loaded'),{once:true})});
});