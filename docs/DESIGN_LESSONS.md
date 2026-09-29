# Application Design Lessons

## One source of truth
A fact should have one owner. Exercise identity, completion, curriculum content, DSA concepts, solution approaches, and persistence keys each need one canonical source. Views may transform data but must not redefine it.

## Separate by responsibility
Separate modules when responsibilities differ: Python runtime, editor behavior, auth/bootstrap, admin read-only tools, completed-editor locking, and menu presentation. Combine modules when they mutate/render the same concept and duplicate logic.

Historical patch files are a warning sign. A correction to static data belongs in the data source. A second renderer for the same component belongs in the existing renderer.

## JS is a view/controller
Going forward, JS should contain behavior, not authoritative application data. It may cache fetched DB data in memory and derive display models. Avoid embedding question catalogs, dependency maps, answer libraries, or curriculum lessons in JS.

## Stable contracts
Semantic IDs must survive reorderings. Dependencies use semantic references, never array indexes. DOM IDs and exported functions are contracts only when another module actually consumes them. Preflight should guard important contracts.

## Progressive refactoring
Do not combine everything to reduce file count. Do not split a tightly coupled 90 KB file merely for aesthetics. First establish data/API boundaries, then extract modules along those boundaries.

## Reliability
Every asynchronous persistence operation handles errors. UI status must reflect actual state, not assumed success. New-device restore, offline/local state, and cloud state need explicit merge semantics.

## Security
The browser is untrusted. Hiding an admin button is presentation, not authorization. Enforce authorization in Postgres/RLS/RPCs. Never expose service-role credentials. Read-only admin tooling should remain read-only end to end.

## Validation
CI should validate syntax, local asset existence, canonical identity contracts, persistence namespace ownership, curriculum coverage, required DOM contracts, and retired-file absence. DB verification is separate from source CI; neither proves the deployed browser runtime by itself.
