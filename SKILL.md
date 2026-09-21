# LeetCode Foundations — Curriculum & Product Skill

## Purpose
Bridge basic Python coding directly into the code patterns used in real LeetCode solutions.

The learning order is:
1. **Python pieces used on LeetCode** — small, reusable code operations that appear directly inside solutions.
2. **LeetCode patterns** — combine those pieces into common solution structures.
3. **LeetCode-style problems** — practice recognizing and applying the pattern.

The app is not a general computer-science course. Prefer code the learner will actually type on LeetCode.

## LeetCode bridge rule
Every Basic exercise must answer: **"Will this code or operation reappear almost unchanged in a real LeetCode solution?"**

If not, remove, merge, or redesign the exercise. Do not create artificial command-processing or data-structure demonstrations merely to teach terminology.

Examples:
- Teach `seen = set()`, `x in seen`, `seen.add(x)` because those lines appear directly in duplicate detection and graph traversal.
- Teach `q = deque(...)`, `q.popleft()`, and `q.append(...)` because those lines appear directly in BFS.
- Teach `stack.append(x)`, `stack.pop()`, and `stack[-1]` because those lines appear directly in stack problems.
- Teach indexing, slicing, `enumerate`, `sorted(key=...)`, and `heapq` as Python tools used naturally in LeetCode solutions.

Do not ban normal Python built-ins or idioms merely to force an algorithm. If LeetCode normally allows `max()`, slicing, `sorted()`, `set()`, `Counter`, etc., the trainer should accept them. The lesson should explain the underlying pattern and when a more algorithmic approach matters.

## Pythonic shortcut + interview-understanding rule
LeetCode-valid Python shortcuts are first-class solutions, but the curriculum must also teach what they do underneath well enough for a technical interview.

For an important shortcut or library operation, “Teach me basics” should cover four things when relevant:
1. **Pythonic solution** — the concise code the learner may actually use on LeetCode.
2. **Underlying mechanics** — the loop, indexes, pointers, stack/queue behavior, hashing, sorting, or other algorithmic idea that the shortcut hides.
3. **Complexity** — expected time and auxiliary/output space, including hidden allocation. Do not imply that a concise built-in is O(1) merely because it is one line.
4. **Interview version** — show the manual implementation or reasoning an interviewer may ask for, without forbidding the Pythonic version.

Example: for reversing a string, teach that `s[::-1]` is valid and concise, but also explain backward indexing/two-pointer mechanics and that slicing creates a new O(n)-size string. For an in-place mutable-array reversal, teach the O(1)-auxiliary-space two-pointer swap.

For standard-library structures such as `collections.deque`, teach and use the library rather than reimplementing it, while explaining FIFO behavior and why `popleft()` is the appropriate queue operation.

The goal is **two levels of fluency**: write effective Python on LeetCode, and explain/implement the underlying algorithm when an interviewer removes the shortcut.

Avoid repeating the same concept in a separate artificial Basic exercise when the next LeetCode-style exercise already provides a clear, small use of that exact code. A Basic should be a bridge, not an obstacle.

## Core learning rule
A **Basic** exercise teaches one small Python operation or code pattern that is directly reusable on LeetCode.

A **Combination** exercise combines already-seen code pieces into a recognizable LeetCode pattern or problem.

Prefer short bridges:
- dictionary get/update → frequency counting → Two Sum / counting problems
- set membership/add → duplicate detection → visited set
- deque append/popleft → BFS
- list append/pop/peek → stack problems
- left/right indexes → palindrome / two pointers
- running total → prefix sums / sliding window
- sorted/key → intervals / greedy
- recursion base/call → tree DFS / backtracking

Do not classify an exercise as Basic merely because it is Easy. Do not add a Basic whose only purpose is terminology if its code is not useful later.

## Dependency and ordering rule
Dependencies are curriculum prerequisites, not arbitrary earlier questions.

Order the question list in a near-topological learning sequence: whenever practical, a prerequisite should appear shortly before the problem that uses it. Do not scatter a Basic skill far away from the LeetCode pattern it prepares.

