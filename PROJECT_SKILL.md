# LeetCode Foundations — Project Continuation Skill

Updated: 2026-09-28

## Project
- Repo: `bruce07182/Leecode1`; public site is Cloudflare Pages (`leecode1.pages.dev`).
- Goal: teach Python + DSA foundations first, then combinations/patterns; LeetCode-style practice comes later.
- Audience may know programming but not DSA terminology. Prefer concise explanation, executable Python, accurate visuals, and mobile-first UI.

## Critical recovery / deployment note
- `3a687bc600d7d484fe01c7efd5eff789fb6abd3d` is the confirmed recovery anchor after a blank-screen regression.
- Large UI/accessibility batches previously caused both Cloudflare Pages and GitHub Pages to blank/hang. Make small isolated commits and do not alter startup/auth unless necessary.
- Never let cosmetic enhancements block initialization or leave `auth-locked` permanently blank.
- Keep behavior in separate JS/CSS modules rather than growing inline code in `index.html`.
- After startup/auth/script-order changes, verify the deployed page before stacking more changes.

## Teaching architecture: shared curriculum, different depth
Python Training, DSA Map, and main-question Learn basics should share concepts rather than maintain independent teaching curricula.

1. **Python Training** — full runnable Python/DSA learning and practice.
2. **DSA Map** — shared DSA teaching in read-only map context.
3. **Learn basics** — intentionally tiny concept preview only: what the prerequisite concept is plus one neutral example.

`Learn basics` must NOT become a mini-solution or question hint. It should answer things like “What is a stack?”, “What are two pointers?”, or “What is a string slice?” without showing how that concept solves the current exercise. Question-specific help belongs in **Hint**; completed implementations belong in **Answer**.

Adapters/renderers must not become second curricula. Shared concepts should remain consistent with `assets/python-basics.js` and `assets/python-dsa.js` (`window.DSA_LEVEL3`). `assets/shared-learning-v8.js` owns the intentionally shallow Learn-basics presentation.

## Core teaching rule: CONCRETE FIRST
Preferred sequence:
**Concrete problem → tiny example → visual/state → discover pattern → name/explain DSA concept → Python implementation → complexity.**

- Problem statements use ordinary language first.
- Do not require unexplained CS terminology to understand a beginner problem.
- Use tiny worked examples before formulas.
- Explain why an operation/formula works, not only what to type.
- Questions test the concept, not vocabulary decoding.
- Tests include boundary/non-default cases.
- Built-ins are allowed, but when a shortcut hides an important DSA pattern, teach both.

### Learn basics depth rule
Keep Learn basics **very, very basic**. Its purpose is recognition/orientation, not assistance solving the active question.
- One short plain-language definition.
- One tiny neutral example when useful.
- No current-question walkthrough.
- No algorithm steps tailored to the current problem.
- No answer-shaped pseudocode.
- No complexity optimization advice unless complexity itself is the concept being introduced.
- Prefer generic examples unrelated to the current question.
- A learner who opens Learn basics should still need to reason through the problem themselves.

### DP standard
For first DP exposure, start with the staircase problem and concrete sequences. Explain that reaching step `i` comes from `i-1` or `i-2`, then derive `ways[i] = ways[i-1] + ways[i-2]`. Only afterward name dynamic programming and explain `dp` as a conventional variable name.

## Current Level 3
Shared lessons/practice cover arrays, linked lists, stacks, queues, hash map/set, binary trees, heaps, graph representation, DFS, BFS, binary search, two pointers, sliding window, recursion/backtracking, and dynamic programming.

## Professional visual system
`assets/dsa-visuals.js` upgrades Level 3 placeholders into responsive SVG teaching visuals.

Visual semantics:
- Array = contiguous adjacent indexed cells; never draw pointer/edge lines between elements.
- Linked list = explicit links/pointers between nodes.
- Tree/graph edges represent actual structure.
- Stack/queue show ordering and operation direction, not fake pointers.
- Two-pointer markers are indexes over an array/string, not links.
- Sliding window highlights one contiguous range and entering/leaving movement.
- Binary search shows active range/middle/discarded half.
- DP shows stored states/dependencies without fake linked-list pointers.
- Prefer clean SVG/state diagrams over ASCII art.

