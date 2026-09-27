// Completed-question presentation only. Direct function overrides; no observers and no startup/auth work.
(() => {
  const originalBindInterview=window.bindInterview;

  function savedComplexityForCurrentCode(){
    try{
      const saved=JSON.parse(localStorage.getItem('bb_complexity_'+idx)||'null');
      return saved&&saved.code===code.value?saved:null;
    }catch(e){return null;}
  }

  function showFinishedComplexity(box,saved){
    box.innerHTML='<b>Complexity</b><div class="checkResult complexityDone">✓ Time O('+escapeHtml(saved.time)+') · Space O('+escapeHtml(saved.space)+')</div>';
  }

  window.bindInterview=function(x){
    originalBindInterview(x);
    const check=document.getElementById('checkComplexity');
    if(!check)return;
    check.addEventListener('click',()=>{
      const saved=savedComplexityForCurrentCode();
      if(saved){
        const box=document.getElementById('mainOBox');
        if(box)showFinishedComplexity(box,saved);
      }
    });
  };

  window.renderProgress=function(){
    const h=getHistory(idx),passed=h.filter(x=>x.passed),x=qs[idx];
    document.getElementById('progress').textContent=passed.length?'✓ Passed':'Not passed';
    document.getElementById('reviewBtn').style.display=passed.length?'inline-block':'none';
    document.getElementById('sampleBtn').style.display=passed.length?'inline-block':'none';

    const ob=document.getElementById('mainOBox');
    ob.classList.toggle('show',!!passed.length);
    ob.innerHTML='';
    if(passed.length){
      const saved=savedComplexityForCurrentCode();
      if(saved)showFinishedComplexity(ob,saved);
      else{
        ob.innerHTML='<b>Complexity</b>'+oPicker();
        bindInterview(x);
      }
    }

    const ap=document.getElementById('afterPass');
    ap.classList.remove('show');
    ap.innerHTML='';
    document.getElementById('history').innerHTML=h.length?h.slice(-5).reverse().map(a=>(a.passed?'✅':'❌')+' '+new Date(a.time).toLocaleString()).join('<br>'):'No attempts yet.';
  };
})();