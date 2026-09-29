# LeetCode Foundations — Project Continuation Skill

## Purpose
This app builds Python + DS&A foundations before LeetCode/OA practice. Preserve user progress above all else. Make small sequential changes and verify them.

## Architecture direction — authoritative
**Supabase/Postgres is the source of truth for application data. JavaScript is view/controller code.**
New curriculum/content/configuration data must live in the DB, not JS. Existing hard-coded curriculum in JS is legacy-to-migrate; do not delete it until DB parity is built and verified.

JS may own rendering, DOM interaction, local Python execution, auth/session orchestration, transient view state, and adapters. JS must not become the canonical owner of exercises, dependencies, tests, lessons, hints, answer libraries, concept mappings, or other durable curriculum data.

Read:
- `docs/DATABASE_DESIGN_LESSONS.md` — target schema, identity, RLS, migrations, DB-driven migration plan.
- `docs/DESIGN_LESSONS.md` — module boundaries, ownership, reliability, validation.
- `docs/BUG_POSTMORTEMS.md` — important failures and lessons.

## Canonical identity
Exercise identity is immutable `(exercise_type, exercise_number)`.
Display ID is derived: `B1`, `C1`, `LC217`.
Current/reserved families: B, C, LC, P, CPP.
Never use array position or packed magic integers as durable identity.
Do not reintroduce `problem_id`.

Until curriculum data is fully moved to DB, the compatibility app still derives some B/C positions from legacy arrays. Treat this as migration debt, not the desired design.

## Persistence
Cloud progress uses `solutions(user_id, exercise_type, exercise_number)`. Supabase is authoritative. There is no local→cloud merge/reconciliation path. Progress state is session memory only; authenticated startup hydrates it from cloud. localStorage is allowed only for disposable UI preferences such as the last selected question, not code/history/complexity/mastery/help progress. User actions may save directly to cloud, but the existence of local cache data must never cause an upload. Every DB write must inspect Supabase `error`.

Completion has one meaning: any saved attempt with `passed:true`. Checkmarks, map state, admin state, and editor locking must derive from that same state.

## Completed editor
Previously passed Foundation work is read-only immediately after local/cloud restore. Run becomes Edit. Edit intentionally unlocks the same editor; a successful run locks it again. `editor-lock.js` consumes `window.foundationCompleted`; it must not read persistence keys itself.

## Admin
Admin UI is read-only for other users. It must never switch auth identity or write another user's data.
Admin user progress comes from `admin_progress()`.
Admin DB Structure comes from `admin_db_structure()` and displays metadata only: public tables, columns, constraints, indexes, RLS policies, and public functions.

Privileged RPCs must enforce authorization inside Postgres. Hiding UI is never authorization. SECURITY DEFINER functions require controlled `search_path`, internal admin check, PUBLIC/anon EXECUTE revoked, and explicit authenticated grant.

## Module ownership
Keep separate because responsibilities differ:
- `python-runtime.js`: Pyodide loading/runtime.
- `python-editor.js`: editor keyboard behavior.
- `editor-lock.js`: completed-editor lock only.
- `admin-readonly.js`: admin read-only presentation.
- `menu-controller.js`: menu presentation.
- `page-init.js`: page bootstrap/auth visibility.
- `dsa-map-v6.js` + adapters: map/view behavior.

Single owners:
- `progressive-solutions-v1.js`: all progressive solution data/rendering until that data migrates to DB.
- `dsa-teaching-details.js`: Level 3 teaching refinements until DB migration.
- Static question corrections belong in the canonical exercise data, never patch scripts.

Retired files must not return:
- `graph-question-clarity.js`
- `progressive-solutions-extra.js`
- `curriculum-clarity-v9.js`

## Teaching contract
Teach concrete problem → tiny example → visual/state → discover pattern → name/explain DSA → Python implementation → complexity.
Learn basics stays small and neutral; do not leak the current answer.
Arrays render as contiguous cells, not pointer-linked nodes. Linked lists use explicit links. Other visuals must preserve actual structure semantics.

Foundation Basics are atomic building blocks. Combinations compose Basics. LeetCode applies them. Dependencies should ultimately use semantic exercise references from DB, not JS array indexes.

## Current curated LeetCode set
LC1, 217, 242, 125, 121, 704, 35, 3, 20, 155, 206, 141, 104, 226, 102, 200, 733, 215, 703, 70, 198, 78, 46, 347, 56.

## OA/mastery
LeetCode states: New → Passed → Mastered, with review scheduling. OA mode uses eligible unlocked/unmastered problems, balanced families, timer, Next/End, and hides help/answer/pattern explanation. OA session state remains a known future improvement if not persisted.

## DB-driven migration sequence
1. Define DB curriculum/content tables.
2. Seed from currently verified JS data without changing behavior.
3. Compare DB payload to JS source with automated parity checks.
4. Switch reads domain-by-domain.
5. Make dependencies semantic DB references.
6. Remove migrated JS data only after source CI + DB verification + live behavior verification.
7. End state: JS contains behavior/view code; DB contains durable app data.

