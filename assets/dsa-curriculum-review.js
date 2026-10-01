// Final curriculum normalization layer.
// Keeps one lesson per concept, a dependency-friendly order, and concise basics with expandable deep dives.
(()=>{
  const dsa=window.DSA_LEVEL3||[];
  const by=t=>dsa.find(x=>x.t===t);
  const details=(title,html)=>`<details class="deepDive"><summary>${title}</summary><div class="dsTeachOne">${html}</div></details>`;

  // Separate concepts that were historically combined.
  const backtracking=by('Recursion & backtracking');
  if(backtracking){
    backtracking.t='Backtracking';
    backtracking.tip='<b>Backtracking</b> explores a decision tree by repeating <b>choose → recurse → undo</b>. Undoing restores the state before trying the next choice.'+
      details('Deep discussion · why backtracking works','Backtracking is useful when a problem asks for combinations, permutations, paths, or other choices. Recursion is commonly used to move down the decision tree, but recursion and backtracking are not the same concept: recursion is the mechanism; backtracking is the search strategy. A path list is often mutated while exploring, then restored with an undo such as <code>path.pop()</code>. When saving a completed path, copy it because the same mutable list is reused. Worst-case time is often exponential because many possible choices may need to be explored.');
  }

  const recursion=by('Recursion');
  if(recursion) recursion.tip='<b>Recursion</b> solves a problem by calling the same function on a smaller version of that problem. It needs a <b>base case</b> that stops and a recursive step that moves toward it.'+
    details('Deep discussion · call stack, cost, and when to use it','Every unfinished recursive call stays on the call stack until deeper calls return, so recursion uses stack space. A depth of <code>n</code> usually means O(n) stack space. Recursion is especially natural for trees, divide-and-conquer, DFS, and backtracking. Dynamic programming may use recursion with memoization, but DP is a separate technique because its defining idea is reusing overlapping subproblem results.');

  const hashing=by('Hashing');
  if(hashing) hashing.tip='<b>Hashing</b> converts a key into a hash value so a hash table can quickly choose where to look. Python <code>set</code> and <code>dict</code> are built on hash tables; learn their detailed behavior in the Set and Map / dict lessons.'+
    details('Deep discussion · collisions and complexity','Different keys can map into the same table area; this is a <b>collision</b>. Hash-table implementations resolve collisions internally and still provide average O(1) lookup, insert, and update when hashing is well behaved. The worst case can degrade beyond O(1). Keys also need stable hashing/equality behavior, which is why immutable values such as strings and numbers are common dictionary/set keys.');

  const set=by('Set');
  if(set) set.tip='<b>Set</b> stores unique keys. Use it when you care about membership, uniqueness, duplicate detection, or visited items rather than key → value data. Average membership and add are O(1).'+
    details('Deep discussion · relationship to hashing','A Python set is implemented with a hash table. The set stores keys without associated values. This makes patterns such as <code>if x in seen</code> and <code>seen.add(x)</code> concise and usually fast. Use Map / dict instead when each key needs associated information.');

  const map=by('Map / dict');
  if(map) map.tip='<b>Map / dict</b> stores <b>key → value</b> pairs. Use it for lookup, counting, grouping, indexes, or attaching information to a key. Average lookup and update are O(1).'+
    details('Deep discussion · relationship to hashing','Python <code>dict</code> is a hash map. Hashing locates the key efficiently, while the dictionary also stores its associated value. Common DSA patterns include frequency maps, value → index maps, adjacency maps, and grouping. Use Set when only key membership matters.');

  const string=by('String');
  if(string) string.tip='<b>String</b> is an ordered sequence of characters. Like an array, it supports indexing and slicing, but Python strings are <b>immutable</b>: changing text creates a new string.'+
    details('Deep discussion · array relationship and cost','Array and string problems share many patterns: traversal, two pointers, sliding window, and prefix-style preprocessing. The important Python difference is immutability. Indexing is O(1), but building strings repeatedly with concatenation can create extra copies; for many pieces, collect them and use <code>"".join(...)</code>.');

  const array=by('Array patterns');
  if(array){array.t='Array';array.tip='<b>Array</b> stores values by index in contiguous logical positions. Python normally uses <code>list</code> for array problems. Indexing is O(1), and the first skill is simple left-to-right traversal.'+
    details('Deep discussion · operations and patterns','Array access by index is O(1). Appending to a Python list is amortized O(1), while inserting/removing near the front or middle is O(n) because later elements shift. Arrays are the base for many algorithm patterns including two pointers, sliding window, prefix sum, binary search on sorted data, sorting, and dynamic programming tables.');}

  const linked=by('Linked list');
  if(linked) linked.tip='<b>Linked List</b> stores values in separate nodes connected by references. Follow <code>next</code> from the head; unlike an array, random indexing is not O(1).'+
    details('Deep discussion · tradeoffs','A linked list does not require contiguous element storage. Given a node, linking or unlinking nearby nodes can be O(1), but finding the node first is usually O(n). Common patterns use <code>current</code>, <code>prev</code>, and fast/slow pointers.');

  // Normalize display names.
  const renames={'Linked list':'Linked List','Map / dict':'Map / dict','Binary tree':'Tree','Graph representation':'Graph','Heap / priority queue':'Heap / Priority Queue','Binary search':'Binary Search','Two pointers':'Two Pointers','Sliding window':'Sliding Window','Prefix sum':'Prefix Sum','Math & bitwise':'Math & Bitwise','Divide & conquer':'Divide & Conquer','Dynamic programming':'Dynamic Programming'};
  dsa.forEach(x=>{if(renames[x.t])x.t=renames[x.t]});

  // Add a consistent expandable section when a lesson does not already have one.
  const genericDeep={
    'Stack':'A stack is LIFO. Python lists support O(1) amortized push with <code>append</code> and O(1) pop from the end. Stacks appear in parsing, monotonic-stack problems, iterative DFS, and simulating recursion.',
    'Queue':'A queue is FIFO. Python <code>collections.deque</code> provides O(1) append and popleft. Queues are central to BFS and level-order processing.',
    'Tree':'Tree algorithms often use recursion or an explicit stack/queue. Traversing all nodes is O(n); recursive DFS uses O(h) call-stack space where h is tree height.',
    'Graph':'Adjacency lists usually use O(V+E) space. Graph traversal must normally track visited nodes because general graphs can contain cycles and multiple paths.',
    'Heap / Priority Queue':'A heap keeps only a partial order, not a fully sorted list. In a min-heap the minimum is at index 0; push and pop are O(log n), peek is O(1), and heapify is O(n).',
    'Traversal':'Traversal means visiting relevant items systematically. A linear sequence traversal is usually O(n); trees and graphs need structured DFS/BFS traversal.',
    'Sorting':'Comparison sorting is generally O(n log n). Sorting can simplify later work by enabling binary search, grouping equal values, interval processing, or two-pointer movement.',
    'Prefix Sum':'Prefix sums spend O(n) preprocessing to make many range-sum queries O(1). The extra prefix slot at index 0 often makes range formulas cleaner.',
    'Search':'Linear search checks candidates one by one and is O(n). More structure can enable specialized search such as binary search, DFS, or BFS.',
    'Math & Bitwise':'Bitwise operations manipulate binary representations directly. Useful patterns include parity with <code>x & 1</code>, XOR cancellation, masks, and shifts.',
    'Divide & Conquer':'Divide-and-conquer subproblems are usually independent; solve each part and combine results. This differs from DP, where subproblems overlap and results are reused.',
    'Greedy':'A greedy choice is safe only when the problem has a property proving that locally best choices lead to a global solution. Greedy algorithms do not generally revisit earlier choices.',
    'Dynamic Programming':'DP applies when subproblems overlap and the larger answer can be built from smaller answers. Top-down memoization and bottom-up tabulation are two forms; state definition and transition are the key design choices.'
  };
  dsa.forEach(x=>{if(!x.tip.includes('<details')&&genericDeep[x.t])x.tip+=details('Deep discussion · details and complexity',genericDeep[x.t])});

  // DFS and BFS are intentionally separate algorithms.
  const dfs=by('DFS'),bfs=by('BFS');
  if(dfs&&!dfs.tip.includes('<details'))dfs.tip+=details('Deep discussion · recursion vs explicit stack','DFS can be recursive or use an explicit stack. On a graph represented by adjacency lists, complete DFS is O(V+E) time and O(V) visited/stack space in the worst case.');
  if(bfs&&!bfs.tip.includes('<details'))bfs.tip+=details('Deep discussion · shortest unweighted paths','BFS uses a queue and explores by distance in edges. That is why the first time BFS reaches a node in an unweighted graph gives a shortest-path distance. Complete BFS is O(V+E).');
  const bs=by('Binary Search');if(bs&&!bs.tip.includes('<details'))bs.tip+=details('Deep discussion · invariants and boundaries','Binary search works by maintaining an invariant about the remaining valid interval. Correct boundary updates matter more than the exact midpoint convention. Halving the interval gives O(log n) time.');
  const tp=by('Two Pointers');if(tp&&!tp.tip.includes('<details'))tp.tip+=details('Deep discussion · when pointer movement is valid','Two pointers help when structure tells you which pointer can safely move without missing an answer—for example, inward movement on sorted data or fast/slow movement on linked lists.');
  const sw=by('Sliding Window');if(sw&&!sw.tip.includes('<details'))sw.tip+=details('Deep discussion · fixed and variable windows','A fixed window adds one entering value and removes one leaving value. A variable window expands and shrinks according to a condition. The method is often O(n) because each boundary moves forward at most n times.');

  // Dependency-friendly curriculum order; one canonical lesson per topic.
  const order=['Array','String','Linked List','Hashing','Set','Map / dict','Stack','Queue','Tree','Graph','Heap / Priority Queue','Traversal','Sorting','Prefix Sum','Search','Binary Search','Two Pointers','Sliding Window','Math & Bitwise','Recursion','DFS','BFS','Divide & Conquer','Greedy','Backtracking','Dynamic Programming'];
  const rank=new Map(order.map((x,i)=>[x,i]));
  dsa.sort((a,b)=>(rank.get(a.t)??999)-(rank.get(b.t)??999));

  // Keep the classic `lessons` list in exactly the same order/names and remove stale duplicate level-3 entries.
  if(typeof lessons!=='undefined'&&Array.isArray(lessons)){
    const lower=lessons.filter(x=>x.level!==3);
    lessons.splice(0,lessons.length,...lower,...dsa);
  }
})();