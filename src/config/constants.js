/**
 * @file constants.js
 * @description Zentrale Konstanten und Konfiguration für das Dashboard
 * @version 2.0
 */

// ══════════════════════════════════════════════
// API ENDPOINTS
// ══════════════════════════════════════════════

export const API_ENDPOINTS = {
  BINANCE: 'https://api.binance.com/api/v3',
  COINGECKO: 'https://api.coingecko.com/api/v3',
  FEARGREED: 'https://api.alternative.me/fng/',
  CLAUDE: 'https://api.anthropic.com/v1/messages',
};

// ══════════════════════════════════════════════
// BINANCE TRADING PAIRS
// ══════════════════════════════════════════════

export const BINANCE_SYMBOLS = {
  BTC: 'BTCUSDT',
  ETH: 'ETHUSDT',
  XRP: 'XRPUSDT',
  BNB: 'BNBUSDT',
  SOL: 'SOLUSDT',
  ADA: 'ADAUSDT',
  AVAX: 'AVAXUSDT',
  DOGE: 'DOGEUSDT',
  DOT: 'DOTUSDT',
  LINK: 'LINKUSDT',
  MATIC: 'MATICUSDT',
  UNI: 'UNIUSDT',
  ATOM: 'ATOMUSDT',
  LTC: 'LTCUSDT',
  NEAR: 'NEARUSDT',
  ARB: 'ARBUSDT',
  OP: 'OPUSDT',
  SUI: 'SUIUSDT',
  SHIB: 'SHIBUSDT',
  PEPE: 'PEPEUSDT',
  FLOKI: 'FLOKIUSDT',
};

// ══════════════════════════════════════════════
// COINGECKO IDS
// ══════════════════════════════════════════════

export const COINGECKO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  XRP: 'ripple',
  BNB: 'binancecoin',
  SOL: 'solana',
  ADA: 'cardano',
  AVAX: 'avalanche-2',
  DOGE: 'dogecoin',
  DOT: 'polkadot',
  LINK: 'chainlink',
  MATIC: 'matic-network',
  UNI: 'uniswap',
  ATOM: 'cosmos',
  LTC: 'litecoin',
  NEAR: 'near',
  ARB: 'arbitrum',
  OP: 'optimism',
  SUI: 'sui',
  SHIB: 'shiba-inu',
  PEPE: 'pepe',
  FLOKI: 'floki',
};

// ══════════════════════════════════════════════
// TECHNICAL INDICATORS
// ══════════════════════════════════════════════

export const INDICATOR_SETTINGS = {
  RSI: {
    PERIOD: 14,
    OVERSOLD: 30,
    OVERBOUGHT: 70,
  },
  MACD: {
    FAST_PERIOD: 12,
    SLOW_PERIOD: 26,
    SIGNAL_PERIOD: 9,
  },
  BOLLINGER_BANDS: {
    PERIOD: 20,
    STD_DEV_MULTIPLIER: 2,
  },
  WILLIAMS_R: {
    PERIOD: 14,
  },
  MOVING_AVERAGES: {
    MA5: 5,
    MA50: 50,
    MA200: 200,
  },
  ATR: {
    PERIOD: 14,
    STOP_LOSS_MULTIPLIER: 1.5,
    TAKE_PROFIT_1_MULTIPLIER: 2.0,
    TAKE_PROFIT_2_MULTIPLIER: 3.5,
  },
};

// ══════════════════════════════════════════════
// CHART CONFIGURATION
// ══════════════════════════════════════════════

export const CHART_CONFIG = {
  DEFAULT_RANGE: '7d',
  RESOLUTION_MULTIPLIER: window.devicePixelRatio || 1,
  HEIGHT: 280,
  PADDING: {
    TOP: 20,
    RIGHT: 70,
    BOTTOM: 42,
    LEFT: 72,
  },
  COLORS: {
    PRIMARY: '#00d4ff',
    SUCCESS: '#00ff88',
    DANGER: '#ff3a3a',
    WARNING: '#ffd700',
    ORANGE: '#ff8c00',
    BACKGROUND: '#040810',
    SURFACE: '#080f1e',
    BORDER: '#0d2a45',
    TEXT: '#c8deff',
    TEXT_DIM: '#4a6080',
  },
  GRID_ROWS: 5,
  ANIMATION: {
    DURATION: 1000,
    EASING: 'ease-in-out',
  },
};

// ══════════════════════════════════════════════
// TIME RANGES
// ══════════════════════════════════════════════

