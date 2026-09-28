// LeetCode Bridge: curated next step above Foundations.
// Lives inside the DSA map card and reuses existing solved state; no new DB tables.
(()=>{
  const mapCard=document.getElementById('mapCard');
  if(!mapCard)return;
  const body=mapCard.querySelector('.collapsibleBody');
  if(!body)return;
  const solved=i=>{
    const q=document.getElementById('q'); if(!q)return false;
    const opt=Array.from(q.options).find(o=>Number(o.value)===i)||q.options[i];
    if(!opt)return false;
    const t=opt.textContent||'';
    return opt.dataset.solved==='true'||opt.dataset.mastered==='true'||opt.classList.contains('solved')||opt.classList.contains('mastered')||/[✓✔]/.test(t);
  };
  const items=[
    {n:1,title:'Two Sum',difficulty:'Easy',skills:'Array + Hash Map',req:[5,20],url:'https://leetcode.com/problems/two-sum/'},
    {n:217,title:'Contains Duplicate',difficulty:'Easy',skills:'Array + Set',req:[6],url:'https://leetcode.com/problems/contains-duplicate/'},
    {n:125,title:'Valid Palindrome',difficulty:'Easy',skills:'String + Two Pointers',req:[4,19],url:'https://leetcode.com/problems/valid-palindrome/'},
    {n:121,title:'Best Time to Buy and Sell Stock',difficulty:'Easy',skills:'Array + One-pass state',req:[2],url:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'},
    {n:704,title:'Binary Search',difficulty:'Easy',skills:'Binary Search',req:[26],url:'https://leetcode.com/problems/binary-search/'},
    {n:35,title:'Search Insert Position',difficulty:'Easy',skills:'Binary Search boundary',req:[27],url:'https://leetcode.com/problems/search-insert-position/'},
    {n:20,title:'Valid Parentheses',difficulty:'Easy',skills:'Stack',req:[7],url:'https://leetcode.com/problems/valid-parentheses/'},
    {n:206,title:'Reverse Linked List',difficulty:'Easy',skills:'Linked List + Pointers',req:[14],url:'https://leetcode.com/problems/reverse-linked-list/'},
    {n:104,title:'Maximum Depth of Binary Tree',difficulty:'Easy',skills:'Tree + DFS/BFS',req:[29],url:'https://leetcode.com/problems/maximum-depth-of-binary-tree/'},
    {n:102,title:'Binary Tree Level Order Traversal',difficulty:'Medium',skills:'Tree + BFS + Queue',req:[30],url:'https://leetcode.com/problems/binary-tree-level-order-traversal/'},
    {n:347,title:'Top K Frequent Elements',difficulty:'Medium',skills:'Hash Map + Heap',req:[5,17,31],url:'https://leetcode.com/problems/top-k-frequent-elements/'},
    {n:78,title:'Subsets',difficulty:'Medium',skills:'Backtracking',req:[32],url:'https://leetcode.com/problems/subsets/'},
    {n:70,title:'Climbing Stairs',difficulty:'Easy',skills:'1-D DP',req:[33],url:'https://leetcode.com/problems/climbing-stairs/'}
  ];
  const section=document.createElement('div');
  section.id='bridgeSection';
  section.innerHTML='<div class="sectionHead" style="margin-top:14px"><b>Next · LeetCode</b><button type="button" id="bridgeToggle" class="collapseBtn">Show</button></div><div id="bridgeBody" style="display:none"><div class="status" id="bridgeProgress"></div><div id="bridgeList" class="questionList"></div></div>';
  body.appendChild(section);
  const bridgeBody=section.querySelector('#bridgeBody'),toggle=section.querySelector('#bridgeToggle');
  let open=localStorage.getItem('bb_bridge_open')==='1';
  function setOpen(v){open=v;bridgeBody.style.display=open?'block':'none';toggle.textContent=open?'Hide':'Show';localStorage.setItem('bb_bridge_open',open?'1':'0');}
  toggle.onclick=()=>setOpen(!open);
  function render(){
    const list=section.querySelector('#bridgeList'),progress=section.querySelector('#bridgeProgress'); if(!list||!progress)return;
    const readyCount=items.filter(x=>x.req.every(solved)).length;
    progress.textContent=`Foundation readiness: ${readyCount}/${items.length} LeetCode problems ready · Foundations → LeetCode → mixed practice → interview`;
    list.innerHTML=items.map(x=>{
      const ready=x.req.every(solved);
      return `<div class="bridgeItem" style="margin:8px 0;padding:10px;border:1px solid var(--border,#ddd);border-radius:10px"><div><b>LC ${x.n} · ${x.title}</b> <span class="status">${x.difficulty}</span></div><div class="status">${x.skills} · ${ready?'Ready':'Build foundations first'}</div>${ready?`<a href="${x.url}" target="_blank" rel="noopener">Open on LeetCode ↗</a>`:'<span class="status">Complete the related foundation exercises to unlock.</span>'}</div>`;
    }).join('');
  }
  setOpen(open); render();
  document.addEventListener('click',e=>{if(e.target&&e.target.id==='runBtn')setTimeout(render,500);});
})();