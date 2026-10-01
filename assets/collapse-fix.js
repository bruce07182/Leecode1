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
      if(active){
        active.textContent=collapsed?'Expand':'Collapse';
        active.setAttribute('aria-expanded',collapsed?'false':'true');
      }
      card.setAttribute('aria-expanded',collapsed?'false':'true');
      card.style.cursor='pointer';
      localStorage.setItem(key,collapsed?'1':'0');
      if(id==='mapCard'&&!collapsed&&typeof window.renderConceptMap==='function')setTimeout(()=>window.renderConceptMap(),0);
    }

    function toggle(){ apply(!card.classList.contains('collapsed')); }

    // Keep the existing control working, but make the whole card/header area clickable too.
    const fresh=btn.cloneNode(true);
    btn.replaceWith(fresh);
    fresh.onclick=e=>{e.preventDefault();e.stopPropagation();toggle();};

    card.addEventListener('click',e=>{
      // Interactive content inside an expanded card should keep its normal behavior.
      if(e.target.closest('a,button,input,select,textarea,label,[contenteditable="true"]'))return;
      // Clicking anywhere on a collapsed card expands it. When expanded, clicking
      // the card outside its body (header/padding) collapses it; body content remains usable.
      if(card.classList.contains('collapsed') || !body || !body.contains(e.target)) toggle();
    });

    // Keyboard support when focus is on the card itself.
    card.tabIndex=0;
    card.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ') && e.target===card){e.preventDefault();toggle();}
    });

    apply(localStorage.getItem(key)==='1');
  });
})();