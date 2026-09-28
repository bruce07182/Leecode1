// Progressive solution library: reveal approaches only after prerequisite exercises are learned.
// Additive UI only; does not touch startup/auth/progress persistence.
(() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const qSelect = document.getElementById('q');
  const answerBox = document.getElementById('answerBox');
  const answerBtn = document.getElementById('sampleBtn');
  if (!qSelect || !answerBox || !answerBtn) return;

  function solved(i) {
    const opt = Array.from(qSelect.options).find(o => Number(o.value) === i) || qSelect.options[i];
    if (!opt) return false;
    const text = opt.textContent || '';
    return opt.dataset.solved === 'true' || opt.dataset.mastered === 'true' ||
      opt.classList.contains('solved') || opt.classList.contains('mastered') || /[✓✔]/.test(text);
  }
  const available = x => !x.requires || x.requires.every(solved);

  const libraries = {
    2: [
      {name:'Python max()',time:'O(n)',space:'O(1)',lesson:'Python built-in',tag:'Pythonic',code:'def find_max(nums):\n    return max(nums)'},
      {name:'Manual scan',time:'O(n)',space:'O(1)',lesson:'Best-so-far pattern',recommend:true,code:'def find_max(nums):\n    best = nums[0]\n    for x in nums[1:]:\n        if x > best:\n            best = x\n    return best'}
    ],
    3: [
      {name:'Python slicing',time:'O(n)',space:'O(n)',lesson:'Python slicing',tag:'Pythonic',fallback:true,code:'def reverse_string(s):\n    return s[::-1]'},
      {name:'Build a string',time:'O(n²)',space:'O(n)',lesson:'String immutability',code:'def reverse_string(s):\n    result = ""\n    for ch in s:\n        result = ch + result\n    return result',note:'Why O(n²): strings are immutable, so each prepend creates and copies a growing new string. The total copied work is about 1 + 2 + ... + n.'},
      {name:'List + join',time:'O(n)',space:'O(n)',lesson:'Efficient construction',requires:[1],code:'def reverse_string(s):\n    chars = []\n    for i in range(len(s) - 1, -1, -1):\n        chars.append(s[i])\n    return "".join(chars)'},
      {name:'Two pointers',time:'O(n)',space:'O(n)',lesson:'Two-pointer pattern',requires:[4],recommend:true,code:'def reverse_string(s):\n    chars = list(s)\n    left, right = 0, len(chars) - 1\n    while left < right:\n        chars[left], chars[right] = chars[right], chars[left]\n        left += 1\n        right -= 1\n    return "".join(chars)',note:'This function starts with an immutable Python string, so list(s) creates O(n) extra storage. If the problem gives a mutable character array directly, the two-pointer swaps themselves use O(1) auxiliary space.'},
      {name:'reversed() + join',time:'O(n)',space:'O(n)',lesson:'Iterator + join',requires:[4],code:'def reverse_string(s):\n    return "".join(reversed(s))'},
      {name:'Stack',time:'O(n)',space:'O(n)',lesson:'LIFO',requires:[7],code:'def reverse_string(s):\n    stack = list(s)\n    out = []\n    while stack:\n        out.append(stack.pop())\n    return "".join(out)'},
      {name:'Recursion',time:'O(n²)',space:'O(n²)',lesson:'Recursive thinking',requires:[15],code:'def reverse_string(s):\n    if len(s) <= 1:\n        return s\n    return reverse_string(s[1:]) + s[0]',note:'Educational rather than preferred Python. Slicing and concatenation create strings across recursive calls, so this simple version can use O(n²) total temporary string storage; the call stack itself is O(n).'}
    ],
    5: [
      {name:'Counter',time:'O(n)',space:'O(n)',lesson:'Python library',tag:'Pythonic',code:'def frequency(nums):\n    from collections import Counter\n    return dict(Counter(nums))'},
      {name:'Dictionary counts',time:'O(n)',space:'O(n)',lesson:'Hash-map pattern',recommend:true,code:'def frequency(nums):\n    counts = {}\n    for x in nums:\n        counts[x] = counts.get(x, 0) + 1\n    return counts'}
    ],
    6: [
      {name:'Set length',time:'O(n)',space:'O(n)',lesson:'Python set',tag:'Pythonic',code:'def contains_duplicate(nums):\n    return len(nums) != len(set(nums))'},
      {name:'Seen set',time:'O(n)',space:'O(n)',lesson:'Early detection',recommend:true,code:'def contains_duplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False'}
    ],
    7: [
      {name:'Reverse copy',time:'O(n)',space:'O(n)',lesson:'Python slicing',tag:'Pythonic',code:'def stack_order(items):\n    return items[::-1]'},
      {name:'Actual stack',time:'O(n)',space:'O(n)',lesson:'Push / pop',recommend:true,code:'def stack_order(items):\n    stack = []\n    for x in items:\n        stack.append(x)\n    result = []\n    while stack:\n        result.append(stack.pop())\n    return result'}
    ],
    19: [
      {name:'Reverse and compare',time:'O(n)',space:'O(n)',lesson:'Python slicing',tag:'Pythonic',fallback:true,code:'def is_palindrome(s):\n    return s == s[::-1]'},
      {name:'Two pointers',time:'O(n)',space:'O(1)',lesson:'Mirrored indexes',requires:[4],recommend:true,code:'def is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True'}
    ],
    27: [
      {name:'bisect_left',time:'O(log n)',space:'O(1)',lesson:'Python library',tag:'Pythonic',code:'from bisect import bisect_left\n\ndef search_insert(nums, target):\n    return bisect_left(nums, target)'},
      {name:'Boundary binary search',time:'O(log n)',space:'O(1)',lesson:'Reusable boundary search',requires:[11],recommend:true,code:'def search_insert(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid\n    return left'}
    ],
    31: [
      {name:'Sort then take k',time:'O(n log n)',space:'O(n)',lesson:'Simple first',fallback:true,code:'def top_k(nums, k):\n    return sorted(nums, reverse=True)[:k]'},
      {name:'Size-k heap',time:'O(n log k)',space:'O(k)',lesson:'Keep only k candidates',requires:[17],recommend:true,code:'def top_k(nums, k):\n    import heapq\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return sorted(heap, reverse=True)'}
    ],
    33: [
      {name:'Rolling DP',time:'O(n)',space:'O(1)',lesson:'Keep only needed states',recommend:true,code:'def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b'},
      {name:'DP table',time:'O(n)',space:'O(n)',lesson:'Make every state visible',requires:[18],code:'def climb_stairs(n):\n    if n <= 2:\n        return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for i in range(3, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]'}
    ]
  };

  function render() {
    const all = libraries[Number(qSelect.value)];
    if (!all) return;
    const rows = all.filter(available);
    if (rows.length < 2) return;

    // Prefer the DSA recommendation once it is unlocked. Until then, identify a simple usable solution.
    const hasRecommended = rows.some(r => r.recommend);
    const currentFallback = !hasRecommended ? (rows.find(r => r.fallback) || rows[0]) : null;
    const labelFor = r => {
      const labels = [];
      if (r.recommend) labels.push('★ Recommended · DSA');
      else if (r === currentFallback) labels.push('★ Recommended for now');
      if (r.tag) labels.push(r.tag);
      return labels.length ? ` <span class="status">${labels.map(esc).join(' · ')}</span>` : '';
    };

    answerBox.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'progressiveSolutions';
    wrap.innerHTML = '<b>Solutions</b><div class="status">Tap a row to show its code. Recommendations favor reusable DSA patterns; Pythonic marks concise language-specific solutions.</div>' +
      '<div style="overflow-x:auto"><table class="solutionCompare"><thead><tr><th>Approach</th><th>Time</th><th>Space</th><th>Main lesson</th></tr></thead><tbody>' +
      rows.map((r,i) => `<tr class="solutionRow" data-solution="${i}" style="cursor:pointer"><td>› ${esc(r.name)}${labelFor(r)}</td><td>${esc(r.time)}</td><td>${esc(r.space)}</td><td>${esc(r.lesson)}</td></tr><tr class="solutionDetail" data-detail="${i}" style="display:none"><td colspan="4"><pre class="lessonCode"><code>${esc(r.code)}</code></pre>${r.note?`<div class="status">${esc(r.note)}</div>`:''}</td></tr>`).join('') +
      '</tbody></table></div>';
    answerBox.appendChild(wrap);

    const setApproachCell = (row, open=false) => {
      const r = rows[Number(row.dataset.solution)];
      row.cells[0].innerHTML = `${open?'⌄':'›'} ${esc(r.name)}${labelFor(r)}`;
    };
    wrap.querySelectorAll('.solutionRow').forEach(row => row.addEventListener('click', () => {
      const i = row.dataset.solution;
      const detail = wrap.querySelector(`[data-detail="${i}"]`);
      const opening = detail.style.display === 'none';
      wrap.querySelectorAll('.solutionDetail').forEach(d => d.style.display = 'none');
      wrap.querySelectorAll('.solutionRow').forEach(r => setApproachCell(r, false));
      if (opening) {
        detail.style.display = 'table-row';
        setApproachCell(row, true);
      }
    }));
  }

  answerBtn.addEventListener('click', () => setTimeout(render, 0));
  qSelect.addEventListener('change', () => setTimeout(render, 0));
})();
