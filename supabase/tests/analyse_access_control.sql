-- Run only against a disposable migrated Supabase database as postgres.
-- All fixtures and intentionally broad policies are rolled back.
BEGIN;
CREATE FUNCTION pg_temp.assert_true(ok boolean, label text) RETURNS void LANGUAGE plpgsql AS $$
BEGIN IF ok IS DISTINCT FROM true THEN RAISE EXCEPTION 'FAIL: %', label; END IF; END $$;
CREATE FUNCTION pg_temp.expect_denied(statement text) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  BEGIN EXECUTE statement;
  EXCEPTION WHEN insufficient_privilege THEN RETURN; END;
  RAISE EXCEPTION 'Expected permission denial: %', statement;
END $$;

INSERT INTO public.analyse_anfragen (id, vorname, nachname, email, abrechnung_path)
VALUES ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3', 'Guest', 'Test', 'signup-test@example.invalid', 'acl-test/guest.pdf');
INSERT INTO auth.users (id, email, email_confirmed_at, raw_user_meta_data) VALUES
('11111111-1111-4111-8111-111111111111', 'owner-test@example.invalid', now(), '{}'),
('22222222-2222-4222-8222-222222222222', 'other-test@example.invalid', now(), '{}'),
('33333333-3333-4333-8333-333333333333', 'ehsan.amiri.de1986@gmail.com', now(), '{}'),
('44444444-4444-4444-8444-444444444444', 'hakmoh@outlook.de', null, '{}'),
('55555555-5555-4555-8555-555555555555', 'signup-test@example.invalid', null, '{}');
SELECT pg_temp.assert_true((SELECT user_id IS NULL FROM public.analyse_anfragen WHERE id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3'), 'signup must not claim guest records');
INSERT INTO public.analyse_anfragen (id, vorname, nachname, email, user_id, anfrage_typ, abrechnung_path, ergebnis_path) VALUES
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', 'Owner', 'Test', 'other-test@example.invalid', '11111111-1111-4111-8111-111111111111', 'registriert', 'acl-test/owner.pdf', 'acl-test/result.pdf'),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2', 'Other', 'Test', 'owner-test@example.invalid', '22222222-2222-4222-8222-222222222222', 'registriert', 'acl-test/other.pdf', 'acl-test/other-result.pdf');
INSERT INTO storage.objects (bucket_id, name) VALUES
('analyse-abrechnungen', 'acl-test/owner.pdf'),
('analyse-abrechnungen', 'acl-test/other.pdf'),
('analyse-abrechnungen', 'acl-test/guest.pdf'),
('analyse-abrechnungen', 'acl-test/orphan.pdf'),
('analyse-ergebnisse', 'acl-test/result.pdf'),
('analyse-ergebnisse', 'acl-test/other-result.pdf');
-- Guards must also withstand deployment-specific permissive policies.
CREATE POLICY acl_test_broad_storage ON storage.objects FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

SET LOCAL ROLE anon;
SELECT set_config('request.jwt.claims', '{"role":"anon"}', true);
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM public.analyse_anfragen), 'guest sees no rows');
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM storage.objects WHERE name LIKE 'acl-test/%'), 'guest cannot read files');
SELECT pg_temp.expect_denied($q$INSERT INTO public.analyse_anfragen (vorname,nachname,email) VALUES ('x','y','x@y.de')$q$);
SELECT pg_temp.expect_denied($q$INSERT INTO storage.objects (bucket_id,name) VALUES ('analyse-abrechnungen','acl-test/attack.pdf')$q$);
RESET ROLE;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated","email":"owner-test@example.invalid"}', true);
SELECT pg_temp.assert_true((SELECT count(*) = 1 FROM public.analyse_anfragen WHERE id::text LIKE 'aaaaaaaa-%'), 'owner sees only own row, not email match');
SELECT pg_temp.assert_true((SELECT count(*) = 2 FROM storage.objects WHERE name LIKE 'acl-test/%'), 'owner reads only two associated files');
WITH changed AS (UPDATE public.analyse_anfragen SET status='abgeschlossen' WHERE id::text LIKE 'aaaaaaaa-%' RETURNING id)
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM changed), 'owner cannot update even own row');
SELECT pg_temp.expect_denied($q$INSERT INTO public.analyse_anfragen (vorname,nachname,email,user_id) VALUES ('x','y','owner-test@example.invalid','22222222-2222-4222-8222-222222222222')$q$);
SELECT pg_temp.expect_denied($q$INSERT INTO storage.objects (bucket_id,name) VALUES ('analyse-ergebnisse','acl-test/forged.pdf')$q$);
WITH changed AS (UPDATE storage.objects SET name='acl-test/stolen.pdf' WHERE name='acl-test/owner.pdf' RETURNING id)
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM changed), 'owner cannot rewrite storage association');
WITH changed AS (DELETE FROM storage.objects WHERE name='acl-test/owner.pdf' RETURNING id)
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM changed), 'owner cannot delete files');
SELECT set_config('request.jwt.claims', '{"sub":"22222222-2222-4222-8222-222222222222","role":"authenticated"}', true);
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM public.analyse_anfragen WHERE id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1'), 'other user cannot read owner row');
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM storage.objects WHERE name='acl-test/owner.pdf'), 'other user cannot read owner upload');
WITH changed AS (UPDATE public.analyse_anfragen SET user_id='22222222-2222-4222-8222-222222222222' WHERE id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1' RETURNING id)
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM changed), 'other user cannot steal row');
SELECT set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-8444-444444444444","role":"authenticated","email":"hakmoh@outlook.de"}', true);
SELECT pg_temp.assert_true(NOT public.is_analyse_admin(), 'unconfirmed admin email is not admin');
SELECT pg_temp.assert_true((SELECT count(*) = 0 FROM public.analyse_anfragen WHERE id::text LIKE 'aaaaaaaa-%'), 'unconfirmed admin sees no rows');
SELECT set_config('request.jwt.claims', '{"sub":"33333333-3333-4333-8333-333333333333","role":"authenticated"}', true);
SELECT pg_temp.assert_true(public.is_analyse_admin(), 'confirmed admin recognized without trusting email claim');
SELECT pg_temp.assert_true((SELECT count(*) = 3 FROM public.analyse_anfragen WHERE id::text LIKE 'aaaaaaaa-%'), 'admin sees all requests including guests');
SELECT pg_temp.assert_true((SELECT count(*) = 6 FROM storage.objects WHERE name LIKE 'acl-test/%'), 'admin sees all analysis files');
WITH changed AS (UPDATE public.analyse_anfragen SET status='abgeschlossen' WHERE id::text LIKE 'aaaaaaaa-%' RETURNING id)
SELECT pg_temp.assert_true((SELECT count(*) = 3 FROM changed), 'admin updates requests');
INSERT INTO storage.objects (bucket_id,name) VALUES ('analyse-ergebnisse','acl-test/admin-result.pdf');
RESET ROLE;
ROLLBACK;
