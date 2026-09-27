// One teaching source: Learn basics reuses the same Level 3 material as Python Training and DSA map.
// Falls back to the existing lesson only when a Level 3 topic has not been mapped yet.
(()=>{
  const categoryToLevel3={
    'Arrays / Loops':'Array patterns','Lists':'Array patterns','Traversal':'Array patterns',
    'Strings':null,'Two Pointers':'Two pointers','Hash Map':'Hash map & set','Hash Set':'Hash map & set',
    'Stack':'Stack','Queue':'Queue','Linked List':'Linked list','Heap':'Heap / priority queue',
    'Graphs':'Graph representation','Trees / DFS':'Binary tree','Binary Search':'Binary search',
    'Sliding Window':'Sliding window','Recursion':'Recursion & backtracking','1-D DP':'Dynamic programming'
  };
  const shared=x=>{
    const title=categoryToLevel3[x.category];
    return title&&window.DSA_LEVEL3&&window.DSA_LEVEL3.find(d=>d.t===title);
  };
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const btn=document.getElementById('learnBtn'),box=document.getElementById('learnBox');
  if(!btn||!box)return;
  btn.onclick=()=>{
    if(box.classList.contains('show')){box.classList.remove('show');box.innerHTML='';return;}
    const x=qs[idx],d=shared(x);
    localStorage.setItem('bb_help_'+idx,helpLevel(idx)+1);
    box.classList.add('show');
    if(d){
      box.innerHTML='<b>Learn basics</b><div class="sharedLearn"><div class="dsTeachOne">'+d.tip+'</div><pre class="dsCode">'+esc(d.ex)+'</pre></div>';
      if(window.renderDsaVisuals)window.renderDsaVisuals(box);
    }else{
      box.innerHTML='<b>Learn basics</b><br>'+(x.lesson||'');
    }
    renderProgress();
  };
})();