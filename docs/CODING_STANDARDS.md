# 📘 CODING STANDARDS – JavaScript / HTML / CSS

**Für:** Frontend-Entwicklung (Vanilla JS, kein Framework)  
**Version:** 1.0  
**Letzte Aktualisierung:** 15. Februar 2026

---

## 🎯 GRUNDPRINZIPIEN

### 1. **Code ist für Menschen, nicht für Maschinen**
- Lesbarkeit > Kürze
- Selbsterklärender Code > Kommentare
- Konsistenz > persönliche Vorlieben

### 2. **KISS: Keep It Simple, Stupid**
- Einfache Lösung bevorzugen
- Keine vorzeitige Optimierung
- Komplexität nur wenn nötig

### 3. **DRY: Don't Repeat Yourself**
- Code-Duplikation vermeiden
- Funktionen für wiederholte Logik
- Konstanten für wiederkehrende Werte

---

## 📂 PROJEKT-STRUKTUR

### Empfohlene Ordnerstruktur

```
/projekt-name
│
├── /src                    # Quellcode
│   ├── /api               # API-Aufrufe
│   │   ├── binance.js
│   │   └── coingecko.js
│   │
│   ├── /components        # UI-Komponenten
│   │   ├── chart.js
│   │   ├── portfolio.js
│   │   └── ticker.js
│   │
│   ├── /utils             # Hilfsfunktionen
│   │   ├── calculations.js
│   │   ├── formatting.js
│   │   └── validators.js
│   │
│   ├── /config            # Konfiguration
│   │   ├── constants.js
│   │   └── settings.js
│   │
│   └── main.js            # Einstiegspunkt
│
├── /assets                # Statische Dateien
│   ├── /css
│   ├── /images
│   └── /fonts
│
├── /tests                 # Tests (optional)
│   └── calculations.test.js
│
├── index.html             # Haupt-HTML
├── README.md              # Dokumentation
└── package.json           # Dependencies (falls npm genutzt)
```

### Datei-Größe Limits

| Dateityp | Max. Zeilen | Grund |
|----------|-------------|-------|
| `.js` | 500 | Übersichtlichkeit |
| `.css` | 800 | Wartbarkeit |
| `.html` | 300 | Performance |

> **Wenn Datei zu groß wird:** In mehrere Module aufteilen

---

## 🔤 NAMING CONVENTIONS

### JavaScript

#### Variablen & Funktionen
```javascript
// ✅ RICHTIG: camelCase
const userName = 'Max';
const portfolioBalance = 1000;
let isAuthenticated = false;

function calculateRSI(prices) { /* ... */ }
function fetchUserData() { /* ... */ }

// ❌ FALSCH
const user_name = 'Max';        // snake_case
const UserName = 'Max';         // PascalCase
function CalculateRSI() {}      // PascalCase
```

#### Konstanten
```javascript
// ✅ RICHTIG: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
const RSI_OVERSOLD_THRESHOLD = 30;

// ❌ FALSCH
const apiBaseUrl = '...';       // camelCase für Konstanten
const MaxRetry = 3;             // PascalCase
```

#### Klassen & Konstruktoren
```javascript
// ✅ RICHTIG: PascalCase
class ChartRenderer { /* ... */ }
class ApiClient { /* ... */ }
const myChart = new ChartRenderer();

// ❌ FALSCH
class chartRenderer {}          // camelCase
class api_client {}             // snake_case
```

#### Private Eigenschaften
```javascript
// ✅ RICHTIG: Unterstrich-Präfix
class User {
  constructor() {
    this._internalState = {};   // "private"
    this.publicData = {};       // öffentlich
  }
}

// Oder ES2022+:
class User {
  #privateField = 'secret';     // echtes Private Field
  publicField = 'public';
}
```

### HTML

#### IDs & Klassen
```html
<!-- ✅ RICHTIG: kebab-case -->
<div id="user-profile" class="card-container">
  <button class="btn-primary">Click</button>
</div>

<!-- ❌ FALSCH -->
<div id="userProfile" class="CardContainer">   <!-- camelCase / PascalCase -->
<div id="user_profile" class="card_container"> <!-- snake_case -->
```

#### Data-Attribute
```html
<!-- ✅ RICHTIG -->
<div data-user-id="123" data-coin-symbol="BTC">

<!-- ❌ FALSCH -->
<div data-userId="123">  <!-- camelCase -->
```

