// LeetCode-style Python type annotations for every practice problem.
// Applied at render time so problem logic/tests remain unchanged.
(()=>{
  const types={
    two_sum:'def two_sum(nums: list[int], target: int) -> list[int]:',
    contains_duplicate:'def contains_duplicate(nums: list[int]) -> bool:',
    is_anagram:'def is_anagram(s: str, t: str) -> bool:',
    is_palindrome:'def is_palindrome(s: str) -> bool:',
    max_profit:'def max_profit(prices: list[int]) -> int:',
    search:'def search(nums: list[int], target: int) -> int:',
    search_insert:'def search_insert(nums: list[int], target: int) -> int:',
    length_of_longest_substring:'def length_of_longest_substring(s: str) -> int:',
    is_valid:'def is_valid(s: str) -> bool:',
    min_stack:'def min_stack(ops: list[list]) -> list[int]:',
    reverse_list:'def reverse_list(values: list[int]) -> list[int]:',
    has_cycle:'def has_cycle(next_idx: list[int], start: int) -> bool:',
    max_depth:'def max_depth(values: list[int | None]) -> int:',
    invert_tree:'def invert_tree(values: list[int | None]) -> list[int | None]:',
    level_order:'def level_order(values: list[int | None]) -> list[list[int]]:',
    num_islands:'def num_islands(grid: list[list[str]]) -> int:',
    flood_fill:'def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:',
    find_kth_largest:'def find_kth_largest(nums: list[int], k: int) -> int:',
    kth_stream:'def kth_stream(k: int, initial: list[int], adds: list[int]) -> list[int]:',
    climb_stairs:'def climb_stairs(n: int) -> int:',
    rob:'def rob(nums: list[int]) -> int:',
    subsets:'def subsets(nums: list[int]) -> list[list[int]]:',
    permute:'def permute(nums: list[int]) -> list[list[int]]:',
    top_k_frequent:'def top_k_frequent(nums: list[int], k: int) -> list[int]:',
    merge_intervals:'def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:'
  };

  const rewrite=(text,fn)=>{
    const sig=types[fn];
    if(!sig||typeof text!=='string')return text;
    const lines=text.split('\n');
    if(/^def\s+/.test(lines[0])) lines[0]=sig;
    return lines.join('\n');
  };

  // The practice page renders lcSig and lcCode dynamically. Observe those surfaces and
  // replace only the first function-definition line, preserving user code below it.
  const apply=()=>{
    const sigEl=document.getElementById('lcSig');
    const code=document.getElementById('lcCode');
    if(!sigEl||!code)return;
    const m=(sigEl.textContent||code.value||'').match(/def\s+([A-Za-z_]\w*)\s*\(/);
    if(!m)return;
    const fn=m[1],sig=types[fn];
    if(!sig)return;
    if(sigEl.textContent!==sig)sigEl.textContent=sig;
    if(code.value){
      const next=rewrite(code.value,fn);
      if(next!==code.value)code.value=next;
    }
  };
  const obs=new MutationObserver(apply);
  const start=()=>{
    const sig=document.getElementById('lcSig');
    if(sig)obs.observe(sig,{childList:true,subtree:true,characterData:true});
    document.getElementById('lcProblem')?.addEventListener('change',()=>setTimeout(apply,0));
    setTimeout(apply,0);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();