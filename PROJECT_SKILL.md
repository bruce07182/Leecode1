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
9. Answers should show the simplest readable correct form first. If that hides the algorithm (for example a Python shortcut), provide a deeper/algorithmic version too.
10. Explain non-obvious Python syntax/functions where they actually appear, e.g. `s[::-1]`, `dict.get`, `append`; do not explain an API in an unrelated answer.
11. Time and Space complexity should be visually separated/easy to scan.
12. External or internal links to prerequisite teaching are useful for advanced topics when prior material is needed.

## Main LeetCode page UX

- Require login before showing app content. Do not expose questions/map/progress before authentication.
- Supabase is used for authentication/cloud progress.
- User progress should sync across devices. Existing local progress may need the user to sign in on the original device/account once so it can be associated/synced.
- The main screen has collapsible top cards rather than putting everything in the menu:
  - **How to solve a problem**
  - **DSA map**
  - **Progress**
- These cards may default visible but must be collapsible to save mobile space.
- `How to solve a problem` was intentionally moved out of the menu.
- Keep the Run button visually part of the code editor; it is a primary action and should be easy to find.
- Running result should appear immediately after the code area.
- Learn basics / Hint / Answer panels should toggle closed when clicked again.
- Remove unnecessary answer wording such as “sample answer” / “Other correct solutions are welcome.”
- Question wording should call out unfamiliar basic terms or link to Learn basics.
- Preserve detailed useful content; solve mobile density with expand/collapse/scroll rather than deleting important teaching.

## DSA map design

- The map focuses on DSA, with **Data Structures** on one side and **Algorithms / Patterns** on the other.
- Data structures should be ordered roughly simple → complex. Array belongs at/near the top, then String (array-like sequence), Hashing, Stack/Queue, Linked List, Heap, Tree, Graph, etc.
- Pattern side includes traversal, two pointers, sorting, sliding window, prefix sum, binary search/search, DFS/recursion, BFS, divide & conquer, greedy, backtracking, dynamic programming, bitwise, math where appropriate.
- Default map should be clean and show **no connection lines**; persistent all-to-all lines became too messy.
- Clicking a concept should focus/pop up only the concept and its useful related items/questions rather than showing a web of every connection.
- Clicking a related question may hide the map/focus view and navigate to that question.
- The map itself should stay compact/mobile-friendly.
- Clicking a DSA item opens a read-only quick lesson. Do **not** add a separate practice editor inside the map.
- Visuals should be purposeful: structure diagrams and step/state sequences are more useful than generic statistical charts. Strong visual candidates: linked list, stack/queue, heap, tree, graph, two pointers, sliding window, binary search, DFS/BFS, backtracking, DP.
- Mobile DSA detail uses a full-screen vertically scrollable sheet; close control remains available. Desktop can use a centered popup.

## Critical curriculum architecture: ONE Level 3, TWO views

This is the most recent important design decision.

**There must be one shared Level 3 DSA curriculum/data source, not an old DSA lesson plus a separate new copy.**

Two presentations consume it:

1. **Python Training → Level 3**: shows the Level 3 lesson and runnable practice/editor.
2. **DSA Map**: shows the **same Level 3 teaching content** read-only, with map/visual context and related questions, but **no practice editor**.

Future changes to Level 3 teaching should therefore automatically feed both views. Avoid maintaining duplicate explanatory/code content in `dsa-python-link-v7.js`.

Current implementation direction (2026-09-27):
- `assets/python-dsa.js` exposes `window.DSA_LEVEL3` and is intended as the shared source of truth.
- `assets/dsa-python-link-v7.js` maps DSA-map concept names to the corresponding Level 3 lesson and renders `tip` + example code read-only.
- `index.html` loads the shared Level 3 data before the DSA-map renderer.
- Latest commit completing this wiring: `796880d738c014a7cd781e4ea7eed21ca5ef39e5`.
- Earlier related commits: `75ec836` (mobile DSA detail scrolling/full-screen), `792e90b` (combined DSA quick view direction).

When modifying this area, first inspect the current repository because multiple edits happened rapidly. Preserve the one-source/two-view architecture.

## Python Basics / Python Training

- Python Basics is a separate page/link from the main LeetCode page.
- It should be usable as learning/training material and organized by levels rather than trying to teach all Python.
- Level 0: extremely small/basic essentials.
- Level 1+: progressively more topics/deeper usage, only as useful for DSA.
- Level 2: Python used for DSA/problem-solving patterns.
- Level 3: implement/use core DSA in Python and practice the exact patterns.
- Level 3 topics currently include: Array patterns, Linked list, Stack, Queue, Hash map & set, Binary tree, Heap/priority queue, Graph representation, DFS, BFS, Binary search, Two pointers, Sliding window, Recursion & backtracking, Dynamic programming.
- The Python editor should feel similar/consistent with the main LeetCode editor.

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
- An earlier admin implementation expected a Supabase RPC named `public.admin_progress`; if missing, Supabase reported schema-cache/function-not-found. Inspect current SQL/RPC implementation before changing admin.
- Progress persistence should include complexity/O() data as well as question/progress state.
- Do not expose nickname/email unnecessarily in normal learner UI.

## UI/style principles

- Professional, compact, readable, not wordy.
- Use bold/color/diagram/sequence selectively to improve comprehension.
- Mobile is a first-class target. Avoid horizontal overflow and screens that cannot fit/scroll their content.
- Do not make the concept map visually busy. Default no lines; show relationships on demand.
- Prefer expandable sections over removing valuable explanation.
- Real code examples are preferred over half-code/pseudocode whenever practical.

## Deployment / repository workflow

- Work directly against `bruce07182/Leecode1` main unless the user asks otherwise.
- Cloudflare Pages has been used for public deployment; commits to the configured branch should be allowed to deploy through the existing setup.
- A prior public-release/GitHub Pages workflow existed earlier in the project, but Cloudflare Pages became the preferred deployment path.
- The project was called stable enough to mark **version 1.0** before Python Basics/Level 3 expansion. Preserve tags/history; do not rewrite history.
- Before writing a frequently edited file, fetch its latest SHA; repository conflicts occurred when another edit landed between fetch and update.

## Important implementation files seen recently

- `index.html` — main LeetCode Foundations page and script loading/auth visibility.
- `assets/app.css` — shared UI/mobile styles.
- `assets/app.js` — core app behavior/data.
- `assets/ui-v2.js` — UI behavior.
- `assets/learning-v3.js` — learning content used by main questions.
- `assets/answer-explain-v4.js` — answer explanation layer.
- `assets/lesson-links-v5.js` — links/prerequisite lesson behavior.
- `assets/dsa-map-v6.js` — DSA map and concept focus UI.
- `assets/dsa-python-link-v7.js` — should be a renderer/adapter to shared Level 3, NOT a second curriculum.
- `assets/python-basics.js` — Python Basics curriculum.
- `assets/python-dsa.js` — shared Level 3 DSA curriculum/source of truth.
- `python.html` — Python Training page.

## How another chat should continue

1. Read this file first.
2. Fetch current repo files before editing; do not assume the code is unchanged from a prior chat.
3. Preserve login gating, Supabase progress, mobile behavior, and the one-Level-3/two-view design.
4. For teaching changes, optimize for **fast understanding with minimal wording**: real code + a small visual/state sequence when useful.
5. Avoid duplicating curriculum. If DSA Map needs richer display, add rendering/visual metadata or derive a visual from the shared lesson rather than copying lesson text/code into another object.
6. When a change is complete, state the commit SHA so the next chat can anchor itself to the repository state.
