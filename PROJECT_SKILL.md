# LeetCode Foundations — Project Continuation Skill

Updated: 2026-09-27

## Project
- Repo: `bruce07182/Leecode1`; public site is Cloudflare Pages (`leecode1.pages.dev`).
- Goal: teach the minimum Python + DSA foundations needed for LeetCode, then combinations/patterns.
- Audience may know programming but not DSA terminology. Prefer concise explanation, executable Python, accurate visuals, and mobile-first UI.

## Critical recovery / deployment note
- `3a687bc600d7d484fe01c7efd5eff789fb6abd3d` is the confirmed recovery anchor after a blank-screen regression.
- Batch UI/accessibility changes previously caused both Cloudflare Pages and GitHub Pages to blank/hang. Rolling back restored Cloudflare immediately.
- Broken/reverted work is preserved on backup branches; do not reintroduce large UI batches wholesale.
- UI improvements must be small, isolated commits and must not alter the critical startup/auth path unless necessary.
- Never let cosmetic/accessibility enhancements block app initialization or leave `auth-locked` as a permanent blank screen if startup fails.
- Keep application behavior in separate JS/CSS files rather than growing inline behavior in `index.html`.
- After startup/auth/script-order changes, verify the deployed page loads before continuing.

## Teaching architecture: ONE Level 3, THREE views
There is one shared Level 3 curriculum/source of truth: `assets/python-dsa.js` (`window.DSA_LEVEL3`).

It feeds:
1. Python Training Level 3 — lesson + runnable practice/editor.
2. DSA Map — same teaching content read-only, plus map context/related questions; no second practice editor.
3. Main-question **Learn basics** — reuse the same relevant Level 3 teaching instead of maintaining another explanation.

Adapters/renderers must not become second curricula. Do not duplicate Level 3 explanations in map/Learn Basics files.

`assets/curriculum-clarity-v9.js` currently applies small curriculum refinements after `python-dsa.js`; keep such overrides narrow and eventually fold stable content back into the source of truth when safe.

## Core teaching rule: CONCRETE FIRST
The learner should not have to understand CS terminology in order to understand the question.

Preferred sequence:
**Concrete problem → tiny example → visual/state → discover the pattern → name/explain the DSA concept → Python implementation → complexity.**

Rules:
- Problem statements should describe the task in ordinary language first.
- Do not put implementation strategy or unexplained terminology into a beginner problem statement unless the strategy itself is what is being tested.
- Introduce terms such as dynamic programming, recurrence, adjacency list, heap invariant, etc. in the teaching material after the learner understands the concrete situation.
- Use a tiny worked example before general formulas.
- Explain *why* a formula/operation works, not only what to type.
- Questions should test the concept, not the learner's ability to decode CS vocabulary.
- Keep examples realistic enough to expose common mistakes; tests should include boundary/non-default cases rather than only the easiest case.

### DP example / standard
Do **not** start with wording like “use a 1-D dynamic-programming array where each position stores...” for a first DP problem.

Start with the staircase:
- There are `n` steps.
- Each move can climb 1 or 2 steps.
- Ask how many different ways reach the top.
- For `n=3`, explicitly show `1+1+1`, `1+2`, `2+1`.
- Then show that reaching step `i` must come from `i-1` or `i-2`, so `ways[i] = ways[i-1] + ways[i-2]`.
- Only then explain that storing/reusing those smaller answers is dynamic programming and that `dp` is simply a conventional variable name.

## Current Level 3
Shared lessons/practice cover:
- Array patterns
- Linked list
- Stack
- Queue
- Hash map & set
- Binary tree
- Heap / priority queue
- Graph representation
- DFS
- BFS
- Binary search
- Two pointers
- Sliding window
- Recursion & backtracking
- Dynamic programming

## Professional visual system
- `assets/dsa-visuals.js` upgrades Level 3 `pre.dsDiagram` placeholders into responsive SVG teaching visuals.
- Visuals are presentation only; curriculum stays in shared Level 3 data.

