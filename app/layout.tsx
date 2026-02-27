import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

// Outfit: Moderne, freundliche Schriftart für den gesamten Text
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

// SEO-Metadaten — werden auf jeder Seite angezeigt (außer überschrieben)
export const metadata: Metadata = {
  title: {
    default: 'Energiekosten senken — Bis zu 30% sparen | PAKA Energieberatung',
    template: '%s | Energiekosten Sinken',
  },
  description:
    'Senken Sie Ihre Strom- und Gaskosten um bis zu 30%. Kostenlose Analyse Ihrer Energieabrechnung. Unverbindliche Beratung für Privat & Gewerbe in ganz Deutschland.',
  keywords: [
    'Energiekosten senken',
    'Stromkosten sparen',
    'Gaskosten senken',
    'Energieberatung',
    'Stromanbieter wechseln',
    'Energieberater Deutschland',
  ],
  authors: [{ name: 'PAKA GmbH' }],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Energiekosten Sinken',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={outfit.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
