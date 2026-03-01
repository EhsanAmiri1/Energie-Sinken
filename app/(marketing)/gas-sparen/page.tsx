import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Flame, TrendingDown, CheckCircle2, ArrowRight,
  ThermometerSun, Home, Wrench, Timer,
} from 'lucide-react'
import { MarketingHeader, MarketingFooter, CTASection, PageHero, FAQSection } from '../components'

export const metadata: Metadata = {
  title: 'Gaskosten senken \u2014 Bis zu 30% sparen bei Gas',
  description: 'Gaskosten senken leicht gemacht. Gasanbieter vergleichen, wechseln und bis zu 30% sparen. Kostenlose Analyse f\u00fcr Privat & Gewerbe.',
  keywords: [
    'Gaskosten senken',
    'Gasanbieter wechseln',
    'Gas sparen Tipps',
    'g\u00fcnstiger Gasanbieter',
    'Gasvergleich kostenlos',
  ],
  openGraph: {
    title: 'Gaskosten senken | Energiekosten Sinken',
    description: 'Bis zu 30% weniger Gaskosten. Kostenloser Vergleich und einfacher Anbieterwechsel.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie kann ich meine Gaskosten senken?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der schnellste Weg ist ein Gasanbieter-Wechsel. Zus\u00e4tzlich helfen richtig eingestellte Heizungen, abgedichtete Fenster und bewusstes Heizverhalten.' },
    },
    {
      '@type': 'Question',
      name: 'Wie viel kann ich beim Gasanbieter-Wechsel sparen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Durchschnittlich 20\u201330% der j\u00e4hrlichen Gaskosten. Bei einem Verbrauch von 20.000 kWh sind das 300\u2013600 \u20ac pro Jahr.' },
    },
    {
      '@type': 'Question',
      name: 'Gibt es beim Gaswechsel eine Versorgungsl\u00fccke?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nein. Die Gasversorgung ist gesetzlich garantiert. Beim Wechsel gibt es keine Unterbrechung.' },
    },
    {
      '@type': 'Question',
      name: 'Wann ist der beste Zeitpunkt zum Gaswechsel?',
      acceptedAnswer: { '@type': 'Answer', text: 'Im Sommer sind die Gaspreise oft niedriger. Aber grunds\u00e4tzlich lohnt sich ein Wechsel zu jeder Jahreszeit.' },
    },
  ],
}

const faqs = [
  { frage: 'Wie kann ich meine Gaskosten senken?', antwort: 'Der schnellste Weg ist ein Gasanbieter-Wechsel. Zus\u00e4tzlich helfen richtig eingestellte Heizungen, abgedichtete Fenster und bewusstes Heizverhalten.' },
  { frage: 'Wie viel kann ich beim Gasanbieter-Wechsel sparen?', antwort: 'Durchschnittlich 20\u201330% der j\u00e4hrlichen Gaskosten. Bei einem Verbrauch von 20.000 kWh sind das 300\u2013600 \u20ac pro Jahr.' },
  { frage: 'Gibt es beim Gaswechsel eine Versorgungsl\u00fccke?', antwort: 'Nein. Die Gasversorgung ist gesetzlich garantiert. Beim Wechsel gibt es keine Unterbrechung.' },
  { frage: 'Wann ist der beste Zeitpunkt zum Gaswechsel?', antwort: 'Im Sommer sind die Gaspreise oft niedriger. Aber grunds\u00e4tzlich lohnt sich ein Wechsel zu jeder Jahreszeit.' },
]

export default function GasSparenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingHeader />
      <main>
        <PageHero
          badge="F\u00fcr Privat & Gewerbe"
          title="Gaskosten senken \u2014"
          titleHighlight="bis zu 30% sparen"
          description="Vergleichen Sie Gasanbieter und finden Sie den g\u00fcnstigsten Tarif. Einfach Abrechnung hochladen, Ergebnis erhalten, wechseln."
        />

        {/* Warum Gaskosten steigen */}
        <section className="py-24 bg-white">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Warum zahlen Sie zu viel f&uuml;r Gas?
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Die Gaspreise schwanken stark. Wer nicht regelm&auml;&szlig;ig vergleicht, zahlt oft hunderte Euro zu viel pro Jahr.
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ThermometerSun, title: 'Marktpreise', desc: 'Gaspreise &auml;ndern sich st&auml;ndig. Ihr alter Tarif ist wahrscheinlich nicht mehr der g&uuml;nstigste.' },
                { icon: Home, title: 'Grundversorgung', desc: 'Der lokale Grundversorger ist fast immer teurer als alternative Anbieter.' },
                { icon: Timer, title: 'Alte Vertr&auml;ge', desc: 'Nach Ablauf der Erstlaufzeit steigen die Preise oft ohne Vorwarnung.' },
                { icon: Wrench, title: 'Keine Optimierung', desc: 'Ohne regelm&auml;&szlig;ige Pr&uuml;fung verpassen Sie bessere Konditionen.' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <item.icon className="h-8 w-8 text-energy-orange" />
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tipps zum Gas sparen */}
        <section className="py-24 bg-gray-50">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
              Die 5 besten Tipps zum Gas sparen
            </h2>
            <div className="mt-12 mx-auto max-w-3xl space-y-4">
              {[
                { title: 'Gasanbieter wechseln', desc: 'Der effektivste Schritt. Ein Wechsel spart durchschnittlich 300\u2013600 \u20ac pro Jahr.' },
                { title: 'Heizung richtig einstellen', desc: 'Jedes Grad weniger spart ca. 6% Heizkosten. 20\u00b0C im Wohnzimmer reichen meist aus.' },
                { title: 'Richtig l\u00fcften', desc: 'Sto\u00dfl\u00fcften statt Kippfenster: 5 Minuten bei weit ge\u00f6ffnetem Fenster, dann wieder schlie\u00dfen.' },
                { title: 'Heizk\u00f6rper freihalten', desc: 'M\u00f6bel und Vorh\u00e4nge vor Heizk\u00f6rpern verhindern eine effiziente W\u00e4rmeverteilung.' },
                { title: 'Fenster und T\u00fcren abdichten', desc: 'Undichte Stellen an Fenstern und T\u00fcren lassen W\u00e4rme entweichen. Dichtungsb\u00e4nder helfen sofort.' },
              ].map((tipp, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-energy-orange/20 text-sm font-bold text-orange-700">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tipp.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{tipp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-gray-500">
              Mehr Tipps finden Sie in unserem{' '}
              <Link href="/blog" className="text-brand-500 font-medium hover:text-brand-600">
                Blog
              </Link>.
            </p>
          </div>
        </section>

        {/* Zusammenfassung */}
        <section className="py-16 bg-brand-50">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900">Gaskosten senken &mdash; auf einen Blick</h2>
            <ul className="mt-6 space-y-3">
              {[
                'Bis zu 30% Ersparnis durch Gasanbieter-Wechsel',
                'Kostenloser und unverbindlicher Gasvergleich',
                'Kein Risiko: Gesetzlich garantierte Versorgung',
                'F\u00fcr Privathaushalte und Gewerbebetriebe',
                'Zus\u00e4tzlich sparen durch richtiges Heizen und L\u00fcften',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <CTASection
          title="Gaskosten jetzt senken"
          description="Laden Sie Ihre Gasabrechnung hoch und erfahren Sie in wenigen Minuten Ihr Sparpotenzial."
        />
      </main>
      <MarketingFooter />
    </>
  )
}
