# LeetCode Foundations

A browser-based Python + DSA trainer with separate Foundations, Python Training, and curated LeetCode Practice screens.

## Structure
- `index.html` — main DSA practice app.
- `python.html` — Python Training and shared DSA curriculum.
- `leetcode.html` — curated LeetCode practice with prerequisite locking and cloud progress.
- `assets/` — runtime code, curriculum, UI, visuals, and styles.
- `PROJECT_SKILL.md` — authoritative project continuation, architecture, teaching, UX, and maintenance guide.
- `SKILL.md` — pointer to the authoritative project skill; kept only for compatibility/discovery.

## Current design
- Supabase authentication and cross-device progress.
- Foundations groups questions as Basics and Combinations; there is no Mode feature.
- Single-topic lessons reuse the shared curriculum; grouped DSA topics compare related concepts.
- Passed code is protected from accidental edits but can be unlocked with Edit.
- Complexity is selected after a pass and collapses to a compact confirmed result.
- Answers can progressively reveal multiple meaningful approaches.

For development or continuation work, read `PROJECT_SKILL.md` first.

## Maintenance
- Live pages load source assets directly; the obsolete standalone `dist/` builder was removed.
- LeetCode problems use their official LeetCode number as identity; shared Supabase storage namespaces them as `100000 + LC number`.
