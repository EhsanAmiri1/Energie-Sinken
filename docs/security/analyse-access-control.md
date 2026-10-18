# Analysis request access control review

Reviewed main commit `7ab7a4269513416f3fa35ababc036eb126e562b4` on 2026-10-18.
No production database credentials or live Supabase session were available. Findings
below concern repository code and a disposable PostgreSQL test, not proof of access
to live customer data or confirmation that any migration has run in production.

## Findings

- Migration 002 grants every authenticated user SELECT and UPDATE on every analysis
  request. An UPDATE without an explicit WITH CHECK reuses USING; `true` therefore
  also permits rewriting ownership, file paths, results and other columns.
  Migration 004 adds permissive admin policies, which are ORed with the old policies;
  it does not restrict them. Migration 008 leaves these policies in place.
- Migration 002 permits all authenticated users to read invoice objects. Migration
  006 likewise permits all authenticated users to read result objects and upload
  results. A private bucket alone does not compensate for these policies.
- Migration 008 authorizes INSERT when either email OR user_id matches. An attacker
  can use their own email with another account's UUID. SELECT by email also lets a
  contact address function as ownership, even when the UUID belongs to someone else.
- Anonymous direct INSERT and object upload policies bypass the API and permit
  unvalidated data, including caller-selected owner/path fields after migration 008.
- POST /api/analyse trusts multipart user_id and uses service_role, which bypasses
  RLS. Tightening RLS alone cannot fix this server-side ownership injection.
- Migration 008's signup trigger assigns guest requests by email at auth.users INSERT
  time, before mailbox confirmation. UUID-only policies would still expose these
  prematurely assigned rows unless that linking behavior is removed.

## Implemented behavior

| Actor | Read requests / associated files | Update requests | Direct insert |
|---|---|---|---|
| Guest | No | No | No; guest API accepts unowned requests |
| Authenticated unrelated user | No | No | No |
| Owner UUID | Own requests and exact associated paths | No | API only, confirmed session |
| Confirmed administrator | All analysis requests/files | Yes, USING and WITH CHECK | Result uploads only; request API never impersonates |

Migration 009 replaces all policies on analyse_anfragen, removes the known unsafe
storage policies, forces both buckets private, and adds restrictive storage guards
for the two analysis buckets. Existing policies for other buckets remain unchanged.
No browser role may rewrite or delete analysis objects; server-side workflows can
use service_role. Admin recognition checks current auth.users ID, confirmed email
and the existing admin allowlist, not editable user metadata. The existing profile
admin-read policy uses this same check.

The API validates ownership before creating the privileged client or performing
uploads, inserts or email sends. Registered requests use auth.getUser() against the
cookie session and require a confirmed, non-anonymous user. A mismatched supplied
ID returns 403; missing/invalid authentication returns 401. Guest requests reject an
owner ID (400) and always store NULL. A registered form may omit user_id entirely:
the server derives it. Admins cannot submit on behalf of another user through this
endpoint. Dashboard queries use user_id instead of contact email.

Signup now creates the profile from registration metadata without reading or
claiming guest requests. No historical data is automatically reassigned or deleted.
Existing forged/early-linked rows cannot be identified reliably from current columns
alone and require a controlled ownership audit. Do not bulk-backfill by email.

## Validation performed

- `npm test -- --runInBand`: 2 suites, 16 tests pass (11 new route cases).
- `npx tsc --noEmit`: pass. Added missing @types/jest and corrected the existing
  Jest setupFilesAfterSetup typo to setupFilesAfterEnv.
- All migrations 001–009 applied to PGlite 0.5.10 (PostgreSQL WASM), then
  supabase/tests/analyse_access_control.sql passed. It checks guests, owners,
  unrelated accounts, confirmed/unconfirmed admins, signup non-linking, direct
  inserts, owner updates, path tampering/deletion and deliberately broad storage
  policies. This exercises PostgreSQL RLS, but stubs the Supabase auth/storage
  schemas and does not exercise hosted Storage HTTP/signing or GoTrue.
- `git diff --check`: pass.

Reproduce isolated SQL checks (no cloud credentials required):

```sh
npm ci
npm test -- --runInBand
npx tsc --noEmit
npm install --prefix /tmp/energie-pgtest --ignore-scripts --no-audit --no-fund @electric-sql/pglite@0.5.10
PGLITE_MODULE=/tmp/energie-pgtest/node_modules/@electric-sql/pglite/dist/index.js node scripts/test-analyse-rls.mjs
```

For a real disposable Supabase instance, apply migrations with your normal migration
runner, then run `psql "$TEST_DATABASE_URL" -v ON_ERROR_STOP=1 -f
supabase/tests/analyse_access_control.sql`. The test intentionally creates fake
admin accounts and a broad policy inside a rolled-back transaction: never run it
against production. Add hosted integration checks for download/list/signing using
real guest, owner, unrelated and admin sessions for both buckets. Unrelated callers
must not receive bytes or signed URLs; admin result uploads and owner downloads
must still succeed. Existing issued signed URLs may remain usable until expiry.

## Deployment and live verification

1. Inspect migration history, grants, pg_policies, RLS and bucket visibility using
   supabase/tests/inspect_analyse_access_control.sql (read-only).
2. Deploy the server patch and migration 009 in the same maintenance window. Running
   only one leaves an independent vulnerability open. Migration requires a database
   migration administrator and 001–008. It intentionally replaces this table's entire
   policy set; review any deployment-specific policies first.
3. Confirm live policy definitions match 009, public=false for both buckets and no
   browser-role INSERT/DELETE privileges on analyse_anfragen. Check inherited grants
   and memberships as well. Repeat the four-role tests on staging, including actual
   hosted Storage HTTP and signed-URL requests.
4. Review historical ownership assignments and file associations before treating
   existing user_id values as verified. Audit logs, not email equality, should guide
   any repairs. Existing guest requests now need explicit verified admin linking.
5. Keep the restricted policies during incident rollback. Reverting to 002/008 would
   restore the exposure. No production migration or deployment was performed here.

References:
- https://www.postgresql.org/docs/16/ddl-rowsecurity.html
- https://www.postgresql.org/docs/16/sql-createpolicy.html
- https://supabase.com/docs/guides/auth/server-side/creating-a-client
