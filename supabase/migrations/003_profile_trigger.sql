-- =============================================
-- Migration 003: Automatische Profil-Erstellung
-- Erstellt automatisch einen "profiles"-Eintrag
-- wenn ein neuer Benutzer sich registriert.
-- Holt Vorname, Nachname, Telefon aus analyse_anfragen.
-- =============================================

-- Telefon optional machen (war NOT NULL, ist aber optional)
ALTER TABLE profiles ALTER COLUMN telefon DROP NOT NULL;

-- Funktion: Sucht Kundendaten in analyse_anfragen und erstellt Profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  _vorname TEXT;
  _nachname TEXT;
  _telefon TEXT;
BEGIN
  -- Daten aus analyse_anfragen holen (neuester Eintrag für diese E-Mail)
  SELECT vorname, nachname, telefon
  INTO _vorname, _nachname, _telefon
  FROM public.analyse_anfragen
  WHERE email = NEW.email
  ORDER BY created_at DESC
  LIMIT 1;

  INSERT INTO public.profiles (id, vorname, nachname, email, telefon, typ)
  VALUES (
    NEW.id,
    COALESCE(_vorname, ''),
    COALESCE(_nachname, ''),
    NEW.email,
    COALESCE(_telefon, ''),
    'privat'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Wird nach INSERT auf auth.users ausgelöst
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
