// DSA map guidance: explain status colors and surface the next useful exercise.
// Loaded after dsa-map-v6.js so the roadmap stays the single owner of concept state.
(()=>{
  const previousRender=window.renderConceptMap;
  if(typeof previousRender!=='function') return;

  const nextRecommended=()=>{
    const allowed=qs.map((q,i)=>modeAllows(i)?i:-1).filter(i=>i>=0);
    // Prefer an unlocked, unfinished question whose dependencies are already complete.
    let i=allowed.find(i=>!completed(i)&&unlocked(i));
    // Defensive fallback: first unfinished question in the current mode.
    if(i==null) i=allowed.find(i=>!completed(i));
    return i==null?null:i;
  };

  const openQuestion=i=>{
    if(i==null) return;
    sel.value=String(i);
    load();
    if(typeof loadCloud==='function') loadCloud();
    ['questionCard','workCard'].forEach(id=>document.getElementById(id)?.classList.remove('hidden'));
    document.getElementById('questionCard')?.scrollIntoView({behavior:'smooth',block:'start'});
  };

  window.renderConceptMap=function(){
    previousRender();
    const host=document.getElementById('conceptMap');
    if(!host) return;

    const legend=document.createElement('div');
    legend.className='dsaLegend';
    legend.innerHTML='<span><i class="dsaLegendDot mastered"></i>Mastered</span><span><i class="dsaLegendDot learning"></i>Learning</span><span><i class="dsaLegendDot available"></i>Available</span><span><i class="dsaLegendDot lockedConcept"></i>Locked</span>';
    host.prepend(legend);

    const next=nextRecommended();
    const nextBox=document.createElement('div');
    nextBox.className='dsaNext';
    if(next==null){
      nextBox.innerHTML='<span class="dsaNextLabel">Next recommended</span><b>✓ All available questions completed</b>';
    }else{
      nextBox.innerHTML='<span class="dsaNextLabel">Next recommended</span><button type="button" class="dsaNextBtn">'+qs[next].title+'</button>';
      nextBox.querySelector('button').onclick=()=>openQuestion(next);
    }
    host.appendChild(nextBox);
  };
})();