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

## Multiple-correct-solutions rule
A LeetCode problem often has more than one correct Python solution. The trainer must support that rather than implying there is one required implementation.

When multiple approaches are reasonable, teach them as complementary levels:
1. **Practical / Pythonic solution** — concise, readable code a strong Python user would normally submit on LeetCode.
2. **Underlying / interview solution** — code or reasoning that exposes the data structure or algorithm underneath the shortcut.
3. **Better algorithm when applicable** — if another approach has meaningfully better asymptotic time or space, explain why and when it matters.

Tests should judge observable correctness, not enforce one implementation style. Do not reject a valid solution because it uses a LeetCode-legal built-in such as `max`, `set`, slicing, `Counter`, `sorted`, `deque`, or `heapq`. Do not inspect source text to police which technique the learner used.

The sample/lesson may show multiple correct approaches when that teaches something useful. Clearly identify the tradeoff instead of calling a longer manual version universally “better.” “Better” should mean a concrete advantage such as clearer code, earlier exit, lower asymptotic cost, lower auxiliary space, or better fit for the problem constraints.

## Complexity rule
For every algorithm or meaningful alternative taught, explicitly call out:
- **Time: O(...)**
- **Space: O(...)**

Use the most relevant space definition and label it when needed:
- **Auxiliary space** — extra working memory beyond the input/output.
- **Output space** — memory required for the returned result.
- **Hidden allocation** — memory created by a Python convenience operation such as slicing, `set(nums)`, `sorted(...)`, or string construction.

Do not compare solutions only by line count. One line can still be O(n), O(n log n), or allocate O(n) memory. Explain expected/amortized complexity when appropriate, for example expected O(1) hash lookup and amortized O(1) list append.

When two correct versions differ, put their complexities next to the versions so the learner can see the tradeoff directly.

## Teach-me-basics visual rule
“Teach me basics” should teach with **visual → code → explanation → complexity → interview/under-the-hood view**, using fewer words when the diagram can carry the idea.

Use professional diagrams rather than character/ASCII art:
- Use HTML/CSS cells and markers when exact positions matter: arrays/lists, zero-based indexes, strings, two pointers, sliding windows, binary-search boundaries, stacks, queues, hash tables, prefix sums, and DP tables.
- Use Mermaid when relationships matter: linked lists, recursion/call flow, trees, graphs, and other node/edge structures.
- Prefer the simpler renderer when either would work; the diagram exists to clarify the code, not decorate the lesson.

**Diagram consistency is mandatory.** The diagram, prose, code snippet, variable names, indexes, and example values must describe the same example. If the lesson says `s = "hello"`, the diagram must show `hello`, not `cat`. If a list is indexed, visibly use Python's zero-based indexing. If the diagram shows `left = 0` and `right = 3`, the accompanying example must have those exact boundaries.

A visual should demonstrate the operation the learner is about to type. For example, `left += 1` should visibly move the left pointer; `q.popleft()` should visibly remove the front item; `node = node.next` should visibly follow the next edge. Avoid unrelated examples inside one lesson.

Visuals must remain readable on mobile and must fail gracefully: lesson text/code should still teach the concept if Mermaid cannot load.

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

For Basic exercises, also provide useful “Teach me basics” guidance where appropriate. Every substantive lesson must call out time and space complexity for the taught operation/solution, and when multiple correct approaches are educational, show both the practical Pythonic version and the underlying/interview mechanics.

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

## UI simplification rule
The UI should keep the coding task as the primary surface. Before adding a control, label, status, or menu item, ask whether the learner needs it at that moment. Prefer combining related information over adding another surface.

- Keep the first row compact: product title + one symbol menu.
- Group settings hierarchically: Mode is one submenu with the selected mode checked; account actions stay together, including password reset.
- Do not show nickname, cloud-sync text, or account identity in the main header. Sync may operate silently; surface an error only when action is needed.
- Do not create a separate Review Due destination. Spaced review is scheduling logic, not a primary feature: fold a due review into Progress / Next when appropriate.
- Do not repeat category, Basic/Combination mode, or dependency/prerequisite labels under each question when those are already represented by navigation, ordering, locking, or the concept map. Show per-problem metadata only when it adds information the learner cannot already infer.
- Do not duplicate the same state in multiple places. In particular, avoid a separate Problem Status panel when the question header and progress view already communicate it.
- Attempts/history is secondary detail and should be collapsed by default.
- Prefer short action labels: Run, Hint, Learn basics, Reset, Sample answer, AI review.
- Reveal Sample answer, interview complexity reflection, alternatives, and AI review only after a passing solution when possible.
- Remove LeetCode difficulty from the primary UI unless it materially helps learning; curriculum level (Basic/Combination) is more important.
- Every UI addition should justify its screen space, especially on mobile. Prefer progressive disclosure over permanently visible controls.
- Resume the learner at the last question they were working on when the app reopens or reloads, as long as that question is still available in the selected mode. Do not automatically return to question 1.

