# LeetCode Foundations — Project Continuation Skill

Updated: 2026-09-27

Use this file as the project handoff/source of context when continuing development in another ChatGPT conversation.

## Project

- Repository: `bruce07182/Leecode1` (project/site is referred to as **dsa / LeetCode Foundations**).
- Public Cloudflare Pages site has been used for deployment (`leecode1.pages.dev`; user has also referred to the site as `dsa`).
- Main goal: teach the **small set of Python + DSA fundamentals actually needed for LeetCode**, then teach combinations/patterns. Do not turn it into a comprehensive Python course.
- Audience may know basic programming but not DSA terminology. Explain unfamiliar terms at the point they are first needed.
- Prefer less wording, real executable code, diagrams/state sequences where they materially improve understanding, and mobile-first presentation.

## Core teaching philosophy

1. Foundations first, then combinations, then LeetCode-style problems.
2. Teach the minimum Python needed for DSA. Python Basics is not itself a LeetCode question bank.
3. Prefer code to prose. Put useful explanation in/next to real code rather than writing long paragraphs.
4. First introduction of a concept should explain it. Later lessons should focus only on what is new; do not repeatedly reteach traversal/loops/etc.
5. `Traversal` is the general DSA term for visiting items. For a Python array/list this usually means a loop. Traversal applies to every data structure, so avoid messy map edges from Traversal to everything.
6. Python `list` is normally the practical array for these lessons. Explain the distinction only when useful: Python list is dynamic; DSA “array” is the conceptual indexed sequence.
7. For hashing, teach the **hash concept first**, then hash set vs hash map/dict.
8. Math/pattern material should include useful basics such as odd/even and later search, divide & conquer, bitwise, backtracking, greedy, DP, etc. Only include what helps DSA/LeetCode.
9. Answers should show the simplest readable correct form first. If that hides the algorithm, provide a deeper/algorithmic version too.
10. Explain non-obvious Python syntax/functions where they actually appear, e.g. `s[::-1]`, `dict.get`, `append`; do not explain an API in an unrelated answer.
11. Time and Space complexity should be visually separated/easy to scan.
12. External or internal links to prerequisite teaching are useful for advanced topics when prior material is needed.

## Main LeetCode page UX

- Require login before showing app content. Do not expose questions/map/progress before authentication.
- Supabase is used for authentication/cloud progress.
- User progress should sync across devices. Existing local progress may need the user to sign in on the original device/account once so it can be associated/synced.
- The main screen has collapsible top cards: **How to solve a problem**, **DSA map**, **Progress**.
- Keep the Run button visually part of the code editor; it is the primary action. Running result appears immediately after the editor.
- Learn basics / Hint / Answer panels toggle closed when clicked again.
- Preserve detailed useful content; solve mobile density with expand/collapse/scroll rather than deleting important teaching.
- The main page link is named **Python Training** (not Python Basics) because it includes Levels 0–3 and runnable practice.
- Practice question selector has a visible label. Editors and important controls should have accessible names and visible keyboard focus.
- Destructive reset controls are labeled **Reset code** and require confirmation so an accidental tap cannot erase current edits.
- Run output uses `aria-live` and a clearer passed/error visual state.
- Mobile tap targets should remain comfortably tappable; action buttons may use a compact two-column layout rather than tiny controls.

## DSA map design

- The map focuses on DSA, with **Data Structures** on one side and **Algorithms / Patterns** on the other.
- Data structures should be ordered roughly simple → complex. Array belongs at/near the top, then String, Hashing, Stack/Queue, Linked List, Heap, Tree, Graph, etc.
- Pattern side includes traversal, two pointers, sorting, sliding window, prefix sum, binary search/search, DFS/recursion, BFS, divide & conquer, greedy, backtracking, dynamic programming, bitwise, math where appropriate.
- Default map is clean and shows **no connection lines**. Clicking a concept focuses only that concept and useful related items/questions.
- Clicking a DSA item opens a read-only quick lesson. Do **not** add a separate practice editor inside the map.
- Mobile DSA detail uses a full-screen vertically scrollable sheet; desktop can use a centered popup.
- Concept buttons should visually communicate that they open details, but should not add graph-like relationship lines to the default roadmap.
- If a concept has a shared Level 3 lesson, the shared lesson replaces the old quick ASCII/code panel rather than appearing as a second duplicate lesson. Related concepts and practice remain around it.

