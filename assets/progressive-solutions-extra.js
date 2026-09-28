// Additional multi-solution comparisons for core DSA questions.
// Uses the same table interaction as progressive-solutions-v1 without changing tests or progress.
(() => {
  const q=document.getElementById('q'), box=document.getElementById('answerBox'), btn=document.getElementById('sampleBtn');
  if(!q||!box||!btn)return;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const libs={
    9:[
      {name:'Recompute each window',time:'O(n·k)',space:'O(1)',lesson:'Simple baseline',code:'def window_sums(nums, k):\n    return [sum(nums[i:i+k]) for i in range(len(nums)-k+1)]'},
      {name:'Sliding window',time:'O(n)',space:'O(1)',lesson:'Reuse previous work',recommend:true,code:'def window_sums(nums, k):\n    window = sum(nums[:k])\n    result = [window]\n    for i in range(k, len(nums)):\n        window += nums[i] - nums[i-k]\n        result.append(window)\n    return result'}
    ],
    14:[
      {name:'Iterative traversal',time:'O(n)',space:'O(1)',lesson:'Follow next references',recommend:true,code:'def linked_values(head):\n    result = []\n    while head is not None:\n        result.append(head[0])\n        head = head[1]\n    return result'},
      {name:'Recursive traversal',time:'O(n)',space:'O(n)',lesson:'Node + smaller list',code:'def linked_values(head):\n    if head is None:\n        return []\n    return [head[0]] + linked_values(head[1])'}
    ],
    17:[
      {name:'Python sorted()',time:'O(n log n)',space:'O(n)',lesson:'Sort everything',tag:'Pythonic',code:'def heap_order(nums):\n    return sorted(nums)'},
      {name:'Heap push + pop',time:'O(n log n)',space:'O(n)',lesson:'Heap operations',recommend:true,code:'def heap_order(nums):\n    import heapq\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n    result = []\n    while heap:\n        result.append(heapq.heappop(heap))\n    return result'}
    ],
    20:[
      {name:'Brute-force pairs',time:'O(n²)',space:'O(1)',lesson:'Baseline pair search',code:'def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i+1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]'},
      {name:'Hash map',time:'O(n)',space:'O(n)',lesson:'Complement lookup',recommend:true,code:'def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i'}
    ],
    26:[
      {name:'bisect_left + verify',time:'O(log n)',space:'O(1)',lesson:'Python binary-search library',tag:'Pythonic',code:'def binary_search(nums, target):\n    from bisect import bisect_left\n    i = bisect_left(nums, target)\n    return i if i < len(nums) and nums[i] == target else -1'},
      {name:'Iterative binary search',time:'O(log n)',space:'O(1)',lesson:'Discard half each step',recommend:true,code:'def binary_search(nums, target):\n    left, right = 0, len(nums)-1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        if nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1'},
      {name:'Recursive binary search',time:'O(log n)',space:'O(log n)',lesson:'Recursive search interval',code:'def binary_search(nums, target):\n    def search(left, right):\n        if left > right: return -1\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        if nums[mid] < target: return search(mid+1, right)\n        return search(left, mid-1)\n    return search(0, len(nums)-1)'}
    ],
    29:[
      {name:'Recursive DFS',time:'O(n)',space:'O(h)',lesson:'Depth from child results',recommend:true,code:'def tree_depth(tree):\n    if tree is None: return 0\n    _, left, right = tree\n    return 1 + max(tree_depth(left), tree_depth(right))'},
      {name:'BFS by levels',time:'O(n)',space:'O(w)',lesson:'Count tree levels',code:'def tree_depth(tree):\n    from collections import deque\n    if tree is None: return 0\n    q = deque([tree]); depth = 0\n    while q:\n        depth += 1\n        for _ in range(len(q)):\n            node = q.popleft()\n            if node[1]: q.append(node[1])\n            if node[2]: q.append(node[2])\n    return depth'}
    ],
    30:[
      {name:'BFS queue',time:'O(n)',space:'O(w)',lesson:'Natural level-order traversal',recommend:true,code:'def level_order(tree):\n    from collections import deque\n    if tree is None: return []\n    q=deque([tree]); out=[]\n    while q:\n        node=q.popleft(); out.append(node[0])\n        if node[1]: q.append(node[1])\n        if node[2]: q.append(node[2])\n    return out'},
      {name:'DFS with depth buckets',time:'O(n)',space:'O(h)',lesson:'Track depth explicitly',code:'def level_order(tree):\n    levels=[]\n    def dfs(node, depth):\n        if node is None: return\n        if depth == len(levels): levels.append([])\n        levels[depth].append(node[0])\n        dfs(node[1], depth+1); dfs(node[2], depth+1)\n    dfs(tree, 0)\n    return [x for level in levels for x in level]'}
    ],
    32:[
      {name:'Backtracking',time:'O(n·2ⁿ)',space:'O(n)',lesson:'Choose → recurse → undo',recommend:true,code:'def subsets(nums):\n    result=[]\n    def backtrack(i,path):\n        if i==len(nums):\n            result.append(path[:]); return\n        backtrack(i+1,path)\n        path.append(nums[i])\n        backtrack(i+1,path)\n        path.pop()\n    backtrack(0,[])\n    return result'},
      {name:'Iterative expansion',time:'O(n·2ⁿ)',space:'O(n·2ⁿ)',lesson:'Double existing subsets',code:'def subsets(nums):\n    result=[[]]\n    for x in nums:\n        result += [subset + [x] for subset in result]\n    return result'}
    ]
  };
  function render(){
    const rows=libs[Number(q.value)]; if(!rows)return;
    box.innerHTML=''; const wrap=document.createElement('div'); wrap.className='progressiveSolutions';
    const label=r=>{const a=[];if(r.recommend)a.push('★ Recommended · DSA');if(r.tag)a.push(r.tag);return a.length?` <span class="status">${a.map(esc).join(' · ')}</span>`:'';};
    wrap.innerHTML='<b>Solutions</b><div class="status">Tap a row to show its code. Compare the tradeoffs, then modify your solution if you want to practice another approach.</div><div style="overflow-x:auto"><table class="solutionCompare"><thead><tr><th>Approach</th><th>Time</th><th>Space</th><th>Main lesson</th></tr></thead><tbody>'+rows.map((r,i)=>`<tr class="solutionRow" data-i="${i}" style="cursor:pointer"><td>› ${esc(r.name)}${label(r)}</td><td>${esc(r.time)}</td><td>${esc(r.space)}</td><td>${esc(r.lesson)}</td></tr><tr class="solutionDetail" data-d="${i}" style="display:none"><td colspan="4"><pre class="lessonCode"><code>${esc(r.code)}</code></pre></td></tr>`).join('')+'</tbody></table></div><div class="status" style="margin-top:10px"><b>Practice another approach:</b> choose another solution → modify your code in the editor → <b>Run</b> the same tests again.</div>';
    box.appendChild(wrap);
    const set=(row,open)=>{const r=rows[Number(row.dataset.i)];row.cells[0].innerHTML=`${open?'⌄':'›'} ${esc(r.name)}${label(r)}`;};
    wrap.querySelectorAll('.solutionRow').forEach(row=>row.onclick=()=>{const d=wrap.querySelector(`[data-d="${row.dataset.i}"]`),open=d.style.display==='none';wrap.querySelectorAll('.solutionDetail').forEach(x=>x.style.display='none');wrap.querySelectorAll('.solutionRow').forEach(x=>set(x,false));if(open){d.style.display='table-row';set(row,true);}});
  }
  // Loaded after v1, so for these additional questions this renderer owns the Answer area.
  btn.addEventListener('click',()=>setTimeout(render,1));
  q.addEventListener('change',()=>setTimeout(render,1));
})();
