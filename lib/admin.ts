// Admin-Konfiguration
// Zentrale Stelle für Admin-E-Mails

export const ADMIN_EMAILS = [
  'ehsan.amiri.de1986@gmail.com',
  'hakmoh@outlook.de',
]

export function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
