// Space O(...) includes returned output unless a question explicitly says otherwise.
(()=>{
  const api=window.foundationReviewApi;
  if(!api?.questions)return;
  const b5=api.questions.find(q=>/^5\. Two pointer movement$/.test(q.title));
  if(b5){
    b5.lesson=b5.lesson.replace(
      'A full inward traversal is <b>Time: O(n)</b> and <b>Space: O(1)</b> auxiliary because only two indexes are stored.',
      'A full inward traversal is <b>Time: O(n)</b>. The returned list stores about n/2 pairs, so <b>Space: O(n)</b> under this app\'s convention. Excluding the returned output, auxiliary space is O(1) because only two indexes are stored.'
    );
  }
  const original=window.bindInterview;
  if(typeof original!=="function")return;
  window.bindInterview=function(x){
    original(x);
    const key=x.title.includes('. ')?x.title.slice(x.title.indexOf('. ')+2):x.title;
    if(key!=="Two pointer movement")return;
    const cc=document.getElementById("checkComplexity");
    if(!cc)return;
    cc.onclick=()=>{
      const r=document.getElementById("complexityResult"),t=document.getElementById("timePick").value,sp=document.getElementById("spacePick").value;
      if(!t||!sp){r.textContent="Choose both.";return}
      const ok=t==="n"&&sp==="n";
      r.textContent=ok?"✅ Correct":"❌ Try again.";
      if(!ok)return;
      const i=api.questions.indexOf(x),id=api.exerciseId(i),st=api.state.get(id);
      if(st)st.complexity={code:document.getElementById("code").value,time:t,space:sp};
      window.renderProgress?.();
      window.queueCloud?.();
    };
  };
})();