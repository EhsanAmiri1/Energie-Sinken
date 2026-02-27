import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum — Angaben gemäß § 5 TMG. PAKA GmbH, Nürnberg.',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Einfacher Header */}
      <header className="border-b border-gray-100">
        <div className="container-tight flex h-16 items-center">
          <Link href="/" className="text-lg font-bold text-gray-900">
            <span className="text-brand-500">Energiekosten</span> Sinken
          </Link>
        </div>
      </header>

      <main className="container-tight py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Impressum</h1>

        <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mt-3">
              PAKA GmbH<br />
              Josephsplatz 8<br />
              90403 Nürnberg<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Geschäftsführung
            </h2>
            <p className="mt-3">Ehsan Amiri, Mark Schmidts</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Registereintrag
            </h2>
            <p className="mt-3">
              Registergericht: Amtsgericht Nürnberg<br />
              Registernummer: HRB 44223
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p className="mt-3">
              USt-IdNr. gemäß § 27a Umsatzsteuergesetz: DE453450121
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Kontakt</h2>
            <p className="mt-3">
              E-Mail: info@energiekosten-sinken.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Streitschlichtung
            </h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur 
              Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 underline hover:text-brand-600"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren 
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Haftung für Inhalte
            </h2>
            <p className="mt-3">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte 
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
              Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              verpflichtet, übermittelte oder gespeicherte fremde Informationen 
              zu überwachen oder nach Umständen zu forschen, die auf eine 
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