A question is available only when all prerequisites are completed. Prefer the smallest true prerequisite set.

**Single source of truth:** Concept Map arrows and question unlocking must represent the same dependency model. Never manually draw an arrow that is not reflected in actual prerequisites.

## Concept Map
The Concept Map is the main view of the learning structure.

It must support:
- **Basics** view — atomic skills only.
- **Combinations** view — combination/pattern layer, with its prerequisite foundations visible when useful.
- Clicking a concept shows its exercises.
- Clicking an available exercise opens it.
- Hidden concepts should not appear as falsely locked simply because they belong to another mode.

Status colors must use one shared CSS definition everywhere:
- Mastered — light green
- Learning — light yellow
- Available — light blue
- Locked — light gray

Legend uses the exact same styles as concept nodes.

## Mastery
Current intended states:
- **New** — no passing attempt.
- **Learning** — at least one passing attempt.
- **Mastered** — repeated successful performance without help.

Mastery should eventually be based on recent attempts, not lifetime hint usage. A learner who once used a hint must still be able to become Mastered later.

Spaced review:
- Learning: review after about 2 days.
- Mastered: review after about 7 days.

## Exercise requirements
Every exercise must have:
- title
- category/concept
- explicit level: `basic` or `combination`
- description
- function signature
- starter code
- tests
- hint
- sample answer
- valid prerequisite/dependency list

Sample answer is revealed only after the learner passes.

For Basic exercises, also provide useful “Teach me basics” guidance where appropriate.

## Curriculum coverage checklist
Before adding more combination problems, ensure the Basic layer teaches the mechanics below with enough small exercises to build coding fluency.

### Python / control flow
- variables and assignment
- comparisons / booleans
- if / elif / else
- for loops
- while loops
- range / indexes
- functions, parameters, return
- nested loops

### Arrays / lists
- create list
- read/update by index
- append
- iterate values
- iterate indexes
- scan for count/sum/min/max
- build/filter a result list

### Strings
- indexing
- iteration
- build/transform strings
- character tests
- reverse/traverse from both ends

### Hash map
- create dictionary
- lookup/default
- insert/update
- frequency counting
- membership
- iterate keys/items

### Hash set
- add
- membership
- duplicate detection
- set as “seen” memory

### Stack
- push
- pop
- peek
- empty check
- LIFO trace

### Queue
- enqueue
- dequeue
- front
- empty check
- FIFO trace
- prefer `collections.deque` for real queue operations

### Two indexes / pointers
- left/right indexes
- move one pointer
- move both pointers
- traverse inward
- fast/slow pointer mechanics

Target-pair and palindrome-style algorithms belong in Combination after these mechanics.

### Sliding window mechanics
- identify a window
- compute first fixed window
- remove outgoing value
- add incoming value
- move window boundaries

Optimization problems using the window belong in Combination.

### Prefix sum
- running sum
- build prefix array
- obtain range sum from prefixes

### Binary search mechanics
- left/right boundaries
- calculate mid
- choose which half remains
- termination conditions
- lower-bound idea

Full search problems belong in Combination.

### Linked list
- node/value/next mental model
- traverse next pointers
- update a pointer
- fast/slow pointer mechanics
- reverse-link mechanics

### Recursion
- base case
- recursive call
- shrinking the problem
- return/unwind
- trace call stack

### Trees
- node / left / right
- leaf / null
- preorder/inorder/postorder mechanics
- DFS recursion
- BFS queue mechanics
- BST comparison idea

### Heap
- min-heap concept
- push
- pop
- peek
- maintain top K mechanics

### Graphs
- adjacency list
- neighbors
- visited set
- queue-based BFS mechanics
- stack/recursive DFS mechanics

### Backtracking
- choose
- recurse
- undo
- decision tree
- path/result separation

### Intervals
- start/end representation
- sort by start/end
- overlap test

### Greedy
- local-choice concept
- sort by useful criterion
- update current best/boundary

### Dynamic programming
- state meaning
- base cases
- transition
- 1-D table
- rolling state
- 2-D grid state

