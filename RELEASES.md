# Releases

## v1.0 — 2026-09-26

Baseline release of LeetCode Foundations.

- Login required before training content is shown.
- DSA roadmap with Data Structures and Algorithms / Patterns.
- Focused concept relationships and quick-reference explanations.
- Runnable Python exercises with tests.
- Learning basics, hints, answers, complexity practice, progress, and cloud sync.
- Admin user-progress view.

Baseline commit before Python Basics work: `8fca1d1a7c092560d5735ed6d4dfa9507a0ab5de`.

## Next

Python Basics: a small LeetCode-focused learning and practice track covering only commonly used Python features.

## 2026-09-28 cleanup
- Consolidated project guidance into `PROJECT_SKILL.md`; `SKILL.md` is now a compatibility pointer.
- Removed obsolete Progress dashboard, Reset compatibility, duplicate menu handlers, duplicate Learn handlers, and unused compatibility/observer files.
- Made the menu a single-owner component and made Supabase session state authoritative for login presentation.
- Unified single-topic Learn basics with the shared DSA curriculum while keeping grouped map topics for comparison.
- Restored compact complexity UX: after confirmation, show only `✓ Time O(...) · Space O(...)`.
- Fixed the correct-complexity handler so confirmation rerenders and syncs cleanly.
