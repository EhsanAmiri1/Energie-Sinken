-- =============================================
-- Migration 006: Ergebnis-Felder + Storage-Bucket
-- Admin kann Analyse-Ergebnis hochladen und an Kunden senden
-- =============================================

-- Neue Spalten für Ergebnis-Dateien
ALTER TABLE analyse_anfragen
  ADD COLUMN IF NOT EXISTS ergebnis_path TEXT;
ALTER TABLE analyse_anfragen
  ADD COLUMN IF NOT EXISTS ergebnis_filename TEXT;
ALTER TABLE analyse_anfragen
  ADD COLUMN IF NOT EXISTS ersparnis_euro NUMERIC;

-- Storage Bucket für Ergebnis-Dateien
INSERT INTO storage.buckets (id, name, public)
VALUES ('analyse-ergebnisse', 'analyse-ergebnisse', false)
ON CONFLICT (id) DO NOTHING;

-- Admins können Ergebnisse hochladen
CREATE POLICY "Admins Upload Ergebnisse" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'analyse-ergebnisse');

-- Admins + Kunden können Ergebnisse lesen
CREATE POLICY "Ergebnisse lesen" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'analyse-ergebnisse');