### CSS

#### Klassen & IDs
```css
/* ✅ RICHTIG: kebab-case */
.price-hero { }
.card-container { }
#main-chart { }

/* ❌ FALSCH */
.priceHero { }        /* camelCase */
.Price_Hero { }       /* PascalCase + snake_case */
```

#### CSS Custom Properties
```css
/* ✅ RICHTIG */
:root {
  --color-primary: #00d4ff;
  --spacing-large: 24px;
  --font-family-mono: 'Share Tech Mono', monospace;
}

/* ❌ FALSCH */
:root {
  --colorPrimary: #00d4ff;      /* camelCase */
  --Color-Primary: #00d4ff;     /* PascalCase */
}
```

---

## 🎨 CODE-FORMATIERUNG

### JavaScript

#### Einrückung & Spacing
```javascript
// ✅ RICHTIG: 2 Leerzeichen (oder 4 - aber konsistent!)
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}

// Leerzeichen um Operatoren
const sum = a + b;
const result = (x * y) / z;
if (condition) { /* ... */ }

// ❌ FALSCH: Inkonsistente Einrückung
function bad() {
   let x = 1;
    let y = 2;  // Mal 2, mal 4 Spaces
      return x+y;  // Kein Spacing bei Operatoren
}
```

#### Semikolons
```javascript
// ✅ ENTSCHEIDE DICH: Mit ODER ohne - aber konsistent!

// Option A: MIT Semikolons (empfohlen)
const name = 'Max';
const age = 30;

// Option B: OHNE Semikolons (erfordert gutes Verständnis von ASI)
const name = 'Max'
const age = 30

// ❌ FALSCH: Gemischt
const name = 'Max';
const age = 30   // <- inkonsistent
```

#### String-Quotes
```javascript
// ✅ ENTSCHEIDE DICH: Single ODER Double Quotes

// Option A: Single Quotes (populär bei JS-Community)
const name = 'Max Mustermann';
const html = '<div class="container"></div>';

// Option B: Double Quotes
const name = "Max Mustermann";

// Template Literals für String-Interpolation
const greeting = `Hallo ${name}!`;

// ❌ FALSCH: Gemischt
const firstName = 'Max';
const lastName = "Mustermann";  // <- inkonsistent
```

#### Funktions-Deklaration
```javascript
// ✅ RICHTIG: Konsistenter Stil

// Normale Funktion (hoisting möglich)
function calculateRSI(prices) {
  // ...
}

// Arrow Function (für Callbacks, kein hoisting)
const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// Kurze Arrow Function (eine Zeile)
const double = (x) => x * 2;

// ❌ FALSCH: Gemischte Stile ohne Grund
function formatPrice(price) { return `$${price}`; }  // normale Funktion
const calculateRSI = (prices) => { /* ... */ };      // arrow function
// <- Inkonsistent: beide machen ähnliches
```

#### Objekt & Array Literals
```javascript
// ✅ RICHTIG: Trailing Commas (einfacher für Git-Diffs)
const user = {
  name: 'Max',
  age: 30,
  email: 'max@example.com',  // <- Trailing Comma OK
};

const colors = [
  'red',
  'green',
  'blue',  // <- Trailing Comma OK
];

// ❌ FALSCH: Inkonsistente Formatierung
const user = {name: 'Max',age: 30,email: 'test'};  // Alles in einer Zeile
```

### HTML

#### Einrückung
```html
<!-- ✅ RICHTIG: 2 Leerzeichen pro Ebene -->
<div class="container">
  <header>
    <h1>Titel</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
</div>

<!-- ❌ FALSCH: Inkonsistent -->
<div class="container">
<header>
    <h1>Titel</h1>
     <nav>
      <a href="/">Home</a>
</nav>
```

#### Attribute
```html
<!-- ✅ RICHTIG: Ein Attribut pro Zeile bei vielen Attributen -->
<button
  id="submit-btn"
  class="btn btn-primary"
  data-user-id="123"
  onclick="handleSubmit()"
>
  Submit
</button>

<!-- Kurze Tags: Eine Zeile OK -->
<input type="text" id="name" placeholder="Name" />

<!-- ❌ FALSCH: Unlesbar lange Zeilen -->
<button id="submit-btn" class="btn btn-primary" data-user-id="123" onclick="handleSubmit()" disabled="false" aria-label="Submit Form">Submit</button>
```

