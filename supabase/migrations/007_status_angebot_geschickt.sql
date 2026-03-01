-- =============================================
-- Migration 007: Neuer Status 'angebot_geschickt'
-- Zwischen 'in_bearbeitung' und 'abgeschlossen'
-- =============================================

ALTER TABLE analyse_anfragen
  DROP CONSTRAINT IF EXISTS analyse_anfragen_status_check;

ALTER TABLE analyse_anfragen
  ADD CONSTRAINT analyse_anfragen_status_check
  CHECK (status IN ('neu', 'in_bearbeitung', 'angebot_geschickt', 'abgeschlossen'));
