# 📧 Email-integration med Resend

## Översikt

Just nu är formulärsystemet byggt och klart – **FÖRUTOM** att mailen faktiskt skickas. När någon fyller i ett formulär så:

1. ✅ Formuläret valideras
2. ✅ Data skickas till `/api/contact`
3. ✅ API:et vet exakt vilket email som ska användas
4. ❌ **Men mailet skickas inte** – det loggas bara till konsolen

**Lösning:** Vi använder Resend.com för att skicka mail. Total tid: ~15 minuter.

## Hur det fungerar just nu

I filen `/app/api/contact/route.ts` på rad 45-51:

```typescript
// TODO: Implement actual email sending
console.log('To:', config.email)
console.log('Subject:', config.subject)
console.log('Content:', emailContent)

return NextResponse.json({
  success: true,
  message: 'Meddelandet har skickats',
  email: config.email,
})
```

**Systemet vet redan vart mailet ska:**
- IT-support → `servicedesk@stjarnafyrkant.se`
- Fordonsteknik → `verkstad.umea@stjarnafyrkant.se`
- Företagstelefoni → `sebastian.bjuhr@stjarnafyrkant.se`
- Osv...

**Men mailet skickas inte på riktigt ännu!**

---

## Steg-för-steg: Koppla på Resend

**Varför Resend?**
- ✅ Enklast att sätta upp (15 minuter)
- ✅ Gratis upp till 3000 mail/månad
- ✅ Perfekt för svenska företag
- ✅ Bra UI för att se skickade mail
- ✅ Snabb och pålitlig

#### 1. Skapa konto på Resend
- Gå till https://resend.com
- Klicka "Sign Up"
- Verifiera email

#### 2. Skaffa API-nyckel
- Logga in på Resend
- Gå till "API Keys" i menyn
- Klicka "Create API Key"
- Ge den ett namn (t.ex. "StjärnaFyrkant Production")
- **Kopiera nyckeln** (visas bara en gång!)

#### 3. Lägg till API-nyckeln i projektet
Skapa/uppdatera filen `.env.local` i projektets root:

```bash
RESEND_API_KEY=re_dinNyckelHär123456789
```

#### 4. Installera Resend-paketet
Kör i terminalen:

```bash
npm install resend
```

#### 5. Uppdatera API-filen
Öppna `/app/api/contact/route.ts` och ersätt rad 1-7 med:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getFormConfig } from '@/lib/form-config'
import type { FormType } from '@/lib/form-config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
```

Ersätt sedan rad 45-51 (TODO-sektionen) med:

```typescript
try {
  const { data, error } = await resend.emails.send({
    from: 'StjärnaFyrkant <noreply@stjarnafyrkant.se>',
    to: [config.email],
    subject: config.subject,
    text: emailContent,
    html: emailContent.replace(/\n/g, '<br>'),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Kunde inte skicka e-post' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Meddelandet har skickats',
    email: config.email,
  })
} catch (error) {
  console.error('Email send error:', error)
  return NextResponse.json(
    { error: 'Ett fel uppstod vid skickande' },
    { status: 500 }
  )
}
```

#### 6. Verifiera domän (Viktigt!)
- I Resend-dashboarden, gå till "Domains"
- Klicka "Add Domain"
- Skriv in `stjarnafyrkant.se`
- Följ instruktionerna för att lägga till DNS-records hos er domänleverantör
- Vänta på verifiering (tar 5-30 min)

**🎉 KLART!** Nu skickas mail på riktigt till rätt personer.

---

## Testa att det fungerar

1. **Starta dev-servern:**
```bash
npm run dev
```

2. **Gå till hemsidan:** http://localhost:3000

3. **Klicka på "Hör av dig"**

4. **Fyll i formuläret** och skicka

5. **Kolla emailen** på den adress ni valde i dropdownen!

---

## Felsökning

### Problem: "Kunde inte skicka e-post"
- Kolla att API-nyckeln är rätt i `.env.local`
- Starta om servern efter att du lagt till `.env.local`
- Kolla konsolen för felmeddelanden

### Problem: Mail hamnar i skräppost
- Verifiera domänen i Resend/SendGrid
- Lägg till SPF och DKIM-records i DNS

### Problem: "from" email funkar inte
- Domänen måste vara verifierad först
- Använd `noreply@stjarnafyrkant.se` som avsändare

---

## Säkerhet

### Miljövariabler i produktion
När ni deployar till produktion (t.ex. Vercel):

1. Gå till projektets Settings
2. Environment Variables
3. Lägg till `RESEND_API_KEY` (eller motsvarande)
4. Välj "Production"
5. Spara

**VIKTIGT:** Lägg ALDRIG API-nycklar direkt i koden!

### Rate limiting
För att undvika spam, lägg till rate limiting:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Se `/docs/modules/form-system.md` för mer info.

---

---

## Behöver ni hjälp?

1. **Resend dokumentation:**
   - Docs: https://resend.com/docs
   - Support: https://resend.com/support

2. **Kolla console.log:**
   ```bash
   npm run dev
   ```
   Allt som loggas visas i terminalen

3. **Testa med test-mail först:**
   Ändra `config.email` till din egna email för att testa innan ni går live

---

## Checklista

- [ ] Skapa konto på Resend.com
- [ ] Få API-nyckel från Resend
- [ ] Installera: `npm install resend`
- [ ] Lägg till API-nyckel i `.env.local`
- [ ] Uppdatera `/app/api/contact/route.ts` med Resend-kod
- [ ] Verifiera domän `stjarnafyrkant.se` i Resend
- [ ] Testa skicka ett formulär
- [ ] Kolla att mailet kom fram till rätt person
- [ ] Lägg till `RESEND_API_KEY` i produktion (Vercel/hosting)
- [ ] Testa i produktion

**När denna checklista är klar har ni ett fullt fungerande formulärsystem! 🎉**

---

## Sammanfattning

- ⏱️ **Total tid:** ~15 minuter
- 💰 **Kostnad:** Gratis (upp till 3000 mail/mån)
- 🔧 **Svårighetsgrad:** Lätt
- 📧 **Resultat:** Alla formulär skickar mail till rätt avdelning automatiskt

**Allt är redan byggt och klart – ni behöver bara koppla på Resend så funkar det! 🚀**
