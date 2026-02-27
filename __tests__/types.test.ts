// Erster Test (TDD): Prüfe ob unsere Datentypen korrekt definiert sind

import type { Profile, Lead, EnergieDate, LeadStatus, KundenTyp } from '@/types'

describe('Datentypen', () => {
  test('Ein Profil hat alle Pflichtfelder', () => {
    const profil: Profile = {
      id: '123',
      vorname: 'Max',
      nachname: 'Mustermann',
      email: 'max@example.de',
      telefon: '0911 1234567',
      typ: 'privat',
      created_at: new Date().toISOString(),
    }

    expect(profil.vorname).toBe('Max')
    expect(profil.typ).toBe('privat')
    expect(profil.firma_name).toBeUndefined()
  })

  test('Ein Gewerbe-Profil hat einen Firmennamen', () => {
    const profil: Profile = {
      id: '456',
      vorname: 'Anna',
      nachname: 'Schmidt',
      email: 'anna@firma.de',
      telefon: '0911 9876543',
      typ: 'gewerbe',
      firma_name: 'Schmidt Bäckerei GmbH',
      created_at: new Date().toISOString(),
    }

    expect(profil.typ).toBe('gewerbe')
    expect(profil.firma_name).toBe('Schmidt Bäckerei GmbH')
  })

  test('Ein Lead hat den initialen Status "neu"', () => {
    const lead: Lead = {
      id: '789',
      user_id: '123',
      status: 'neu',
      zugewiesen_an: 'mark',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    expect(lead.status).toBe('neu')
    expect(lead.zugewiesen_an).toBe('mark')
  })

  test('Lead-Status hat alle gültigen Werte', () => {
    const alleStatus: LeadStatus[] = [
      'neu',
      'kontaktiert',
      'termin_gebucht',
      'beraten',
      'kunde_gewonnen',
      'verloren',
    ]

    expect(alleStatus).toHaveLength(6)
    expect(alleStatus).toContain('neu')
    expect(alleStatus).toContain('kunde_gewonnen')
  })

  test('Energiedaten enthalten Verbrauchsinformationen', () => {
    const daten: EnergieDate = {
      id: 'abc',
      user_id: '123',
      energie_typ: 'strom',
      aktueller_anbieter: 'Stadtwerke Nürnberg',
      jahresverbrauch_kwh: 3500,
      monatliche_kosten: 120,
      zaehler_nummer: 'DE-0012345678',
      created_at: new Date().toISOString(),
    }

    expect(daten.energie_typ).toBe('strom')
    expect(daten.jahresverbrauch_kwh).toBe(3500)
    expect(daten.aktueller_anbieter).toBe('Stadtwerke Nürnberg')
  })
})
