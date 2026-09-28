// Stable collapse handling for the DSA map. Loaded late so earlier UI layers cannot override it.
(()=>{
  const btn=document.querySelector('[data-collapse="mapCard"]');
  const card=document.getElementById('mapCard');
  if(!btn||!card)return;
  const body=card.querySelector('.collapsibleBody');
  const key='bb_collapsed_mapCard';
  function apply(collapsed){
    card.classList.toggle('collapsed',collapsed);
    if(body)body.style.display=collapsed?'none':'';
    btn.textContent=collapsed?'Expand':'Collapse';
    localStorage.setItem(key,collapsed?'1':'0');
    if(!collapsed&&typeof window.renderConceptMap==='function')setTimeout(()=>window.renderConceptMap(),0);
  }
  // Replace earlier click handler with a fresh button so there is exactly one owner.
  const fresh=btn.cloneNode(true);
  btn.replaceWith(fresh);
  fresh.onclick=()=>apply(!card.classList.contains('collapsed'));
  apply(localStorage.getItem(key)==='1');
})();