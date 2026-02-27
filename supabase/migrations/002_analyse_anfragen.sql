-- =============================================
-- Migration 002: Tabelle "analyse_anfragen"
-- Für anonyme Analyse-Anfragen (ohne Login)
-- =============================================

-- Tabelle erstellen
CREATE TABLE IF NOT EXISTS public.analyse_anfragen (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Persönliche Daten
  vorname TEXT NOT NULL,
  nachname TEXT NOT NULL,
  geburtsdatum DATE,
  email TEXT NOT NULL,
  telefon TEXT,

  -- Energiedaten
  zaehler_nummer TEXT,
  verbrauch_kwh NUMERIC,
  marktlokations_id TEXT,

  -- Hochgeladene Abrechnung
  abrechnung_path TEXT,        -- Pfad im Storage Bucket
  abrechnung_filename TEXT,    -- Originaler Dateiname

  -- Metadaten
  status TEXT DEFAULT 'neu' CHECK (status IN ('neu', 'in_bearbeitung', 'abgeschlossen')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für schnelle Suche nach E-Mail und Status
CREATE INDEX IF NOT EXISTS idx_analyse_anfragen_email ON public.analyse_anfragen(email);
CREATE INDEX IF NOT EXISTS idx_analyse_anfragen_status ON public.analyse_anfragen(status);
CREATE INDEX IF NOT EXISTS idx_analyse_anfragen_created ON public.analyse_anfragen(created_at DESC);

-- RLS aktivieren
ALTER TABLE public.analyse_anfragen ENABLE ROW LEVEL SECURITY;

-- Policy: Anonyme Benutzer dürfen INSERT (Formular absenden)
CREATE POLICY "Anonymer Insert erlaubt"
  ON public.analyse_anfragen
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Nur authentifizierte Admins dürfen lesen/ändern
-- (Service Role Key umgeht RLS automatisch)
CREATE POLICY "Admins dürfen alles lesen"
  ON public.analyse_anfragen
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins dürfen aktualisieren"
  ON public.analyse_anfragen
  FOR UPDATE
  TO authenticated
  USING (true);

-- =============================================
-- Storage Bucket für Analyse-Abrechnungen
-- =============================================

-- Bucket erstellen (falls er nicht existiert)
INSERT INTO storage.buckets (id, name, public)
VALUES ('analyse-abrechnungen', 'analyse-abrechnungen', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Anonyme Benutzer dürfen hochladen
CREATE POLICY "Anonymer Upload erlaubt"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'analyse-abrechnungen');

-- Policy: Nur Service Role / Admins dürfen lesen
CREATE POLICY "Admins dürfen Abrechnungen lesen"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'analyse-abrechnungen');

-- Updated_at Trigger
CREATE OR REPLACE FUNCTION update_analyse_anfragen_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_analyse_anfragen_updated_at
  BEFORE UPDATE ON public.analyse_anfragen
  FOR EACH ROW
  EXECUTE FUNCTION update_analyse_anfragen_updated_at();