## Main UX requirements
- Login required before main app content; Supabase handles auth/cloud progress.
- Preserve cross-device code, attempts, progress, and complexity/O() persistence.
- Main cards: How to solve a problem, DSA map, Progress; mobile-friendly/collapsible.
- Run belongs with editor; result immediately visible.
- Learn basics / Hint / Answer toggle without clutter.
- DSA map stays compact; click a concept for details.
- DSA detail is read-only teaching; no duplicate editor or redundant ASCII lesson.
- Complexity controls stay compact; once correct show a finished state such as `✓ Time O(n) · Space O(1)`.
- Admin only for `bruce0421@gmail.com`; inspect Supabase schema/RPC before admin changes.

## Completed-solution editor behavior
- After a successful test run, the learner's code becomes **read-only** to prevent accidental edits.
- The existing **▶ Run** button becomes **✏️ Edit** while locked.
- Clicking Edit unlocks the same editor and changes the button back to Run.
- Running successfully again locks it again.
- Do not add a separate Edit button.
- The old visible **Reset code** control was removed because the editor itself can be modified when the learner wants to try another approach.
- `assets/editor-lock.js` owns this protection behavior.
- Every completed Run should append an entry to Attempts and cloud-sync it. If Attempts stops changing, inspect Run binding/startup errors first.

## Multiple-solution / Answer design
The Answer area is now a **solution comparison browser**, not one canonical answer followed by duplicates.

Rules:
- When a question has multiple useful solutions, show them in one table: **Approach | Time | Space | Main lesson**.
- The table row itself is clickable. Clicking a row reveals that solution's code directly under the row; clicking another row switches the open solution.
- Do not render a separate sample solution above or another expandable solution list below the table.
- Keep table guidance minimal: **“Tap a solution to view its code.”** Do not repeat generic practice instructions under every table.
- Important complexity qualifications belong with the expanded solution, not cryptic `*` / `**` footnotes.
- Do not use unexplained asterisks in O() cells.

### Recommendations
- Mark the reusable interview/DSA approach as **★ Recommended · DSA**.
- Mark concise language-specific shortcuts as **Pythonic** where useful.
- If the preferred DSA approach is not yet unlocked, a simpler currently understood method may be **★ Recommended for now**.
- Recommendation is educational, not merely shortest-code preference.
- Example: Reverse String can initially recommend slicing “for now”; after Two Pointers is learned, Two Pointers becomes the DSA recommendation while slicing remains Pythonic.

### Progressive reveal
- Do not overwhelm beginners with every sophisticated approach immediately.
- Reveal approaches as prerequisite concepts are learned/solved.
- The same question can become richer later without changing the original problem.
- `assets/progressive-solutions-v1.js` contains the first progressive solution library.
- `assets/progressive-solutions-extra.js` extends the comparison pattern to additional core questions.

### Reverse String reference design
Useful approaches include Python slicing, direct string construction, list + join, two pointers, `reversed()` + join, stack, and recursion. Only show approaches appropriate to current prerequisites.
- Python strings are immutable, so the current string→list→two-pointer→join implementation uses O(n) extra space.
- If input is already a mutable character array, two-pointer swaps themselves use O(1) auxiliary space.
- Repeated immutable string construction can be O(n²); explain why in the expanded solution rather than using a footnote.

### Questions already expanded / good candidates
Multi-solution comparison has been applied to examples including Find Maximum, Reverse String, Frequency Map, Contains Duplicate, Stack Basics, Palindrome, Lower Bound/Search Insert, K Largest, Climbing Stairs, Sliding Window, Linked List Traversal, Heap Basics, Two Sum, Binary Search, Tree Max Depth, Tree Level Order, and Subsets. Continue the pattern where alternatives teach a meaningful tradeoff; do not manufacture alternatives just to fill a table.

## Practicing another approach
- Do **not** add a special “Try this approach” button or a second editor.
- After reviewing the comparison table, the learner can click **Edit**, modify the existing code, and Run the same tests again.
- Keep this workflow implicit/simple rather than repeating instructions under every solution table.
- Multiple successful attempts can naturally represent practicing multiple implementations; separate “approach mastery” tracking may be considered later only if it provides clear value.