### CSS

#### Reihenfolge der Eigenschaften
```css
/* ✅ RICHTIG: Logische Gruppierung */
.button {
  /* Positioning */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  
  /* Box Model */
  display: flex;
  width: 100px;
  height: 40px;
  padding: 10px;
  margin: 5px;
  
  /* Typography */
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
  
  /* Visual */
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  /* Animation */
  transition: all 0.3s ease;
}

/* ❌ FALSCH: Chaotische Reihenfolge */
.button {
  color: #333;
  position: absolute;
  font-size: 14px;
  width: 100px;
  background: #fff;
  top: 0;
  /* <- schwer zu lesen */
}
```

---

## 📝 KOMMENTARE & DOKUMENTATION

### Wann kommentieren?

```javascript
// ✅ RICHTIG: Kommentiere das WARUM, nicht das WAS

// Schlechter Kommentar (beschreibt nur Code):
// ❌ Loop durch alle Preise
for (const price of prices) {
  total += price;
}

// Guter Kommentar (erklärt Grund):
// ✅ CoinGecko API hat 10 Sekunden Delay - daher Fallback auf Cache
if (Date.now() - lastFetch < 10000) {
  return cachedData;
}

// ✅ Komplexe Algorithmen erklären
// RSI wird über gleitenden Durchschnitt von Gewinnen/Verlusten berechnet
// Formel: RSI = 100 - (100 / (1 + RS)), wobei RS = avgGain / avgLoss
function calculateRSI(prices) {
  // ...
}

// ✅ TODOs & FIXMEs markieren
// TODO: Error-Handling für API-Timeouts hinzufügen
// FIXME: Memory Leak bei Chart-Resize
// HACK: Temporärer Workaround - entfernen wenn API v2 verfügbar
```

### JSDoc für Funktionen

```javascript
/**
 * Berechnet den RSI (Relative Strength Index) aus Preis-Array
 * 
 * @param {number[]} prices - Array von Schlusskursen (mindestens 15 Werte)
 * @param {number} [period=14] - Periode für RSI-Berechnung (Standard: 14)
 * @returns {number|null} RSI-Wert zwischen 0-100, oder null bei zu wenig Daten
 * @throws {TypeError} Wenn prices kein Array ist
 * 
 * @example
 * const rsi = calculateRSI([100, 102, 101, 105, ...], 14);
 * console.log(rsi); // 65.43
 */
function calculateRSI(prices, period = 14) {
  if (!Array.isArray(prices)) {
    throw new TypeError('prices muss ein Array sein');
  }
  
  if (prices.length < period + 1) {
    return null;
  }
  
  // ... Implementierung
}
```

### File-Header

```javascript
/**
 * @file calculations.js
 * @description Technische Indikatoren für Crypto-Trading
 * @author Max Mustermann
 * @version 1.2.0
 * @created 2026-01-15
 * @modified 2026-02-15
 */

// Imports
import { formatPrice } from './formatting.js';

// Constants
const RSI_PERIOD_DEFAULT = 14;

// ... Code
```

---

## 🔐 FEHLERBEHANDLUNG

### Try-Catch Best Practices

```javascript
// ✅ RICHTIG: Spezifische Fehlerbehandlung

async function fetchCoinPrice(symbol) {
  try {
    const response = await fetch(`https://api.example.com/price/${symbol}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.price;
    
  } catch (error) {
    // Fehler loggen
    console.error(`Fehler beim Laden von ${symbol}:`, error);
    
    // Fallback-Wert zurückgeben
    return getCachedPrice(symbol) || 0;
  }
}

// ❌ FALSCH: Fehler verschlucken
async function fetchCoinPrice(symbol) {
  try {
    const response = await fetch(`...`);
    return response.json();
  } catch (error) {
    // Nichts tun - Fehler wird ignoriert!
  }
}

// ❌ FALSCH: Zu generisch
try {
  // 100 Zeilen Code...
} catch (e) {
  console.log('Fehler');  // Welcher Fehler? Wo?
}
```

### Input-Validierung

```javascript
// ✅ RICHTIG: Früh validieren & klare Fehlermeldungen

