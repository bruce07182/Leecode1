// Stable collapse handling for top-level cards. Loaded late so earlier UI layers cannot override it.
(()=>{
  ['guideCard','mapCard'].forEach(id=>{
    const btn=document.querySelector('[data-collapse="'+id+'"]');
    const card=document.getElementById(id);
    if(!btn||!card)return;
    const body=card.querySelector('.collapsibleBody');
    const key='bb_collapsed_'+id;
    function apply(collapsed){
      card.classList.toggle('collapsed',collapsed);
      if(body)body.style.display=collapsed?'none':'';
      const active=document.querySelector('[data-collapse="'+id+'"]');
      if(active)active.textContent=collapsed?'Expand':'Collapse';
      localStorage.setItem(key,collapsed?'1':'0');
      if(id==='mapCard'&&!collapsed&&typeof window.renderConceptMap==='function')setTimeout(()=>window.renderConceptMap(),0);
    }
    // Remove any earlier onclick owner to prevent double toggles.
    const fresh=btn.cloneNode(true);
    btn.replaceWith(fresh);
    fresh.onclick=e=>{e.preventDefault();e.stopPropagation();apply(!card.classList.contains('collapsed'));};
    apply(localStorage.getItem(key)==='1');
  });
})();