## C++ direction — later, optional
- Python remains the primary learning/implementation language for now.
- Do not build a parallel full C++ curriculum yet.
- First deepen alternate approaches in Python.
- Later, selected algorithms may offer an optional **Python | C++** view where C++ materially clarifies the underlying structure (vectors/mutable arrays, references, pointers/linked lists, stacks/queues, trees, heaps).
- Teach a small C++ prerequisite set first: `vector`, indexing, loops, references, `string`, basic function syntax.
- C++ should demonstrate that the algorithm is language-independent, not force the learner to learn two new things simultaneously.

## Curriculum principles
1. Data structures → algorithms/patterns → combinations → later LeetCode-style problems.
2. Teach only Python useful for DSA.
3. Concrete problem before abstraction/terminology.
4. Prefer code + tiny worked examples over dense prose.
5. Explain a concept when first introduced; later lessons focus on what is new.
6. Python list is the practical array; clarify conceptual array vs dynamic list only when useful.
7. Hash concept first, then set vs map/dict.
8. Built-ins are allowed; teach the underlying algorithm when the shortcut hides it.
9. Keep Time/Space complexity easy to scan.
10. Use diagrams only when they materially improve understanding.
11. Practice must be runnable with meaningful validation.
12. Tests catch common wrong assumptions.
13. Python binary search teaches `(left + right) // 2` first; fixed-width overflow alternatives are secondary.
14. Prefer fewer clear controls over redundant workflow buttons.
15. Protect completed work from accidental editing without making intentional revision difficult.
16. Learn basics is concept orientation, not problem-solving assistance.

## Important files
- `index.html` — main shell/script loading; behavior should stay out of inline code.
- `python.html` — Python Training shell.
- `assets/app.js` — core questions, tests, auth/cloud sync, attempts, complexity, and question selection. Obsolete Reset, old Progress dashboard, and menu ownership were removed in the 2026-09-28 cleanup.
- `assets/python-editor.js` — single owner of Python-friendly textarea editing on Foundations, Python Training, and LeetCode Practice: indentation-preserving Enter, extra 4 spaces after `:`, Tab = 4 spaces, Shift+Tab = unindent.
- `assets/editor-lock.js` — read-only-after-pass / Run↔Edit behavior on Foundations; LeetCode mirrors the same lock/Edit behavior in its practice controller.
- `assets/ui-v2.js` — UI behavior.
- `assets/python-basics.js` — shared Python curriculum below Level 3.
- `assets/python-dsa.js` — shared Level 3 source of truth.
- `assets/curriculum-clarity-v9.js` — narrow concrete-first refinements.
- `assets/progressive-solutions-v1.js` — progressive multi-solution tables/recommendations.
- `assets/progressive-solutions-extra.js` — additional multi-solution questions.
- `assets/dsa-teaching-details.js` — supplemental full teaching details; Learn basics should not dump these detailed lessons into a question.
- `assets/dsa-map-v6.js`, `assets/dsa-python-link-v7.js` — shared DSA views/adapters.
- `assets/shared-learning-v8.js` — tiny neutral Learn-basics concept previews mapped to the shared curriculum.
- `assets/dsa-visuals.js`, `assets/dsa-visuals.css` — professional visual rendering.
- `assets/menu-controller.js` — single owner of top-right menu presentation/actions and account state.
- `leetcode.html` + `assets/leetcode-practice.js` — separate LeetCode practice surface; uses the same Supabase account/table. The official LeetCode number is the stable practice identity; cloud storage uses `100000 + LeetCode number`.
- `assets/collapse-fix.js` — single owner of top-level card collapse behavior.
- `assets/page-init.js` — startup/auth visibility initialization.