function calculatePercentageChange(oldValue, newValue) {
  // Validierung
  if (typeof oldValue !== 'number' || typeof newValue !== 'number') {
    throw new TypeError('Beide Werte müssen Zahlen sein');
  }
  
  if (oldValue === 0) {
    throw new Error('oldValue darf nicht 0 sein (Division durch 0)');
  }
  
  if (!isFinite(oldValue) || !isFinite(newValue)) {
    throw new Error('Werte müssen endliche Zahlen sein');
  }
  
  // Berechnung
  return ((newValue - oldValue) / oldValue) * 100;
}

// ❌ FALSCH: Keine Validierung
function calculatePercentageChange(oldValue, newValue) {
  return (newValue - oldValue) / oldValue * 100;  // Crasht bei oldValue=0
}
```

### Defensive Programmierung

```javascript
// ✅ RICHTIG: Assume nothing

function getUserName(user) {
  // Mehrere Checks für Robustheit
  return user?.profile?.name || 
         user?.email?.split('@')[0] || 
         'Unbekannter Nutzer';
}

// Null-Checks bei Array-Operationen
function getFirstItem(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }
  return array[0];
}

// ❌ FALSCH: Optimistische Annahmen
function getUserName(user) {
  return user.profile.name;  // Crasht wenn user oder profile null
}
```

---

## ⚡ PERFORMANCE-RICHTLINIEN

### DOM-Manipulation

```javascript
// ✅ RICHTIG: Batch DOM-Updates

function renderList(items) {
  // Template erstellen
  const html = items.map(item => 
    `<div class="item">${item.name}</div>`
  ).join('');
  
  // EINMAL ins DOM schreiben
  container.innerHTML = html;
}

// ❌ FALSCH: Viele einzelne Updates
function renderList(items) {
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.name;
    container.appendChild(div);  // DOM-Update bei JEDEM Item!
  });
}
```

### Event-Listener

```javascript
// ✅ RICHTIG: Event Delegation

// Ein Listener für viele Buttons
document.querySelector('.button-container').addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    handleButtonClick(e.target);
  }
});

// ❌ FALSCH: Listener für jeden Button
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleButtonClick);  // 100+ Listener
});

// ✅ RICHTIG: Listener entfernen
function setupChart() {
  const handler = (e) => handleMouseMove(e);
  canvas.addEventListener('mousemove', handler);
  
  // Cleanup-Funktion zurückgeben
  return () => {
    canvas.removeEventListener('mousemove', handler);
  };
}

const cleanup = setupChart();
// Später:
cleanup();  // Listener entfernen
```

### Debouncing & Throttling

```javascript
// ✅ RICHTIG: Debounce für teure Operationen

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Suche wird nur ausgeführt, wenn User 300ms pausiert
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Throttle für continuous Events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Scroll-Handler läuft maximal alle 100ms
const throttledScroll = throttle(handleScroll, 100);
window.addEventListener('scroll', throttledScroll);
```

### Asynchrone Operationen

```javascript
// ✅ RICHTIG: Promise.all für parallele Requests

async function loadDashboardData() {
  const [prices, volume, orderbook] = await Promise.all([
    fetchPrices(),
    fetchVolume(),
    fetchOrderbook(),
  ]);
  
  return { prices, volume, orderbook };
}
// Läuft PARALLEL - schneller!

// ❌ FALSCH: Sequenziell (langsam)
async function loadDashboardData() {
  const prices = await fetchPrices();      // Wartet 500ms
  const volume = await fetchVolume();      // Wartet 500ms
  const orderbook = await fetchOrderbook(); // Wartet 500ms
  // Gesamt: 1500ms statt 500ms
}
```

---

## 🧪 TESTING-RICHTLINIEN

### Unit-Test Beispiele

```javascript
/**
 * Test für calculateRSI Funktion
 */
