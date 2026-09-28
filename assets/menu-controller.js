// Single owner for the top-right menu presentation.
(()=>{
  const btn=document.getElementById('menuBtn');
  const box=document.getElementById('menuBox');
  if(!btn||!box)return;
  const accountState=document.getElementById('accountState');
  const close=()=>box.classList.remove('show');
  const showUser=u=>{
    if(accountState)accountState.textContent=u?.email?'Signed in · '+u.email:'Not signed in';
    document.getElementById('menuSignIn')?.classList.toggle('hidden',!!u);
    document.getElementById('menuForgot')?.classList.toggle('hidden',!!u);
    document.getElementById('menuSignOut')?.classList.toggle('hidden',!u);
  };
  btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();box.classList.toggle('show');});
  box.addEventListener('click',e=>e.stopPropagation());
  document.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
    const action=b.dataset.action;
    if(action==='account') document.getElementById('authCard')?.classList.remove('hidden');
    else if(action==='logout') document.getElementById('logoutBtn')?.click();
    else if(action==='forgot') document.getElementById('forgotBtn')?.click();
    else if(action==='admin' && typeof toggleAdmin==='function') toggleAdmin();
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