Do not perform a big-bang rewrite.

## Safe workflow
1. Fetch the latest file immediately before editing.
2. Make one coherent change/commit at a time; never parallel writes to the same dependency chain.
3. Preserve canonical IDs and existing progress.
4. Run syntax/preflight after risky changes.
5. Inspect latest GitHub Action; only call it passed when the latest run succeeds.
6. For DB work, inspect live schema/data first, use a migration for DDL, verify afterward, and run security/performance advisors when relevant.
7. Distinguish source/CI verification, DB verification, and deployed browser verification. Never claim one proves another.

## Preflight invariants
Preflight must protect local asset existence, JS syntax, shared Python runtime ownership, canonical exercise identity, curated LC IDs/coverage, canonical cloud reads/writes, editor lock completion source, canonical local-key ownership, retired patch absence, and required DOM contracts.

## Known structural debt
- Foundation curriculum/data still largely lives in `app.js`.
- Python/DSA/solution curriculum still contains hard-coded JS data.
- Some dependencies/mappings still use legacy array indexes.
- `app.js` is large; split it only after DB/data boundaries exist.
- Foundation and LeetCode progress are now cloud + in-memory session state; do not reintroduce progress localStorage.
- OA session state is not yet cloud-backed. LeetCode mastery/review is derived from cloud-backed attempt history rather than separate local durable flags.
- Exact-output tests can reject alternate valid outputs in some exercises.
- No source CI can substitute for a real deployed-browser startup test.

## Recovery
Use Git history and small commits for recovery. Never discard current user progress to fix a code issue. Compatibility/migration code may be removed only after the relevant old state has been migrated and verified in real use.


## Review browser
- Review is a separate read-only browsing experience, not the Practice solver UI.
- The top-level Review control opens a compact catalog of completed Foundation questions.
- Review reads the already hydrated Supabase-authoritative progress state; it must not save, mutate, or sync progress.
- Completed questions can be searched and filtered by topic and Basics/Combinations, and sorted by question order, recent completion, or attempts.
- Each compact row expands inline to show the problem, saved final code, saved Time/Space complexity, reference answer, attempts, last pass, and learning notes.
- Do not reintroduce a Review-done mode into the normal question picker. Practice remains one-question-at-a-time; Review is optimized for scanning many completed questions.

- The main Foundations page has no Practice/Review mode selector; solving is always Practice.
- Review defaults to only the user's saved code and saved Time/Space complexity.
- Problem statement, reference answer, learning notes, and attempt history are secondary opt-in details under collapsed More options.
\n- Recommendation also exposes a separate `Next not solved` action when an unlocked unfinished question exists. It selects the next unfinished unlocked question after the current position, wrapping to the first unfinished unlocked question when needed; locked questions are never selected.\n

## Authentication invariants (regression-critical)
- The application is **fail closed**. Until Supabase confirms an authenticated session, `body.auth-locked` remains active and only the sign-in/create-account card may be usable.
- A brand-new/signed-out user must be prompted to sign in before seeing or using the roadmap, questions, editor, Run, Review, recommendations, learning panels, or admin features.
- Never remove `auth-locked` as an error fallback. If auth initialization fails or session state is uncertain, keep the app locked and show the auth card.
- `setUser()` is the authoritative auth UI transition and must always synchronize `body.auth-locked` with session state.
- Interactive entry points that can bypass ordinary card visibility (Run, Review, roadmap popups/question navigation, recommendation navigation) must call `foundationRequireUser()` / `requireUser()` before doing work.
- Signed-out state must never be a usable local-practice mode. Progress is cloud/Supabase authoritative; no offline/local practice mode exists.
- Regression check after UI/auth changes: fresh/incognito load => only auth UI; signed-in load => cloud hydrate before normal work; sign-out => practice UI immediately locks; auth lookup failure => remains locked.


### Secondary-page auth startup
- `python.html` and `leetcode.html` are direct-entry pages and must independently enforce authentication; never assume the user arrived through `index.html`.
- Their training UI and Python runtime must not initialize until an authenticated Supabase session is confirmed. Auth lookup failure remains signed-out/locked.
- Regression review note: Python Training currently has legacy localStorage-backed lesson code/completion. Do not copy this pattern into Foundations or new features; migrate it deliberately to Supabase before treating Python Training progress as cross-device/cloud authoritative.


### Login visibility invariant
- The primary login card must be visible from initial HTML/CSS whenever `body.auth-locked` is active. Do not depend on successful JavaScript startup, `getSession()`, or `setUser()` to reveal the sign-in controls.
- `authCard` therefore starts visible in markup; authenticated `setUser()` hides it. CSS for `body.auth-locked #authCard` must override ordinary visibility so auth failures still leave a usable login form.
- Regression test: disable/block a late script or Mermaid import and reload signed out; email/password/Sign in must still be visible and usable.