## Safe workflow for future changes
1. Read this file first.
2. Inspect current repo and fetch latest SHA before editing.
3. Preserve shared-curriculum architecture and intentionally different presentation depth.
4. Make small commits, especially startup/auth/UI changes.
5. Do not mix unrelated UI/auth/deployment changes with curriculum changes.
6. Treat `3a687bc` as the recovery anchor while later verified commits build on it.
7. After changes touching page loading, auth gating, script order, or global observers, verify public deployment before stacking more changes.
8. Prefer modifying the owning module instead of adding observers/patch layers; compatibility patches should eventually be folded into the owner when safe.
9. For solution UI, avoid duplicate answers, duplicate instructions, or redundant controls.
10. Learn basics must remain generic enough that opening it does not materially reveal the active problem's solution.
11. State commit SHA(s) after changes so the next chat can anchor to exact repo state.

## 2026-09-28 code audit / ownership cleanup
- Removed obsolete Progress dashboard rendering and its hidden DOM compatibility placeholders. DSA Map + question status are the progress surface.
- Removed the deleted Reset-button binding from `app.js`; Run now binds directly in core, so `assets/run-binding-fix.js` was deleted.
- Removed old menu event ownership from `app.js`; `assets/menu-controller.js` is the single menu owner.
- Deleted `assets/progress-compat.js` and removed the old `assets/lesson-links-v5.js` observer. Learn basics should stay a tiny shared concept lesson, not accumulate question-specific references.
- The obsolete Mode control, hidden compatibility input, `modeAllows` stub, and all Mode-dependent filtering were removed. The foundation question picker directly exposes Basics and Combinations; DSA-map navigation must switch the visible group before selecting the unchanged original question ID.
- Supabase session state is authoritative for signed-in/signed-out UI. Do not infer login state from local progress.
- Single-topic teaching should come from the shared curriculum (`window.DSA_LEVEL3` / Python curriculum). Grouped top-level DSA topics exist to compare related concepts, not to create duplicate single-topic lessons.
- Optimization rule: prefer deleting an obsolete override and fixing its owner over adding another late-loaded patch. Before deleting a small adapter, confirm whether it mutates question data, supplies shared curriculum data, or owns a UI interaction.
- Current interaction ownership after audit: `app.js` owns Run/auth/cloud/state; `ui-v2.js` owns Hint and the fallback single-answer presentation; `shared-learning-v8.js` owns Learn basics; progressive-solution modules enhance Answer tables; `menu-controller.js` owns the menu; `collapse-fix.js` owns top-level collapse.
- Repository asset audit: live assets are loaded by `index.html`, `python.html`, or `leetcode.html`. Obsolete compatibility assets and the old embedded `leetcode-bridge.js` were deleted.

### Complexity UI ownership
- `assets/app.js` is the single owner of the main-question complexity picker/checker and persisted complexity display.
- After a passed solution but before confirmation, show the compact Time/Space picker and Check control.
- After complexity is confirmed for the current code, replace the controls with one compact line: `✓ Time O(...) · Space O(...)`.
- Do not restore the verbose `Your solution · complexity` heading or disabled selectors after confirmation.
- Changing the code invalidates the saved display naturally because complexity is keyed to the exact code text.

### Stable question grouping
- The question picker is grouped at the UI layer only: `Basics` and `Combinations`.
- Never reorder, splice, or rebuild the canonical `qs[]` array to implement grouping. Existing numeric indexes are persistent problem IDs used by local code/history/hints/complexity and Supabase `problem_id`.
- Question `<option>` values must always be the original `qs[]` index. Filtering changes visibility only, never identity.
- DSA-map navigation and restored last-question state must first select the appropriate group, then select the unchanged original question index.

### Admin behavior
- Admin access is restricted by `ADMIN_EMAIL` and Supabase/RPC authorization remains authoritative.
- The Admin menu action must call `toggleAdmin()` so opening the card also runs `loadAdminProgress()`; merely removing the `hidden` class produces an empty Admin view.
- `assets/admin-readonly.js` enhances loaded admin data with the read-only per-user workspace; it must never write user data or switch auth identity.

