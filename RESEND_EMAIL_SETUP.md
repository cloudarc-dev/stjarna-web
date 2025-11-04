# 📧 Resend Email Setup Guide

## Översikt

Alla kontaktformulär på StjärnaFyrkant Västerbotten webbplats skickar nu email via **Resend API**. Detta dokument beskriver implementationen och hur man verifierar att allt fungerar.

---

## ✅ Implementerad Funktionalitet

### **Email-flöde:**

```
Användare fyller i formulär
         ↓
Frontend skickar till /api/contact
         ↓
API sparar till Supabase database
         ↓
API skickar email via Resend
         ↓
Mottagare får professionell HTML-email
```

### **Email Features:**

- ✅ Professional HTML template med StjärnaFyrkant branding
- ✅ Gradient header (blå gradient) med formulärtyp
- ✅ Tabell-layout för formulärdata
- ✅ Plain text fallback för gamla email-klienter
- ✅ Reply-to satt till kundens email-adress
- ✅ Automatisk routing till rätt mottagare baserat på formType
- ✅ Graceful error handling (email-fel stoppar inte formuläret)

---

## 🔧 Teknisk Implementation

### **Fil:** [app/api/contact/route.ts](app/api/contact/route.ts)

**Imports:**
```typescript
import { Resend } from 'resend'
```

**Email-sending kod (rad 70-88):**
```typescript
const resend = new Resend(process.env.RESEND_API_KEY)

try {
  const emailResult = await resend.emails.send({
    from: 'StjärnaFyrkant Västerbotten <noreply@stjarnafyrkant.se>',
    to: config.email,
    subject: config.subject,
    text: emailContent,
    html: htmlContent,
    replyTo: data.email,
  })

  if (emailResult.data) {
    console.log('✅ Email sent successfully:', emailResult.data.id)
  } else if (emailResult.error) {
    console.error('❌ Email sending failed:', emailResult.error)
  }
} catch (emailError) {
  console.error('❌ Email sending failed:', emailError)
  // Don't fail the request - data is already saved to database
}
```

### **HTML Email Template:**

Funktionen `buildHtmlEmailContent()` genererar en professionell HTML-email med:

