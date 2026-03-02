-- Migration 008: Anfrage-Typ (Gast vs. Registriert)
-- Fügt user_id und anfrage_typ zu analyse_anfragen hinzu

-- 1. Neue Spalten
ALTER TABLE analyse_anfragen
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS anfrage_typ TEXT NOT NULL DEFAULT 'gast';

-- 2. CHECK Constraint für anfrage_typ
ALTER TABLE analyse_anfragen
  ADD CONSTRAINT analyse_anfragen_anfrage_typ_check
  CHECK (anfrage_typ IN ('gast', 'registriert'));

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_analyse_anfragen_user_id ON analyse_anfragen(user_id);
CREATE INDEX IF NOT EXISTS idx_analyse_anfragen_anfrage_typ ON analyse_anfragen(anfrage_typ);

-- 4. RLS-Policy für SELECT aktualisieren (Kunden lesen eigene Anfragen per Email ODER user_id)
DROP POLICY IF EXISTS "Kunden lesen eigene Anfragen" ON analyse_anfragen;
CREATE POLICY "Kunden lesen eigene Anfragen" ON analyse_anfragen
  FOR SELECT TO authenticated
  USING (
    email = auth.jwt() ->> 'email'
    OR user_id = auth.uid()
  );

-- 5. RLS-Policy für INSERT aktualisieren (Authentifizierte User mit user_id)
DROP POLICY IF EXISTS "Kunden erstellen eigene Anfragen" ON analyse_anfragen;
CREATE POLICY "Kunden erstellen eigene Anfragen" ON analyse_anfragen
  FOR INSERT TO authenticated
  WITH CHECK (
    email = auth.jwt() ->> 'email'
    OR user_id = auth.uid()
  );

-- 6. handle_new_user() Trigger erweitern: Verknüpft bestehende Gast-Anfragen mit neuem User
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  anfrage_row RECORD;
BEGIN
  -- Neueste Anfrage für diese E-Mail finden
  SELECT vorname, nachname, telefon
  INTO anfrage_row
  FROM public.analyse_anfragen
  WHERE email = NEW.email
  ORDER BY created_at DESC
  LIMIT 1;

  -- Profil erstellen
  INSERT INTO public.profiles (id, vorname, nachname, email, telefon, typ)
  VALUES (
    NEW.id,
    COALESCE(anfrage_row.vorname, ''),
    COALESCE(anfrage_row.nachname, ''),
    NEW.email,
    COALESCE(anfrage_row.telefon, ''),
    'privat'
  );

  -- Alle Gast-Anfragen dieser E-Mail mit dem neuen User verknüpfen
  UPDATE public.analyse_anfragen
  SET user_id = NEW.id,
      anfrage_typ = 'registriert'
  WHERE email = NEW.email
    AND user_id IS NULL;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
