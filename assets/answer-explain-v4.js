// Beginner-friendly explanations. IMPORTANT: explain only syntax that appears in the answer being shown.
// Details that belong only to the deeper/algorithm version go in `why`, not in the simple-answer explanation.
(() => {
  const A=window.__learningV3Answers;
  if(!A) return;
  const add=(i,text)=>{ if(A[i]) A[i].explain=text; };
  const deep=(i,text)=>{ if(A[i] && A[i].deep) A[i].why=text; };

  add(1,'result starts as an empty list. result.append(x) adds x as a new item at the end of that list. We use append because every matching even number becomes another output item. result[x] = ... would instead try to replace an item already at index x; x here is a number from nums, not an output position.');
  add(2,'max(nums) returns the largest value in nums. It is the simplest Python form for this task.');
  deep(2,'This version shows what max is doing conceptually: start with one real value as best, scan the remaining values, and replace best whenever a larger value appears.');
  add(3,'s[start:stop:step] is Python slicing. In s[::-1], start and stop are omitted, so the whole string is used; step = -1 means move backward one character at a time. Example: "abc"[::-1] becomes "cba".');
  deep(3,'This version avoids the slicing shortcut. range(len(s)-1, -1, -1) walks the indexes backward, append collects each character, and "".join(chars) combines the character list into one string.');
  add(5,'Counter(nums) counts how many times each value occurs. For [1, 2, 2], Counter(nums) contains counts equivalent to {1: 1, 2: 2}. dict(...) converts that Counter object into a normal Python dictionary.');
  deep(5,'This version shows the frequency-map algorithm directly. counts.get(x, 0) means: return counts[x] if x already exists; otherwise use 0. Using counts[x] alone on a new key would raise KeyError. counts[x] = old_count + 1 then stores the new count for that key. This is dictionary assignment because each key has one current count; append is a list operation for adding another item, which is not what we want here.');
  add(6,'set(nums) keeps only unique values. If len(set(nums)) is smaller than len(nums), at least one value occurred more than once.');
  deep(6,'This version exposes the seen-set algorithm. x in seen checks whether x appeared earlier, and seen.add(x) records it. Sets use add rather than append because a set stores unique members rather than ordered list positions.');
  add(7,'items[::-1] returns a reversed copy of items. Because a stack removes the last-arriving item first, reversing the arrival order gives the requested removal order.');
  deep(7,'This version demonstrates actual stack operations: append(x) pushes a new item onto the top/end of the list, and pop() removes the most recently pushed item.');
  add(8,'sorted(pairs, key=lambda pair: pair[1]) returns the pairs ordered by their second value. lambda pair: pair[1] is a small function that says: for each pair, use element 1 as its sorting key. Without key=..., Python would compare the pairs starting with their first value.');
  add(9,'nums[:k] takes the first k values to form the initial window. When the window moves right, += adds the new value entering and -= subtracts the old value leaving. That reuses the previous sum instead of summing the whole window again.');
  add(10,'result.append(total) adds each newly computed running total as another item at the end of result. We use append because the output grows by one result for each input position.');
  add(11,'// is integer division, so the middle position is an integer index. left + (right - left) // 2 computes the middle index of the current search range.');
  add(12,'deque is Python’s efficient queue type. q.append(value) puts a new item at the back; q.popleft() removes the oldest item from the front. Those two operations produce first-in, first-out behavior.');
  add(13,'graph is a dictionary whose key is a node and whose value is that node’s neighbor list. graph.get(node, []) means: return graph[node] if node exists; otherwise return an empty list. We use get here so a missing node does not raise KeyError.');
  add(18,'a, b = b, a + b is simultaneous assignment: Python first computes the right side using the old values, then updates both variables. It keeps only the two previous DP states instead of storing an entire list.');
  add(20,'enumerate(nums) gives both i, the index, and x, the value. need = target - x computes the partner value required. seen[x] = i stores x as a dictionary key and its index as the associated value, so a later seen[need] can retrieve the earlier index.');
  add(21,'count.get(ch, 0) means: use the current count for ch, or 0 if ch has never appeared. count[ch] alone would raise KeyError on the first occurrence. count[ch] = ... then updates the one count associated with that character. enumerate(s) later provides both each character and its index because the answer must be an index.');
  add(22,'pairs[ch] looks up which opening bracket must match the current closing bracket. stack.append(ch) saves each unmatched opening bracket. stack.pop() removes the most recent one, which is exactly the last-in-first-out behavior bracket matching needs.');
  add(23,'stack.append(x) saves the pushed value. mins.append(...) adds a corresponding minimum for the same stack depth. mins[-1] means the last/current saved minimum. Two parallel stacks let get_min read the current minimum without scanning the main stack.');
  add(24,'merged.append(interval[:]) adds another non-overlapping interval to the result. interval[:] makes a copy. When intervals overlap, merged[-1][1] = ... updates the end of the existing last interval instead of adding a new result.');
  add(25,'key=lambda x: x[1] tells sort to order intervals by ending time. float("-inf") is negative infinity, so it is smaller than every normal endpoint and lets the first compatible interval be accepted.');
  add(27,'bisect_left(nums, target) returns the leftmost position where target could be inserted while nums remains sorted. If target already exists, it returns its first valid insertion position.');
  deep(27,'This version shows how bisect_left works: keep a half-open search range, test the middle, and continue left even on equality until the first valid position remains.');
  add(28,'deque([start]) creates a queue already containing start. seen = {start} creates a set containing start. seen.add(nxt) records that a neighbor has been discovered, while q.append(nxt) schedules that neighbor to be processed later.');
  add(31,'sorted(nums, reverse=True) returns the values from largest to smallest. [:k] then takes only the first k values.');
  deep(31,'The heap version shows the more scalable top-k algorithm. heappush adds each candidate. When the heap grows beyond k items, heappop removes the smallest, so only the largest k candidates survive.');
  add(32,'path.append(nums[i]) adds the current choice. result.append(path[:]) saves a copy of the current path; [:] matters because path will change later. path.pop() then removes the last choice so another branch can be explored.');
  add(33,'a, b = b, a + b updates both variables from their old values at the same time: a becomes the old b, and b becomes the next stair count. Only the previous two counts are needed.');
  deep(33,'The DP-table version stores every intermediate answer. dp[i] = dp[i-1] + dp[i-2] makes the recurrence explicit, which can be easier to understand before optimizing to two variables.');
  add(34,'dp[a] is the best answer currently known for amount a. dp[a-coin] + 1 means: first make the smaller amount a-coin, then use one additional coin. min(...) keeps the better answer. The list already has a fixed slot for every amount, so dp[a] = ... updates that slot rather than appending another item.');
  add(35,'[[1] * n for _ in range(m)] creates m separate rows with n cells each. dp[r][c] identifies one fixed cell. dp[r][c] = dp[r-1][c] + dp[r][c-1] says the paths to this cell equal the paths arriving from above plus the paths arriving from the left.');
  add(36,'memo is a dictionary mapping an input x to the Fibonacci value already computed for x. if x not in memo checks whether the answer is missing. memo[x] = ... stores the computed answer under that exact key so later calls can retrieve it directly.');
})();