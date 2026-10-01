// Interview convention used by this trainer:
// "Auxiliary Space O(...)" = working memory beyond the required input/output.
// Required output size is discussed separately in Answer/review when relevant.
// Learn basics teaches the distinction generically and must not leak a question's answer.
(()=>{
  const api=window.foundationReviewApi;
  if(!api?.questions)return;

  const b5=api.questions.find(q=>/^5\. Two pointer movement$/.test(q.title));
  if(b5){
    b5.lesson=b5.lesson.replace(
      /<b>Complexity<\/b><br>[\s\S]*$/,
      '<b>Memory terminology</b><br>In interview analysis, <b>auxiliary space</b> means working memory used while solving, excluding the required input and output. If a function must build and return a result, that output can be described separately. Be explicit about which convention you mean.'
    );
  }

  // Present input/output types as part of the Python function signature, not as comments.
  // Runtime still calls the same functions; annotations are informational and valid Python.
  const typed={
    count_positive:'def count_positive(nums: list[int]) -> int:',
    keep_evens:'def keep_evens(nums: list[int]) -> list[int]:',
    find_max:'def find_max(nums: list[int]) -> int:',
    reverse_string:'def reverse_string(s: str) -> str:',
    inward_pairs:'def inward_pairs(nums: list[int]) -> list[list[int]]:',
    frequency:'def frequency(nums: list[int]) -> dict[int, int]:',
    contains_duplicate:'def contains_duplicate(nums: list[int]) -> bool:',
    stack_order:'def stack_order(items: list[int]) -> list[int]:',
    sort_by_second:'def sort_by_second(pairs: list[list[int]]) -> list[list[int]]:'
  };
  api.questions.forEach(q=>{
    const sig=typed[q.fn];
    if(!sig)return;
    q.sig=sig;
    const body=(q.starter||'').split('\n').slice(1).join('\n');
    q.starter=sig+'\n'+(body||'    ');
  });

  // Make the complexity selector unambiguous everywhere without changing saved DB shape.
  const relabel=()=>{
    const sp=document.getElementById('spacePick');
    if(!sp)return;
    const label=sp.closest('label');
    if(label){
      for(const n of label.childNodes){
        if(n.nodeType===Node.TEXT_NODE && /Space/i.test(n.textContent||'')) n.textContent=(n.textContent||'').replace(/Space\s*O\(\)/i,'Auxiliary Space O()');
      }
    }
    sp.setAttribute('aria-label','Auxiliary Space O()');
    sp.setAttribute('title','Working memory excluding the required input and output');
  };

  const original=window.bindInterview;
  if(typeof original!=="function")return;
  window.bindInterview=function(x){
    original(x);
    relabel();
    const key=x.title.includes('. ')?x.title.slice(x.title.indexOf('. ')+2):x.title;
    if(key!=="Two pointer movement")return;
    const cc=document.getElementById("checkComplexity");
    if(!cc)return;
    cc.onclick=()=>{
      const r=document.getElementById("complexityResult"),t=document.getElementById("timePick").value,sp=document.getElementById("spacePick").value;
      if(!t||!sp){r.textContent="Choose both.";return}
      const ok=t==="n"&&sp==="1";
      r.textContent=ok?"✅ Correct":"❌ Try again.";
      if(!ok)return;
      const i=api.questions.indexOf(x),id=api.exerciseId(i),st=api.state.get(id);
      if(st)st.complexity={code:document.getElementById("code").value,time:t,space:sp};
      window.renderProgress?.();
      window.queueCloud?.();
    };
  };
})();