## Problem-solving workflow
The app should teach a repeatable LeetCode workflow without forcing extra form fields or gates before coding:

1. **Understand** — read the problem, inputs, output, constraints/examples, and restate what must be returned.
2. **Choose the tools** — identify the likely data structure and/or pattern from the problem shape. If the concept or Python operation is unclear, use **Learn basics** as part of this step.
3. **Plan** — trace a small example and state the algorithm in steps before implementation. If the learner understands the concept but is stuck applying it, use **Hint** as part of this step.
4. **Code** — implement the simplest correct approach the learner understands.
5. **Analyze** — identify **Time: O(...)** and **Space: O(...)**, then consider whether another correct solution is simpler, more Pythonic, or asymptotically better.
6. **Run and debug** — run tests; when a test fails, trace that concrete case rather than guessing.
7. **Review after passing** — compare with the sample answer, its complexity, and useful alternative/under-the-hood solution.

Help should be progressive rather than intrusive:
- **Sample answer** remains post-pass so the learner attempts the problem first.
- After passing, make the interview check an **active exercise**, not passive text. Let the learner choose the expected **Time O(...)** and **Space O(...)** from concise options and check the answer. Give only correct/try-again feedback before the sample is opened; do not reveal the answer in the prompt.
- Give the learner a second code editor for **Another solution** and let them run that implementation against the same behavioral tests. This should feel like a small follow-up question, not a prose reflection. Accept any alternative implementation that passes the tests; do not police source style.
- The workflow itself should be available as concise Help/How-to guidance, not repeated as a large block on every question.

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
- Account, progress, mode, and concept map live in the menu. Review scheduling is folded into Progress / Next rather than exposed as a separate destination.

## Progress and help
Track internally as useful:
- attempts and passing attempts
- hints/basic-help usage when needed for learning analytics
- review timing
- mastery

Do not expose every tracked metric on every problem. Show only information that helps the learner decide what to do next.

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
9. Sync status and nickname should not occupy the main learning UI; show actionable sync errors only when necessary.
10. Signed-out password recovery should remain accessible under Account.
11. Tests should accept logically equivalent valid outputs when ordering is irrelevant (for example subsets).
12. Every new question must be checked for a sample answer.
13. Progress/dashboard should respect the selected Basic/Combination view.
14. Avoid using LeetCode difficulty as a proxy for curriculum level.

## Definition of “foundation complete”
The foundation is complete when the learner can recognize and write the small Python pieces that recur across common LeetCode solutions, then combine them into standard patterns without needing an artificial intermediate exercise.

The target is transfer: code learned in Basics should visibly reappear in later solutions.

## Change checklist
For every curriculum or lesson change:
1. Does this code actually appear in normal LeetCode Python solutions?
2. Is this the shortest useful bridge from Python syntax to a LeetCode pattern?
3. Are normal LeetCode-legal Python built-ins and idioms accepted?
4. If multiple correct solutions exist, do tests accept them based on behavior rather than implementation style?
5. Does the lesson show a practical/Pythonic version and, when useful, an underlying/interview version?
6. Are **Time: O(...)** and **Space: O(...)** explicit for each meaningful approach, including hidden allocations?
7. If one approach is described as better, is the concrete reason stated (time, space, clarity, early exit, or constraints)?
8. Is this Basic or Combination according to the atomic-skill rule, without unnecessary repetition?
9. Are prerequisites conceptually correct and ordered before dependents?
10. Does the Concept Map reflect the same dependency model?
11. Does every diagram exactly match its lesson's values, variable names, code, and zero-based indexes?
12. Is the visualization type appropriate: precise HTML/CSS for indexed/state layouts, Mermaid for relationships?
13. Does the lesson remain understandable if the visual renderer fails?
14. Does the exercise have tests, hint, starter code, sample answer, and valid dependencies?
15. Can tests handle logically equivalent outputs when output ordering is irrelevant?
16. Does completion unlock exactly the intended next skill?
17. Do selected mode, progress, mastery colors, local storage, and cloud sync still behave correctly?
18. Did the change reveal a missing prerequisite? If yes, add or reposition the smallest useful Basic bridge.
19. Does every visible control/status help the learner now, or can it be removed, combined, or progressively disclosed?
20. Is the same state shown twice? Keep one clear source instead.
21. Does the first row remain compact and mobile-friendly?
