/**
 * @file binance.js
 * @description Binance API Client für Live-Marktdaten
 * @version 2.0
 */

import { API_ENDPOINTS, BINANCE_SYMBOLS } from '../config/constants.js';

const BASE_URL = API_ENDPOINTS.BINANCE;

/**
 * Cache für API-Responses (Rate Limit Management)
 */
const cache = new Map();
const CACHE_DURATION = 10000; // 10 Sekunden

/**
 * Holt 24h-Ticker-Daten von Binance
 * @param {string} symbol - Coin-Symbol (z.B. 'BTC')
 * @returns {Promise<Object|null>} Ticker-Daten oder null bei Fehler
 */
export async function fetchBinanceTicker(symbol) {
  const pair = BINANCE_SYMBOLS[symbol];
  if (!pair) {
    console.warn(`[Binance] Unbekanntes Symbol: ${symbol}`);
    return null;
  }

  const cacheKey = `ticker_${pair}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(`${BASE_URL}/ticker/24hr?symbol=${pair}`, {
      signal: AbortSignal.timeout(5000), // 5s Timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    const result = {
      price: parseFloat(data.lastPrice),
      change24h: parseFloat(data.priceChangePercent),
      high24h: parseFloat(data.highPrice),
      low24h: parseFloat(data.lowPrice),
      vol24h: parseFloat(data.quoteVolume),
      openPrice: parseFloat(data.openPrice),
      trades: parseInt(data.count),
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`[Binance] Ticker-Fehler für ${symbol}:`, error.message);
    return null;
  }
}

/**
 * Holt historische Kerzen-Daten (OHLCV)
 * @param {string} symbol - Coin-Symbol
 * @param {string} interval - Zeitintervall ('1h', '4h', '1d')
 * @param {number} limit - Anzahl Kerzen (max 1000)
 * @returns {Promise<Array|null>} Array von Kerzen-Objekten
 */
export async function fetchBinanceKlines(symbol, interval = '1h', limit = 500) {
  const pair = BINANCE_SYMBOLS[symbol];
  if (!pair) return null;

  const cacheKey = `klines_${pair}_${interval}_${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/klines?symbol=${pair}&interval=${interval}&limit=${limit}`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const rawData = await response.json();

    const result = rawData.map((k) => ({
      t: k[0], // timestamp ms
      o: parseFloat(k[1]), // open
      h: parseFloat(k[2]), // high
      l: parseFloat(k[3]), // low
      c: parseFloat(k[4]), // close
      v: parseFloat(k[5]), // volume (base)
      qv: parseFloat(k[7]), // quote volume (USD)
    }));

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`[Binance] Klines-Fehler für ${symbol}:`, error.message);
    return null;
  }
}

/**
 * Holt Orderbook-Tiefe (Top N Bids/Asks)
 * @param {string} symbol - Coin-Symbol
 * @param {number} limit - Anzahl Levels (5, 10, 20)
 * @returns {Promise<Object|null>} Orderbook-Daten
 */
export async function fetchBinanceOrderbook(symbol, limit = 5) {
  const pair = BINANCE_SYMBOLS[symbol];
  if (!pair) return null;

  try {
    const response = await fetch(`${BASE_URL}/depth?symbol=${pair}&limit=${limit}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const ob = await response.json();

    // Berechne Volumen auf Bid/Ask-Seite
    const bidVol = ob.bids.reduce((sum, bid) => {
      const price = parseFloat(bid[0]);
      const qty = parseFloat(bid[1]);
      return sum + price * qty;
    }, 0);

    const askVol = ob.asks.reduce((sum, ask) => {
      const price = parseFloat(ask[0]);
      const qty = parseFloat(ask[1]);
      return sum + price * qty;
    }, 0);

    const total = bidVol + askVol;

    return {
      bidPct: total > 0 ? ((bidVol / total) * 100).toFixed(1) : '50.0',
      askPct: total > 0 ? ((askVol / total) * 100).toFixed(1) : '50.0',
      pressure: bidVol > askVol * 1.1 ? 'buy' : askVol > bidVol * 1.1 ? 'sell' : 'neutral',
      bestBid: ob.bids[0] ? parseFloat(ob.bids[0][0]) : null,
      bestAsk: ob.asks[0] ? parseFloat(ob.asks[0][0]) : null,
      bids: ob.bids.slice(0, 5).map((b) => ({ price: parseFloat(b[0]), qty: parseFloat(b[1]) })),
      asks: ob.asks.slice(0, 5).map((a) => ({ price: parseFloat(a[0]), qty: parseFloat(a[1]) })),
    };
  } catch (error) {
    console.error(`[Binance] Orderbook-Fehler für ${symbol}:`, error.message);
    return null;
  }
}

// ══════════════════════════════════════════════
// CACHE HELPERS
// ══════════════════════════════════════════════

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });

  // Auto-Cleanup: Alte Einträge entfernen
  if (cache.size > 100) {
    const oldest = Array.from(cache.keys())[0];
    cache.delete(oldest);
  }
}

/**
 * Cache manuell leeren (z.B. bei Coin-Wechsel)
 */
export function clearBinanceCache() {
  cache.clear();
}
