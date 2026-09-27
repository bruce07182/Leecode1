// Share Python Level 3 implementation lessons with the main DSA map.
(() => {
  const pythonTopic={
    'Array':'Array patterns','Hashing':'Hash map & set','Stack':'Stack','Queue':'Queue','Linked List':'Linked list','Heap':'Heap / priority queue','Tree':'Binary tree','Graph':'Graph representation',
    'Two Pointers':'Two pointers','Sliding Window':'Sliding window','Binary Search':'Binary search','DFS / Recursion':'DFS','BFS':'BFS','Backtracking':'Recursion & backtracking','Dynamic Programming':'Dynamic programming'
  };
  const oldShow=window.showDsaConcept;
  if(!oldShow)return;
  const addPythonLink=name=>{
    const title=pythonTopic[name];
    if(!title)return;
    const popup=document.getElementById('dsaFocusPopup');
    const inner=popup&&popup.querySelector('.dsaFocusInner');
    if(!inner||inner.querySelector('.pythonImplLink'))return;
    const a=document.createElement('a');
    a.className='pythonImplLink';
    a.href='python.html?level=3&topic='+encodeURIComponent(title);
    a.textContent='Python implementation →';
    a.style.cssText='display:inline-block;margin:10px 0 2px;font-weight:700;color:#1d4ed8;text-decoration:none';
    const grid=inner.querySelector('.dsTeachGrid');
    if(grid)grid.insertAdjacentElement('afterend',a);else inner.appendChild(a);
  };
  const wrapped=name=>{oldShow(name);addPythonLink(name)};
  window.showDsaConcept=wrapped;
  document.addEventListener('click',e=>{
    const b=e.target.closest&&e.target.closest('#conceptMap [data-concept], #dsaFocusPopup [data-concept]');
    if(b)setTimeout(()=>addPythonLink(b.dataset.concept),0);
  },true);
})();