## Visual semantics — important

Professional visuals must be structurally accurate, not merely attractive.

- **Array**: show contiguous adjacent indexed cells. Do **not** draw pointer/edge lines between array elements; that falsely suggests a linked structure.
- **Linked list**: explicit next pointers/arrows are appropriate.
- **Tree / heap / graph**: edges represent real parent/child or graph relationships.
- **Stack / queue**: arrows may represent operations such as push/pop/enqueue/dequeue, not hidden pointer relationships.
- **Algorithm patterns** (two pointers, sliding window, binary search, DFS/BFS, backtracking, DP): use highlights, ranges, states, or traversal paths only when they represent the algorithm accurately.
- Prefer responsive SVG/state visuals over ASCII character art for shared Level 3 lessons.
- `assets/dsa-visuals.js` is presentation-only; curriculum remains in `assets/python-dsa.js`.

## Critical curriculum architecture: ONE Level 3, TWO views

There must be one shared Level 3 DSA curriculum/data source, not an old DSA lesson plus a separate new copy.

1. **Python Training → Level 3** shows the shared lesson and runnable practice/editor.
2. **DSA Map** shows the same Level 3 teaching content read-only, with map/visual context and related questions, but no practice editor.

- `assets/python-dsa.js` exposes `window.DSA_LEVEL3` and is the shared source of truth.
- `assets/dsa-python-link-v7.js` is an adapter/renderer, not a second curriculum.
- `assets/dsa-visuals.js` upgrades shared lesson diagrams to responsive SVG without duplicating teaching content.
- `assets/dsa-visuals.css` styles those visuals.
- Avoid maintaining duplicate explanatory/code content in map adapters.

## Python Training

- Separate page from the main LeetCode page, but same account and visual language.
- Level 0: extremely small/basic essentials.
- Level 1: core Python repeatedly used in DSA.
- Level 2: Python tools/idioms for DSA/problem solving.
- Level 3: implement/use core DSA and practice the exact patterns.
- Level 3 topics currently include Array patterns, Linked list, Stack, Queue, Hash map & set, Binary tree, Heap/priority queue, Graph representation, DFS, BFS, Binary search, Two pointers, Sliding window, Recursion & backtracking, Dynamic programming.
- Phase 1 strengthened Array, Linked List, Stack, Queue, Hashing.
- Phase 2 strengthened Binary Tree, Heap, Graph representation, DFS, BFS.
- Remaining Level 3 content to strengthen next: Binary Search, Two Pointers, Sliding Window, Backtracking, Dynamic Programming.

## Questions / progression

- Questions are ordered around dependencies/fundamentals rather than random LeetCode order.
- Basic-only vs Basics + combinations modes have existed; dependency/category/status should be easy to understand.
- Concept map/progress should help navigation, not dominate the screen.
- User should return to their last question/progress where appropriate.
- Require Time O(...) and Space O(...) analysis as part of solving; save complexity selections/results in the database as part of progress.
- Tests should run reliably and all test cases should be checked.
- Python built-ins are allowed, but when a built-in hides the algorithm, teach the manual/algorithmic version too.

## Supabase / account / admin

- Authentication is Supabase-based. Sign-in, sign-out, forgot/reset password are under account/menu UI.
- App content is hidden unless authenticated.
- Cloud progress is intended to work across devices.
- Admin access must only be enabled for `bruce0421@gmail.com`.
- Admin is for viewing other users’ progress. Preferred UX is to select/switch a user and inspect that user’s details rather than only seeing a flat aggregate list.
- An earlier admin implementation expected a Supabase RPC named `public.admin_progress`; inspect current SQL/RPC implementation before changing admin.
- Progress persistence should include complexity/O() data as well as question/progress state.
- Do not expose nickname/email unnecessarily in normal learner UI.

