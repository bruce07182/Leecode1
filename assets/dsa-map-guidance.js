// DSA map guidance: explain status colors and surface the next useful exercise.
// Loaded after dsa-map-v6.js so the roadmap stays the single owner of concept state.
(()=>{
  const previousRender=window.renderConceptMap;
  if(typeof previousRender!=='function') return;

  const nextRecommended=()=>window.foundationRecommendation?.()?.i ?? null;

  const openQuestion=i=>{
    if(!window.foundationRequireUser?.()||i==null) return;
    groupSel.value=questionGroup(i);
    refreshOptions();
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
      const rec=window.foundationRecommendation?.();nextBox.innerHTML='<span class="dsaNextLabel">Next recommended</span><button type="button" class="dsaNextBtn">'+(rec?.action?rec.action+' · ':'')+(typeof displayTitle==='function'?displayTitle(next):qs[next].title)+'</button>';
      nextBox.querySelector('button').onclick=()=>openQuestion(next);
    }
    host.appendChild(nextBox);
  };
})();