export const TIME_RANGES = {
  '3d': { points: 72, volatility: 0.018, label: 'letzte 3 Tage' },
  '7d': { points: 168, volatility: 0.022, label: 'letzte 7 Tage' },
  '30d': { points: 120, volatility: 0.04, label: 'letzte 30 Tage' },
  '3m': { points: 90, volatility: 0.07, label: 'letzte 3 Monate' },
  '1y': { points: 104, volatility: 0.12, label: 'letztes Jahr' },
  '5y': { points: 130, volatility: 0.18, label: 'letzte 5 Jahre' },
  'f24h': { points: 48, volatility: 0.012, label: 'Prognose nächste 24 Stunden' },
  'f3d': { points: 72, volatility: 0.02, label: 'Prognose nächste 3 Tage' },
  'f7d': { points: 84, volatility: 0.03, label: 'Prognose nächste 7 Tage' },
};

// ══════════════════════════════════════════════
// SIGNAL THRESHOLDS
// ══════════════════════════════════════════════

export const SIGNAL_THRESHOLDS = {
  BULL_SCORE_MIN: 3,
  BEAR_SCORE_MAX: -3,
  CONFIDENCE_HIGH: 62,
  CONFIDENCE_MEDIUM: 45,
  VOLUME_RATIO_HIGH: 1.8,
  VOLUME_RATIO_LOW: 0.5,
  PRICE_CHANGE_SIGNIFICANT: 4,
};

// ══════════════════════════════════════════════
// RISK LEVELS
// ══════════════════════════════════════════════

export const RISK_LEVELS = {
  VERY_LOW: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4,
  VERY_HIGH: 5,
};

export const RISK_LABELS = {
  [RISK_LEVELS.VERY_LOW]: 'SEHR NIEDRIG (1/5)',
  [RISK_LEVELS.LOW]: 'NIEDRIG (2/5)',
  [RISK_LEVELS.MEDIUM]: 'HOCH (3/5)',
  [RISK_LEVELS.HIGH]: 'SEHR HOCH (4/5)',
  [RISK_LEVELS.VERY_HIGH]: 'EXTREM (5/5) · NUR EXPERTEN',
};

// ══════════════════════════════════════════════
// PORTFOLIO SETTINGS
// ══════════════════════════════════════════════

export const PORTFOLIO_CONFIG = {
  DEFAULT_HORIZON: 7,
  HORIZONS: [3, 7, 30],
  SWAP_THRESHOLD: 15, // Score-Differenz für Swap-Empfehlung
  MIN_SCORE_HOLD: 62,
  MAX_SCORE_SELL: 38,
};

// ══════════════════════════════════════════════
// UI SETTINGS
// ══════════════════════════════════════════════

export const UI_CONFIG = {
  REFRESH_INTERVAL: 30000, // 30 Sekunden
  LOADING_MIN_DURATION: 500, // Mindest-Ladedauer (UX)
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  ANIMATION_DELAY_INCREMENT: 80, // ms zwischen Card-Animationen
};

// ══════════════════════════════════════════════
// AUTHENTICATION (TEMPORARY - MOVE TO BACKEND!)
// ══════════════════════════════════════════════

/**
 * ⚠️ SECURITY WARNING ⚠️
 * This is a temporary client-side authentication for demo purposes only.
 * In production, MUST implement proper backend authentication with:
 * - Password hashing (bcrypt, Argon2)
 * - JWT tokens or session cookies
 * - HTTPS only
 * - Rate limiting
 * - 2FA (recommended)
 */
export const TEMP_USERS = {
  admin: 'Admin1',
  // DO NOT add more users here - implement proper backend!
};

// ══════════════════════════════════════════════
// ERROR MESSAGES
// ══════════════════════════════════════════════

export const ERROR_MESSAGES = {
  API_TIMEOUT: 'API-Anfrage hat zu lange gedauert',
  API_UNAVAILABLE: 'API ist aktuell nicht erreichbar',
  INVALID_COIN: 'Ungültiger Coin-Symbol',
  NO_DATA: 'Keine Daten verfügbar',
  RATE_LIMIT: 'Rate Limit erreicht - bitte warten',
  AUTHENTICATION_FAILED: 'Ungültige Zugangsdaten',
  NETWORK_ERROR: 'Netzwerkfehler - bitte Verbindung prüfen',
};

// ══════════════════════════════════════════════
// FEATURE FLAGS
// ══════════════════════════════════════════════

export const FEATURES = {
  ENABLE_AI_ANALYSIS: true,
  ENABLE_PORTFOLIO: true,
  ENABLE_ORDERBOOK: true,
  ENABLE_FORECAST: true,
  ENABLE_NOTIFICATIONS: false, // Für zukünftige Implementierung
  ENABLE_DARK_MODE_TOGGLE: false, // Aktuell nur Dark Mode
};

// ══════════════════════════════════════════════
// DEVELOPMENT FLAGS
// ══════════════════════════════════════════════

export const DEV_CONFIG = {
  DEBUG_MODE: false, // true für ausführliche Console-Logs
  MOCK_API_CALLS: false, // true für lokale Entwicklung ohne APIs
  SHOW_PERFORMANCE_METRICS: false,
};
