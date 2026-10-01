// Canonical Foundation complexity convention:
// Auxiliary Space = working memory beyond required input and required return/output buffer.
// This patch corrects questions whose previous Space answer counted only the required output.
(()=>{
  const api=window.foundationReviewApi;
  if(!api?.questions)return;

  // Questions where the canonical sample's growing container is the required returned output,
  // not auxiliary working storage. Internal structures (hash maps, stacks, queues, DP, etc.)
  // still count normally.
  const outputOnly=new Set([
    'Build a list',          // returned result list
    'Reverse string',        // returned string
    'Prefix sums',           // returned prefix list
    'Linked list traversal'  // returned values list
  ]);

  const original=window.bindInterview;
  if(typeof original==='function'){
    window.bindInterview=function(x){
      original(x);
      const key=x.title.includes('. ')?x.title.slice(x.title.indexOf('. ')+2):x.title;
      if(!outputOnly.has(key))return;
      const cc=document.getElementById('checkComplexity');
      if(!cc)return;
      cc.onclick=()=>{
        const r=document.getElementById('complexityResult');
        const t=document.getElementById('timePick').value;
        const sp=document.getElementById('spacePick').value;
        if(!t||!sp){r.textContent='Choose both.';return}
        const ok=t==='n'&&sp==='1';
        r.textContent=ok?'✅ Correct':'❌ Try again.';
        if(!ok)return;
        const i=api.questions.indexOf(x),id=api.exerciseId(i),st=api.state.get(id);
        if(st)st.complexity={code:document.getElementById('code').value,time:t,space:sp};
        window.renderProgress?.();window.queueCloud?.();
      };
    };
  }

  // Remove misleading lesson wording that labels required output as Space.
  const replacements={
    'Build a list':'<b>Complexity</b><br>Scanning the input is <b>Time: O(n)</b>. The returned list can contain O(n) values; excluding that required output, <b>Auxiliary Space: O(1)</b>.',
    'Reverse string':null,
    'Prefix sums':'<b>Complexity</b><br>Building the returned prefix list is <b>Time: O(n)</b>. The output has O(n) values; excluding the required output, the running-total approach uses <b>Auxiliary Space: O(1)</b>.',
    'Linked list traversal':'<b>Complexity</b><br>Traversing n nodes is <b>Time: O(n)</b>. Excluding the returned values list, traversal uses <b>Auxiliary Space: O(1)</b>.'
  };
  api.questions.forEach(q=>{
    const key=q.title.includes('. ')?q.title.slice(q.title.indexOf('. ')+2):q.title;
    const rep=replacements[key];
    if(rep){q.lesson=q.lesson.replace(/<b>Complexity<\/b><br>[\s\S]*$/i,rep)}
  });
})();