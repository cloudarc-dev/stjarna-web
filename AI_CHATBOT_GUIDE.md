# 🤖 AI Chatbot - Återaktiveringsguide

## Nuvarande Status
**Version:** FAQ-baserad chatbot (ingen AI)
**Kostnad:** 0 kr/månad
**API:** Ingen extern API används

---

## Återaktivera AI-Chatbot (Fas 2)

### 1. **Välj AI-Provider**

#### **Alternativ A: OpenAI (Rekommenderat)**
- **API:** OpenAI GPT-4 eller GPT-3.5-turbo
- **Kostnad:** ~$0.03/1000 tokens (GPT-4-turbo) eller ~$0.002/1000 tokens (GPT-3.5)
- **Fördel:** Bäst kvalitet, svensk support, pålitlig
- **Nackdel:** Dyrare än alternativ

**Setup:**
```bash
npm install openai
```

`.env.local`:
```env
OPENAI_API_KEY=sk-...your-key-here...
```

#### **Alternativ B: Anthropic Claude**
- **API:** Claude 3 Opus/Sonnet
- **Kostnad:** ~$0.015/1000 tokens
- **Fördel:** Bättre på svenska, säkrare
- **Nackdel:** Nyare, mindre community support

**Setup:**
```bash
npm install @anthropic-ai/sdk
```

`.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

#### **Alternativ C: Azure OpenAI**
- **API:** Azure-hosted GPT-4
- **Kostnad:** Samma som OpenAI, men faktureras via Azure
- **Fördel:** Svensk datacenter, GDPR-compliant
- **Nackdel:** Kräver Azure-konto

---

### 2. **Aktivera AI i Chatbot**

#### **Steg 1: Skapa/Återställ `/app/api/chat/route.ts`**

```typescript
import { OpenAI } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Initiera OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// System prompt - definierar AI:ns beteende
const systemPrompt = `Du är en hjälpsam AI-assistent för StjärnaFyrkant Västerbotten.

FÖRETAGSINFORMATION:
- StjärnaFyrkant är ett IT- och fordonsteknikföretag i Västerbotten
- Tjänster: IT-support, fordonsteknik, kommunikationslösningar, företagstelefoni
- Kontor: Umeå och Skellefteå
- Telefon: 090-70 44 70
- E-post: umea@stjarnafyrkant.se
- Öppettider: Mån-Fre 08:00-17:00

TJÄNSTER:
1. IT-tjänster: Support, Microsoft 365, säkerhet, nätverk
2. Fordonsteknik: Alkolås (1-2h installation), taxiutrustning, fordonsinredning
3. Kommunikation: Komradio, GPS, inomhustäckning
4. Företagstelefoni: Mobiltelefoner, växel, Microsoft Teams

VANLIGA FRÅGOR:
- IT-support kostar från 500 kr/användare/månad
- Alkolås installation: 1-2 timmar, drop-in 08:00-15:00
- Taxiutrustning: från 25 000 kr exkl. moms
- Verkstäder i Umeå och Skellefteå

TONE OF VOICE:
- Professionell men vänlig
- Använd svenska
- Var koncis (2-3 meningar)
- Hänvisa alltid till relevanta sidor eller kontaktinfo
- Om osäker: rekommendera att ringa 090-70 44 70

Svara ALDRIG på frågor som inte rör StjärnaFyrkant eller våra tjänster.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Anropa OpenAI med streaming
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // eller 'gpt-3.5-turbo' för billigare
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 300, // Begränsa för att hålla nere kostnaden
    })

    // Konvertera till stream
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)

  } catch (error) {
    console.error('AI Chat Error:', error)
    return new Response('AI-tjänsten är tillfälligt otillgänglig. Vänligen kontakta oss på 090-70 44 70.', {
      status: 500,
    })
  }
}
```

#### **Steg 2: Installera AI SDK**

```bash
npm install ai openai
```

#### **Steg 3: Aktivera i `components/chat-launcher.tsx`**

Hitta raden (~121) med:
```typescript
const response = await fetch('/api/chat', {
```

**Nuvarande (FAQ-bot):** Kommenterad/borttagen
**AI-aktiverad:** Avkommentera/återställ denna fetch-kod

---

### 3. **Kostnadskontroll**

#### **Begränsa användning:**

```typescript
// Lägg till i /app/api/chat/route.ts
const MAX_TOKENS_PER_USER = 1000 // per dag
const MAX_MESSAGES_PER_SESSION = 20

// Rate limiting med Redis eller liknande
```

#### **Uppskattat pris:**

| Användare/dag | Meddelanden | Kostnad/mån (GPT-3.5) | Kostnad/mån (GPT-4) |
|---------------|-------------|------------------------|---------------------|
| 10            | 50          | ~50 kr                 | ~500 kr             |
| 50            | 250         | ~250 kr                | ~2 500 kr           |
| 100           | 500         | ~500 kr                | ~5 000 kr           |

**Rekommendation:** Börja med GPT-3.5-turbo och uppgradera till GPT-4 om kvaliteten inte räcker.

---

### 4. **Test & Validering**

#### **Testa lokalt:**
```bash
# 1. Lägg till API-nyckel i .env.local
OPENAI_API_KEY=sk-...

# 2. Starta dev server
npm run dev

# 3. Öppna chatbot och testa frågor:
"Vad kostar IT-support?"
"Hur installerar jag alkolås?"
"Kontaktuppgifter?"
```

#### **Kvalitetssäkring:**
- ✅ Svarar på svenska
- ✅ Håller sig till företagsinformation
- ✅ Hänvisar till rätt sidor
- ✅ Ger korrekta priser
- ✅ Rekommenderar kontakt vid komplexa frågor
- ✅ Nekar frågor utanför scope

---

### 5. **Monitoring & Underhåll**

#### **Övervaka kostnader:**
```typescript
// Logga användning
console.log({
  tokens: response.usage?.total_tokens,
  cost: (response.usage?.total_tokens || 0) * 0.000002,
  timestamp: new Date(),
})
```

#### **OpenAI Dashboard:**
https://platform.openai.com/usage

#### **Alerts:**
Sätt upp budget-varningar i OpenAI Dashboard:
- Varning vid 500 kr/månad
- Hård gräns vid 1000 kr/månad

---

## Nuvarande FAQ-Chatbot (Ingen AI)

### **Hur den fungerar:**
1. Användaren ställer en fråga
2. Nyckelord matchas mot fördefinierade intents
3. Förkonfigurerat svar returneras
4. Länkar till relevanta sidor

### **Fördelar:**
- ✅ 0 kr i API-kostnader
- ✅ Instant svar (ingen latency)
- ✅ Fungerar offline
- ✅ 100% förutsägbar
- ✅ GDPR-säker (ingen data skickas)

### **Nackdelar:**
- ❌ Kan bara svara på fördefinierade frågor
- ❌ Ingen naturlig konversation
- ❌ Måste uppdateras manuellt vid nya FAQ

---

## Rekommendation

**Fas 1 (Nu):** Använd FAQ-chatbot
- Tillräcklig för 80% av vanliga frågor
- 0 kr kostnad
- Snabbare än AI

**Fas 2 (Efter 3-6 månader):** Aktivera AI
- När ni ser mönster i vad kunder frågar om
- När ni har budget för ~500-1000 kr/mån
- När ni vill ha mer avancerade konversationer

---

## Support & Kontakt

**AI-teknisk support:**
- OpenAI: https://help.openai.com
- Anthropic: https://support.anthropic.com

**Utvecklare:**
Claude Code - Skapat: 2025-11-02

---

**Senast uppdaterad:** 2025-11-02
**Version:** 1.0
