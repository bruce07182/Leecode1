// Small presentation-only refinements. Do not touch auth/startup or test-runner logic.
(()=>{
  // Remove the extra post-lesson "Try it" coaching block if another layer adds it.
  const cleanLearnBox=()=>{
    const box=document.getElementById('learnBox');
    if(!box) return;
    const html=box.innerHTML;
    const marker='<br><br><b>Try it</b><br>Trace the code with one tiny input before writing the whole solution.';
    if(html.includes(marker)) box.innerHTML=html.replace(marker,'');
  };

  // Keep complexity interactive until correct. Once saved, collapse it to one finished line.
  const compactComplexity=()=>{
    const box=document.getElementById('mainOBox');
    if(!box || !box.classList.contains('show')) return;
    const heading=box.querySelector(':scope > b');
    if(heading) heading.textContent='Complexity';
    let saved=null;
    try{saved=JSON.parse(localStorage.getItem('bb_complexity_'+idx)||'null')}catch(e){}
    if(!saved || saved.code!==code.value) return;
    const rows=box.querySelector('.complexityRows');
    if(rows) rows.style.display='none';
    const result=box.querySelector('#complexityResult');
    if(result){
      result.classList.add('complexityDone');
      result.textContent=`✓ Time O(${saved.time}) · Space O(${saved.space})`;
    }
  };

  const learnBox=document.getElementById('learnBox');
  const complexityBox=document.getElementById('mainOBox');
  if(learnBox) new MutationObserver(cleanLearnBox).observe(learnBox,{childList:true,subtree:true});
  if(complexityBox) new MutationObserver(()=>queueMicrotask(compactComplexity)).observe(complexityBox,{childList:true,subtree:true});
  document.addEventListener('click',()=>setTimeout(()=>{cleanLearnBox();compactComplexity()},0));
  cleanLearnBox();
  compactComplexity();
})();