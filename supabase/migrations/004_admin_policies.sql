-- =============================================
-- Migration 004: Admin-RLS-Policies
-- Admins können alle Anfragen und Profile sehen/bearbeiten
-- =============================================

-- Admins können alle analyse_anfragen lesen
CREATE POLICY "Admins lesen alle Anfragen" ON analyse_anfragen
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' IN ('ehsan.amiri.de1986@gmail.com', 'hakmoh@outlook.de'));

-- Admins können analyse_anfragen updaten (Status, Notizen)
CREATE POLICY "Admins updaten Anfragen" ON analyse_anfragen
  FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'email' IN ('ehsan.amiri.de1986@gmail.com', 'hakmoh@outlook.de'));

-- Admins können alle Profile lesen
CREATE POLICY "Admins lesen alle Profile" ON profiles
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' IN ('ehsan.amiri.de1986@gmail.com', 'hakmoh@outlook.de'));
