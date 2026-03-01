import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, RefreshCw, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection } from '../../components'

export const metadata: Metadata = {
  title: 'Stromanbieter wechseln: So einfach geht\u2019s \u2014 Anleitung 2026',
  description: 'Stromanbieter wechseln in 3 Schritten. Keine Versorgungsl\u00fccke, kein Risiko. Schritt-f\u00fcr-Schritt-Anleitung mit Spartipps.',
  keywords: ['Stromanbieter wechseln', 'Stromanbieter wechseln Anleitung', 'Stromanbieterwechsel', 'Strom wechseln einfach'],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Stromanbieter wechseln: So einfach geht\u2019s',
  author: { '@type': 'Organization', name: 'PAKA GmbH' },
  publisher: { '@type': 'Organization', name: 'PAKA GmbH', url: 'https://energiepreise-sinken.de' },
  datePublished: '2026-02-25',
  description: 'Schritt-f\u00fcr-Schritt-Anleitung zum Stromanbieter-Wechsel.',
}

export default function StromanbieterWechselnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden bg-energy-dark pt-28 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
          <div className="container-tight relative z-10">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Zur\u00fcck zum Blog
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/30 px-3 py-1 text-xs text-brand-300 mb-4">
              <RefreshCw className="h-3.5 w-3.5" /> Anleitung
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Stromanbieter wechseln: So einfach geht&apos;s
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
              <span>PAKA GmbH</span>
              <span>&middot;</span>
              <span>25. Februar 2026</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 5 Min Lesezeit</span>
            </div>
          </div>
        </section>

        <article className="py-16 bg-white">
          <div className="container-tight max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Viele Deutsche zahlen zu viel f&uuml;r Strom, weil sie den Anbieter noch nie gewechselt haben. Dabei ist der Wechsel einfach, sicher und spart durchschnittlich 200&ndash;400 &euro; pro Jahr. Hier erfahren Sie, wie es geht.
            </p>

            {/* Mythen */}
            <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                3 Mythen &uuml;ber den Anbieterwechsel
              </h2>
              <div className="mt-4 space-y-3">
                {[
                  { mythos: 'Es gibt eine Versorgungsl\u00fccke', fakt: 'Falsch. Die Stromversorgung ist gesetzlich garantiert. Sie sitzen nie im Dunkeln.' },
                  { mythos: 'Der Wechsel ist kompliziert', fakt: 'Falsch. Der neue Anbieter k\u00fcndigt Ihren alten Vertrag und \u00fcbernimmt alles.' },
                  { mythos: 'Ich brauche einen neuen Z\u00e4hler', fakt: 'Falsch. Ihr Z\u00e4hler bleibt derselbe. Nur der Lieferant \u00e4ndert sich.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-brand-500" />
                    <p className="text-gray-700 text-sm"><strong>{item.mythos}?</strong> {item.fakt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schritt-f\u00fcr-Schritt */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">Stromanbieter wechseln in 3 Schritten</h2>

            <div className="mt-8 space-y-8">
              {[
                { nr: 1, title: 'Abrechnung bereithalten', text: 'Sie ben\u00f6tigen Ihre letzte Jahresabrechnung. Darauf stehen Ihr Jahresverbrauch in kWh und Ihre Z\u00e4hlernummer. Alternativ reicht auch ein Foto der Abrechnung.' },
                { nr: 2, title: 'Tarife vergleichen lassen', text: 'Laden Sie Ihre Abrechnung bei uns hoch. Wir vergleichen f\u00fcr Sie die besten Tarife und zeigen Ihnen, wie viel Sie sparen k\u00f6nnen. Kostenlos und unverbindlich.' },
                { nr: 3, title: 'Wechsel best\u00e4tigen', text: 'Wenn Sie mit dem Angebot zufrieden sind, best\u00e4tigen Sie den Wechsel. Wir k\u00fcmmern uns um alles Weitere \u2014 K\u00fcndigung, Anmeldung, \u00dcbergang. Sie m\u00fcssen nichts tun.' },
              ].map((schritt) => (
                <div key={schritt.nr} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                    {schritt.nr}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{schritt.title}</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">{schritt.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Was Sie brauchen */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">Was Sie f&uuml;r den Wechsel brauchen</h2>
            <ul className="mt-4 space-y-2">
              {[
                'Letzte Jahresabrechnung (PDF oder Foto)',
                'Z\u00e4hlernummer (steht auf der Abrechnung)',
                'Jahresverbrauch in kWh',
                'Ihre Adresse',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Wann wechseln */}
            <h2 className="mt-16 text-2xl font-bold text-gray-900">Wann ist der beste Zeitpunkt?</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Grunds&auml;tzlich lohnt sich ein Wechsel immer. Die meisten Vertr&auml;ge haben eine K&uuml;ndigungsfrist von 4 Wochen nach der Erstlaufzeit. Pr&uuml;fen Sie Ihren Vertrag &mdash; oder lassen Sie uns das f&uuml;r Sie erledigen.
            </p>

            <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-8">
              <h2 className="text-xl font-bold text-gray-900">Bereit zum Wechseln?</h2>
              <p className="mt-3 text-gray-600">
                Laden Sie jetzt Ihre Abrechnung hoch. Wir zeigen Ihnen in wenigen Minuten, wie viel Sie sparen k&ouml;nnen.
              </p>
              <Link href="/analyse" className="btn-primary mt-6 inline-flex">
                Jetzt kostenlos pr&uuml;fen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 flex gap-4 text-sm text-gray-500">
              <span>Weitere Artikel:</span>
              <Link href="/blog/10-tipps-strom-sparen" className="text-brand-500 hover:text-brand-600">10 Tipps zum Stromsparen</Link>
              <Link href="/blog/gaskosten-senken-ratgeber" className="text-brand-500 hover:text-brand-600">Gaskosten senken</Link>
            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <MarketingFooter />
    </>
  )
}
