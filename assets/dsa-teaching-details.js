// Shared teaching refinements loaded after python-dsa.js.
// Keep these explanations shared across Python Training, DSA map, and Learn basics.
(()=>{
  const lessons=window.DSA_LEVEL3||[];
  const binary=lessons.find(x=>x.t==='Binary search');
  if(!binary)return;
  binary.tip='<b>Binary search</b> requires an ordered search space. Keep a valid interval from <code>left</code> through <code>right</code>, compare the middle value with the target, then discard the half that cannot contain the answer. Because the remaining search space is roughly halved each step, binary search takes O(log n) time.'+
    '<br><br><b>Finding the middle index</b><br>In Python, the clearest formula is <code>mid = (left + right) // 2</code>. Both <code>left</code> and <code>right</code> matter; after several search steps, <code>left</code> will often no longer be 0.'+
    '<br><br>If <code>left + right</code> is even, there is one exact integer midpoint. Example: <code>left = 4</code>, <code>right = 8</code> gives <code>(4 + 8) // 2 = 6</code>.'+
    '<br><br>If <code>left + right</code> is odd, the interval has two center indexes. Example: indexes <code>4..9</code> have centers 6 and 7. <code>(4 + 9) / 2 = 6.5</code>, and Python integer floor division <code>//</code> chooses the lower center: <code>(4 + 9) // 2 = 6</code>. Choosing the lower middle is fine for standard binary search; what matters is updating the boundaries correctly so the interval always gets smaller.'+
    '<br><br>You may also see <code>left + (right - left) // 2</code>. It produces the same midpoint for normal non-negative indexes and is useful in fixed-width integer languages to avoid overflow from <code>left + right</code>. Python integers do not have that normal fixed-width overflow issue, so this course uses the simpler <code>(left + right) // 2</code>.'+
    '<pre class="dsDiagram">binary search halves</pre>';
  binary.ex='a=[1,3,5,7,9,11,13,15,17,19]; target=15\nleft,right=0,len(a)-1\nwhile left<=right:\n    mid=(left+right)//2\n    print("range",left,right,"mid",mid)\n    if a[mid]==target:\n        print(mid); break\n    if a[mid]<target: left=mid+1\n    else: right=mid-1\n# left becomes non-zero as the search narrows\n# Time O(log n), Space O(1)';
})();