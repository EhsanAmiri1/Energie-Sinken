-- =============================================
-- Migration: Initiale Datenbankstruktur
-- App: energiekosten-sinken.de
-- Datum: 2026-02-27
-- =============================================

-- Profil-Tabelle: Erweitert die Supabase-Auth-Users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  vorname TEXT NOT NULL,
  nachname TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT NOT NULL,
  typ TEXT NOT NULL CHECK (typ IN ('privat', 'gewerbe')),
  firma_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Energiedaten: Verbrauchsinformationen des Kunden
CREATE TABLE energy_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  energie_typ TEXT NOT NULL CHECK (energie_typ IN ('strom', 'gas')),
  aktueller_anbieter TEXT NOT NULL,
  jahresverbrauch_kwh NUMERIC NOT NULL,
  monatliche_kosten NUMERIC,
  zaehler_nummer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dokumente: Hochgeladene Jahresabrechnungen
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'jahresabrechnung',
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Termine: Beratungstermine
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  termin_datum DATE NOT NULL,
  termin_zeit TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'gebucht' CHECK (status IN ('gebucht', 'durchgeführt', 'abgesagt')),
  notizen TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads: CRM-Status für die Admin-Ansicht
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'neu' CHECK (status IN ('neu', 'kontaktiert', 'termin_gebucht', 'beraten', 'kunde_gewonnen', 'verloren')),
  zugewiesen_an TEXT DEFAULT 'mark' CHECK (zugewiesen_an IN ('ehsan', 'mark')),
  notizen TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Row Level Security (RLS) einschalten
-- RLS sorgt dafür, dass Nutzer nur ihre eigenen Daten sehen
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Nutzer können nur ihr eigenes Profil lesen und bearbeiten
CREATE POLICY "Eigenes Profil lesen" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Eigenes Profil bearbeiten" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profil erstellen bei Registrierung" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Energiedaten: Nur eigene Daten
CREATE POLICY "Eigene Energiedaten lesen" ON energy_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Eigene Energiedaten erstellen" ON energy_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Dokumente: Nur eigene Dokumente
CREATE POLICY "Eigene Dokumente lesen" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Eigene Dokumente hochladen" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Termine: Nur eigene Termine
CREATE POLICY "Eigene Termine lesen" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Eigene Termine erstellen" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Leads: Nur eigene Leads lesen (Admins bekommen später erweiterte Rechte)
CREATE POLICY "Eigene Leads lesen" ON leads
  FOR SELECT USING (auth.uid() = user_id);

-- =============================================
-- Storage Bucket für Jahresabrechnungen
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('abrechnungen', 'abrechnungen', false);

-- Nutzer können nur in ihren eigenen Ordner hochladen
CREATE POLICY "Eigene Dateien hochladen" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'abrechnungen' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Nutzer können nur ihre eigenen Dateien lesen
CREATE POLICY "Eigene Dateien lesen" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'abrechnungen' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- =============================================
-- Trigger: updated_at automatisch aktualisieren
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
