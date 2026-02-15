# 🚀 SCHNELLSTART-ANLEITUNG

## ⚡ In 3 Minuten zum laufenden Dashboard

### Schritt 1: Dateien entpacken
```bash
cd crypto-dashboard
```

### Schritt 2: Im Browser öffnen

**Option A: Direkt öffnen (einfachste Methode)**
```bash
# Doppelklick auf index.html
# ODER im Terminal:
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

**Option B: Mit lokalem Server (empfohlen für volle Funktionalität)**
```bash
# Python 3:
python -m http.server 8000

# Python 2:
python -m SimpleHTTPServer 8000

# Node.js (http-server):
npx http-server -p 8000

# Dann Browser öffnen:
http://localhost:8000
```

### Schritt 3: Einloggen
- **Benutzername:** `admin`
- **Passwort:** `Admin1`

---

## 🎯 Erste Schritte

1. **Dashboard erkunden:**
   - Coin wechseln über Dropdown oder Chips
   - "Analyse starten" klicken

2. **Portfolio testen:**
   - Coins hinzufügen
   - Betrag eingeben
   - "Analyse starten"

3. **Chart-Ranges:**
   - 3d, 7d, 30d für historische Daten
   - ⚡ 24H, ⚡ 3T, ⚡ 7T für Prognosen

---

## 🔧 Projekt anpassen

### Coin hinzufügen
**Datei:** `src/config/coinData.js`
```javascript
export const COIN_DATA = {
  // ... bestehende Coins
  DOGE: {
    name: 'Dogecoin',
    symbol: '🐕',
    // ... weitere Eigenschaften
  }
};
```

### Design ändern
**Datei:** `assets/css/variables.css`
```css
:root {
  --accent: #00d4ff;  /* Hauptfarbe ändern */
  --bg: #040810;      /* Hintergrund */
}
```

### API-Keys (Claude AI)
**Datei:** `src/config/constants.js`
```javascript
export const CLAUDE_API_KEY = 'sk-ant-api03-...';
```

---

## 🐛 Häufige Probleme

### Problem: "Cannot use import statement outside a module"
**Lösung:** Server nutzen statt `file://` Protokoll
```bash
python -m http.server 8000
```

### Problem: CORS-Fehler bei API-Calls
**Lösung:** 
- Lokalen Server verwenden
- Browser-Extension "Allow CORS" installieren (nur für Development!)

### Problem: Chart lädt nicht
**Lösung:**
1. Browser-Console öffnen (F12)
2. Fehler prüfen
3. Ggf. API-Keys prüfen

---

## 📊 Projekt-Struktur erklärt

```
crypto-dashboard/
│
├── index.html              ← Hauptseite (hier starten!)
│
├── src/
│   ├── main.js            ← Einstiegspunkt (Login, Event-Handler)
│   ├── config/            ← Einstellungen & Konstanten
│   │   ├── constants.js   ← API-URLs, Schwellwerte
│   │   └── coinData.js    ← Coin-Daten (Fallback)
│   ├── api/               ← API-Clients
│   │   └── binance.js     ← Binance API (Live-Daten)
│   ├── utils/             ← Hilfsfunktionen
│   │   ├── calculations.js ← RSI, MACD, etc.
│   │   └── formatting.js   ← Preis-Formatierung
│   └── components/        ← UI-Komponenten (zu implementieren)
│
└── assets/
    └── css/               ← Styling
        ├── variables.css  ← CSS-Variablen (Farben)
        ├── components.css ← Komponenten-Styles
        └── animations.css ← Animationen
```

---

## ✅ Nächste Schritte

1. **Chart-Komponente implementieren:**
   - Datei: `src/components/chart.js`
   - Canvas-Rendering für Live-Chart

2. **Portfolio-Komponente:**
   - Datei: `src/components/portfolio.js`
   - Swap-Empfehlungen

3. **Backend-Auth:**
   - Aktuell: Client-Side (UNSICHER!)
   - TODO: Node.js/PHP Backend

4. **Tests schreiben:**
   - Jest oder Vitest
   - Unit-Tests für calculations.js

---

## 🆘 Hilfe & Support

- **Dokumentation:** `docs/` Ordner
- **Coding Standards:** `docs/CODING_STANDARDS.md`
- **API-Docs:** `docs/API.md`
- **Issues:** GitHub Issues (wenn deployed)

---

## 🎉 Viel Erfolg!

Bei Fragen: README.md lesen oder Code-Kommentare anschauen.

**Happy Trading!** 📈🚀
