import Link from 'next/link'
import { 
  Zap, Flame, TrendingDown, Upload, Calendar, ShieldCheck,
  ArrowRight, CheckCircle2, Building2, Home, Phone, Mail
} from 'lucide-react'

// ===== Hero Section =====
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-energy-dark pt-20 pb-32">
      {/* Hintergrund-Effekt: Grüner Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-energy-dark to-energy-dark" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-energy-yellow/5 blur-3xl" />
      
      <div className="container-tight relative z-10">
        {/* Vertrauens-Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300">
          <ShieldCheck className="h-4 w-4" />
          Unverbindlich & kostenlos — Für Privat & Gewerbe
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Senken Sie Ihre{' '}
          <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
            Energiekosten
          </span>{' '}
          um bis zu{' '}
          <span className="bg-gradient-to-r from-energy-yellow to-energy-orange bg-clip-text text-transparent">
            30%
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed">
          Ob Haushalt oder Unternehmen — wir analysieren Ihre Strom- und Gaskosten 
          und finden den optimalen Tarif für Sie. Einfach Abrechnung hochladen, 
          Termin buchen, sparen.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/registrieren" className="btn-primary text-lg px-8 py-4">
            Jetzt kostenlos analysieren
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a href="#so-funktionierts" className="btn-secondary border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
            So funktioniert&apos;s
          </a>
        </div>

        {/* Trust-Zahlen */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
          <div>
            <div className="text-3xl font-bold text-brand-400">20-30%</div>
            <div className="mt-1 text-sm text-gray-400">Durchschnittliche Ersparnis</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-energy-yellow">3 Min</div>
            <div className="mt-1 text-sm text-gray-400">Anmeldung dauert nur</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="mt-1 text-sm text-gray-400">Kostenlos & unverbindlich</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== So funktioniert's =====
function ProcessSection() {
  const steps = [
    {
      icon: Upload,
      title: 'Abrechnung hochladen',
      description: 'Laden Sie Ihre aktuelle Jahresabrechnung für Strom oder Gas hoch. Ein Foto oder PDF genügt.',
      color: 'text-brand-500',
      bg: 'bg-brand-50',
    },
    {
      icon: TrendingDown,
      title: 'Ersparnis erfahren',
      description: 'Wir vergleichen für Sie die besten Angebote und zeigen Ihnen, wie viel Sie ungefähr sparen können.',
      color: 'text-energy-yellow',
      bg: 'bg-amber-50',
    },
    {
      icon: Calendar,
      title: 'Termin buchen',
      description: 'Buchen Sie direkt einen kostenlosen Beratungstermin. Wir erklären Ihnen alles persönlich.',
      color: 'text-energy-orange',
      bg: 'bg-orange-50',
    },
  ]

  return (
    <section id="so-funktionierts" className="py-24 bg-white">
      <div className="container-tight">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            So einfach senken Sie Ihre Energiekosten
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            In nur drei Schritten zu niedrigeren Strom- und Gaskosten — 
            ganz ohne Aufwand für Sie.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Schritt-Nummer */}
              <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                {i + 1}
              </div>
              <div className={`inline-flex rounded-xl ${step.bg} p-3`}>
                <step.icon className={`h-6 w-6 ${step.color}`} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== Zielgruppen: Privat & Gewerbe =====
function AudienceSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-tight">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Für wen ist unsere Beratung?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Egal ob Privathaushalt oder Unternehmen — wir helfen Ihnen, weniger zu zahlen.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Privatkunden */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:border-brand-300 transition-colors">
            <div className="inline-flex rounded-xl bg-brand-50 p-3">
              <Home className="h-7 w-7 text-brand-500" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">Privatkunden</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Sie zahlen zu viel für Strom oder Gas? Wir finden den günstigsten 
              Tarif für Ihren Haushalt — ohne versteckte Kosten.
            </p>
            <ul className="mt-6 space-y-3">
              {['Stromkosten senken', 'Gaskosten reduzieren', 'Anbieterwechsel ohne Aufwand', 'Keine Versorgungslücke'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/privatkunden" className="btn-primary mt-8 w-full">
              Mehr erfahren
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Gewerbekunden */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:border-energy-orange/50 transition-colors">
            <div className="inline-flex rounded-xl bg-orange-50 p-3">
              <Building2 className="h-7 w-7 text-energy-orange" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">Gewerbekunden</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Für kleine, mittlere und große Betriebe: Wir optimieren Ihre 
              Energieverträge und senken Ihre Betriebskosten nachhaltig.
            </p>
            <ul className="mt-6 space-y-3">
              {['Betriebskosten senken', 'Mehrere Zähler optimieren', 'Individuelle Gewerberabatte', 'Persönliche Betreuung'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-energy-orange" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/gewerbe" className="inline-flex items-center justify-center rounded-xl bg-energy-orange px-6 py-3 text-base font-semibold text-white shadow-lg shadow-energy-orange/25 transition-all duration-200 hover:bg-orange-600 active:scale-[0.98] mt-8 w-full">
              Mehr erfahren
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== Energiearten: Strom & Gas =====
function EnergyTypeSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-tight">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Strom & Gas — wir optimieren beides
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Link href="/strom-sparen" className="group rounded-2xl bg-gradient-to-br from-energy-yellow/10 to-amber-50 p-8 border border-amber-100 hover:shadow-lg transition-all">
            <Zap className="h-10 w-10 text-energy-yellow" />
            <h3 className="mt-4 text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
              Stromkosten senken
            </h3>
            <p className="mt-3 text-gray-600">
              Vergleichen Sie Stromanbieter und sparen Sie bis zu 30% bei Ihren 
              jährlichen Stromkosten. Einfach und ohne Risiko.
            </p>
            <span className="mt-4 inline-flex items-center text-amber-700 font-medium">
              Jetzt Strom vergleichen <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link href="/gas-sparen" className="group rounded-2xl bg-gradient-to-br from-energy-orange/10 to-orange-50 p-8 border border-orange-100 hover:shadow-lg transition-all">
            <Flame className="h-10 w-10 text-energy-orange" />
            <h3 className="mt-4 text-2xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
              Gaskosten senken
            </h3>
            <p className="mt-3 text-gray-600">
              Auch bei Gas gibt es erhebliche Einsparpotenziale. Wir finden 
              den besten Gastarif für Ihren Verbrauch.
            </p>
            <span className="mt-4 inline-flex items-center text-orange-700 font-medium">
              Jetzt Gas vergleichen <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ===== CTA Section =====
function CTASection() {
  return (
    <section className="py-24 bg-energy-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/50 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-3xl" />
      
      <div className="container-tight relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Bereit, Ihre Energiekosten zu senken?
        </h2>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          Laden Sie jetzt Ihre Jahresabrechnung hoch und erfahren Sie in wenigen 
          Minuten, wie viel Sie sparen können. Kostenlos und unverbindlich.
        </p>
        <Link href="/registrieren" className="btn-primary mt-10 text-lg px-10 py-4">
          Kostenlose Analyse starten
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

// ===== Footer =====
function Footer() {
  return (
    <footer className="bg-gray-900 py-16 text-gray-400">
      <div className="container-tight">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Firma */}
          <div className="md:col-span-2">
            <div className="text-xl font-bold text-white">
              <span className="text-brand-400">Energiekosten</span> Sinken
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              PAKA GmbH — Ihr Partner für niedrigere Strom- und Gaskosten. 
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

          {/* Leistungen */}
          <div>
            <h4 className="font-semibold text-white">Leistungen</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/privatkunden" className="hover:text-white transition-colors">Privatkunden</Link></li>
              <li><Link href="/gewerbe" className="hover:text-white transition-colors">Gewerbekunden</Link></li>
              <li><Link href="/strom-sparen" className="hover:text-white transition-colors">Strom sparen</Link></li>
              <li><Link href="/gas-sparen" className="hover:text-white transition-colors">Gas sparen</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Tipps</Link></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="font-semibold text-white">Rechtliches</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          © {new Date().getFullYear()} PAKA GmbH. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}

// ===== Header / Navigation =====
function Header() {
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
          <Link href="/registrieren" className="btn-primary py-2 px-4 text-sm">
            Kostenlos starten
          </Link>
        </nav>
      </div>
    </header>
  )
}

// ===== Hauptseite =====
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProcessSection />
        <AudienceSection />
        <EnergyTypeSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