describe('calculateRSI', () => {
  
  test('sollte korrekten RSI für bekannte Werte berechnen', () => {
    const prices = [44, 44.34, 44.09, 43.61, 44.33, 44.83, 45.10, 45.42, 45.84, 46.08, 45.89, 46.03, 45.61, 46.28, 46.28];
    const result = calculateRSI(prices, 14);
    expect(result).toBeCloseTo(70.46, 1);  // RSI ≈ 70.46
  });
  
  test('sollte null zurückgeben bei zu wenig Daten', () => {
    const prices = [100, 101, 102];
    const result = calculateRSI(prices, 14);
    expect(result).toBeNull();
  });
  
  test('sollte TypeError werfen bei invaliden Input', () => {
    expect(() => calculateRSI('not an array')).toThrow(TypeError);
    expect(() => calculateRSI(null)).toThrow(TypeError);
  });
  
});
```

### Test-Driven Development (Optional)

```javascript
// 1. Test schreiben (failing)
test('formatPrice sollte USD-Format mit 2 Dezimalen ausgeben', () => {
  expect(formatPrice(1234.567)).toBe('$1,234.57');
});

// 2. Funktion implementieren (passing)
function formatPrice(price) {
  return '$' + price.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// 3. Refactoren (falls nötig)
```

---

## 🔒 SICHERHEIT

### Client-Side Security

```javascript
// ❌ NIEMALS: Passwörter im Client-Code
const USERS = { admin: 'Admin123' };  // UNSICHER!

// ✅ RICHTIG: Backend-Authentifizierung
async function login(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include'  // Cookies mitschicken
  });
  
  if (!response.ok) {
    throw new Error('Login fehlgeschlagen');
  }
  
  const { token } = await response.json();
  // Token sicher speichern (httpOnly Cookie vom Server)
  return token;
}

// ❌ NIEMALS: API-Keys im Client
const API_KEY = 'sk_live_123456789';  // UNSICHER!

// ✅ RICHTIG: API-Calls über eigenen Backend-Proxy
async function fetchData() {
  // Proxy auf eigenem Server macht den API-Call
  return fetch('/api/proxy/data');
}
```

### XSS Prevention

```javascript
// ❌ GEFÄHRLICH: Ungefilterter User-Input
function displayComment(comment) {
  div.innerHTML = comment;  // XSS-Risiko!
}

// ✅ RICHTIG: Escapen oder textContent verwenden
function displayComment(comment) {
  div.textContent = comment;  // Sicher: HTML wird escaped
}

// Oder mit DOMPurify-Library:
function displayComment(comment) {
  div.innerHTML = DOMPurify.sanitize(comment);
}
```

### CSRF Protection

```javascript
// ✅ RICHTIG: CSRF-Token bei POST-Requests
async function updateProfile(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  
  return fetch('/api/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(data)
  });
}
```

---

## 📚 KONSTANTEN & KONFIGURATION

### Magische Zahlen vermeiden

```javascript
// ❌ FALSCH: Magische Zahlen überall
if (rsi < 30) {
  buySignal = true;
}
setTimeout(refresh, 30000);
const stop = price * 0.98;

// ✅ RICHTIG: Benannte Konstanten
const RSI_OVERSOLD_THRESHOLD = 30;
const RSI_OVERBOUGHT_THRESHOLD = 70;
const REFRESH_INTERVAL_MS = 30 * 1000;  // 30 Sekunden
const STOP_LOSS_PERCENTAGE = 0.98;      // 2% unter Einstieg

if (rsi < RSI_OVERSOLD_THRESHOLD) {
  buySignal = true;
}
setTimeout(refresh, REFRESH_INTERVAL_MS);
const stop = price * STOP_LOSS_PERCENTAGE;
```

### Zentrale Konfiguration

```javascript
// config/constants.js

export const API_ENDPOINTS = {
  BINANCE: 'https://api.binance.com/api/v3',
  COINGECKO: 'https://api.coingecko.com/api/v3',
  FEARGREED: 'https://api.alternative.me/fng/',
};

export const TIMEFRAMES = {
  MINUTE_1: '1m',
  HOUR_1: '1h',
  HOUR_4: '4h',
  DAY_1: '1d',
  WEEK_1: '1w',
};

export const CHART_CONFIG = {
  DEFAULT_RANGE: '7d',
  CANVAS_RESOLUTION_MULTIPLIER: window.devicePixelRatio || 1,
  PADDING: { top: 20, right: 70, bottom: 42, left: 72 },
  COLORS: {
    PRIMARY: '#00d4ff',
    SUCCESS: '#00ff88',
    DANGER: '#ff3a3a',
    WARNING: '#ffd700',
  },
};

