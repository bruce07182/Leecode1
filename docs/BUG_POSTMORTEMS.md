# Interesting Bugs and What They Taught Us

## Saved IDs shifted when new questions were inserted
New Basics initially collided with historical array positions. Dependencies then pointed at unrelated old questions.
**Lesson:** array position is presentation/order, never durable identity.

## B1 1 appeared after migration
The UI combined a new semantic ID with an old numeric title prefix.
**Lesson:** after identity migration, audit every display composition, not only storage.

## New device showed saved progress but editor stayed editable
The app restored canonical `ex_history_B*` state while `editor-lock.js` independently read retired `bb_history_<index>`.
**Lesson:** completion must have one API/source; modules must not reconstruct persistence keys.

## New device did not show all solved questions
Cloud/local merge and canonical mapping had multiple identity eras and incomplete read coverage.
**Lesson:** migration compatibility belongs at a narrow boundary; normalize immediately, then use canonical identity everywhere.

## Admin could not find users
Admin RPC/UI assumptions drifted from the new canonical schema.
**Lesson:** privileged/read-only tooling is a first-class client of schema migrations and must be migrated/tested with the main app.

## DB operations looked successful when they failed
Several upserts ignored returned Supabase errors.
**Lesson:** awaiting a promise is not error handling. Inspect `error`, stop dependent work, and show truthful sync state.

## Canonical identity still depended on array ordering
Early `exerciseIdentity()` derived B/C number from filtered array position even after the DB moved to type+number.
**Lesson:** a semantic ID is not truly semantic until the source data explicitly owns it. The DB-driven curriculum removes this remaining structural debt.

## Graph question needed a patch file
A later script mutated one question after `app.js` loaded.
**Lesson:** static corrections belong in the canonical data source, not late mutation layers.

## Two progressive-solution files had two renderers
The extension duplicated escaping, table generation, click behavior, and events.
**Lesson:** extend data; reuse behavior.

## Curriculum clarity and teaching details both mutated Level 3
Two files owned the same content lifecycle.
**Lesson:** organize by ownership, not by the chronology of fixes.

## Blank page after large changes
Large/parallel edits made startup failures difficult to isolate.
**Lesson:** small sequential commits, fetch-before-edit, syntax checks, and CI after risky changes dramatically reduce recovery cost.

## Preflight itself failed during refactor
A consolidation introduced an unmatched scope/brace; CI caught it before it could be considered stable.
**Lesson:** refactoring verification must test the final composition, not just individual intentions.

## Arrays were drawn like linked structures
Visuals used connecting lines where contiguous cells were the correct mental model.
**Lesson:** teaching visuals are semantic UI, not decoration; representations must preserve the data structure's actual properties.

## Cloud identity used magic numeric ranges
LeetCode and Foundation originally shared numeric encodings such as offsets.
**Lesson:** compact IDs are not worth hidden semantics. Explicit type + number is easier to migrate, inspect, and debug.