### Visual semantics — important
- Array: contiguous adjacent indexed cells. **Never draw pointer/edge lines between array elements.** Adjacency is enough.
- Linked list: explicit links/pointers between nodes.
- Tree/graph: edges represent actual structural relationships.
- Stack/queue: show ordering and operation direction, not fake pointers.
- Two pointers: pointers/index markers may move over an array; they are indexes, not links between cells.
- Sliding window: highlight one contiguous range; show entering/leaving movement.
- Binary search: show active search range/middle and discarded half.
- DFS/BFS/backtracking: edges are structural/search relationships; use state highlighting to explain traversal.
- DP: show stored states and recurrence/dependency without implying linked-list pointers.
- Prefer clean SVG/state diagrams over ASCII art.

## Main UX requirements
- Login is required before exposing main app content; Supabase handles auth/cloud progress.
- Preserve cross-device progress and complexity/O() persistence.
- Main cards: How to solve a problem, DSA map, Progress; keep collapsible/mobile-friendly.
- Run belongs with the editor and result should be immediately visible.
- Learn basics / Hint / Answer should toggle.
- DSA map should stay compact, default without a web of connection lines; click a concept to focus details.
- DSA detail is read-only teaching; no duplicate editor and no redundant old/ASCII teaching when shared Level 3 content exists.
- Do not label shared content “Python · Level 3” in DSA details; present the lesson naturally.
- Mobile DSA detail should be vertically scrollable with an accessible close control.
- Reset code is destructive: keep it visually separated from frequently used controls.
- Complexity controls should be compact; once correct, hide selectors/check controls and show only a small finished state such as `✓ Time O(n) · Space O(1)`.
- Admin access only for `bruce0421@gmail.com`; inspect current Supabase RPC/schema before changing admin.

## Curriculum principles
1. Foundations → combinations → LeetCode-style problems.
2. Teach only Python useful for DSA.
3. Concrete problem before abstraction/terminology.
4. Prefer code and tiny worked examples to dense prose.
5. Explain a concept when first introduced; later lessons focus on what is new.
6. Python list is the practical array; clarify conceptual array vs dynamic list only when useful.
7. Hash concept first, then set vs map/dict.
8. Built-ins are allowed, but teach the underlying algorithm when a shortcut hides it.
9. Keep Time/Space complexity easy to scan.
10. Use diagrams when they materially improve understanding.
11. Practice should be runnable with meaningful validation, not placeholder answers/tests.
12. Test cases should catch common wrong assumptions (for example binary-search midpoint tests must include non-zero `left`, not only `left=0`).
13. For Python binary search, teach `(left + right) // 2` first; explain that `//` chooses the lower middle when there are two center indexes and that the overflow-avoiding alternative is mainly relevant to fixed-width integer languages.

## Important files
- `index.html` — main HTML structure and script loading; keep behavior out of inline code.
- `python.html` — Python Training shell.
- `assets/page-init.js` — page/startup/auth initialization.
- `assets/site-shell.css` — shell/page styling moved out of index.
- `assets/app.js`, `assets/ui-v2.js` — core/UI behavior.
- `assets/app.css`, `assets/dsa-visuals.css` — shared/visual styling.
- `assets/python-basics.js` — Python curriculum below Level 3.
- `assets/python-dsa.js` — shared Level 3 source of truth.
- `assets/curriculum-clarity-v9.js` — narrow concrete-first curriculum refinements.
- `assets/dsa-teaching-details.js` — supplemental teaching details; avoid duplicating the source curriculum.
- `assets/dsa-map-v6.js` — map/focus UI.
- `assets/dsa-python-link-v7.js` — shared-Level-3 map adapter.
- `assets/shared-learning-v8.js` — shares Level 3 teaching into main-question Learn Basics.
- `assets/progress-ui-v8.js` — complexity/completion presentation behavior.
- `assets/dsa-visuals.js` — professional SVG rendering.

## Safe workflow for future changes
1. Read this file first.
2. Inspect current repo and fetch latest SHA before every edited file.
3. Preserve one-Level-3/three-view architecture.
4. Make small commits, especially for startup/auth/UI changes.
5. Do not mix unrelated UI/auth/deployment changes with curriculum changes.
6. Treat `3a687bc` as the recovery anchor for the confirmed-working deployment, while later verified changes build on it.
7. After any change that touches page loading, auth gating, script order, or global observers, verify the public deployment before stacking more changes.
8. Prefer modifying the owning curriculum/UI module instead of adding DOM observers or patch layers.
9. State commit SHA(s) after changes so the next chat can anchor to exact repo state.
