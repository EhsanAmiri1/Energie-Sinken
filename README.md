# 🔋 Energiekosten Sinken — energiekosten-sinken.de

> Lead-Generierungs-Plattform für Energieberatung. Privat- und Gewerbekunden können ihre Jahresabrechnung hochladen, eine Sparschätzung erhalten und einen Beratungstermin buchen.

**Betreiber:** PAKA GmbH — Ehsan Amiri & Mark Schmidts

---

## 🚀 Lokales Setup (Schritt für Schritt)

### Voraussetzungen

Du brauchst auf deinem Computer:

1. **Node.js** (Version 18 oder höher)
   - Download: https://nodejs.org/ → "LTS" Version installieren
   - Prüfen: `node --version` im Terminal

2. **Git** 
   - Download: https://git-scm.com/
   - Prüfen: `git --version` im Terminal

3. **Ein Code-Editor**
   - Empfehlung: [VS Code](https://code.visualstudio.com/) (kostenlos)

### Installation

```bash
# 1. Repository klonen (nachdem du es auf GitHub erstellt hast)
git clone https://github.com/DEIN-USERNAME/energiekosten-sinken.git
cd energiekosten-sinken

# 2. Abhängigkeiten installieren
npm install

# 3. Umgebungsvariablen einrichten
cp .env.local.example .env.local
# → Öffne .env.local und trage deine Supabase-Daten ein

# 4. Entwicklungsserver starten
npm run dev
```

Dann öffne **http://localhost:3000** in deinem Browser.

### Supabase einrichten

1. Gehe zu https://supabase.com und erstelle ein neues Projekt
2. Kopiere die **URL** und den **Anon Key** aus Settings > API
3. Trage sie in `.env.local` ein
4. Führe die SQL-Migration aus:
   - Gehe im Supabase-Dashboard zu "SQL Editor"
   - Kopiere den Inhalt von `supabase/migrations/001_initial_schema.sql`
   - Klicke "Run"

---

## 📁 Projektstruktur

```
energiekosten-sinken/
├── app/                     # Next.js App Router (Seiten)
│   ├── page.tsx             # Startseite / Landingpage
│   ├── layout.tsx           # Root Layout (Fonts, Meta)
│   ├── globals.css          # Globale Stile
│   ├── (marketing)/         # Öffentliche Seiten
│   │   ├── impressum/
│   │   ├── datenschutz/
│   │   ├── privatkunden/
│   │   ├── gewerbe/
│   │   ├── strom-sparen/
│   │   ├── gas-sparen/
│   │   └── blog/
│   ├── (auth)/              # Login & Registrierung
│   │   ├── login/
│   │   └── registrieren/
│   ├── dashboard/           # Kunden-Bereich
│   │   ├── upload/
│   │   └── termin/
│   ├── admin/               # Admin-Dashboard
│   │   └── leads/
│   └── api/                 # API-Routes
├── components/              # Wiederverwendbare Komponenten
├── lib/                     # Hilfsfunktionen (Supabase, etc.)
├── types/                   # TypeScript Typdefinitionen
├── __tests__/               # Tests
├── supabase/                # Datenbank-Migrationen
└── public/                  # Statische Dateien (Bilder, etc.)
```

---

## 🧪 Tests ausführen

```bash
npm test              # Alle Tests einmal ausführen
npm run test:watch    # Tests bei Änderungen automatisch ausführen
```

---

## 🛠️ Tech-Stack

| Zweck | Technologie |
|-------|-------------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS |
| Backend/Auth | Supabase (PostgreSQL, Auth, Storage) |
| E-Mail/CRM | Brevo |
| Hosting | Vercel |
| DNS | Cloudflare |
| Tests | Jest, React Testing Library |

---

## 📝 Nächste Schritte

- [ ] GitHub Repository erstellen
- [ ] Supabase-Projekt erstellen
- [ ] Domain `energiekosten-sinken.de` kaufen
- [ ] Registrierungsformular implementieren
- [ ] Upload-Funktion bauen
- [ ] Terminbuchung implementieren
- [ ] Admin-Dashboard bauen
- [ ] Brevo E-Mail-Integration
- [ ] SEO-Landingpages befüllen
- [ ] Vercel Deployment einrichten
