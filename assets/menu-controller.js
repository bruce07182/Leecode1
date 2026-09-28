// Single owner for the top-right menu presentation.
(()=>{
  const btn=document.getElementById('menuBtn');
  const box=document.getElementById('menuBox');
  if(!btn||!box)return;
  const mode=document.getElementById('mode');
  const accountState=document.getElementById('accountState');
  const close=()=>box.classList.remove('show');
  const syncChecks=()=>{
    document.getElementById('modeBasic')?.classList.toggle('selected',mode?.value==='basic');
    document.getElementById('modeAll')?.classList.toggle('selected',mode?.value==='all');
  };
  const showUser=u=>{
    if(accountState)accountState.textContent=u?.email?'Signed in · '+u.email:'Not signed in';
    document.getElementById('menuSignIn')?.classList.toggle('hidden',!!u);
    document.getElementById('menuForgot')?.classList.toggle('hidden',!!u);
    document.getElementById('menuSignOut')?.classList.toggle('hidden',!u);
  };
  // Basics is the product default. Changing mode during this session is still allowed.
  if(mode&&!mode.dataset.initialized){mode.value='basic';mode.dataset.initialized='1';}
  syncChecks();

  btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();box.classList.toggle('show');syncChecks();});
  box.addEventListener('click',e=>e.stopPropagation());
  document.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{
    if(!mode)return;
    mode.value=b.dataset.mode;
    mode.dispatchEvent(new Event('change',{bubbles:true}));
    syncChecks();close();
  }));
  document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
    const action=b.dataset.action;
    if(action==='account') document.getElementById('authCard')?.classList.remove('hidden');
    else if(action==='logout') document.getElementById('logoutBtn')?.click();
    else if(action==='forgot') document.getElementById('forgotBtn')?.click();
    else if(action==='admin') document.getElementById('adminCard')?.classList.toggle('hidden');
    close();
  }));

  if(window.db?.auth){
    db.auth.getSession().then(({data})=>showUser(data.session?.user||null)).catch(()=>showUser(null));
    db.auth.onAuthStateChange((event,session)=>showUser(session?.user||null));
  }else if(typeof db!=='undefined'&&db.auth){
    db.auth.getSession().then(({data})=>showUser(data.session?.user||null)).catch(()=>showUser(null));
    db.auth.onAuthStateChange((event,session)=>showUser(session?.user||null));
  }
})();