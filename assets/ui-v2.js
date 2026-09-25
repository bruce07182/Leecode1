// UI/learning refinements layered after app.js.
(() => {
  const codeBlock=s=>'<pre class="lessonCode"><code>'+escapeHtml(s)+'</code></pre>';
  const traversalIntro = '<b>Traversal = loop through the data</b><br>'+codeBlock('nums = [3, -1, 5]\n\nfor x in nums:\n    print(x)')+'In DS&A, this is called <b>traversal</b>. In Python, the array is normally a <code>list</code> and the traversal is usually a <code>for</code> loop.<br><br>';

  [0,1,2].forEach(i => { if (qs[i]) qs[i].category = 'Traversal'; });
  if (qs[0]) qs[0].lesson = traversalIntro + '<b>Use the value while traversing</b><br>'+codeBlock('count = 0\nfor x in nums:\n    if x > 0:\n        count += 1')+'<code>x</code> is each value. <code>count</code> keeps the answer built so far.';
  if (qs[1]) qs[1].lesson = traversalIntro + '<b>Build another list</b><br>'+codeBlock('result = []\nfor x in nums:\n    result.append(x)')+'<code>append</code> adds one value to the end of a Python list.';
  if (qs[2]) qs[2].lesson = traversalIntro + '<b>Keep state while traversing</b><br>'+codeBlock('best = nums[0]\nfor x in nums[1:]:\n    if x > best:\n        best = x')+'<code>best</code> remembers the largest value seen so far.';

  const mapCard=document.getElementById('mapCard'),progressCard=document.getElementById('progressCard');
  if(mapCard&&!mapCard.classList.contains('hidden')) setTimeout(()=>renderConceptMap(),0);renderDashboard();

  window.oPicker = function(){const o='<option value="">?</option><option>1</option><option>log n</option><option>n</option><option>n log n</option><option>n^2</option><option>2^n</option><option>V + E</option>';return '<div class="complexityRows"><label>Time O(<select id="timePick">'+o+'</select>)</label><label>Space O(<select id="spacePick">'+o+'</select>)</label><button id="checkComplexity">Check</button></div><div id="complexityResult" class="checkResult"></div>';};

  // Code-first mini lessons for the major building blocks. Visuals remain where structure/movement is easier to see than describe.
  const miniLesson=x=>{
    const c=x.category;
    const lessons={
      'Strings':'<b>Strings are sequences</b><br>'+codeBlock("s = 'hello'\nfirst = s[0]       # 'h'\nlast = s[-1]       # 'o'\nfor ch in s:\n    print(ch)")+'Index or loop through a string much like a list. Strings themselves are immutable.',
      'Two Pointers':'<b>Two indexes move through the same data</b><br>'+codeBlock('left = 0\nright = len(nums) - 1\n\nwhile left < right:\n    # use nums[left] and nums[right]\n    left += 1\n    right -= 1'),
      'Hash Map':'<b>Dictionary: key → value</b><br>'+codeBlock("count = {}\nfor x in nums:\n    count[x] = count.get(x, 0) + 1\n\nprint(count[x])")+'Use a dictionary when you need to remember information by key.',
      'Hash Set':'<b>Set: remember whether something was seen</b><br>'+codeBlock('seen = set()\nfor x in nums:\n    if x in seen:\n        return True\n    seen.add(x)'),
      'Stack':'<b>Stack = last in, first out</b><br>'+codeBlock('stack = []\nstack.append(10)\nstack.append(20)\ntop = stack[-1]\nx = stack.pop()   # 20'),
      'Sorting':'<b>Sort before scanning when order helps</b><br>'+codeBlock('nums = [3, 1, 2]\nnums.sort()\n# nums is now [1, 2, 3]\n\nitems = sorted(items, key=lambda x: x[1])'),
      'Sliding Window':'<b>Reuse work while a range moves</b><br>'+codeBlock('window = sum(nums[:k])\nbest = window\n\nfor right in range(k, len(nums)):\n    window += nums[right]\n    window -= nums[right - k]\n    best = max(best, window)'),
      'Prefix Sum':'<b>Precompute sums once</b><br>'+codeBlock('prefix = [0]\nfor x in nums:\n    prefix.append(prefix[-1] + x)\n\n# sum nums[left:right]\ntotal = prefix[right] - prefix[left]'),
      'Binary Search':'<b>Discard half each step</b><br>'+codeBlock('left, right = 0, len(nums) - 1\nwhile left <= right:\n    mid = (left + right) // 2\n    if nums[mid] == target:\n        return mid\n    if nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1'),
      'Queue':'<b>Queue = first in, first out</b><br>'+codeBlock('from collections import deque\n\nq = deque()\nq.append(10)\nq.append(20)\nx = q.popleft()   # 10'),
      'Linked List':'<b>Follow next until None</b><br>'+codeBlock('node = head\nwhile node is not None:\n    print(node.val)\n    node = node.next'),
      'Recursion':'<b>A function solves a smaller version of itself</b><br>'+codeBlock('def factorial(n):\n    if n <= 1:          # base case\n        return 1\n    return n * factorial(n - 1)'),
      'Trees / DFS':'<b>DFS visits a node, then its subtrees</b><br>'+codeBlock('def dfs(node):\n    if not node:\n        return\n    print(node.val)\n    dfs(node.left)\n    dfs(node.right)'),
      'Heap':'<b>Heap gives fast access to the smallest item</b><br>'+codeBlock('import heapq\n\nh = []\nheapq.heappush(h, 3)\nheapq.heappush(h, 1)\nsmallest = heapq.heappop(h)   # 1'),
      'Graphs':'<b>Graph = nodes plus neighbors</b><br>'+codeBlock("graph = {\n    'A': ['B', 'C'],\n    'B': [],\n    'C': []\n}\n\nfor neighbor in graph['A']:\n    print(neighbor)"),
      '1-D DP':'<b>Save answers to smaller subproblems</b><br>'+codeBlock('dp = [0] * (n + 1)\ndp[0] = 1\ndp[1] = 1\n\nfor i in range(2, n + 1):\n    dp[i] = dp[i-1] + dp[i-2]')
    };
    return lessons[c]||x.lesson||'';
  };
  const visualUseful=c=>['Two Pointers','Stack','Sliding Window','Prefix Sum','Binary Search','Queue','Linked List','Recursion','Trees / DFS','Heap','Graphs','1-D DP'].includes(c);

  const learnBtn=document.getElementById('learnBtn'),learnBox=document.getElementById('learnBox');
  learnBtn.onclick=()=>{if(learnBox.classList.contains('show')){learnBox.classList.remove('show');learnBox.innerHTML='';return;}const x=qs[idx],n=helpLevel(idx)+1;localStorage.setItem('bb_help_'+idx,n);const generic='<b>Start with the smallest useful code</b><br>'+codeBlock('# 1. inspect the input\nfor x in nums:\n    print(x)\n\n# 2. keep only the state you need\nanswer = ...');learnBox.classList.add('show');learnBox.innerHTML='<b>Learn basics</b><br>'+(visualUseful(x.category)?lessonVisual(x):'')+(miniLesson(x)||generic)+(n>1?'<br><br><b>Try it</b><br>Trace the code with one tiny input before writing the whole solution.':'');renderLessonVisual(learnBox);renderProgress();};

  const hintBtn=document.getElementById('hintBtn'),hintBox=document.getElementById('hintBox');hintBtn.onclick=()=>{if(hintBox.classList.contains('show')){hintBox.classList.remove('show');hintBox.innerHTML='';return;}localStorage.setItem('bb_hints_'+idx,+(localStorage.getItem('bb_hints_'+idx)||0)+1);renderProgress();hintBox.classList.add('show');hintBox.innerHTML='<b>Hint</b><br>'+qs[idx].hint;};
  const answerBtn=document.getElementById('sampleBtn'),answerBox=document.getElementById('answerBox');answerBtn.textContent='Answer';answerBtn.onclick=()=>{if(answerBox.classList.contains('show')){answerBox.classList.remove('show');answerBox.innerHTML='';return;}const x=qs[idx],notes=sampleNotes(x);answerBox.classList.add('show');answerBox.innerHTML='<pre>'+escapeHtml(x.sample)+'</pre>'+(notes?'<div class="answerNotes">'+escapeHtml(notes).replace(/\n/g,'<br>')+'</div>':'');};

  const previousLoad=window.load;window.load=function(){previousLoad();[learnBox,hintBox,answerBox].forEach(el=>{el.classList.remove('show');el.innerHTML='';});};
  document.querySelectorAll('[data-collapse]').forEach(btn=>{const card=document.getElementById(btn.dataset.collapse),key='bb_collapsed_'+btn.dataset.collapse;if(localStorage.getItem(key)==='1')card.classList.add('collapsed');btn.onclick=()=>{const was=card.classList.contains('collapsed');card.classList.toggle('collapsed');localStorage.setItem(key,card.classList.contains('collapsed')?'1':'0');if(was&&card.id==='mapCard')setTimeout(()=>renderConceptMap(),0);};});
  const redrawMap=()=>{if(mapCard&&!mapCard.classList.contains('hidden')&&!mapCard.classList.contains('collapsed'))renderConceptMap();};window.addEventListener('resize',()=>{clearTimeout(window.__mapResize);window.__mapResize=setTimeout(redrawMap,180)});setTimeout(redrawMap,250);refreshOptions();
})();