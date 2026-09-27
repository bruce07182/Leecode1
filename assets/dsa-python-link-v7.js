// Enrich the existing DSA quick view instead of adding a second lesson block.
// The map owns the concept + visual; this file adds implementation + complexity in the same flow.
(() => {
  const lesson={
    'Array':{text:'Python lists are the array used in most DSA problems.',complexity:'Index O(1) · append O(1) avg · search O(n)',code:'a = [4, 2, 7, 2]\nfor i, x in enumerate(a):\n    print(i, x)'},
    'Hashing':{text:'Use set for keys only; dict for key → value.',complexity:'Lookup / insert / delete: O(1) average',code:'seen = set()\ncount = {}\nfor x in nums:\n    seen.add(x)\n    count[x] = count.get(x, 0) + 1'},
    'Stack':{text:'LIFO: the newest item leaves first. A Python list works well as a stack.',complexity:'push / pop end: O(1)',code:'stack = []\nstack.append(10)       # push\nstack.append(20)\ntop = stack[-1]        # peek\nx = stack.pop()        # pop'},
    'Queue':{text:'FIFO: the oldest item leaves first. Use deque, not list.pop(0).',complexity:'append / popleft: O(1)',code:'from collections import deque\nq = deque()\nq.append(10)           # enqueue\nq.append(20)\nx = q.popleft()        # dequeue'},
    'Linked List':{text:'Each node owns a value and a next reference; traversal follows the links.',complexity:'access/search O(n) · insert after known node O(1)',code:'class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\nhead = Node(1, Node(2, Node(3)))\ncur = head\nwhile cur:\n    print(cur.val)\n    cur = cur.next'},
    'Heap':{text:'A heap maintains priority without fully sorting everything.',complexity:'min O(1) · push/pop O(log n)',code:'import heapq\nh = [5, 2, 8, 1]\nheapq.heapify(h)\nsmallest = h[0]\nx = heapq.heappop(h)'},
    'Tree':{text:'A binary-tree node links to left and right children; recursion naturally follows the structure.',complexity:'Traversal O(n) · recursion space O(height)',code:'class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef dfs(node):\n    if not node: return\n    print(node.val)\n    dfs(node.left)\n    dfs(node.right)'},
    'Graph':{text:'An adjacency list stores only each node’s neighbors and is the usual LeetCode representation.',complexity:'Traversal O(V + E)',code:'from collections import defaultdict\ngraph = defaultdict(list)\nfor a, b in edges:\n    graph[a].append(b)\n    graph[b].append(a)   # undirected'},
    'Traversal':{text:'Traversal means visiting the relevant items. The loop changes with the data structure.',complexity:'Usually O(number of visited items)',code:'for x in a:            # array / list\n    print(x)\n\nwhile node:             # linked list\n    node = node.next'},
    'Two Pointers':{text:'Keep two positions and move the one that can improve the current state.',complexity:'Often O(n) time · O(1) space',code:'left, right = 0, len(a)-1\nwhile left < right:\n    s = a[left] + a[right]\n    if s < target: left += 1\n    elif s > target: right -= 1\n    else: break'},
    'Sorting':{text:'Sorting can expose order that makes later scanning, greedy choices, or binary search possible.',complexity:'Python sort: O(n log n)',code:'a.sort()          # changes a\nb = sorted(a)     # new list'},
    'Sliding Window':{text:'Reuse one contiguous range: add what enters and remove what leaves.',complexity:'Often O(n) instead of O(n × window)',code:'window = sum(a[:k])\nbest = window\nfor right in range(k, len(a)):\n    window += a[right]\n    window -= a[right-k]\n    best = max(best, window)'},
    'Prefix Sum':{text:'Precompute cumulative totals once, then answer range sums by subtraction.',complexity:'Build O(n) · range query O(1)',code:'prefix = [0]\nfor x in a:\n    prefix.append(prefix[-1] + x)\n\n# sum a[left:right]\ntotal = prefix[right] - prefix[left]'},
    'Binary Search':{text:'Sorted/monotonic search space lets each comparison remove half the candidates.',complexity:'O(log n) time · O(1) space',code:'left, right = 0, len(a)-1\nwhile left <= right:\n    mid = (left + right) // 2\n    if a[mid] == target: return mid\n    if a[mid] < target: left = mid + 1\n    else: right = mid - 1'},
    'Search':{text:'Choose the search that matches the structure: scan, binary search, DFS, or BFS.',complexity:'Depends on search space',code:'for i, x in enumerate(a):\n    if x == target:\n        return i'},
    'Math':{text:'Use numeric properties to avoid unnecessary simulation or scanning.',complexity:'Often O(1) per arithmetic check',code:'x % 2 == 0       # even\nx % k             # remainder\n// quotient\n# divmod(x, k) gives quotient + remainder'},
    'Bitwise':{text:'Bit operations work directly on binary state and are useful for masks, parity, and XOR patterns.',complexity:'O(1) for fixed-size integers',code:'x & 1            # odd/even\nx ^ y            # XOR\nx << 1           # shift left\nmask |= 1 << i    # set bit i'},
    'DFS / Recursion':{text:'DFS follows one path deeply, then returns. In graphs, mark visited nodes.',complexity:'Graph DFS O(V + E)',code:'seen = set()\ndef dfs(node):\n    if node in seen: return\n    seen.add(node)\n    for nei in graph[node]:\n        dfs(nei)'},
    'BFS':{text:'A queue preserves discovery order, so BFS expands one level/distance at a time.',complexity:'Graph BFS O(V + E)',code:'from collections import deque\nq = deque([start])\nseen = {start}\nwhile q:\n    node = q.popleft()\n    for nei in graph[node]:\n        if nei not in seen:\n            seen.add(nei)\n            q.append(nei)'},
    'Divide & Conquer':{text:'Split into independent smaller problems, solve each, then combine.',complexity:'Depends on split/combine; merge sort O(n log n)',code:'def solve(a):\n    if len(a) <= 1: return a\n    mid = len(a)//2\n    left = solve(a[:mid])\n    right = solve(a[mid:])\n    return combine(left, right)'},
    'Greedy':{text:'Commit to the best local choice only when the problem has a property that makes it safe.',complexity:'Often O(n) or O(n log n) with sorting/heap',code:'items.sort(key=...)\nfor item in items:\n    if can_take(item):\n        take(item)'},
    'Backtracking':{text:'Build a candidate incrementally: choose → explore → undo.',complexity:'Often exponential; pruning can reduce work',code:'path = []\ndef backtrack(i):\n    if i == len(nums):\n        result.append(path.copy()); return\n    path.append(nums[i])\n    backtrack(i + 1)\n    path.pop()\n    backtrack(i + 1)'},
    'Dynamic Programming':{text:'Define a state, reuse smaller answers, and build toward the requested answer.',complexity:'states × work per transition',code:'# dp[i] = answer for state i\ndp = [0] * (n + 1)\ndp[1] = 1\nfor i in range(2, n + 1):\n    dp[i] = dp[i-1] + dp[i-2]'}
  };
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const enrich=name=>{
    const d=lesson[name], popup=document.getElementById('dsaFocusPopup'), inner=popup&&popup.querySelector('.dsaFocusInner');
    if(!d||!inner||inner.querySelector('.dsaCombinedLesson'))return;
    const grid=inner.querySelector('.dsTeachGrid');
    if(!grid)return;
    // Keep the original visual as the visual explanation, but replace its old tiny code sample
    // with the fuller Python implementation. This removes old/new duplication.
    const oldCode=grid.querySelector('.dsCode');
    if(oldCode){
      oldCode.textContent=d.code;
      oldCode.insertAdjacentHTML('beforebegin','<div class="dsaCombinedLesson"><b>Python · how it works</b><div class="dsTeachOne">'+d.text+'</div><div class="dsaComplexity">'+d.complexity+'</div></div>');
    }
  };
  document.addEventListener('click',e=>{
    const b=e.target.closest&&e.target.closest('#conceptMap [data-concept], #dsaFocusPopup [data-concept]');
    if(b)setTimeout(()=>enrich(b.dataset.concept),0);
  },true);
})();