// DSA map read-only view of the SAME Level 3 curriculum used by Python Training.
(() => {
  const mapToLevel3={
    'Array':'Array patterns','Hashing':'Hash map & set','Stack':'Stack','Queue':'Queue',
    'Linked List':'Linked list','Heap':'Heap / priority queue','Tree':'Binary tree',
    'Graph':'Graph representation','Two Pointers':'Two pointers','Sliding Window':'Sliding window',
    'Binary Search':'Binary search','DFS / Recursion':'DFS','BFS':'BFS',
    'Backtracking':'Recursion & backtracking','Dynamic Programming':'Dynamic programming'
  };
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function sharedLesson(name){
    const wanted=mapToLevel3[name];
    return wanted && window.DSA_LEVEL3 && window.DSA_LEVEL3.find(x=>x.t===wanted);
  }
  function enrich(name){
    const d=sharedLesson(name);
    const popup=document.getElementById('dsaFocusPopup');
    const inner=popup&&popup.querySelector('.dsaFocusInner');
    if(!d||!inner||inner.querySelector('.dsaSharedLevel3'))return;
    const grid=inner.querySelector('.dsTeachGrid');
    if(!grid)return;
    const oldCode=grid.querySelector('.dsCode');
    if(oldCode) oldCode.style.display='none';
    const box=document.createElement('div');
    box.className='dsaSharedLevel3';
    box.innerHTML='<div class="dsaCombinedLesson"><b>Python · Level 3</b><div class="dsTeachOne">'+d.tip+'</div></div><pre class="dsCode">'+esc(d.ex)+'</pre>';
    grid.appendChild(box);
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest&&e.target.closest('#conceptMap [data-concept], #dsaFocusPopup [data-concept]');
    if(b)setTimeout(()=>enrich(b.dataset.concept),0);
  },true);
})();