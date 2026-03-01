import Link from 'next/link'
import {
  ArrowRight, Phone, Mail, ShieldCheck,
} from 'lucide-react'

// ===== Header für Marketing-Seiten =====
export function MarketingHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-energy-dark/80 backdrop-blur-lg">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          <span className="text-brand-400">Energiekosten</span> Sinken
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/privatkunden" className="text-sm text-gray-300 hover:text-white transition-colors">
            Privatkunden
          </Link>
          <Link href="/gewerbe" className="text-sm text-gray-300 hover:text-white transition-colors">
            Gewerbe
          </Link>
          <Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/analyse" className="btn-primary py-2 px-4 text-sm">
            Kostenlos starten
          </Link>
        </nav>
      </div>
    </header>
  )
}

// ===== Footer für Marketing-Seiten =====
export function MarketingFooter() {
  return (
    <footer className="bg-gray-900 py-16 text-gray-400">
      <div className="container-tight">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-xl font-bold text-white">
              <span className="text-brand-400">Energiekosten</span> Sinken
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              PAKA GmbH &mdash; Ihr Partner f&uuml;r niedrigere Strom- und Gaskosten.
              Wir beraten Privatkunden und Unternehmen in ganz Deutschland.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-400" />
                <span>Telefon auf Anfrage</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400" />
                <span>info@energiekosten-sinken.de</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white">Leistungen</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/privatkunden" className="hover:text-white transition-colors">Privatkunden</Link></li>
              <li><Link href="/gewerbe" className="hover:text-white transition-colors">Gewerbekunden</Link></li>
              <li><Link href="/strom-sparen" className="hover:text-white transition-colors">Strom sparen</Link></li>
              <li><Link href="/gas-sparen" className="hover:text-white transition-colors">Gas sparen</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog &amp; Tipps</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Rechtliches</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} PAKA GmbH. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}

// ===== CTA Section =====
export function CTASection({ title, description }: { title?: string; description?: string }) {
  return (
    <section className="py-24 bg-energy-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/50 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-3xl" />
      <div className="container-tight relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title || 'Bereit, Ihre Energiekosten zu senken?'}
        </h2>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          {description || 'Laden Sie jetzt Ihre Jahresabrechnung hoch und erfahren Sie in wenigen Minuten, wie viel Sie sparen k\u00f6nnen. Kostenlos und unverbindlich.'}
        </p>
        <Link href="/analyse" className="btn-primary mt-10 text-lg px-10 py-4">
          Jetzt kostenlos pr&uuml;fen
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

// ===== Hero für Unterseiten =====
export function PageHero({
  badge,
  title,
  titleHighlight,
  description,
}: {
  badge: string
  title: string
  titleHighlight: string
  description: string
}) {
  return (
    <section className="relative overflow-hidden bg-energy-dark pt-28 pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl" />
      <div className="container-tight relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300">
          <ShieldCheck className="h-4 w-4" />
          {badge}
        </div>
        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}{' '}
          <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed">
          {description}
        </p>
        <div className="mt-8">
          <Link href="/analyse" className="btn-primary text-lg px-8 py-4">
            Jetzt kostenlos pr&uuml;fen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ===== FAQ Section =====
export function FAQSection({ faqs }: { faqs: { frage: string; antwort: string }[] }) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
          H&auml;ufig gestellte Fragen
        </h2>
        <div className="mt-12 mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">{faq.frage}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.antwort}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
