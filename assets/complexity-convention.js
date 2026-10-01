// Interview convention used by this trainer:
// "Auxiliary Space O(...)" = working memory used by the algorithm beyond the required input
// and required return/output buffer. Output size may be discussed separately in Answer/review.
// Learn basics must teach concepts without leaking a question's answer.
(()=>{
  const api=window.foundationReviewApi;
  if(!api?.questions)return;

  const b5=api.questions.find(q=>/^5\. Two pointer movement$/.test(q.title));
  if(b5){
    b5.lesson=b5.lesson.replace(/<b>Complexity<\/b><br>[\s\S]*$/,
      '<b>Memory terminology</b><br><b>Auxiliary space</b> is the working memory an algorithm uses beyond the required input and required return/output buffer. The size of a required output can be discussed separately.');
  }

  // LeetCode-style typed signatures. Types live in the signature, not explanatory comments.
  const typed={
    count_positive:'def count_positive(nums: list[int]) -> int:',
    keep_evens:'def keep_evens(nums: list[int]) -> list[int]:',
    find_max:'def find_max(nums: list[int]) -> int:',
    reverse_string:'def reverse_string(s: str) -> str:',
    inward_pairs:'def inward_pairs(nums: list[int]) -> list[list[int]]:',
    frequency:'def frequency(nums: list[int]) -> dict[int, int]:',
    contains_duplicate:'def contains_duplicate(nums: list[int]) -> bool:',
    stack_order:'def stack_order(items: list[int]) -> list[int]:',
    sort_by_second:'def sort_by_second(pairs: list[list[int]]) -> list[list[int]]:',
    window_sums:'def window_sums(nums: list[int], k: int) -> list[int]:',
    prefix_sums:'def prefix_sums(nums: list[int]) -> list[int]:',
    middle_index:'def middle_index(left: int, right: int) -> int:',
    drain_queue:'def drain_queue(ops: list[list[object]]) -> list[int]:',
    linked_values:'def linked_values(head: list | None) -> list[int]:',
    factorial:'def factorial(n: int) -> int:',
    preorder:'def preorder(tree: list | None) -> list[int]:',
    heap_order:'def heap_order(nums: list[int]) -> list[int]:',
    ways:'def ways(n: int) -> int:',
    is_palindrome:'def is_palindrome(s: str) -> bool:',
    two_sum:'def two_sum(nums: list[int], target: int) -> list[int]:',
    first_unique:'def first_unique(s: str) -> int:',
    valid_parentheses:'def valid_parentheses(s: str) -> bool:',
    min_stack:'def min_stack(ops: list[list[object]]) -> list[int]:',
    merge_intervals:'def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:',
    max_nonoverlap:'def max_nonoverlap(intervals: list[list[int]]) -> int:',
    binary_search:'def binary_search(nums: list[int], target: int) -> int:',
    lower_bound:'def lower_bound(nums: list[int], target: int) -> int:',
    bfs:'def bfs(graph: dict[object, list[object]], start: object) -> list[object]:',
    tree_depth:'def tree_depth(tree: list | None) -> int:',
    level_order:'def level_order(tree: list | None) -> list[int]:',
    k_largest:'def k_largest(nums: list[int], k: int) -> list[int]:',
    subsets:'def subsets(nums: list[int]) -> list[list[int]]:',
    climb_stairs:'def climb_stairs(n: int) -> int:',
    coin_change:'def coin_change(coins: list[int], amount: int) -> int:',
    grid_paths:'def grid_paths(m: int, n: int) -> int:',
    fib:'def fib(n: int) -> int:',
    is_opening:'def is_opening(ch: str) -> bool:',
    find_saved_index:'def find_saved_index(nums: list[int], target: int) -> int:',
    clean_chars:'def clean_chars(s: str) -> str:',
    best_gain:'def best_gain(nums: list[int]) -> int:',
    longest_unique:'def longest_unique(s: str) -> int:',
    reverse_links:'def reverse_links(head: list | None) -> list | None:',
    middle_value:'def middle_value(head: list | None) -> int | None:',
    choose_undo:'def choose_undo(nums: list[int]) -> list[list[int]]:'
  };
  // "neighbors" is used by both graph-neighbor and grid-neighbor exercises.
  api.questions.forEach(q=>{
    let sig=typed[q.fn];
    if(q.fn==='neighbors') sig=q.args
      ?'def neighbors(rows: int, cols: int, r: int, c: int) -> list[list[int]]:'
      :'def neighbors(graph: dict[object, list[object]], node: object) -> list[object]:';
    if(!sig)return;
    q.sig=sig;
    const body=(q.starter||'').split('\n').slice(1).join('\n');
    q.starter=sig+'\n'+(body||'    ');
  });

  const relabel=()=>{
    const sp=document.getElementById('spacePick');if(!sp)return;
    const label=sp.closest('label');
    if(label)for(const n of label.childNodes)if(n.nodeType===Node.TEXT_NODE&&/Space/i.test(n.textContent||''))n.textContent=(n.textContent||'').replace(/Space\s*O\(\)/i,'Auxiliary Space O()');
    sp.setAttribute('aria-label','Auxiliary Space O()');
    sp.setAttribute('title','Working memory excluding the required input and required return/output buffer');
  };
  const original=window.bindInterview;if(typeof original!=="function")return;
  window.bindInterview=function(x){
    original(x);relabel();
    const key=x.title.includes('. ')?x.title.slice(x.title.indexOf('. ')+2):x.title;
    if(key!=="Two pointer movement")return;
    const cc=document.getElementById('checkComplexity');if(!cc)return;
    cc.onclick=()=>{
      const r=document.getElementById('complexityResult'),t=document.getElementById('timePick').value,sp=document.getElementById('spacePick').value;
      if(!t||!sp){r.textContent='Choose both.';return}
      const ok=t==='n'&&sp==='1';r.textContent=ok?'✅ Correct':'❌ Try again.';if(!ok)return;
      const i=api.questions.indexOf(x),id=api.exerciseId(i),st=api.state.get(id);
      if(st)st.complexity={code:document.getElementById('code').value,time:t,space:sp};
      window.renderProgress?.();window.queueCloud?.();
    };
  };
})();