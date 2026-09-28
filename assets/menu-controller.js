// Single owner for the top-right menu.
(()=>{
  const btn=document.getElementById('menuBtn');
  const box=document.getElementById('menuBox');
  if(!btn||!box)return;
  const close=()=>box.classList.remove('show');
  btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();box.classList.toggle('show');});
  box.addEventListener('click',e=>e.stopPropagation());
  document.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});

  const mode=document.getElementById('mode');
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{
    if(!mode)return;
    mode.value=b.dataset.mode;
    mode.dispatchEvent(new Event('change',{bubbles:true}));
    close();
  }));
  document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
    const action=b.dataset.action;
    if(action==='account') document.getElementById('authCard')?.classList.remove('hidden');
    else if(action==='logout') document.getElementById('logoutBtn')?.click();
    else if(action==='forgot') document.getElementById('forgotBtn')?.click();
    else if(action==='admin') document.getElementById('adminCard')?.classList.toggle('hidden');
    close();
  }));
})();