# 🏗️ ARCHITEKTUR-ÜBERSICHT

## Technologie-Stack

| Layer | Technologie | Begründung |
|-------|-------------|------------|
| **Frontend** | Vanilla JavaScript (ES6+) | Keine Build-Tools, direkter Start |
| **Module System** | ES6 Modules | Native Browser-Support |
| **Styling** | Custom CSS + CSS Variables | Kein Framework-Overhead |
| **Charts** | HTML5 Canvas | Maximale Performance |
| **State** | Module Pattern | Einfach, wartbar |
| **APIs** | Fetch + Async/Await | Modern, robust |

---

## Modul-Architektur

```
┌─────────────────────────────────────────────────┐
│                  index.html                      │
│              (Entry Point)                       │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│              src/main.js                         │
│        (Application Bootstrap)                   │
│  • Event-Handler                                 │
│  • Login-Logik                                   │
│  • State Management                              │
└──┬────────┬────────┬────────┬──────────────────┘
   │        │        │        │
   ▼        ▼        ▼        ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐
│Config│ │ API  │ │Utils │ │Components│
└──────┘ └──────┘ └──────┘ └──────────┘
```

---

## Datenfluss

### 1. Login-Flow
```
User Input → main.js → constants.js (TEMP_USERS)
           ↓
        Validation
           ↓
     Show Dashboard
```

### 2. Analyse-Flow
```
User Click → runAnalysis()
           ↓
    Select Coin (State)
           ↓
    API Calls (Parallel)
    ├─ fetchBinanceTicker()
    ├─ fetchBinanceKlines()
    └─ fetchBinanceOrderbook()
           ↓
    Calculate Indicators
    ├─ calculateRSI()
    ├─ calculateMACD()
    └─ calculateATR()
           ↓
    Update UI
    ├─ Price Display
    ├─ Chart Rendering
    └─ Signal Box
```

### 3. Chart-Rendering-Flow
```
Chart Component
    ↓
Generate Chart Data
    ↓
Canvas Context
    ↓
Draw Layers:
├─ Background Grid
├─ Y-Axis Labels
├─ Price Line (Smooth Curve)
├─ Area Fill (Gradient)
├─ Current Price Line
└─ Interactive Tooltip
```

---

## State Management

### Aktuell: Einfaches State-Objekt
```javascript
// Global State (main.js)
let currentCoin = 'XRP';
let chartRange = '7d';
let portfolioData = [];
```

### Future: State Management Pattern
```javascript
const AppState = {
  user: {
    name: null,
    authenticated: false,
  },
  dashboard: {
    currentCoin: 'XRP',
    liveData: {},
    indicators: {},
  },
  portfolio: {
    coins: [],
    recommendations: [],
  },
};

// Mit Event-Emitter für Reaktivität
```

---

## API-Layer Architektur

### Rate Limiting & Caching

```javascript
// API Call mit Cache
async function fetchWithCache(key, fetcher, ttl = 10000) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < ttl) {
    return cached.data;
  }
  
  const data = await fetcher();
  cache.set(key, { data, ts: Date.now() });
  return data;
}
```

### Error Handling Strategy

1. **Graceful Degradation:** Fallback zu statischen Daten
2. **Retry Logic:** 3 Versuche bei Timeout
3. **User Feedback:** Loading-Overlay + Error-Messages

---

## Performance-Optimierungen

### 1. Lazy Loading
- Chart wird erst bei Bedarf gerendert
- Portfolio-Komponente nur bei Tab-Wechsel

### 2. Debouncing/Throttling
```javascript
// Search Input: Debounce 300ms
const debouncedSearch = debounce(performSearch, 300);

// Scroll Events: Throttle 100ms
const throttledScroll = throttle(handleScroll, 100);
```

### 3. Canvas-Rendering
- High-DPI Support: `devicePixelRatio`
- RequestAnimationFrame für Animationen
- Off-Screen Canvas für komplexe Grafiken

### 4. API-Optimierung
- Promise.all für parallele Requests
- Cache für wiederholte Anfragen
- Abort-Controller für Timeout

---

## Sicherheitsarchitektur

### Aktuelle Implementierung (Development)
```
Client (Browser)
    ↓
Client-Side Validation (UNSICHER!)
    ↓
Access Granted
```

