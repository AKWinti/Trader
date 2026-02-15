/**
 * @file indicators.js
 * @description Berechnung technischer Indikatoren (RSI, MACD, Bollinger Bands, etc.)
 * @version 1.0.0
 */

import { INDICATOR_SETTINGS } from '../config/constants.js';

/**
 * Berechnet RSI (Relative Strength Index)
 * @param {number[]} prices - Array von Schlusskursen
 * @param {number} [period=14] - Periode für RSI
 * @returns {number|null} RSI-Wert (0-100) oder null bei zu wenig Daten
 */
export function calculateRSI(prices, period = INDICATOR_SETTINGS.RSI_PERIOD) {
  if (!Array.isArray(prices) || prices.length < period) {
    return null;
  }
  
  let gains = 0;
  let losses = 0;
  
  // Erste Periode: Durchschnitt berechnen
  for (let i = 1; i <= period; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }
  
  let avgGain = gains / period;
  let avgLoss = losses / period;
  
  // Weitere Perioden: Smoothed Moving Average
  for (let i = period + 1; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1];
    avgGain = (avgGain * (period - 1) + Math.max(difference, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-difference, 0)) / period;
  }
  
  if (avgLoss === 0) {
    return 100;
  }
  
  const relativeStrength = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + relativeStrength));
  
  return parseFloat(rsi.toFixed(2));
}

/**
 * Berechnet Simple Moving Average (SMA)
 * @param {number[]} prices - Array von Preisen
 * @param {number} period - Periode
 * @returns {number|null} SMA-Wert oder null
 */
export function calculateSMA(prices, period) {
  if (!Array.isArray(prices) || prices.length < period) {
    return null;
  }
  
  const slice = prices.slice(-period);
  const sum = slice.reduce((acc, price) => acc + price, 0);
  
  return sum / period;
}

/**
 * Berechnet Exponential Moving Average (EMA)
 * @param {number[]} prices - Array von Preisen
 * @param {number} period - Periode
 * @returns {number|null} EMA-Wert oder null
 */
export function calculateEMA(prices, period) {
  if (!Array.isArray(prices) || prices.length < period) {
    return null;
  }
  
  const k = 2 / (period + 1);
  
  // Initiale EMA ist SMA der ersten Periode
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
  
  // Berechne EMA für Rest
  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  
  return ema;
}

/**
 * Berechnet MACD (Moving Average Convergence Divergence)
 * @param {number[]} prices - Array von Schlusskursen
 * @param {number} [fastPeriod=12] - Schnelle EMA-Periode
 * @param {number} [slowPeriod=26] - Langsame EMA-Periode
 * @returns {number|null} MACD-Wert oder null
 */
export function calculateMACD(
  prices,
  fastPeriod = INDICATOR_SETTINGS.MACD_FAST,
  slowPeriod = INDICATOR_SETTINGS.MACD_SLOW
) {
  if (!Array.isArray(prices) || prices.length < slowPeriod) {
    return null;
  }
  
  const emaFast = calculateEMA(prices, fastPeriod);
  const emaSlow = calculateEMA(prices, slowPeriod);
  
  if (emaFast === null || emaSlow === null) {
    return null;
  }
  
  return parseFloat((emaFast - emaSlow).toFixed(6));
}

/**
 * Berechnet Williams %R
 * @param {number[]} prices - Array von Schlusskursen
 * @param {number} [period=14] - Lookback-Periode
 * @returns {number|null} Williams %R (-100 bis 0) oder null
 */
export function calculateWilliamsR(prices, period = INDICATOR_SETTINGS.WILLIAMS_PERIOD) {
  if (!Array.isArray(prices) || prices.length < period) {
    return null;
  }
  
  const slice = prices.slice(-period);
  const highest = Math.max(...slice);
  const lowest = Math.min(...slice);
  const current = prices[prices.length - 1];
  
  if (highest === lowest) {
    return -50;
  }
  
  const williamsR = ((highest - current) / (highest - lowest)) * -100;
  
  return parseFloat(williamsR.toFixed(2));
}

/**
 * Berechnet Bollinger Bands Breite
 * @param {number[]} prices - Array von Preisen
 * @param {number} [period=20] - Periode
 * @param {number} [stdDev=2] - Anzahl Standardabweichungen
 * @returns {number|null} BB-Breite (normalisiert) oder null
 */