### Separate LeetCode practice
- LeetCode practice lives on `leetcode.html`, separate from the 37 foundation questions. Do not append LeetCode problems to foundation `qs[]`.
- Foundation IDs `0–36` are immutable. Use the official LeetCode number as the practice identity. In the shared `solutions` table store `100000 + LeetCode number`, keeping Foundation IDs separate and making future additions independent of catalog order.
- The LeetCode page may reuse the same Supabase auth/session and `solutions` schema, but its localStorage keys use an `lc_` prefix.
- Foundation Admin totals/viewer must filter to foundation IDs. A dedicated LeetCode admin view can be added later without mixing denominators or question catalogs.
- The initial LeetCode page is intentionally independent and small; grow its curated problem catalog without changing foundation indexes.
- Each LeetCode practice problem includes its official `leetcode.com/problems/<slug>/` link for opening the original online problem.
- LeetCode question behavior should mirror Foundations: show all test inputs/expected outputs as read-only locked tests; Run executes all tests and records Attempts; after the first pass lock the editor and turn Run into Edit; reveal Answer and the problem's difficulty/pattern/category only after a pass; complexity appears after passing and a confirmed value is bound to the exact saved code.

### Shared Python editor invariant
- All runnable Python textareas must use `assets/python-editor.js`; do not copy keydown/indentation logic into individual screens.
- Keep Python editing consistent across Foundations, Python Training, and LeetCode Practice. Tab inserts four spaces; Shift+Tab unindents; Enter preserves current indentation and adds one level after a line ending in `:`.
- Disable mobile autocorrect/autocapitalize where practical so code is not silently rewritten.

## 2026-09-28 final cleanup audit
- Removed the obsolete embedded LeetCode bridge; LeetCode Practice is owned only by `leetcode.html` + `assets/leetcode-practice.js`.
- Removed the old manual refactor workflow, `tools/refactor_index.py`, and stale `dist/index.html`; they only inlined the original app CSS/JS and did not represent the current multi-page runtime.
- Removed the final hidden Mode input and no-op Mode compatibility function.
- Simplified duplicate menu auth-session branching without changing auth behavior.
- Kept curriculum and progressive-answer overlays that still mutate live lesson/answer data; they are not dead code. Do not merge modules merely to reduce file count when their load order or ownership is behaviorally meaningful.

## Optimization guidance
- Optimize hot paths and ownership before file size: avoid duplicate listeners/renders/network writes, but do not minify source or merge behaviorally distinct curriculum modules merely to reduce file count.
- `assets/python-editor.js` owns coding-textarea browser settings as well as indentation: spellcheck off, autocapitalize off, autocorrect off, autocomplete off. Individual pages should not duplicate these attributes.
- Repeated DOM lookup helpers on self-contained screens may cache stable elements; do not cache elements that are intentionally replaced at runtime.
- Cloud code saves remain debounced; preserve immediate localStorage writes so typing is never dependent on the network.

## Startup architecture hardening
- Shared DSA curriculum is self-contained in `assets/python-dsa.js` and publishes one explicit namespace: `window.DSATraining = { lessons, levelInfo }`.
- Do not create prerequisite globals such as `L`, `lessons`, or `levelInfo` in a separate bootstrap file. A feature module must either own its data or consume an explicit namespace/API.
- `python-dsa.js` emits `dsa-training-ready`; Python Training registers shared Level-3 data through that explicit event, so its startup is safe whether the consumer loads before or after the shared curriculum.
- Foundations presentation modules may read `window.DSATraining` (or temporary `window.DSA_LEVEL3` compatibility) but must not require undeclared global identifiers to exist.
- Prefer startup modules that fail locally and visibly. Avoid architectures where deleting/reordering one unrelated script can stop the whole page before UI initialization.

## Mandatory preflight before/after code changes
- Run `node tools/preflight.js` before considering a code change complete. GitHub Actions also runs it automatically on every push and pull request.
- Preflight checks: every local script/stylesheet referenced by the three HTML pages exists; every JS asset parses; obsolete DSA bootstrap is not referenced; the explicit `window.DSATraining` startup contract exists; Foundation cloud reads remain scoped to IDs 0–36; LeetCode keeps official IDs and the `100000 + LC ID` cloud namespace.
- For startup/auth/persistence changes, make the code change first on an isolated commit/branch when practical, require preflight to pass, then verify the deployed page before stacking another risky change.
- Extend `tools/preflight.js` whenever a bug reveals a new invariant that can be checked cheaply. A fixed regression should ideally become a permanent test.

