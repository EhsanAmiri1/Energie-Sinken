// ===== Typen für energiekosten-sinken.de =====
// Hier definieren wir die Datenstrukturen der App

// Kundentyp: Privat oder Gewerbe
export type KundenTyp = 'privat' | 'gewerbe'

// Energieart: Strom oder Gas
export type EnergieTyp = 'strom' | 'gas'

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