export function calculateBollingerBands(
  prices,
  period = INDICATOR_SETTINGS.BB_PERIOD,
  stdDev = INDICATOR_SETTINGS.BB_STD_DEV
) {
  if (!Array.isArray(prices) || prices.length < period) {
    return null;
  }
  
  const slice = prices.slice(-period);
  const sma = slice.reduce((a, b) => a + b, 0) / period;
  
  // Standardabweichung berechnen
  const variance = slice.reduce((sum, price) => {
    return sum + Math.pow(price - sma, 2);
  }, 0) / period;
  
  const standardDeviation = Math.sqrt(variance);
  
  // Bollinger Band Breite (normalisiert)
  const bandwidth = (2 * stdDev * standardDeviation) / sma;
  
  return parseFloat(bandwidth.toFixed(4));
}

/**
 * Berechnet ATR (Average True Range) für Stop-Loss-Berechnung
 * @param {Array<Object>} candles - Array von Kerzen mit {high, low, close}
 * @param {number} [period=14] - Periode
 * @returns {number|null} ATR-Wert oder null
 */
export function calculateATR(candles, period = INDICATOR_SETTINGS.ATR_PERIOD) {
  if (!Array.isArray(candles) || candles.length < period + 1) {
    return null;
  }
  
  const trueRanges = [];
  
  for (let i = 1; i < candles.length; i++) {
    const high = candles[i].high;
    const low = candles[i].low;
    const prevClose = candles[i - 1].close;
    
    const tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );
    
    trueRanges.push(tr);
  }
  
  // ATR ist SMA der True Ranges
  const atr = trueRanges.slice(-period).reduce((a, b) => a + b, 0) / period;
  
  return atr;
}

/**
 * Berechnet Volumen-Ratio (aktuelles Volumen vs. Durchschnitt)
 * @param {Array<Object>} candles - Array von Kerzen mit {quoteVolume}
 * @param {number} [period=20] - Periode für Durchschnitt
 * @returns {number|null} Ratio (>1 = höher als normal) oder null
 */
export function calculateVolumeRatio(candles, period = 20) {
  if (!Array.isArray(candles) || candles.length < period + 1) {
    return null;
  }
  
  const avgVolume = candles.slice(-period - 1, -1)
    .reduce((sum, candle) => sum + candle.quoteVolume, 0) / period;
  
  const currentVolume = candles[candles.length - 1].quoteVolume;
  
  if (avgVolume === 0) {
    return 1;
  }
  
  return currentVolume / avgVolume;
}

/**
 * Interpretiert RSI-Wert
 * @param {number} rsi - RSI-Wert
 * @returns {Object} Interpretation mit Signal und Beschreibung
 */
export function interpretRSI(rsi) {
  if (rsi < INDICATOR_SETTINGS.RSI_OVERSOLD) {
    return {
      signal: 'buy',
      label: 'ÜBERVERKAUFT',
      color: '#00ff88',
      description: 'Starkes Kaufsignal - Markt ist überverkauft',
    };
  } else if (rsi > INDICATOR_SETTINGS.RSI_OVERBOUGHT) {
    return {
      signal: 'sell',
      label: 'ÜBERKAUFT',
      color: '#ff3a3a',
      description: 'Verkaufssignal - Markt ist überkauft',
    };
  } else {
    return {
      signal: 'neutral',
      label: 'NEUTRAL',
      color: '#ffd700',
      description: 'RSI im neutralen Bereich',
    };
  }
}

/**
 * Interpretiert MACD-Wert
 * @param {number} macd - MACD-Wert
 * @returns {Object} Interpretation
 */
export function interpretMACD(macd) {
  if (macd > 0) {
    return {
      signal: 'buy',
      label: 'BULLISCH',
      color: '#00ff88',
      description: 'Aufwärtstrend - bullisches Signal',
    };
  } else {
    return {
      signal: 'sell',
      label: 'BÄRISCH',
      color: '#ff3a3a',
      description: 'Abwärtstrend - bärisches Signal',
    };
  }
}

/**
 * Berechnet einfachen Support/Resistance Level
 * @param {Array<Object>} candles - Array von Kerzen
 * @param {number} lookback - Anzahl Kerzen zurück
 * @returns {Object} Support und Resistance Level
 */
export function calculateSupportResistance(candles, lookback = 48) {
  if (!Array.isArray(candles) || candles.length < lookback) {
    return { support: null, resistance: null };
  }
  
  const recent = candles.slice(-lookback);
  
  const support = Math.min(...recent.map(c => c.low));
  const resistance = Math.max(...recent.map(c => c.high));
  
  return {
    support,
    resistance,
  };
}
