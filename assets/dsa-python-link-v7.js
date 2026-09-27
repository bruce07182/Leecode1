// Share Python Level 3 teaching content directly inside the DSA map popup (no practice).
(() => {
  const lesson={
    'Array':{title:'Python implementation',text:'Python lists are the array used in most DSA problems.',code:'a = [4, 2, 7, 2]\n\n# traversal\nfor x in a:\n    print(x)\n\n# index traversal\nfor i in range(len(a)):\n    print(i, a[i])\n\n# build a result\nout = []\nfor x in a:\n    if x % 2 == 0:\n        out.append(x)'},
    'Hashing':{title:'Python implementation',text:'dict and set are hash tables: average O(1) lookup, insert, and delete.',code:'nums = [2, 7, 2]\n\nseen = set()\nfor x in nums:\n    if x in seen:\n        print("duplicate", x)\n    seen.add(x)\n\ncount = {}\nfor x in nums:\n    count[x] = count.get(x, 0) + 1'},
    'Stack':{title:'Python implementation',text:'Stack = LIFO. Use the end of a Python list.',code:'stack = []\nstack.append(10)      # push\nstack.append(20)\nprint(stack[-1])      # peek\nprint(stack.pop())    # pop'},
    'Queue':{title:'Python implementation',text:'Queue = FIFO. deque gives O(1) operations at both ends.',code:'from collections import deque\nq = deque()\nq.append(10)          # enqueue\nq.append(20)\nprint(q[0])           # front\nprint(q.popleft())    # dequeue'},
    'Linked List':{title:'Python implementation',text:'A node stores a value and a link to the next node.',code:'class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\nhead = Node(1, Node(2, Node(3)))\ncur = head\nwhile cur:\n    print(cur.val)\n    cur = cur.next'},
    'Heap':{title:'Python implementation',text:'heapq is a min-heap. Smallest is at index 0; push/pop are O(log n).',code:'import heapq\nh = []\nfor x in [5, 2, 8, 1]:\n    heapq.heappush(h, x)\n\nprint(h[0])           # smallest\nwhile h:\n    print(heapq.heappop(h))'},
    'Tree':{title:'Python implementation',text:'A binary-tree node stores a value and up to two child references.',code:'class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nroot = TreeNode(1, TreeNode(2), TreeNode(3))\n\ndef dfs(node):\n    if not node: return\n    print(node.val)\n    dfs(node.left)\n    dfs(node.right)'},
    'Graph':{title:'Python implementation',text:'Most graph problems use an adjacency list: node → neighbors.',code:'from collections import defaultdict\nedges = [(0,1), (0,2), (1,3)]\ngraph = defaultdict(list)\n\nfor a, b in edges:\n    graph[a].append(b)\n    graph[b].append(a)  # undirected'},
    'Two Pointers':{title:'Python implementation',text:'Move two indexes according to the condition instead of nested scanning.',code:'left, right = 0, len(a) - 1\nwhile left < right:\n    s = a[left] + a[right]\n    if s == target:\n        break\n    if s < target:\n        left += 1\n    else:\n        right -= 1'},
    'Sliding Window':{title:'Python implementation',text:'Maintain a contiguous range instead of recomputing each range.',code:'k = 3\nwindow = sum(a[:k])\nbest = window\n\nfor right in range(k, len(a)):\n    window += a[right]\n    window -= a[right-k]\n    best = max(best, window)'},
    'Binary Search':{title:'Python implementation',text:'On sorted data, discard half of the remaining search space each step.',code:'left, right = 0, len(a) - 1\nwhile left <= right:\n    mid = (left + right) // 2\n    if a[mid] == target:\n        return mid\n    if a[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1'},
    'DFS / Recursion':{title:'Python implementation',text:'DFS goes deep before returning. seen prevents revisiting graph nodes.',code:'seen = set()\n\ndef dfs(node):\n    if node in seen:\n        return\n    seen.add(node)\n    for nei in graph[node]:\n        dfs(nei)'},
    'BFS':{title:'Python implementation',text:'BFS uses a queue and explores one distance or level at a time.',code:'from collections import deque\nq = deque([start])\nseen = {start}\n\nwhile q:\n    node = q.popleft()\n    for nei in graph[node]:\n        if nei not in seen:\n            seen.add(nei)\n            q.append(nei)'},
    'Backtracking':{title:'Python implementation',text:'Backtracking = choose → recurse → undo.',code:'path = []\n\ndef backtrack(i):\n    if i == len(nums):\n        result.append(path.copy())\n        return\n\n    path.append(nums[i])  # choose\n    backtrack(i + 1)      # explore\n    path.pop()             # undo\n    backtrack(i + 1)      # skip'},
    'Dynamic Programming':{title:'Python implementation',text:'DP stores answers to repeated subproblems. Define what dp[i] means first.',code:'# dp[i] = Fibonacci(i)\ndp = [0] * (n + 1)\ndp[1] = 1\n\nfor i in range(2, n + 1):\n    dp[i] = dp[i-1] + dp[i-2]\n\nprint(dp[n])'}
  };
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const addLesson=name=>{
    const d=lesson[name], popup=document.getElementById('dsaFocusPopup'), inner=popup&&popup.querySelector('.dsaFocusInner');
    if(!d||!inner||inner.querySelector('.pythonMapLesson'))return;
    const box=document.createElement('div');
    box.className='pythonMapLesson';
    box.style.cssText='margin-top:12px;padding-top:12px;border-top:1px solid #e5eaf1';
    box.innerHTML='<b>'+d.title+'</b><div class="dsTeachOne" style="margin:5px 0 8px">'+d.text+'</div><pre class="dsCode">'+esc(d.code)+'</pre>';
    const practice=inner.querySelector('.focusQuestions');
    if(practice)practice.insertAdjacentElement('beforebegin',box);else inner.appendChild(box);
  };
  document.addEventListener('click',e=>{
    const b=e.target.closest&&e.target.closest('#conceptMap [data-concept], #dsaFocusPopup [data-concept]');
    if(b)setTimeout(()=>addLesson(b.dataset.concept),0);
  },true);
})();