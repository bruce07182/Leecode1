// Progressive solution library: reveal approaches only after prerequisite exercises are learned.
// Additive UI only; does not touch startup/auth/progress persistence.
(() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const qSelect = document.getElementById('q'), answerBox = document.getElementById('answerBox');
  const answerBtn = document.getElementById('sampleBtn');
  if (!qSelect || !answerBox || !answerBtn) return;

  function solved(i) {
    const opt = Array.from(qSelect.options).find(o => Number(o.value) === i) || qSelect.options[i];
    if (!opt) return false;
    const text = opt.textContent || '';
    return opt.dataset.solved === 'true' || opt.dataset.mastered === 'true' || opt.classList.contains('solved') || opt.classList.contains('mastered') || /[✓✔]/.test(text);
  }
  const available = x => !x.requires || x.requires.every(solved);

  const libraries = {
    2:[{name:'Python max()',time:'O(n)',space:'O(1)',lesson:'Python built-in',tag:'Pythonic',code:'def find_max(nums):\n    return max(nums)'},{name:'Manual scan',time:'O(n)',space:'O(1)',lesson:'Best-so-far pattern',recommend:true,code:'def find_max(nums):\n    best = nums[0]\n    for x in nums[1:]:\n        if x > best:\n            best = x\n    return best'}],
    3:[{name:'Python slicing',time:'O(n)',space:'O(n)',lesson:'Python slicing',tag:'Pythonic',fallback:true,code:'def reverse_string(s):\n    return s[::-1]'},{name:'Build a string',time:'O(n²)',space:'O(n)',lesson:'String immutability',code:'def reverse_string(s):\n    result = ""\n    for ch in s:\n        result = ch + result\n    return result',note:'Why O(n²): strings are immutable, so each prepend creates and copies a growing new string. The total copied work is about 1 + 2 + ... + n.'},{name:'List + join',time:'O(n)',space:'O(n)',lesson:'Efficient construction',requires:[1],code:'def reverse_string(s):\n    chars = []\n    for i in range(len(s) - 1, -1, -1):\n        chars.append(s[i])\n    return "".join(chars)'},{name:'Two pointers',time:'O(n)',space:'O(n)',lesson:'Two-pointer pattern',requires:[4],recommend:true,code:'def reverse_string(s):\n    chars = list(s)\n    left, right = 0, len(chars) - 1\n    while left < right:\n        chars[left], chars[right] = chars[right], chars[left]\n        left += 1\n        right -= 1\n    return "".join(chars)',note:'This function starts with an immutable Python string, so list(s) creates O(n) extra storage. If the problem gives a mutable character array directly, the two-pointer swaps themselves use O(1) auxiliary space.'},{name:'reversed() + join',time:'O(n)',space:'O(n)',lesson:'Iterator + join',requires:[4],code:'def reverse_string(s):\n    return "".join(reversed(s))'},{name:'Stack',time:'O(n)',space:'O(n)',lesson:'LIFO',requires:[7],code:'def reverse_string(s):\n    stack = list(s)\n    out = []\n    while stack:\n        out.append(stack.pop())\n    return "".join(out)'},{name:'Recursion',time:'O(n²)',space:'O(n²)',lesson:'Recursive thinking',requires:[15],code:'def reverse_string(s):\n    if len(s) <= 1:\n        return s\n    return reverse_string(s[1:]) + s[0]',note:'Educational rather than preferred Python. Slicing and concatenation create strings across recursive calls, so this simple version can use O(n²) total temporary string storage; the call stack itself is O(n).'}],
    5:[{name:'Counter',time:'O(n)',space:'O(n)',lesson:'Python library',tag:'Pythonic',code:'def frequency(nums):\n    from collections import Counter\n    return dict(Counter(nums))'},{name:'Dictionary counts',time:'O(n)',space:'O(n)',lesson:'Hash-map pattern',recommend:true,code:'def frequency(nums):\n    counts = {}\n    for x in nums:\n        counts[x] = counts.get(x, 0) + 1\n    return counts'}],
    6:[{name:'Set length',time:'O(n)',space:'O(n)',lesson:'Python set',tag:'Pythonic',code:'def contains_duplicate(nums):\n    return len(nums) != len(set(nums))'},{name:'Seen set',time:'O(n)',space:'O(n)',lesson:'Early detection',recommend:true,code:'def contains_duplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False'}],
    7:[{name:'Reverse copy',time:'O(n)',space:'O(n)',lesson:'Python slicing',tag:'Pythonic',code:'def stack_order(items):\n    return items[::-1]'},{name:'Actual stack',time:'O(n)',space:'O(n)',lesson:'Push / pop',recommend:true,code:'def stack_order(items):\n    stack = []\n    for x in items:\n        stack.append(x)\n    result = []\n    while stack:\n        result.append(stack.pop())\n    return result'}],
    19:[{name:'Reverse and compare',time:'O(n)',space:'O(n)',lesson:'Python slicing',tag:'Pythonic',fallback:true,code:'def is_palindrome(s):\n    return s == s[::-1]'},{name:'Two pointers',time:'O(n)',space:'O(1)',lesson:'Mirrored indexes',requires:[4],recommend:true,code:'def is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True'}],
    27:[{name:'bisect_left',time:'O(log n)',space:'O(1)',lesson:'Python library',tag:'Pythonic',code:'from bisect import bisect_left\n\ndef search_insert(nums, target):\n    return bisect_left(nums, target)'},{name:'Boundary binary search',time:'O(log n)',space:'O(1)',lesson:'Reusable boundary search',requires:[11],recommend:true,code:'def search_insert(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid\n    return left'}],
    31:[{name:'Sort then take k',time:'O(n log n)',space:'O(n)',lesson:'Simple first',fallback:true,code:'def top_k(nums, k):\n    return sorted(nums, reverse=True)[:k]'},{name:'Size-k heap',time:'O(n log k)',space:'O(k)',lesson:'Keep only k candidates',requires:[17],recommend:true,code:'def top_k(nums, k):\n    import heapq\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return sorted(heap, reverse=True)'}],
    33:[{name:'Rolling DP',time:'O(n)',space:'O(1)',lesson:'Keep only needed states',recommend:true,code:'def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b'},{name:'DP table',time:'O(n)',space:'O(n)',lesson:'Make every state visible',requires:[18],code:'def climb_stairs(n):\n    if n <= 2:\n        return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for i in range(3, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]'}],
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

  function render() {
    const all = libraries[Number(qSelect.value)]; if (!all) return;
    const rows = all.filter(available); if (rows.length < 2) return;
    const hasRecommended = rows.some(r => r.recommend);
    const currentFallback = !hasRecommended ? (rows.find(r => r.fallback) || rows[0]) : null;
    const labelFor = r => { const a=[]; if(r.recommend)a.push('★ Recommended · DSA'); else if(r===currentFallback)a.push('★ Recommended for now'); if(r.tag)a.push('Pythonic'); return a.length?` <span class="status">${a.map(esc).join(' · ')}</span>`:''; };

    answerBox.innerHTML=''; const wrap=document.createElement('div'); wrap.className='progressiveSolutions';
    wrap.innerHTML='<b>Solutions</b><div class="status">Tap a solution to view its code.</div><div style="overflow-x:auto"><table class="solutionCompare"><thead><tr><th>Approach</th><th>Time</th><th>Space</th><th>Main lesson</th></tr></thead><tbody>'+rows.map((r,i)=>`<tr class="solutionRow" data-solution="${i}" style="cursor:pointer"><td>› ${esc(r.name)}${labelFor(r)}</td><td>${esc(r.time)}</td><td>${esc(r.space)}</td><td>${esc(r.lesson)}</td></tr><tr class="solutionDetail" data-detail="${i}" style="display:none"><td colspan="4"><pre class="lessonCode"><code>${esc(r.code)}</code></pre>${r.note?`<div class="status">${esc(r.note)}</div>`:''}</td></tr>`).join('')+'</tbody></table></div>';
    answerBox.appendChild(wrap);
    const setCell=(row,open=false)=>{const r=rows[Number(row.dataset.solution)];row.cells[0].innerHTML=`${open?'⌄':'›'} ${esc(r.name)}${labelFor(r)}`;};
    wrap.querySelectorAll('.solutionRow').forEach(row=>row.addEventListener('click',()=>{const i=row.dataset.solution,detail=wrap.querySelector(`[data-detail="${i}"]`),opening=detail.style.display==='none';wrap.querySelectorAll('.solutionDetail').forEach(d=>d.style.display='none');wrap.querySelectorAll('.solutionRow').forEach(r=>setCell(r,false));if(opening){detail.style.display='table-row';setCell(row,true);}}));
  }
  answerBtn.addEventListener('click',()=>setTimeout(render,0)); qSelect.addEventListener('change',()=>setTimeout(render,0));
})();