**Header:**
- Gradient bakgrund (blå #1e3a8a → #3b82f6)
- StjärnaFyrkant Västerbotten logotyp
- Formulärtyp som underrubrik

**Body:**
- Tabell med alla formulärfält
- Formaterad data med labels
- Responsive design (600px bredd)

**Footer:**
- Instruktioner om att svara kunden
- Källinformation (skickat via stjarnafyrkant.se)

**Exempel HTML-struktur:**
```html
<!DOCTYPE html>
<html lang="sv">
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...">
  <table width="600" style="background: #ffffff; border-radius: 8px;">
    <tr>
      <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
        <h1>StjärnaFyrkant Västerbotten</h1>
        <p>IT-support</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <table>
          <tr>
            <td>Namn</td>
            <td>Anna Andersson</td>
          </tr>
          <!-- ... fler fält -->
        </table>
        <p>För att svara kunden, klicka på "Svara" eller skicka till: anna@acme.se</p>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 🌐 Resend Konfiguration

### **Environment Variables:**

Följande miljövariabel måste finnas i Vercel:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Var hittar jag API-nyckeln?**
1. Logga in på [resend.com](https://resend.com)
2. Gå till "API Keys"
3. Skapa ny API-nyckel eller använd befintlig
4. Kopiera nyckeln (börjar med `re_`)
5. Lägg till i Vercel: Settings → Environment Variables

### **Domänverifiering:**

För att skicka email från `noreply@stjarnafyrkant.se` måste domänen vara verifierad i Resend.

**Steg för domänverifiering:**
1. Gå till Resend Dashboard → Domains
2. Lägg till `stjarnafyrkant.se`
3. Lägg till DNS-records (SPF, DKIM, DMARC) hos din DNS-provider
4. Vänta på verifiering (kan ta några minuter)
5. Status ska bli "Verified" ✅

**DNS Records som behövs:**
```
TXT  @  v=spf1 include:_spf.resend.com ~all
TXT  resend._domainkey  [DKIM-nyckel från Resend]
TXT  _dmarc  v=DMARC1; p=none; ...
```

---

## 📧 Email Routing

Varje formulärtyp skickar till sin specifika mottagare (konfigurerat i [lib/form-config.ts](lib/form-config.ts)):

| FormType | Email Destination |
|----------|------------------|
| `general` | order.vb@stjarnafyrkant.se |
| `it-support` | servicedesk@stjarnafyrkant.se |
| `telefoni-support` | servicedesk@stjarnafyrkant.se |
| `alkolaas` | verkstad.umea@stjarnafyrkant.se |
| `fordon` | verkstad.umea@stjarnafyrkant.se |
| `komradio` | verkstad.umea@stjarnafyrkant.se |
| `service-reparation` | service.umea@stjarnafyrkant.se |
| `order` | order.vb@stjarnafyrkant.se |
| `foretagstelefoni` | sebastian.bjuhr@stjarnafyrkant.se |
| `projekt` | sebastian.bjuhr@stjarnafyrkant.se |
| `jobbansoekan` | ansokan.vb@stjarnafyrkant.se |

---

## 🧪 Testning

### **1. Test i Development (localhost):**

**Förberedelser:**
```bash
# Lägg till RESEND_API_KEY i .env.local
echo "RESEND_API_KEY=re_your_api_key_here" >> .env.local

# Starta development server
npm run dev
```

**Test formulär:**
1. Gå till http://localhost:3000/it
2. Fyll i IT-support formuläret
3. Klicka "Skicka"
4. Kontrollera:
   - Success-meddelande visas ✅
   - Email kommer till servicedesk@stjarnafyrkant.se
   - Reply-to är satt till din testmail
   - Data finns i Supabase contact_submissions

**Kontrollera logs:**
```bash
# I terminal där dev server körs:
✅ Contact submission saved to database: [UUID]
✅ Email sent successfully: [Resend ID]
```

### **2. Test i Production (Vercel):**

**Förberedelser:**
1. Verifiera att RESEND_API_KEY finns i Vercel env vars
2. Verifiera att stjarnafyrkant.se är verifierad i Resend
3. Deploy är klar och live

**Test olika formulär:**

**IT-Support (servicedesk@):**
- Gå till https://stjarnafyrkant.se/it
- Fyll i formulär → servicedesk@stjarnafyrkant.se ska få mail

**Kontakt (order.vb@):**
- Gå till https://stjarnafyrkant.se/kontakt
- Fyll i formulär → order.vb@stjarnafyrkant.se ska få mail

**Jobbansökan (ansokan.vb@):**
- Gå till https://stjarnafyrkant.se/karriar
- Fyll i formulär → ansokan.vb@stjarnafyrkant.se ska få mail

**Företagstelefoni (sebastian.bjuhr@):**
- Gå till https://stjarnafyrkant.se/foretagstelefoni
- Fyll i formulär → sebastian.bjuhr@stjarnafyrkant.se ska få mail

### **3. Verifiera Email-innehåll:**

**Kontrollera att email har:**
- ✅ Korrekt subject line (t.ex. "IT-support förfrågan")
- ✅ Professional HTML-design med gradient header
- ✅ Alla formulärfält visas korrekt i tabell
- ✅ Reply-to är satt till kundens email
- ✅ Footer med källinformation

**Test reply-to:**
1. Ta emot email i din inbox (t.ex. servicedesk@)
2. Klicka "Svara"
3. Mottagaren ska vara kundens email-adress (INTE noreply@)

---

## 🔍 Troubleshooting

### **Problem: Email skickas inte**

**1. Kontrollera API-nyckel:**
```bash
# I Vercel dashboard
Settings → Environment Variables → RESEND_API_KEY
```

**2. Kontrollera domänverifiering:**
- Gå till Resend Dashboard → Domains
- Status för stjarnafyrkant.se ska vara "Verified"
- Om inte: Kontrollera DNS-records

**3. Kontrollera Vercel logs:**
```bash
# I Vercel dashboard
Deployments → [Latest] → Function Logs

# Leta efter:
❌ Email sending failed: ...
```

**4. Kontrollera Resend logs:**
- Gå till Resend Dashboard → Logs
- Leta efter failed emails
- Kontrollera felmeddelanden

### **Problem: Email går till spam**

**Lösningar:**
1. Verifiera SPF, DKIM, DMARC records
2. Använd verifierad domän (stjarnafyrkant.se)
3. Testa med mail-tester.com
4. Varma upp din domän genom att skicka lite mail först

### **Problem: Reply-to fungerar inte**

**Kontrollera:**
1. Att kundens email är giltig
2. Att `replyTo` är satt i API-anropet
3. Email-klientens inställningar

---

## 📊 Monitoring

### **Resend Dashboard:**

**Användbara metrics:**
- Total emails sent
- Delivery rate
- Bounce rate
- Open rate (om aktiverat)

**Var hittar jag statistik?**
1. Logga in på resend.com
2. Gå till "Analytics"
3. Filtrera på datum och email-typ

### **Vercel Logs:**

**Kontrollera API-anrop:**
```bash
# I Vercel dashboard
Deployments → Function Logs

# Filtrera:
/api/contact

# Leta efter:
✅ Email sent successfully: [ID]
❌ Email sending failed: [Error]
```

### **Supabase Database:**

**Kontrollera sparade submissions:**
```sql
-- Alla submissions senaste veckan
SELECT * FROM contact_submissions
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Submissions per form_type
SELECT form_type, COUNT(*) as total
FROM contact_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY form_type
ORDER BY total DESC;
```

---

## 🚀 Deployment Checklist

### **Före Launch:**

- [ ] RESEND_API_KEY är satt i Vercel production environment
- [ ] stjarnafyrkant.se är verifierad i Resend
- [ ] DNS-records (SPF, DKIM, DMARC) är korrekt konfigurerade
- [ ] Test email skickad från varje formulärtyp
- [ ] Reply-to testat och fungerar
- [ ] Alla email-destinationer är korrekta (se lib/form-config.ts)
- [ ] Supabase sparar formulärdata korrekt
- [ ] Email-template ser professionell ut på desktop och mobil
- [ ] Plain text fallback fungerar

### **Efter Launch:**

- [ ] Övervaka Resend Dashboard för delivery rate
- [ ] Kontrollera Vercel logs för email-fel
- [ ] Verifiera att alla mottagare får sina email
- [ ] Testa reply-to från riktiga kundmail
- [ ] Sätt upp alerts för failed emails i Resend

---

## 💡 Best Practices

### **Email Sending:**

1. **Alltid spara till databas först** - Email kan misslyckas, men data finns i Supabase
2. **Graceful error handling** - Email-fel ska inte stoppa formuläret
3. **Log all emails** - Använd console.log för att spåra skickade emails
4. **Test olika email-klienter** - Gmail, Outlook, Apple Mail, etc.

### **Email Content:**

1. **Använd plain text fallback** - Vissa klienter stöder inte HTML
2. **Inline CSS only** - Externa stylesheets fungerar inte i email
3. **Table-layout** - Mest kompatibel över email-klienter
4. **Mobile-friendly** - Max 600px bredd för bästa resultat

### **Security:**

1. **API-nyckel endast server-side** - Aldrig exponera RESEND_API_KEY till klient
2. **Validera email-adresser** - Kontrollera att emails är giltiga
3. **Rate limiting** - Överväg att begränsa antal emails per IP/user
4. **Sanitize input** - Skydda mot XSS i email-innehåll

---

## 📚 Relaterade filer

| Fil | Beskrivning |
|-----|-------------|
| [app/api/contact/route.ts](app/api/contact/route.ts) | API endpoint med Resend implementation |
| [lib/form-config.ts](lib/form-config.ts) | Email-destinationer för varje formType |
| [COMPONENT_DATABASE_MAPPING.md](COMPONENT_DATABASE_MAPPING.md) | Komplett guide för form → DB → Email flöde |
| [FORMS_MAPPING.md](FORMS_MAPPING.md) | Översikt av alla 11 formulärtyper |

---

**Senast uppdaterad:** 2025-01-04
**Version:** 1.0
**Status:** ✅ Fully implemented and ready for production
