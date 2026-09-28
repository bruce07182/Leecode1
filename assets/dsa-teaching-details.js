// Shared teaching refinements loaded after python-dsa.js.
// Keep these explanations shared across Python Training, DSA map, and Learn basics.
(()=>{
  const dsa=window.DSA_LEVEL3||[];

  const binary=dsa.find(x=>x.t==='Binary search');
  if(binary){
    binary.tip='<b>Binary search</b> requires an ordered search space. Keep a valid interval from <code>left</code> through <code>right</code>, compare the middle value with the target, then discard the half that cannot contain the answer. Because the remaining search space is roughly halved each step, binary search takes O(log n) time.'+
      '<br><br><b>Finding the middle index</b><br>In Python, the clearest formula is <code>mid = (left + right) // 2</code>. Both <code>left</code> and <code>right</code> matter; after several search steps, <code>left</code> will often no longer be 0.'+
      '<br><br>If <code>left + right</code> is even, there is one exact integer midpoint. Example: <code>left = 4</code>, <code>right = 8</code> gives <code>(4 + 8) // 2 = 6</code>.'+
      '<br><br>If <code>left + right</code> is odd, the interval has two center indexes. Example: indexes <code>4..9</code> have centers 6 and 7. <code>(4 + 9) / 2 = 6.5</code>, and Python integer floor division <code>//</code> chooses the lower center: <code>(4 + 9) // 2 = 6</code>. Choosing the lower middle is fine for standard binary search; what matters is updating the boundaries correctly so the interval always gets smaller.'+
      '<br><br>You may also see <code>left + (right - left) // 2</code>. It produces the same midpoint for normal non-negative indexes and is useful in fixed-width integer languages to avoid overflow from <code>left + right</code>. Python integers do not have that normal fixed-width overflow issue, so this course uses the simpler <code>(left + right) // 2</code>.'+
      '<pre class="dsDiagram">binary search halves</pre>';
    binary.ex='a=[1,3,5,7,9,11,13,15,17,19]; target=15\nleft,right=0,len(a)-1\nwhile left<=right:\n    mid=(left+right)//2\n    print("range",left,right,"mid",mid)\n    if a[mid]==target:\n        print(mid); break\n    if a[mid]<target: left=mid+1\n    else: right=mid-1\n# left becomes non-zero as the search narrows\n# Time O(log n), Space O(1)';
  }

  // Python Level 2: explain defaultdict before Level 3 graph code relies on it.
  // `lessons` is defined by python-basics.js in the same classic-script global scope.
  if(typeof lessons!=='undefined'){
    const helpers=lessons.find(x=>x.level===2&&x.t==='Counter & defaultdict');
    if(helpers){
      helpers.tip='<b>Counter</b> is a convenient dictionary for counting. <b>defaultdict</b> is essentially a normal <code>dict</code> plus one useful behavior: when <code>d[key]</code> asks for a missing key, it automatically creates a default value for that key. The default comes from what you pass in: <code>defaultdict(list)</code> creates <code>[]</code>, <code>defaultdict(int)</code> creates <code>0</code>, and <code>defaultdict(set)</code> creates an empty set. This is why it is convenient for grouping values and building graph adjacency lists.';
      helpers.ex='from collections import Counter, defaultdict\n\n# Counter: convenient counting\nc = Counter("aab")\nprint(c["a"])              # 2\n\n# Normal dict: initialize a missing list yourself\ngroups = {}\nif "fruit" not in groups:\n    groups["fruit"] = []\ngroups["fruit"].append("apple")\n\n# defaultdict(list): missing key automatically gets []\ngroups = defaultdict(list)\ngroups["fruit"].append("apple")\ngroups["fruit"].append("banana")\nprint(groups["fruit"])     # ["apple", "banana"]\n\n# Other common defaults\ncounts = defaultdict(int)   # missing key -> 0\nseen_by = defaultdict(set)  # missing key -> set()\n\n# Important: d[key] on a missing key actually inserts\n# that key with its new default value.';
      helpers.task='Use <code>defaultdict(list)</code> to group <code>"apple"</code> and <code>"banana"</code> under the key <code>"fruit"</code>, then print that list.';
      helpers.start='from collections import defaultdict\n\ngroups = defaultdict(list)\n# append apple and banana to groups["fruit"]\n';
      helpers.answer='from collections import defaultdict\n\ngroups = defaultdict(list)\ngroups["fruit"].append("apple")\ngroups["fruit"].append("banana")\nprint(groups["fruit"])';
      helpers.test=o=>o.trim()==="['apple', 'banana']";
    }
  }

  const graph=dsa.find(x=>x.t==='Graph representation');
  if(graph){
    graph.tip='<b>Graph first:</b> a graph is a set of vertices connected by edges. Unlike a tree, a general graph may contain cycles and multiple paths. An <b>adjacency list</b> stores each node with its directly connected neighbors and is usually space-efficient for sparse graphs.'+
      '<br><br><b>Why <code>defaultdict(list)</code> appears here</b><br>It is still a dictionary. The extra behavior is that a missing key automatically gets an empty list, so <code>g[a].append(b)</code> works even the first time node <code>a</code> is seen. With a normal dict, you would first need to create <code>g[a] = []</code> when the key is missing.'+
      '<br><br>For an undirected edge <code>(a, b)</code>, add both directions: <code>b</code> to <code>g[a]</code> and <code>a</code> to <code>g[b]</code>.'+
      '<pre class="dsDiagram">graph adjacency list</pre>';
  }
})();