## 2026-09-29 LeetCode learning track expansion
- LeetCode Practice now uses a curated dependency path of roughly 25 OA-relevant problems instead of the original 3-problem proof of concept. Keep official LeetCode number as stable identity and cloud ID = 100000 + LC number.
- “Why this problem?” is strictly post-pass because naming the intended learning pattern beforehand can act as a hint.
- States are New/Passed/Mastered. Passed = any successful run. Mastered is earned by a later successful attempt without opening Hint or Answer during that attempt; do not add a manual mastery shortcut.
- First pass schedules a short review; clean later mastery schedules a longer review. Review mode surfaces due completed problems.
- OA Practice is a timed, no-Hint/no-Answer practice surface using unlocked not-yet-mastered problems. Keep it separate from normal learning mode and do not reveal pattern metadata before pass.
- Failure feedback may classify syntax/signature/runtime/indexing failures, but should not reveal the intended algorithm before pass.
- Preflight enforces unique official LC IDs and guards against accidental catalog shrinkage.

## Shared Python runtime
- `assets/python-runtime.js` is the single owner of Pyodide loading, CDN/index URL, timeout/retry reset behavior, JS→Python literal conversion, and common PyProxy→JS conversion.
- Foundations, Python Training, and LeetCode Practice must all load this module before their page controller and call `PythonRuntime.load()`; page controllers must not call `loadPyodide()` directly.
- Keep page-specific execution/test semantics in their owning controller. Share infrastructure and pure utilities; do not create a giant cross-page controller.
- Preflight enforces this ownership so Python loading cannot silently diverge again.

## 2026-09-28 pattern + OA refinement
- DSA map left column is named **Data Structures**, not Foundations; the right column remains **Algorithms / Patterns**.
- LeetCode has an optional pre-code **Find pattern** reflection. It asks generic recognition questions only and must not reveal the specific problem pattern before pass.
- After pass, **Pattern explained** may reveal the problem-specific pattern/rationale.
- OA practice is assessment mode: choose up to 3 randomized unlocked/unmastered problems, run a 75-minute countdown, provide Next and End controls, and show a passed/total summary. Hide Hint, Find pattern, Answer, and Pattern explained for the entire OA session.

- OA selection should prefer diversity across problem families before repeating a family; keep randomness within eligible unlocked/unmastered problems.
- DSA map Set & Map teaching: both are closely related hash-based lookup structures. Explain a set conceptually as key → present (unique membership), versus a map/dict as unique key → associated value. Avoid saying a set is literally a map or “max 1 data”; Python exposes them as distinct types.

## Data-structure deep dives
- Keep related structures grouped for comparison: Array/String/Linked List; Set/Map; Stack/Queue; Tree/Graph/Heap.
- Teach the relationship explicitly: strings are sequence-like/indexed but not literally C++ arrays or Python lists; linked lists contrast contiguous/indexed storage; trees are restricted graphs; binary heaps add complete-tree shape + heap order.
- Each data-structure group may expose an optional **Inside / Deep dive · interview + O()** section.
- Deep dives should show a tiny implementation model or C++-like pseudocode only when it explains memory/layout/pointers or operation cost. The goal is not a parallel C++ course.
- Always connect implementation mechanics directly to complexity: e.g. address arithmetic -> O(1) array index; following links -> O(n) linked-list indexing; hash bucket lookup -> expected O(1); complete heap height -> O(log n).

## Shared DSA concept ownership
- `assets/dsa-concepts.js` is the canonical owner of grouped data-structure relationships, internal implementation models/pseudocode, and implementation-derived O() explanations.
- All three pages load it. DSA Map renders it directly; Python Training reuses it for matching structure lessons; LeetCode may reuse it only post-pass inside Pattern explained so it never leaks the intended structure/pattern before solving.
- Do not copy canonical relationship/deep-dive/complexity prose into page controllers. Page-specific curriculum examples and exercises remain in their owning modules.
- Preflight enforces the shared module and DSA Map ownership contract.

