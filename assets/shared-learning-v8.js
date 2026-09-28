// Learn basics is a tiny preview of the same shared curriculum used by Python Training / DSA map.
// It intentionally teaches only what the concept IS, not how to solve the current question.
(()=>{
  const categoryToLevel3={
    'Arrays / Loops':'Array patterns','Lists':'Array patterns','Traversal':'Array patterns',
    'Strings':null,'Two Pointers':'Two pointers','Hash Map':'Hash map & set','Hash Set':'Hash map & set',
    'Stack':'Stack','Queue':'Queue','Linked List':'Linked list','Heap':'Heap / priority queue',
    'Graphs':'Graph representation','Trees / DFS':'Binary tree','Binary Search':'Binary search',
    'Sliding Window':'Sliding window','Recursion':'Recursion & backtracking','1-D DP':'Dynamic programming'
  };
  const tiny={
    'Array patterns':['Array / list','Values stored in order and accessed by position.','nums = [10, 20, 30]\nprint(nums[1])   # 20'],
    'Two pointers':['Two pointers','Two indexes used to look at two positions in the same sequence.','left = 0\nright = len(nums) - 1'],
    'Hash map & set':['Hash map / set','A dict stores key → value pairs. A set stores unique values.','ages = {"Ana": 20}\nseen = {3, 7}'],
    'Stack':['Stack','Last in, first out (LIFO).','stack = []\nstack.append(10)\nstack.append(20)\nprint(stack.pop())   # 20'],
    'Queue':['Queue','First in, first out (FIFO).','from collections import deque\nq = deque([10, 20])\nprint(q.popleft())   # 10'],
    'Linked list':['Linked list','Each node stores a value and a reference to the next node.','node = [10, next_node]'],
    'Heap / priority queue':['Heap / priority queue','A structure that keeps the smallest (or highest-priority) item easy to access.','import heapq\nh = [3, 1, 2]\nheapq.heapify(h)\nprint(heapq.heappop(h))   # 1'],
    'Graph representation':['Graph','Nodes connected by edges. An adjacency list records each node’s neighbors.','graph = {"A": ["B", "C"], "B": ["A"]}'],
    'Binary tree':['Binary tree','Each node can have a left child and a right child.','tree = [10, left, right]'],
    'Binary search':['Binary search','Search a sorted sequence by repeatedly looking at the middle.','left = 0\nright = len(nums) - 1\nmid = (left + right) // 2'],
    'Sliding window':['Sliding window','A contiguous range that moves across a sequence.','window = nums[0:3]\n# then move one position right'],
    'Recursion & backtracking':['Recursion','A function can call itself on a smaller version of a problem.','def countdown(n):\n    if n == 0: return\n    countdown(n - 1)'],
    'Dynamic programming':['Dynamic programming','Save answers to smaller repeated subproblems so they can be reused.','dp = [0, 1, 1, 2, 3]']
  };
  const stringTiny=['String','Text stored as a sequence of characters. Python strings can be indexed and sliced, but cannot be changed in place.',"s = 'hello'\nprint(s[0])    # h\nprint(s[1:4])  # ell"];
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const btn=document.getElementById('learnBtn'),box=document.getElementById('learnBox');
  if(!btn||!box)return;
  btn.onclick=()=>{
    if(box.classList.contains('show')){box.classList.remove('show');box.innerHTML='';return;}
    const x=qs[idx];
    const sharedTitle=categoryToLevel3[x.category];
    const item=x.category==='Strings'?stringTiny:tiny[sharedTitle];
    localStorage.setItem('bb_help_'+idx,helpLevel(idx)+1);
    box.classList.add('show');
    if(item){
      box.innerHTML='<b>Learn basics · '+esc(item[0])+'</b><div class="sharedLearn"><div class="dsTeachOne">'+esc(item[1])+'</div><pre class="dsCode">'+esc(item[2])+'</pre><div class="status">Just the basic idea — not a hint for this problem.</div></div>';
    }else{
      // Unmapped categories keep only a short neutral definition; do not expose question-specific solution logic.
      box.innerHTML='<b>Learn basics</b><div class="status">Review the basic Python/DSA concept for this question. This section intentionally does not show how to solve it.</div>';
    }
    renderProgress();
  };
})();