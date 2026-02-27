import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der PAKA GmbH gemäß DSGVO.',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="container-tight flex h-16 items-center">
          <Link href="/" className="text-lg font-bold text-gray-900">
            <span className="text-brand-500">Energiekosten</span> Sinken
          </Link>
        </div>
      </header>

      <main className="container-tight py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Datenschutzerklärung</h1>

        <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              1. Verantwortlicher
            </h2>
            <p className="mt-3">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-3">
              PAKA GmbH<br />
              Geschäftsführung: Ehsan Amiri, Mark Schmidts<br />
              Josephsplatz 8<br />
              90403 Nürnberg<br />
              Deutschland<br />
              E-Mail: info@energiekosten-sinken.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p className="mt-3">
              Wenn Sie sich auf unserer Plattform registrieren, erheben wir 
              folgende Daten:
            </p>
            <p className="mt-3">
              Vorname und Nachname, E-Mail-Adresse, Telefonnummer, 
              Angaben zum Kundentyp (Privat/Gewerbe), ggf. Firmenname, 
              Energieverbrauchsdaten (Verbrauch in kWh, aktueller Anbieter, 
              Zählernummer), hochgeladene Dokumente (Jahresabrechnungen).
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO 
              (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. a DSGVO 
              (Einwilligung).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              3. Zweck der Datenverarbeitung
            </h2>
            <p className="mt-3">
              Ihre Daten werden ausschließlich für folgende Zwecke verwendet: 
              Durchführung der Energieberatung und Tarifoptimierung, 
              Kontaktaufnahme zur Terminvereinbarung, 
              Versand von Bestätigungs- und Terminerinnerungs-E-Mails, 
              und Verwaltung Ihres Kundenkontos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              4. Weitergabe von Daten
            </h2>
            <p className="mt-3">
              Wir geben Ihre personenbezogenen Daten nur weiter, sofern dies 
              zur Vertragserfüllung erforderlich ist. Folgende Dienstleister 
              werden eingesetzt:
            </p>
            <p className="mt-3">
              <strong>Supabase Inc.</strong> — Hosting der Datenbank und 
              Dateispeicherung (Serverstandort: EU).<br />
              <strong>Vercel Inc.</strong> — Hosting der Website 
              (Serverstandort: EU/Global CDN).<br />
              <strong>Brevo (Sendinblue)</strong> — E-Mail-Versand und CRM 
              (Serverstandort: EU, Frankreich).<br />
              <strong>Cloudflare Inc.</strong> — DNS und Sicherheit.
            </p>
            <p className="mt-3">
              Eine Weitergabe an Dritte zu Werbezwecken findet nicht statt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              5. Speicherdauer
            </h2>
            <p className="mt-3">
              Personenbezogene Daten werden gelöscht, sobald der Zweck der 
              Speicherung entfällt. Für Vertragsdaten gilt die gesetzliche 
              Aufbewahrungsfrist von 10 Jahren (§ 147 AO, § 257 HGB).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              6. Ihre Rechte
            </h2>
            <p className="mt-3">
              Sie haben jederzeit das Recht auf: Auskunft über Ihre gespeicherten 
              Daten (Art. 15 DSGVO), Berichtigung unrichtiger Daten 
              (Art. 16 DSGVO), Löschung Ihrer Daten (Art. 17 DSGVO), 
              Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit 
              (Art. 20 DSGVO), und Widerspruch gegen die Verarbeitung 
              (Art. 21 DSGVO).
            </p>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: 
              info@energiekosten-sinken.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              7. Beschwerderecht
            </h2>
            <p className="mt-3">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde 
              zu beschweren. Die zuständige Aufsichtsbehörde ist:
            </p>
            <p className="mt-3">
              Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />
              Promenade 18<br />
              91522 Ansbach<br />
              <a
                href="https://www.lda.bayern.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 underline hover:text-brand-600"
              >
                www.lda.bayern.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              8. SSL-Verschlüsselung
            </h2>
            <p className="mt-3">
              Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. 
              Eine verschlüsselte Verbindung erkennen Sie daran, dass die 
              Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-12">
            Stand: Februar 2026
          </p>
        </div>
      </main>
    </div>
  )
}