## Atomic prerequisite practice
- Before adding or strengthening a combination problem, audit whether every non-trivial primitive it uses has already been practiced independently; a concept explanation is not a substitute for hands-on practice.
- Existing Foundation array positions are persistent problem IDs. Never insert or reorder existing entries. Add new Basics at unused tail IDs within the reserved 0–36 namespace, even when their display numbers therefore appear later.
- Basic 25 practices string membership such as `ch in "([{"`. Basic 26 practices map membership, retrieval, and value-to-index storage without the Two Sum complement step.
- Two Sum depends on Frequency Map plus Map lookup & store. Valid Parentheses depends on Stack basics plus String membership plus Map lookup & store.
- Preflight guards the original combination IDs and these prerequisite edges against accidental shifts or regressions.

## Foundation display numbering
- Internal Foundation array positions remain immutable persistence IDs, but they are not user-facing question numbers.
- Display Basics and Combinations as independent sequences using `B1, B2, ...` and `C1, C2, ...`. Compute these labels from the stable array plus level; do not renumber/reorder storage IDs.
- All Foundation selectors, concept/map practice links, and future question navigation should use the shared `displayTitle(i)` presentation helper rather than raw numbered `title` text where practical.

## 2026-09-29 saved-progress + atomic-skill audit
- Verified and now preflight-lock all original Foundation persistence IDs 0–36 to their exact original question titles. Existing `bb<ID>`, history, complexity, and cloud `problem_id` values therefore continue to refer to the same original questions.
- New atomic Basics are append-only extension IDs 37–45; never reuse an original ID for a new exercise. Foundation cloud bulk reads now include 0–45 while preserving the original mapping.
- Corrected prerequisite wiring: String membership is ID 37 and Map lookup & store is ID 38. Two Sum depends on 5+38; Valid Parentheses depends on 7+37+38.
- Added hands-on atomic Basics for string normalization (39), running best/min state (40), variable sliding-window movement (41), linked-list rewiring (42), fast/slow pointers (43), grid neighbors/bounds (44), and choose→recurse→undo backtracking (45).
- New atomic Basics must have runnable tests; concept-only explanation is not enough to count as practiced.
- Audited all current Foundation Combinations against their prerequisite Basics. Combination dependencies should point to independently practiced building blocks before the combined exercise.
- `leetcode-practice.js` owns `foundationBasicCoverage`, an informational cross-reference mapping every curated LeetCode problem to the Foundation Basics that drill its atomic building blocks. This does not alter LeetCode's own unlock graph. Preflight requires every curated LC ID to have coverage.
- Preflight also protects the exact original 0–36 title mapping and requires extension Basic IDs 37–45 to exist.

## 2026-09-29 canonical exercise identity migration
- Final identity model is the composite `(exercise_type, exercise_number)`, not array position, a packed integer range, a UUID, or a concatenated DB key. Display IDs are derived as `B1`, `C1`, `LC217`, etc.
- Reserved current/future type codes: `B` = Foundation Basic, `C` = Foundation Combination, `LC` = LeetCode, `P` = Python curriculum, `CPP` = C++ curriculum. Once assigned, a type+number pair is immutable.
- A UUID/surrogate exercise ID is intentionally unnecessary at this scale: the semantic composite key is stable, readable in code/DB/admin tools, and directly supports dependencies and filtering.
- Foundation browser progress migrates from legacy `bb*` keys to semantic `ex_*_B*` / `ex_*_C*` keys without deleting legacy keys. LeetCode preserves code/history/complexity plus mastery/review state while moving local identity to `LC*`.
- The live Supabase cutover is complete. `solutions` now uses primary key `(user_id, exercise_type, exercise_number)`; legacy `problem_id` has been dropped after validating all real rows and consolidating the duplicate legacy/current LC1 record.
- Application cloud reads/writes and the admin read-only viewer use only `exercise_type + exercise_number`. Numeric cloud compatibility must not be reintroduced.
- User-facing IDs are a single canonical label such as `B1`, `C2`, or `LC217`; never show an old numeric storage ID beside it.
