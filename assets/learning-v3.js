// Progressive learning + simple-first answers.
// Each exercise teaches what is new here; prerequisite concepts are not re-taught.
(() => {
  const cb=s=>'<pre class="lessonCode"><code>'+escapeHtml(s)+'</code></pre>';
  const L=(title,code,text='')=>'<b>'+title+'</b><br>'+cb(code)+(text?text:'');
  const lessons=[
    L('Traversal + condition + counter','nums = [3, -1, 5]\ncount = 0\nfor x in nums:\n    if x > 0:\n        count += 1','A traversal visits each value. <code>if</code> filters; the counter remembers how many matched.'),
    L('New: odd/even and append','4 % 2   # 0: even\n7 % 2   # 1: odd\n\nresult = []\nfor x in nums:\n    if x % 2 == 0:\n        result.append(x)','<code>%</code> gives the remainder. <code>append</code> adds a matching value to the result.'),
    L('New: keep the best so far','best = nums[0]\nfor x in nums[1:]:\n    if x > best:\n        best = x','Initialize from a real input value so negative-only lists also work.'),
    L('New: string indexing and slicing',"s = 'hello'\nfirst = s[0]    # h\nlast = s[-1]    # o\nbackward = s[::-1]",'Strings are immutable: operations such as slicing create a new string.'),
    L('New: two indexes','left = 0\nright = len(nums) - 1\nwhile left < right:\n    use(nums[left], nums[right])\n    left += 1\n    right -= 1','Here a “pointer” is just an index. Move the two indexes inward.'),
    L('New: dictionary counts','counts = {}\nfor x in nums:\n    counts[x] = counts.get(x, 0) + 1','A dictionary stores <code>key → value</code>. <code>get(x, 0)</code> supplies 0 for a new key.'),
    L('New: set membership','seen = set()\nfor x in nums:\n    if x in seen:\n        return True\n    seen.add(x)','A set stores unique values and supports fast membership checks.'),
    L('New: stack = LIFO','stack = []\nstack.append(10)\nstack.append(20)\nx = stack.pop()   # 20','The last value pushed is the first value popped.'),
    L('New: sorting by a key','pairs = [[1,5], [2,1], [3,3]]\nout = sorted(pairs, key=lambda p: p[1])','<code>key</code> tells Python which part of each item controls the ordering.'),
    L('New: reuse a sliding window','window = sum(nums[:k])\nfor i in range(k, len(nums)):\n    window += nums[i]\n    window -= nums[i-k]','When the window moves, add the value entering and subtract the value leaving instead of summing everything again.'),
    L('New: running/prefix sum','total = 0\nresult = []\nfor x in nums:\n    total += x\n    result.append(total)','Each stored value is the sum from the beginning through the current position.'),
    L('New: binary-search boundaries','left = 0\nright = len(nums) - 1\nmid = left + (right - left) // 2','Binary search represents the remaining sorted search area with boundaries and repeatedly chooses its middle.'),
    L('New: queue = FIFO','from collections import deque\nq = deque()\nq.append(10)\nq.append(20)\nx = q.popleft()   # 10','Unlike a stack, the first value added is the first removed.'),
    L('New: adjacency list','graph = {\n    "A": ["B", "C"],\n    "B": []\n}\nneighbors = graph.get("A", [])','A graph can store each node as a dictionary key and its directly connected nodes as a list.'),
    L('New: follow links, not indexes','node = head\nwhile node is not None:\n    use(node[0])\n    node = node[1]','A linked list moves by following the next reference rather than using <code>i + 1</code>.'),
    L('New: recursion','def factorial(n):\n    if n <= 1:       # base case\n        return 1\n    return n * factorial(n - 1)','A recursive call must make the problem smaller and eventually reach a base case.'),
    L('New: tree DFS preorder','def preorder(tree):\n    if tree is None:\n        return []\n    value, left, right = tree\n    return [value] + preorder(left) + preorder(right)','Preorder is <b>node → left → right</b>. Recursion naturally follows the tree branches.'),
    L('New: min-heap','import heapq\nh = []\nheapq.heappush(h, 3)\nheapq.heappush(h, 1)\nx = heapq.heappop(h)   # 1','A heap is not fully sorted. Python’s min-heap makes the smallest item quick to access/remove.'),
    L('New: DP state + transition','dp[i] = dp[i-1] + dp[i-2]','For DP, first define what one state means, then define how already-known states build the next one.'),
    L('Combine: string + two pointers','left, right = 0, len(s)-1\nwhile left < right:\n    if s[left] != s[right]:\n        return False\n    left += 1\n    right -= 1','Nothing new about traversal: the key idea is comparing mirrored positions without creating a reversed string.'),
    L('New: complement lookup','seen = {}\nfor i, x in enumerate(nums):\n    need = target - x\n    if need in seen:\n        return [seen[need], i]\n    seen[x] = i','Instead of searching for a partner, calculate the exact value you need and look it up.'),
    L('New: count first, decide second','count = {}\nfor ch in s:\n    count[ch] = count.get(ch, 0) + 1\nfor i, ch in enumerate(s):\n    if count[ch] == 1:\n        return i','Some answers need global information first. The second pass preserves the original order.'),
    L('New: matching with stack top','pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\nif not stack or stack.pop() != pairs[ch]:\n    return False','A closing bracket must match the most recent unmatched opening bracket.'),
    L('New: store an invariant','stack.append(x)\nmins.append(x if not mins else min(x, mins[-1]))','The extra stack remembers the minimum for every stack depth, so getting the minimum does not require another scan.'),
    L('New: merge neighboring intervals','intervals.sort()\nmerged = [intervals[0]]\nfor start, end in intervals[1:]:\n    if start <= merged[-1][1]:\n        merged[-1][1] = max(merged[-1][1], end)','Sorting makes possible overlaps neighbors. Compare each interval only with the current merged interval.'),
    L('New: greedy choice','intervals.sort(key=lambda x: x[1])\nfor start, end in intervals:\n    if start >= last_end:\n        count += 1\n        last_end = end','Choosing the compatible interval that finishes earliest leaves the most room for what comes next.'),
    L('Combine: full binary search','while left <= right:\n    mid = (left + right) // 2\n    if nums[mid] == target:\n        return mid\n    if nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1','The new step is deciding which half cannot contain the target and discarding it.'),
    L('New: search for a boundary','left, right = 0, len(nums)\nwhile left < right:\n    mid = (left + right) // 2\n    if nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid','Do not stop at an equal value. Keep narrowing until <code>left</code> is the first valid insertion position.'),
    L('Combine: graph + queue + seen','q = deque([start])\nseen = {start}\nwhile q:\n    node = q.popleft()\n    for nxt in graph.get(node, []):\n        if nxt not in seen:\n            seen.add(nxt)\n            q.append(nxt)','BFS processes nodes in discovery order. Mark a node seen when enqueueing it so it is not queued twice.'),
    L('New: return information from children','def depth(tree):\n    if tree is None:\n        return 0\n    _, left, right = tree\n    return 1 + max(depth(left), depth(right))','The parent answer is built from answers returned by the two child subtrees.'),
    L('Combine: tree + queue','q = deque([tree])\nwhile q:\n    node = q.popleft()\n    if node[1]: q.append(node[1])\n    if node[2]: q.append(node[2])','A queue turns tree traversal from depth-first into level-by-level breadth-first order.'),
    L('New: keep only k candidates','heap = []\nfor x in nums:\n    heapq.heappush(heap, x)\n    if len(heap) > k:\n        heapq.heappop(heap)','A size-k min-heap throws away values that cannot belong to the largest k.'),
    L('New: choose → recurse → undo','path.append(nums[i])\nbacktrack(i + 1, path)\npath.pop()','Backtracking explores one choice, then undoes it so another branch starts from the correct state.'),
    L('Combine: DP with rolling state','a, b = 1, 2\nfor _ in range(3, n + 1):\n    a, b = b, a + b','The DP transition was learned earlier. Here the new optimization is keeping only the two states the next state needs.'),
    L('New: DP over choices','dp = [amount + 1] * (amount + 1)\ndp[0] = 0\nfor a in range(1, amount + 1):\n    for coin in coins:\n        if coin <= a:\n            dp[a] = min(dp[a], dp[a-coin] + 1)','For each amount, try every valid last coin and keep the best result.'),
    L('New: 2-D DP','dp = [[1] * n for _ in range(m)]\nfor r in range(1, m):\n    for c in range(1, n):\n        dp[r][c] = dp[r-1][c] + dp[r][c-1]','A state now needs two coordinates. Each cell depends on the cell above and the cell to the left.'),
    L('New: memoization','memo = {0: 0, 1: 1}\ndef f(n):\n    if n not in memo:\n        memo[n] = f(n-1) + f(n-2)\n    return memo[n]','Memoization adds a cache to recursion so the same subproblem is solved only once.')
  ];
  lessons.forEach((lesson,i)=>{if(qs[i])qs[i].lesson=lesson;});

  // The first answer is the shortest clear Python answer. Add an algorithm-explicit version only when the shortcut hides the idea.
  const answers={
    2:{simple:'def find_max(nums):\n    return max(nums)',deep:'def find_max(nums):\n    best = nums[0]\n    for x in nums[1:]:\n        if x > best:\n            best = x\n    return best',why:'The short answer is normal Python. The deeper version shows the “best so far” scan.'},
    3:{simple:'def reverse_string(s):\n    return s[::-1]',deep:'def reverse_string(s):\n    chars = []\n    for i in range(len(s)-1, -1, -1):\n        chars.append(s[i])\n    return "".join(chars)',why:'Slicing is simplest. The deeper version exposes backward traversal and string construction.'},
    5:{simple:'def frequency(nums):\n    from collections import Counter\n    return dict(Counter(nums))',deep:qs[5]?.sample,why:'Counter is simplest; the manual dictionary version shows the frequency-map algorithm.'},
    6:{simple:'def contains_duplicate(nums):\n    return len(nums) != len(set(nums))',deep:qs[6]?.sample,why:'The one-liner is simple; the manual set version shows early duplicate detection.'},
    7:{simple:'def stack_order(items):\n    return items[::-1]',deep:qs[7]?.sample,why:'Reversing gives the requested output, but the deeper version demonstrates actual stack push/pop behavior.'},
    17:{simple:'def heap_order(nums):\n    return sorted(nums)',deep:qs[17]?.sample,why:'Sorting is simplest for this exact output. The heap version is included because the exercise is teaching heap operations.'},
    19:{simple:'def is_palindrome(s):\n    return s == s[::-1]',deep:qs[19]?.sample,why:'The short Python answer is fine. Two pointers show the reusable O(1)-auxiliary-space pattern.'},
    27:{simple:'def lower_bound(nums, target):\n    from bisect import bisect_left\n    return bisect_left(nums, target)',deep:qs[27]?.sample,why:'bisect_left is the standard Python tool; the deeper version shows boundary binary search.'},
    31:{simple:'def k_largest(nums, k):\n    return sorted(nums, reverse=True)[:k]',deep:'def k_largest(nums, k):\n    import heapq\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return sorted(heap, reverse=True)',why:'Sorting is simplest. The size-k heap shows the useful O(n log k) top-k algorithm.'},
    33:{simple:qs[33]?.sample,deep:'def climb_stairs(n):\n    dp = [0] * (n + 1)\n    dp[0] = 1\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]',why:'Rolling variables are simpler and use less space. The table version makes the DP state and transition visible.'}
  };
  qs.forEach((q,i)=>{if(!answers[i])answers[i]={simple:q.sample};});
  window.__learningV3Answers=answers;
})();