export const INDICATOR_SETTINGS = {
  RSI_PERIOD: 14,
  RSI_OVERSOLD: 30,
  RSI_OVERBOUGHT: 70,
  MACD_FAST: 12,
  MACD_SLOW: 26,
  MACD_SIGNAL: 9,
};
```

---

## 🎯 GIT COMMIT MESSAGES

### Konvention (Conventional Commits)

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     Neue Funktion
fix:      Bugfix
docs:     Dokumentation
style:    Formatierung (keine Code-Änderung)
refactor: Code-Umstrukturierung (keine funktionalen Änderungen)
test:     Tests hinzufügen/ändern
chore:    Build, Dependencies, etc.

# Beispiele:
feat(chart): RSI-Indikator hinzugefügt
fix(api): Binance Timeout Error behoben
docs(readme): Installation-Anleitung aktualisiert
refactor(calculations): MACD in eigene Datei ausgelagert
style(css): Einrückung vereinheitlicht
test(rsi): Unit-Tests für calcRSI hinzugefügt
chore(deps): Dependencies aktualisiert
```

### Gute vs. Schlechte Commits

```bash
# ✅ GUTE COMMIT MESSAGES:
git commit -m "fix(auth): Login-Fehler bei leerem Passwort behoben"
git commit -m "feat(portfolio): KI-Analyse mit Claude API integriert"
git commit -m "refactor(chart): Canvas-Rendering in separate Funktion ausgelagert"

# ❌ SCHLECHTE COMMIT MESSAGES:
git commit -m "changes"
git commit -m "fix bug"
git commit -m "update"
git commit -m "asdf"
```

---

## ✅ CODE REVIEW CHECKLISTE

### Vor dem Commit

- [ ] Code läuft ohne Fehler
- [ ] Keine `console.log()` im Production-Code
- [ ] Keine `debugger;` Statements
- [ ] Keine kommentierten Code-Blöcke (löschen!)
- [ ] Keine `// TODO` ohne Issue-Nummer
- [ ] Naming Conventions eingehalten
- [ ] Keine magischen Zahlen
- [ ] Error-Handling vorhanden
- [ ] Performance OK (keine offensichtlichen Bottlenecks)
- [ ] Kommentare aktualisiert

### Pull Request Checklist

- [ ] Tests laufen durch
- [ ] Dokumentation aktualisiert
- [ ] Keine Breaking Changes (oder dokumentiert)
- [ ] Code Review von mindestens 1 Person
- [ ] Branch ist up-to-date mit main

---

## 🛠️ EMPFOHLENE TOOLS

### Code Quality

- **ESLint:** JavaScript Linter
- **Prettier:** Code Formatter
- **Stylelint:** CSS Linter
- **HTML Validator:** https://validator.w3.org/

### Konfiguration (.eslintrc.json)

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"]
  }
}
```

### Prettier (.prettierrc.json)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

---

## 📖 WEITERFÜHRENDE RESSOURCEN

### Dokumentation

- **MDN Web Docs:** https://developer.mozilla.org/
- **JavaScript.info:** https://javascript.info/
- **CSS Tricks:** https://css-tricks.com/

### Style Guides

- **Airbnb JavaScript Style Guide:** https://github.com/airbnb/javascript
- **Google JavaScript Style Guide:** https://google.github.io/styleguide/jsguide.html
- **Clean Code JavaScript:** https://github.com/ryanmcdermott/clean-code-javascript

---

## 🎓 ZUSAMMENFASSUNG: DIE GOLDENEN REGELN

1. **Konsistenz > Perfektion** – Einmal entscheiden, immer gleich machen
2. **Lesbarkeit > Kürze** – Code wird öfter gelesen als geschrieben
3. **Explizit > Implizit** – Lieber zu klar als zu clever
4. **DRY** – Don't Repeat Yourself
5. **KISS** – Keep It Simple, Stupid
6. **Fehler früh abfangen** – Defensive Programmierung
7. **Kommentiere das WARUM, nicht das WAS**
8. **Performance nur wenn nötig** – Premature optimization is evil
9. **Tests schreiben** – Vertrauen in deinen Code
10. **Refactor regelmäßig** – Technical Debt abbezahlen

---

**Version:** 1.0  
**Letzte Aktualisierung:** 15. Februar 2026  
**Maintainer:** [Dein Name/Team]  
**Lizenz:** MIT

