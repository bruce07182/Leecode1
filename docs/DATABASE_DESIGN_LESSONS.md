# Database Design Lessons

## Target architecture
Supabase/Postgres is the authoritative source for application data. JavaScript is presentation/controller code: fetch typed data, render it, accept user interaction, run the local Python sandbox where appropriate, and persist through defined DB APIs. New curriculum, dependency, solution, teaching, mapping, and configuration data must not be hard-coded into JS.

This is a target architecture. Existing curriculum arrays in JS are legacy data and must be migrated deliberately; do not delete them until DB-backed equivalents are populated and verified.

## Identity
Exercise identity is the immutable composite `(exercise_type, exercise_number)`. Display IDs are derived: B1, C1, LC217. Never use array position as identity. Never pack type into a magic integer. Never add a UUID unless exercises need identity independent of their semantic number.

Keep language separate from identity when it is merely an implementation variant. A curriculum family may use a type such as P or CPP only when it truly represents a distinct curriculum.

## Recommended normalized model
- `exercises`: type, number, title, description, signature, difficulty, category, active/order metadata.
- `exercise_dependencies`: exercise → prerequisite exercise using composite references.
- `exercise_tests`: ordered test cases and validation metadata.
- `exercise_content`: starter, hint, lesson, canonical answer, explanation; optionally versioned.
- `solution_approaches`: multiple answer approaches, complexity, prerequisite requirements, recommendation metadata.
- `concepts` and `exercise_concepts`: reusable DSA taxonomy/mapping.
- `user_exercise_progress`: user + exercise state, code, complexity, timestamps.
- `attempts`: append-only attempts if detailed history/querying matters. JSON history is acceptable while small, but should not become the permanent analytics model.
- configuration/feature tables for content that admins need to change without deploying JS.

## Progress rules
A saved pass is durable state. UI completion, editor locking, map status, admin status, and cloud restore must all derive from the same persisted definition. Do not create separate completion rules in separate modules.

Cloud is authoritative. Do not merge or reconcile local progress into cloud. localStorage may be used only as a temporary render/draft cache. Authenticated startup clears stale progress cache and hydrates it from cloud. Only explicit user actions create cloud writes; cached local data must never create or update a cloud row merely because it exists. Every DB write must inspect and surface its error.

## RLS and admin
Every exposed table uses RLS. Ordinary users see/write only their own progress. Admin cross-user access is explicit and read-only unless a separate mutation feature is intentionally designed.

Privileged RPCs are APIs. SECURITY DEFINER requires an internal authorization check, a controlled search_path, revoked PUBLIC/anon execution, and explicit grants. The admin DB-structure RPC returns metadata only.

## Migrations
Prefer additive migrations: add/backfill/verify/enforce, then remove compatibility only after real-user verification. Never reinterpret an existing identity column in place when a parallel canonical representation allows rollback.

Before destructive cleanup verify: no null canonical identities, no duplicate canonical keys, all legacy rows mapped, RLS/policies intact, app reads/writes canonical fields, admin RPCs updated, and CI green.

## DB-driven migration plan
1. Create canonical curriculum/content tables without changing current UI.
2. Seed them from the currently verified JS curriculum.
3. Build read-only DB loaders and compare DB payloads against current JS objects.
4. Switch one domain at a time: concepts → exercises → dependencies/tests → teaching/solutions.
5. Remove corresponding JS data only after parity checks and live verification.
6. Keep JS responsible for rendering, interactions, Python execution, auth/session orchestration, and small view state—not authoritative curriculum data.
