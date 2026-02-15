/**
 * @file coingecko.js
 * @description CoinGecko API Client für historische Daten und Market Cap
 * @version 1.0.0
 */

import { API_ENDPOINTS, COINGECKO_IDS } from '../config/constants.js';

/**
 * Holt umfassende Coin-Daten von CoinGecko
 * @param {string} symbol - Coin Symbol (z.B. 'BTC')
 * @returns {Promise<Object|null>} Coin-Daten oder null bei Fehler
 */
export async function fetchCoinGeckoData(symbol) {
  const coinId = COINGECKO_IDS[symbol];
  
  if (!coinId) {
    console.warn(`Keine CoinGecko-ID für ${symbol} gefunden`);
    return null;
  }
  
  try {
    const url = `${API_ENDPOINTS.COINGECKO}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const marketData = data.market_data;
    
    return {
      price: marketData.current_price.usd,
      change24h: marketData.price_change_percentage_24h,
      change7d: marketData.price_change_percentage_7d,
      change30d: marketData.price_change_percentage_30d,
      high24h: marketData.high_24h.usd,
      low24h: marketData.low_24h.usd,
      volume24h: marketData.total_volume.usd,
      marketCap: marketData.market_cap.usd,
      sparkline7d: marketData.sparkline_7d?.price || [],
    };
    
  } catch (error) {
    console.error(`CoinGecko Error (${symbol}):`, error.message);
    return null;
  }
}

/**
 * Holt Preise für mehrere Coins auf einmal
 * @param {Array<string>} symbols - Array von Coin-Symbolen
 * @returns {Promise<Object|null>} Map von Symbol zu Preis-Daten
 */
export async function fetchMultipleCoinGeckoPrices(symbols) {
  try {
    const ids = symbols
      .map(sym => COINGECKO_IDS[sym])
      .filter(Boolean)
      .join(',');
    
    const url = `${API_ENDPOINTS.COINGECKO}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Konvertiere zurück zu Symbol-Keys
    const results = {};
    symbols.forEach(symbol => {
      const id = COINGECKO_IDS[symbol];
      if (id && data[id]) {
        results[symbol] = {
          price: data[id].usd,
          change24h: data[id].usd_24h_change,
          marketCap: data[id].usd_market_cap,
        };
      }
    });
    
    return results;
    
  } catch (error) {
    console.error('CoinGecko Multiple Prices Error:', error.message);
    return null;
  }
}

/**
 * Holt historische Marktdaten
 * @param {string} symbol - Coin Symbol
 * @param {number} days - Anzahl Tage zurück (1, 7, 14, 30, 90, 365)
 * @returns {Promise<Array|null>} Array von [timestamp, price] oder null
 */
export async function fetchHistoricalPrices(symbol, days = 7) {
  const coinId = COINGECKO_IDS[symbol];
  
  if (!coinId) {
    console.warn(`Keine CoinGecko-ID für ${symbol} gefunden`);
    return null;
  }
  
  try {
    const url = `${API_ENDPOINTS.COINGECKO}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // data.prices ist Array von [timestamp, price]
    return data.prices || [];
    
  } catch (error) {
    console.error(`CoinGecko Historical Error (${symbol}):`, error.message);
    return null;
  }
}
