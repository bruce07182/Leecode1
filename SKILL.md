# LeetCode Foundations — Curriculum & Product Skill

## Purpose
Build coding fluency before LeetCode problem solving.

The learning order is:
1. **Basics** — atomic coding/data-structure operations.
2. **Combinations** — combine mastered basics into common problem-solving patterns.
3. **LeetCode-style problems** — intentionally out of scope for now.

The app should help a learner who recognizes concepts but cannot reliably turn them into working code.

## Core learning rule
A **Basic** exercise teaches one primary operation or mental model. It should not require a second algorithmic pattern to solve it.

A **Combination** exercise requires two or more already-learned basics, or applies a basic data structure in a problem-solving pattern.

Examples:
- Basic: move two indexes inward.
- Combination: use two pointers to find a target pair.
- Basic: enqueue/dequeue values.
- Combination: BFS.
- Basic: compute/update one fixed window.
- Combination: solve a sliding-window optimization problem.

Do not classify an exercise as Basic merely because it is Easy.

## Dependency rule
Dependencies are curriculum prerequisites, not arbitrary earlier questions.

A question is available only when all of its prerequisite skills are completed.

**Single source of truth:** Concept Map arrows and question unlocking must represent the same dependency model. Never manually draw an arrow that is not reflected in actual prerequisites.

If A → B appears on the map, B must depend on A (directly or through an explicitly represented intermediate skill).

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
Do not call the Basic layer complete merely because every category exists.

A concept is adequately covered when the learner can:
1. explain the data structure/operation,
2. trace it by hand,
3. code the primitive operation without a template,
4. pass multiple small exercises without hints,
5. recognize when that primitive is useful.

Only then should the learner be pushed into combinations.

## Change checklist
For every curriculum change:
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
