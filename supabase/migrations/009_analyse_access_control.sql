-- Replace the effective policy set, not only the misleading policy names.
BEGIN;

-- Only confirmed, current Auth identities may act as administrators.
CREATE OR REPLACE FUNCTION public.is_analyse_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = (SELECT auth.uid()) AND u.email_confirmed_at IS NOT NULL
      AND lower(u.email) IN ('ehsan.amiri.de1986@gmail.com', 'hakmoh@outlook.de')
  );
$$;
REVOKE ALL ON FUNCTION public.is_analyse_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_analyse_admin() TO anon, authenticated;

ALTER TABLE public.analyse_anfragen ENABLE ROW LEVEL SECURITY;
-- This table's policy set is intentionally authoritative. Remove unknown permissive
-- policies too: adding owner policies cannot narrow an existing USING (true).
DO $$ DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'analyse_anfragen'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.analyse_anfragen', p.policyname);
  END LOOP;
END $$;
CREATE POLICY analyse_read ON public.analyse_anfragen FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()) OR (SELECT public.is_analyse_admin()));
CREATE POLICY analyse_admin_update ON public.analyse_anfragen FOR UPDATE TO authenticated
  USING ((SELECT public.is_analyse_admin()))
  WITH CHECK ((SELECT public.is_analyse_admin()));
-- Public submissions use the validated server endpoint (service role), never REST inserts.
REVOKE ALL ON public.analyse_anfragen FROM anon;
REVOKE INSERT, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.analyse_anfragen FROM authenticated;
-- SELECT is needed to evaluate the storage ownership subquery; anon has no
-- applicable row policy and therefore sees zero rows.
GRANT SELECT ON public.analyse_anfragen TO anon;
GRANT SELECT, UPDATE ON public.analyse_anfragen TO authenticated;

DROP POLICY IF EXISTS "Admins lesen alle Profile" ON public.profiles;
CREATE POLICY "Admins lesen alle Profile" ON public.profiles FOR SELECT TO authenticated
  USING ((SELECT public.is_analyse_admin()));

UPDATE storage.buckets SET public = false
  WHERE id IN ('analyse-abrechnungen', 'analyse-ergebnisse');
DROP POLICY IF EXISTS "Anonymer Upload erlaubt" ON storage.objects;
DROP POLICY IF EXISTS "Admins dürfen Abrechnungen lesen" ON storage.objects;
DROP POLICY IF EXISTS "Admins Upload Ergebnisse" ON storage.objects;
DROP POLICY IF EXISTS "Ergebnisse lesen" ON storage.objects;

-- Exact database path association works for existing flat upload paths as well.
CREATE POLICY analyse_files_read ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id IN ('analyse-abrechnungen', 'analyse-ergebnisse') AND (
    (SELECT public.is_analyse_admin()) OR EXISTS (
      SELECT 1 FROM public.analyse_anfragen a
      WHERE a.user_id = (SELECT auth.uid()) AND (
        (bucket_id = 'analyse-abrechnungen' AND a.abrechnung_path = name) OR
        (bucket_id = 'analyse-ergebnisse' AND a.ergebnis_path = name)
      )
    )
  )
);
CREATE POLICY analyse_results_admin_insert ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'analyse-ergebnisse' AND (SELECT public.is_analyse_admin()));

-- Restrictive guards constrain even any deployment-specific broad storage policies.
-- Other buckets retain their existing policy behavior.
CREATE POLICY analyse_files_read_guard ON storage.objects AS RESTRICTIVE
FOR SELECT TO anon, authenticated USING (
  bucket_id NOT IN ('analyse-abrechnungen', 'analyse-ergebnisse') OR (
    (SELECT public.is_analyse_admin()) OR EXISTS (
      SELECT 1 FROM public.analyse_anfragen a
      WHERE a.user_id = (SELECT auth.uid()) AND (
        (bucket_id = 'analyse-abrechnungen' AND a.abrechnung_path = name) OR
        (bucket_id = 'analyse-ergebnisse' AND a.ergebnis_path = name)
      )
    )
  )
);
CREATE POLICY analyse_files_insert_guard ON storage.objects AS RESTRICTIVE
FOR INSERT TO anon, authenticated WITH CHECK (
  bucket_id NOT IN ('analyse-abrechnungen', 'analyse-ergebnisse') OR
  (bucket_id = 'analyse-ergebnisse' AND (SELECT public.is_analyse_admin()))
);
CREATE POLICY analyse_files_update_guard ON storage.objects AS RESTRICTIVE
FOR UPDATE TO anon, authenticated
USING (bucket_id NOT IN ('analyse-abrechnungen', 'analyse-ergebnisse'))
WITH CHECK (bucket_id NOT IN ('analyse-abrechnungen', 'analyse-ergebnisse'));
CREATE POLICY analyse_files_delete_guard ON storage.objects AS RESTRICTIVE
FOR DELETE TO anon, authenticated
USING (bucket_id NOT IN ('analyse-abrechnungen', 'analyse-ergebnisse'));

-- Do not assign guest records during signup: NEW.email is not proof of mailbox
-- ownership at INSERT time. Historical guest linking requires a reviewed admin action.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.profiles (id, vorname, nachname, email, telefon, typ)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'vorname', ''),
    COALESCE(NEW.raw_user_meta_data->>'nachname', ''), NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'telefon', ''), 'privat');
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
COMMIT;
