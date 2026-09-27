# LeetCode Foundations — Project Continuation Skill

Updated: 2026-09-27

## Project
- Repo: `bruce07182/Leecode1`; public site is Cloudflare Pages (`leecode1.pages.dev`).
- Goal: teach the minimum Python + DSA foundations needed for LeetCode, then combinations/patterns.
- Audience may know programming but not DSA terminology. Prefer concise explanation, executable Python, accurate visuals, and mobile-first UI.

## Critical recovery / deployment note
- `3a687bc600d7d484fe01c7efd5eff789fb6abd3d` is the confirmed known-good web baseline after a blank-screen regression.
- A batch UI/accessibility audit after that commit caused both Cloudflare Pages and GitHub Pages to show a blank/hanging page. Rolling `main` back to `3a687bc` restored Cloudflare immediately.
- The reverted UI work is preserved on branch `ui-audit-backup-20260927`.
- Do NOT reintroduce that batch wholesale. UI improvements must be small, isolated commits and must not alter the critical startup/auth path unless necessary.
- Never let cosmetic/accessibility enhancements block app initialization or leave `auth-locked` as a permanent blank screen if startup fails.
- After startup/auth changes, verify the deployed page loads before continuing.

## Teaching architecture: ONE Level 3, TWO views
There is one shared Level 3 curriculum/source of truth: `assets/python-dsa.js` (`window.DSA_LEVEL3`).

It feeds:
1. Python Training Level 3 — lesson + runnable practice/editor.
2. DSA Map — same teaching content read-only, plus map context/related questions; no second practice editor.

`assets/dsa-python-link-v7.js` is an adapter/renderer, not a second curriculum. Do not duplicate Level 3 explanations there.

## Current Level 3
Level 3 now has real lessons/practice for:
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

Recent curriculum commit: `00ccbc25c974cbb728b7b1308fb68a2fdea73f4b`.

## Professional visual system
- `assets/dsa-visuals.js` upgrades Level 3 `pre.dsDiagram` placeholders into responsive SVG teaching visuals.
- Current professional visuals cover all 15 Level 3 topics.
- Latest visual commit: `b70818c7c31a32b4556517b92d811ced1315ed89`.
- Visuals are presentation only; curriculum stays in `python-dsa.js`.

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
- DSA detail is read-only teaching; no duplicate editor.
- Mobile DSA detail should be vertically scrollable with an accessible close control.
- Admin access only for `bruce0421@gmail.com`; inspect current Supabase RPC/schema before changing admin.

## Curriculum principles
1. Foundations → combinations → LeetCode-style problems.
2. Teach only Python useful for DSA.
3. Prefer code to prose.
4. Explain a concept when first introduced; later lessons focus on what is new.
5. Python list is the practical array; clarify conceptual array vs dynamic list only when useful.
6. Hash concept first, then set vs map/dict.
7. Built-ins are allowed, but teach the underlying algorithm when a shortcut hides it.
8. Keep Time/Space complexity easy to scan.
9. Use diagrams when they materially improve understanding.
10. Practice should be runnable with meaningful validation, not placeholder answers/tests.

## Important files
- `index.html` — main app/script loading/auth visibility.
- `python.html` — Python Training.
- `assets/app.js`, `assets/ui-v2.js` — core/UI behavior.
- `assets/app.css`, `assets/dsa-visuals.css` — shared/visual styling.
- `assets/python-basics.js` — Python curriculum below Level 3.
- `assets/python-dsa.js` — shared Level 3 source of truth.
- `assets/dsa-map-v6.js` — map/focus UI.
- `assets/dsa-python-link-v7.js` — shared-Level-3 map adapter.
- `assets/dsa-visuals.js` — professional SVG rendering.

## Safe workflow for future changes
1. Read this file first.
2. Inspect current repo and fetch latest SHA before every edited file.
3. Preserve one-Level-3/two-view architecture.
4. Make small commits, especially for startup/auth/UI changes.
5. Do not mix unrelated UI/auth/deployment changes with curriculum changes.
6. Treat `3a687bc` as the recovery anchor for the confirmed-working deployment, while later curriculum/visual commits build on it.
7. After any change that touches page loading, auth gating, script order, or global observers, verify the public deployment before stacking more changes.
8. State commit SHA(s) after changes so the next chat can anchor to exact repo state.
