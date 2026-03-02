// ===== Typen für energiekosten-sinken.de =====
// Hier definieren wir die Datenstrukturen der App

// Kundentyp: Privat oder Gewerbe
export type KundenTyp = 'privat' | 'gewerbe'

// Energieart: Strom oder Gas
export type EnergieTyp = 'strom' | 'gas'

// Anfrage-Typ: Gast (ohne Konto) oder Registriert (mit Konto)
export type AnfrageTyp = 'gast' | 'registriert'

// Lead-Status im CRM
export type LeadStatus =
  | 'neu'           // Gerade angemeldet
  | 'kontaktiert'   // Erste Kontaktaufnahme
  | 'termin_gebucht' // Beratungstermin steht
  | 'beraten'       // Gespräch hat stattgefunden
  | 'kunde_gewonnen' // Vertrag abgeschlossen
  | 'verloren'      // Kein Interesse

// Termin-Status
export type TerminStatus = 'gebucht' | 'durchgeführt' | 'abgesagt'

// Zuständiger Berater
export type Berater = 'ehsan' | 'mark'

// ===== Datenbank-Tabellen =====

export interface Profile {
  id: string
  vorname: string
  nachname: string
  email: string
  telefon: string
  typ: KundenTyp
  firma_name?: string | null
  created_at: string
}

export interface EnergieDate {
  id: string
  user_id: string
  energie_typ: EnergieTyp
  aktueller_anbieter: string
  jahresverbrauch_kwh: number
  monatliche_kosten?: number | null
  zaehler_nummer?: string | null
  created_at: string
}

export interface Dokument {
  id: string
  user_id: string
  file_path: string
  file_name: string
  file_type: 'jahresabrechnung'
  uploaded_at: string
}

export interface Termin {
  id: string
  user_id: string
  termin_datum: string
  termin_zeit: string
  status: TerminStatus
  notizen?: string | null
  created_at: string
}

// Analyse-Anfrage (Gast oder Registriert)
export interface AnalyseAnfrage {
  id: string
  vorname: string
  nachname: string
  geburtsdatum?: string | null
  email: string
  telefon?: string | null
  energie_typ: EnergieTyp
  kunden_typ: KundenTyp
  zaehler_nummer?: string | null
  verbrauch_kwh?: number | null
  marktlokations_id?: string | null
  abrechnung_path?: string | null
  abrechnung_filename?: string | null
  ergebnis_path?: string | null
  ergebnis_filename?: string | null
  ersparnis_euro?: number | null
  user_id?: string | null
  anfrage_typ: AnfrageTyp
  status: 'neu' | 'in_bearbeitung' | 'angebot_geschickt' | 'abgeschlossen'
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  user_id: string
  status: LeadStatus
  zugewiesen_an: Berater
  notizen?: string | null
  created_at: string
  updated_at: string
  // Verknüpfte Daten (über JOINs)
  profile?: Profile
  energie_daten?: EnergieDate
  dokumente?: Dokument[]
  termine?: Termin[]
}
