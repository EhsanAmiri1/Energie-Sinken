-- =============================================
-- Migration 005: Energieart + Kundentyp Spalten
-- Kunden können mehrere Anfragen erstellen (Strom/Gas, Privat/Gewerbe)
-- =============================================

-- Neue Spalte: Energieart (Strom oder Gas)
ALTER TABLE analyse_anfragen
  ADD COLUMN IF NOT EXISTS energie_typ TEXT NOT NULL DEFAULT 'strom'
  CHECK (energie_typ IN ('strom', 'gas'));

-- Neue Spalte: Kundentyp (Privat oder Gewerbe)
ALTER TABLE analyse_anfragen
  ADD COLUMN IF NOT EXISTS kunden_typ TEXT NOT NULL DEFAULT 'privat'
  CHECK (kunden_typ IN ('privat', 'gewerbe'));

-- Indices für schnelle Filterung
CREATE INDEX IF NOT EXISTS idx_analyse_anfragen_energie_typ ON analyse_anfragen(energie_typ);
CREATE INDEX IF NOT EXISTS idx_analyse_anfragen_kunden_typ ON analyse_anfragen(kunden_typ);

-- Kunden können eigene Anfragen lesen (per E-Mail aus JWT)
CREATE POLICY "Kunden lesen eigene Anfragen" ON analyse_anfragen
  FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Kunden können neue Anfragen erstellen
CREATE POLICY "Kunden erstellen eigene Anfragen" ON analyse_anfragen
  FOR INSERT TO authenticated
  WITH CHECK (email = auth.jwt() ->> 'email');
