/**
 * @file feargreed.js
 * @description Fear & Greed Index API Client
 * @version 1.0.0
 */

import { API_ENDPOINTS } from '../config/constants.js';

/**
 * Holt den aktuellen Fear & Greed Index
 * @returns {Promise<Object|null>} Index-Daten oder null bei Fehler
 * @property {number} value - Index-Wert (0-100)
 * @property {string} label - Klassifikation (z.B. "Extreme Fear", "Greed")
 */
export async function fetchFearGreedIndex() {
  try {
    const url = `${API_ENDPOINTS.FEARGREED}?limit=1`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      throw new Error('Keine Fear & Greed Daten verfügbar');
    }
    
    const latest = data.data[0];
    
    return {
      value: parseInt(latest.value),
      label: latest.value_classification,
      timestamp: parseInt(latest.timestamp),
    };
    
  } catch (error) {
    console.error('Fear & Greed Index Error:', error.message);
    return null;
  }
}

/**
 * Holt historische Fear & Greed Werte
 * @param {number} limit - Anzahl historischer Werte (max 365)
 * @returns {Promise<Array|null>} Array von historischen Werten
 */
export async function fetchFearGreedHistory(limit = 30) {
  try {
    const url = `${API_ENDPOINTS.FEARGREED}?limit=${limit}`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.data.map(entry => ({
      value: parseInt(entry.value),
      label: entry.value_classification,
      timestamp: parseInt(entry.timestamp),
    }));
    
  } catch (error) {
    console.error('Fear & Greed History Error:', error.message);
    return null;
  }
}

/**
 * Interpretiert Fear & Greed Wert
 * @param {number} value - Index-Wert (0-100)
 * @returns {Object} Interpretation mit Farbe und Signal
 */
export function interpretFearGreed(value) {
  if (value < 25) {
    return {
      sentiment: 'extreme_fear',
      label: 'EXTREME ANGST',
      color: '#ff3a3a',
      signal: 'buy',
      description: 'Markt ist extrem ängstlich - potenzielle Kaufgelegenheit',
    };
  } else if (value < 45) {
    return {
      sentiment: 'fear',
      label: 'ANGST',
      color: '#ff8c00',
      signal: 'buy',
      description: 'Markt ist ängstlich - vorsichtige Käufe möglich',
    };
  } else if (value < 55) {
    return {
      sentiment: 'neutral',
      label: 'NEUTRAL',
      color: '#ffd700',
      signal: 'neutral',
      description: 'Markt ist ausgeglichen',
    };
  } else if (value < 75) {
    return {
      sentiment: 'greed',
      label: 'GIER',
      color: '#00d4ff',
      signal: 'sell',
      description: 'Markt wird gierig - Vorsicht vor Überhitzung',
    };
  } else {
    return {
      sentiment: 'extreme_greed',
      label: 'EXTREME GIER',
      color: '#00ff88',
      signal: 'sell',
      description: 'Markt ist extrem gierig - Korrektur wahrscheinlich',
    };
  }
}
