// Brevo (Sendinblue) E-Mail Integration
// Verwendet die Brevo Transactional E-Mail API v3

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

interface EmailParams {
  to: { email: string; name?: string }[]
  subject: string
  htmlContent: string
  sender?: { email: string; name: string }
  attachment?: { content: string; name: string }[]
}

async function sendEmail(params: EmailParams) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    throw new Error('BREVO_API_KEY ist nicht konfiguriert')
  }

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: params.sender ?? {
        email: 'info@energiekosten-sinken.de',
        name: 'Energiekosten Sinken',
      },
      to: params.to,
      subject: params.subject,
      htmlContent: params.htmlContent,
      attachment: params.attachment,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Brevo API Fehler: ${response.status} — ${error}`)
  }

  return response.json()
}

// HTML-Basis-Template mit Brand-Design
function wrapInTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Energiekosten Sinken</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:24px;color:#ffffff;">
                <span style="color:#46c284;">Energiekosten</span> Sinken
              </h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                PAKA GmbH &middot; N&uuml;rnberg &middot;
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/impressum" style="color:#22a366;text-decoration:none;">Impressum</a> &middot;
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/datenschutz" style="color:#22a366;text-decoration:none;">Datenschutz</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// E-Mail an den Kunden nach Formular-Absendung
export async function sendKundenBestaetigung(nachname: string, email: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://energiekosten-sinken.de'

  const content = `
    <h2 style="margin:0 0 16px;font-size:22px;color:#111827;">
      Hallo Herr/Frau ${nachname},
    </h2>
    <p style="margin:0 0 16px;font-size:16px;color:#4b5563;line-height:1.6;">
      vielen Dank! Sie haben erfolgreich Ihre Daten eingegeben.
      Wir analysieren jetzt Ihre Energiekosten und finden das beste Angebot f&uuml;r Sie.
    </p>
    <p style="margin:0 0 24px;font-size:16px;color:#4b5563;line-height:1.6;">
      Um Ihre Ersparnis zu sehen und Ihren pers&ouml;nlichen Bereich einzurichten,
      klicken Sie auf den folgenden Button:
    </p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 24px;">
      <tr>
        <td style="background-color:#22a366;border-radius:12px;">
          <a href="${appUrl}/registrieren"
             style="display:inline-block;padding:16px 32px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">
            Ersparnis ansehen &rarr;
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:14px;color:#9ca3af;">
      Sie haben diese E-Mail erhalten, weil Sie eine Analyse auf energiekosten-sinken.de angefordert haben.
    </p>`

  return sendEmail({
    to: [{ email, name: `${nachname}` }],
    subject: 'Ihre Energiekosten-Analyse wurde gestartet',
    htmlContent: wrapInTemplate(content),
  })
}

// E-Mail an Admin mit allen Kundendaten
export async function sendAdminBenachrichtigung(data: {
  vorname: string
  nachname: string
  geburtsdatum?: string
  email: string
  telefon?: string
  zaehler_nummer?: string
  verbrauch_kwh?: string
  marktlokations_id?: string
  abrechnung_filename?: string
  abrechnungBase64?: string
}) {
  const rows = [
    ['Vorname', data.vorname],
    ['Nachname', data.nachname],
    ['Geburtsdatum', data.geburtsdatum || '—'],
    ['E-Mail', data.email],
    ['Telefon', data.telefon || '—'],
    ['Z&auml;hlernummer', data.zaehler_nummer || '—'],
    ['Verbrauch (kWh)', data.verbrauch_kwh || '—'],
    ['Marktlokations-ID', data.marktlokations_id || '—'],
    ['Abrechnung', data.abrechnung_filename || 'Keine Datei hochgeladen'],
  ]

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;white-space:nowrap;">${label}</td>
          <td style="padding:8px 12px;color:#4b5563;border-bottom:1px solid #e5e7eb;">${value}</td>
        </tr>`
    )
    .join('')

  const content = `
    <h2 style="margin:0 0 8px;font-size:22px;color:#111827;">
      Neue Analyse-Anfrage
    </h2>
    <p style="margin:0 0 24px;font-size:14px;color:#9ca3af;">
      Eingegangen am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
    <p style="margin:24px 0 0;font-size:14px;color:#6b7280;">
      ${data.abrechnung_filename ? 'Die Abrechnung ist als Anhang beigef&uuml;gt.' : ''}
    </p>`

  const attachment: { content: string; name: string }[] = []
  if (data.abrechnungBase64 && data.abrechnung_filename) {
    attachment.push({
      content: data.abrechnungBase64,
      name: data.abrechnung_filename,
    })
  }

  return sendEmail({
    to: [
      { email: 'ehsan.amiri.de1986@gmail.com', name: 'Ehsan Amiri' },
      { email: 'Hakhakmoh@outlook.de', name: 'Mohammad Hakhak' },
    ],
    subject: `Neue Analyse-Anfrage von ${data.vorname} ${data.nachname}`,
    htmlContent: wrapInTemplate(content),
    attachment: attachment.length > 0 ? attachment : undefined,
  })
}