## UI/style principles

- Professional, compact, readable, not wordy.
- Optimize for **easy to understand, easy to access, hard to make accidental mistakes**.
- Primary action should be obvious; destructive actions should be guarded.
- Use semantic labels/ARIA where useful, visible focus for keyboard users, and sufficiently large mobile tap targets.
- Use bold/color/diagram/sequence selectively to improve comprehension; do not rely on color alone for meaning.
- Mobile is a first-class target. Avoid horizontal overflow and screens that cannot fit/scroll their content.
- Do not make the concept map visually busy. Default no lines; show relationships on demand.
- Prefer expandable sections over removing valuable explanation.
- Real code examples are preferred over half-code/pseudocode whenever practical.
- Avoid duplicate teaching panels in the same view; one authoritative lesson is easier to understand and less likely to conflict.

## Deployment / repository workflow

- Work directly against `bruce07182/Leecode1` main unless the user asks otherwise.
- Cloudflare Pages is the preferred deployment path.
- Preserve tags/history; do not rewrite history.
- Before writing a frequently edited file, fetch its latest SHA.

## Important implementation files

- `index.html` — main page and auth visibility.
- `python.html` — Python Training page.
- `assets/app.css` — core shared UI/mobile styles.
- `assets/ux-polish.css` — shared accessibility, tap-target, focus, output-state, and mistake-prevention polish.
- `assets/ux-polish.js` — accessible labels, output state, and reset confirmation safeguards.
- `assets/app.js` — core app behavior/data.
- `assets/ui-v2.js` — UI behavior.
- `assets/learning-v3.js` — learning content used by main questions.
- `assets/answer-explain-v4.js` — answer explanation layer.
- `assets/lesson-links-v5.js` — links/prerequisite lesson behavior.
- `assets/dsa-map-v6.js` — DSA map and concept focus UI.
- `assets/dsa-python-link-v7.js` — adapter to shared Level 3; NOT a second curriculum.
- `assets/python-basics.js` — Python Levels 0–2 curriculum/runtime.
- `assets/python-dsa.js` — shared Level 3 source of truth.
- `assets/dsa-visuals.js` / `assets/dsa-visuals.css` — professional Level 3 visual presentation.

## Recent implementation anchors (2026-09-27)

- `796880d738c014a7cd781e4ea7eed21ca5ef39e5` — one Level 3 / two views wiring.
- `47f511c...` — Phase 1 Level 3 content strengthening.
- `3a5a864ed54d85d1c1ffdff67af6245dea36254e` — Phase 2 Tree/Heap/Graph/DFS/BFS strengthening.
- `ed4542d6ef73e4c169ee6457fc9e318a7a8bd63c` — professional SVG visual system.
- `3a687bc600d7d484fe01c7efd5eff789fb6abd3d` — corrected Array visual semantics: contiguous cells, no pointer-like links.
- `996450ad09e28503de97605375b55936c0b1374d` — shared Level 3 replaces duplicate quick panel in DSA popup.
- `c06c81b267f41c5efc7595810e66b7a120b1611e` / `b2be13aeeb7d190ffef341f4666cabb8b40d0c33` — UI audit polish on main page and Python Training: clearer navigation/labels, accessibility, reset safeguards, mobile controls.

## How another chat should continue

1. Read this file first.
2. Fetch current repo files before editing; do not assume code is unchanged.
3. Preserve login gating, Supabase progress, mobile behavior, and one-Level-3/two-view design.
4. For teaching changes, optimize for fast understanding with minimal wording: real code + a small accurate visual/state sequence when useful.
5. Check visual semantics carefully; do not use arrows/edges merely for decoration.
6. Avoid duplicate curriculum. If DSA Map needs richer display, add rendering/visual metadata or derive a visual from the shared lesson.
7. Before finishing a UI change, check desktop + narrow mobile layout conceptually: discoverability, labels, tap targets, scrollability, destructive actions, duplicate/conflicting content, and keyboard focus.
8. When a change is complete, state the commit SHA so the next chat can anchor itself to the repository state.
