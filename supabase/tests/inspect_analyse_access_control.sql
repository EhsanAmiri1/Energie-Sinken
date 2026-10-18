-- Read-only production inventory. Does not read customer rows or object contents.
SELECT version FROM supabase_migrations.schema_migrations ORDER BY version;
SELECT n.nspname, c.relname, c.relrowsecurity, c.relforcerowsecurity
FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
WHERE (n.nspname='public' AND c.relname='analyse_anfragen')
   OR (n.nspname='storage' AND c.relname='objects');
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE (schemaname='public' AND tablename IN ('analyse_anfragen','profiles'))
   OR (schemaname='storage' AND tablename='objects')
ORDER BY schemaname, tablename, policyname;
SELECT grantee, privilege_type FROM information_schema.table_privileges
WHERE table_schema='public' AND table_name='analyse_anfragen' ORDER BY grantee, privilege_type;
SELECT id, public FROM storage.buckets WHERE id IN ('analyse-abrechnungen','analyse-ergebnisse');
SELECT pg_get_functiondef('public.handle_new_user()'::regprocedure);
SELECT pg_get_functiondef('public.is_analyse_admin()'::regprocedure);