### Production-Architektur (TODO)
```
Client (Browser)
    ↓
Login Request (HTTPS)
    ↓
Backend Server (Node.js/PHP)
├─ Password Hash Verification
├─ JWT Token Generation
└─ Session Management
    ↓
Secure Cookie (httpOnly)
    ↓
Authenticated Requests
```

---

## Fehlerbehandlung

### Hierarchie
```
Global Error Handler (window.onerror)
    ↓
Module-Level Try-Catch
    ↓
Function-Level Validation
    ↓
UI Error Display
```

### Error-Types
```javascript
// API Errors
class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

// Validation Errors
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
    this.name = 'ValidationError';
  }
}
```

---

## Deployment-Architektur

### Development
```
Local Files
    ↓
Browser (file:// oder localhost:8000)
```

### Production
```
GitHub Repository
    ↓
CI/CD Pipeline (GitHub Actions)
    ↓
Build Step (optional):
├─ Minify JS/CSS
├─ Optimize Images
└─ Bundle Assets
    ↓
Deploy to:
├─ Netlify / Vercel (Static)
├─ AWS S3 + CloudFront
└─ Custom Server (Nginx)
    ↓
HTTPS + CDN
```

---

## Testing-Strategie

### Unit Tests (Jest)
```javascript
// calculations.test.js
describe('calculateRSI', () => {
  test('korrekte Berechnung', () => {
    const prices = [44, 44.34, ...];
    expect(calculateRSI(prices)).toBeCloseTo(70.46, 1);
  });
});
```

### Integration Tests
- API-Mocks mit MSW (Mock Service Worker)
- Komponenten-Tests mit Testing Library

### E2E Tests (Playwright)
- Login-Flow
- Coin-Wechsel
- Chart-Rendering

---

## Monitoring & Logging

### Development
```javascript
if (DEV_CONFIG.DEBUG_MODE) {
  console.log('[API]', endpoint, data);
}
```

### Production
```javascript
// Sentry Integration
Sentry.init({
  dsn: 'https://...',
  environment: 'production',
});

// Custom Error Tracking
logError('API_TIMEOUT', { coin, endpoint });
```

---

## Skalierungs-Überlegungen

### Current: ~20 Coins
- Kein Problem
- Alle Daten in COIN_DATA

### Future: 100+ Coins
- **Option A:** Lazy Loading pro Coin
- **Option B:** Virtualisierung (nur sichtbare rendern)
- **Option C:** Backend-API mit Pagination

### Future: 1000+ Users
- Backend nötig
- WebSocket für Live-Updates
- Redis für Caching
- Load Balancing

---

## Code-Organisation Prinzipien

### 1. Separation of Concerns
- **Config:** Nur Konstanten
- **API:** Nur HTTP-Calls
- **Utils:** Nur Pure Functions
- **Components:** Nur UI-Logik

### 2. Single Responsibility
```javascript
// ✅ RICHTIG: Eine Funktion = Ein Zweck
function calculateRSI(prices) { /* ... */ }
function formatPrice(price) { /* ... */ }

// ❌ FALSCH: Vermischte Logik
function getRSIAndFormat(prices) { /* ... */ }
```

### 3. Dependency Injection
```javascript
// Statt:
function fetchData() {
  const url = API_ENDPOINTS.BINANCE; // Hard-coded
}

// Besser:
function fetchData(apiUrl) {
  // Testbar mit Mock-URL
}
```

---

## Nächste Entwicklungsschritte

### Phase 1: Vervollständigung (1-2 Wochen)
- [ ] Chart-Komponente vollständig implementieren
- [ ] Portfolio-Advisor finalisieren
- [ ] AI-Analyse-Integration testen
- [ ] Responsive Design für Mobile

### Phase 2: Backend (2-4 Wochen)
- [ ] Node.js/Express API
- [ ] PostgreSQL Datenbank
- [ ] JWT Authentication
- [ ] Rate Limiting

### Phase 3: Advanced Features (4-8 Wochen)
- [ ] WebSocket Live-Updates
- [ ] Push-Benachrichtigungen
- [ ] Backtesting-Engine
- [ ] Social Trading Features

---

## Referenzen

- **Binance API:** https://binance-docs.github.io/apidocs/spot/en/
- **CoinGecko API:** https://www.coingecko.com/en/api
- **Canvas API:** https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **ES6 Modules:** https://javascript.info/modules-intro

---

**Version:** 2.0  
**Letzte Aktualisierung:** 15. Februar 2026  
**Maintainer:** [Dein Name]