### Additional fundamentals to audit/add
These are easy to miss and should be reviewed before declaring the foundation complete:
- sorting and custom sort keys
- matrix/grid traversal
- `deque` usage
- fast/slow linked-list pointers
- monotonic stack (after ordinary stack)
- bit manipulation basics
- graph topological-order mechanics
- union-find basics
- trie basics

Some of the last items may belong in a later/intermediate foundation layer rather than the first Basic pass.

## Combination layer examples
Only unlock after their underlying mechanics:
- Two Sum / hash lookup
- target pair / two pointers
- palindrome / two pointers
- fixed and variable sliding-window problems
- Valid Parentheses / stack
- Binary Search applications
- BFS / queue + visited
- DFS / recursion + visited
- tree depth/traversal problems
- top-K / heap
- prefix-sum + hash-map problems
- merge intervals
- subsets / backtracking
- greedy interval selection
- climbing stairs / 1-D DP
- coin change / DP
- grid paths / 2-D DP

## Product behavior
- Mobile-friendly browser app.
- Python runs in browser through Pyodide.
- Enter auto-indents.
- Tab inserts 4 spaces; Shift+Tab unindents.
- localStorage works without login.
- Supabase login enables cross-device sync.
- Cloud table stores code/history by user + problem.
- Never put Supabase service-role/secret keys in frontend.
- Public publishable key is acceptable in browser when RLS is correct.
- RLS must restrict users to their own rows.
- First-time browser should show sign-in/create-account; local use remains possible.
- Account, progress, review, mode, and concept map live in the menu.

## Progress and help
Track:
- attempts
- passing attempts
- hints
- basic-help usage
- review due
- mastery

Longer term, hint/help usage should be stored per attempt in history so mastery and cloud sync are accurate across devices.

## Known design issues / audit list
Review these whenever changing curriculum:
1. Concept Map and actual question dependencies can drift apart. They must be unified.
2. Some current “Basic” exercises are actually combinations (notably target-pair/two-pointer and fixed-window optimization).
3. Some old dependencies were chosen by question number rather than true prerequisite skill.
4. A concept with one exercise is usually not enough to establish coding fluency.
5. Tree/graph BFS should teach `deque`, not `list.pop(0)`.
6. Mastery currently uses lifetime hint count; this can permanently prevent Mastered after one early hint.
7. Basic-help count is local-only rather than fully represented in cloud history.
8. Cloud sync imports cloud rows but local-only rows may need reconciliation.
9. Sync status and nickname should be separate UI fields.
10. Signed-out password recovery should remain accessible.
11. Tests should accept logically equivalent valid outputs when ordering is irrelevant (for example subsets).
12. Every new question must be checked for a sample answer.
13. Progress/dashboard should respect the selected Basic/Combination view.
14. Avoid using LeetCode difficulty as a proxy for curriculum level.

## Definition of “foundation complete”
The foundation is complete when the learner can recognize and write the small Python pieces that recur across common LeetCode solutions, then combine them into standard patterns without needing an artificial intermediate exercise.

The target is transfer: code learned in Basics should visibly reappear in later solutions.

## Change checklist
For every curriculum change:
1. Does this code actually appear in normal LeetCode Python solutions?
2. Is this the shortest useful bridge from Python syntax to a LeetCode pattern?
3. Are normal LeetCode-legal Python built-ins/idioms allowed?
4. Is this concept already taught elsewhere, making this exercise unnecessary repetition?
5. Is the question placed near the problems that depend on it?
1. Is this Basic or Combination according to the atomic-skill rule?
2. Are prerequisites conceptually correct?
3. Does the Concept Map show the same dependency?
4. Does the selected mode show/hide it correctly?
5. Does it have tests, hint, starter code, and sample answer?
6. Can the tests handle all valid solution forms?
7. Does completion unlock exactly the intended next skill?
8. Is the status color consistent everywhere?
9. Does local and cloud progress still work?
10. Did this reveal a missing prerequisite skill? If yes, add that Basic skill before the combination.
