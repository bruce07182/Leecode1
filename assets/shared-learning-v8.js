// Learn basics reuses the exact same single-topic lesson as Python Training and the DSA map.
// Grouped DSA-map nodes remain responsible only for comparing related topics.
(()=>{
  const categoryToLevel3={
    'Arrays / Loops':'Array patterns','Lists':'Array patterns','Traversal':'Array patterns',
    'Two Pointers':'Two pointers','Hash Map':'Hash map & set','Hash Set':'Hash map & set',
    'Stack':'Stack','Queue':'Queue','Linked List':'Linked list','Heap':'Heap / priority queue',
    'Graphs':'Graph representation','Trees / DFS':'Binary tree','Binary Search':'Binary search',
    'Sliding Window':'Sliding window','Recursion':'Recursion & backtracking','1-D DP':'Dynamic programming'
  };
  const stringLesson={t:'String',tip:'A <b>string</b> is an ordered sequence of characters. Python strings support indexing and slicing but are immutable, so operations that appear to change a string create a new string.',ex:"s = 'hello'\nprint(s[0])    # h\nprint(s[-1])   # o\nprint(s[1:4])  # ell"};
  const btn=document.getElementById('learnBtn'),box=document.getElementById('learnBox');
  if(!btn||!box)return;
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const sharedLesson=x=>{
    if(x.category==='Strings')return stringLesson;
    const title=categoryToLevel3[x.category];
    return (window.DSA_LEVEL3||[]).find(item=>item.t===title)||null;
  };
  btn.onclick=()=>{
    if(box.classList.contains('show')){box.classList.remove('show');box.innerHTML='';return;}
    const lesson=sharedLesson(qs[idx]);
    window.foundationState.get(exerciseId(idx)).usedHelp=true;
    box.classList.add('show');
    box.innerHTML=lesson
      ? '<b>Learn basics · '+esc(lesson.t)+'</b><div class="sharedLearn"><div class="dsTeachOne">'+lesson.tip+'</div><pre class="dsCode">'+esc(lesson.ex)+'</pre></div>'
      : '<b>Learn basics</b><div class="status">This topic does not have a shared lesson yet.</div>';
    if(typeof renderLessonVisual==='function')renderLessonVisual(box);
    renderProgress();
  };
})();