/**
 * @file main.js
 * @description Haupteinstiegspunkt der Anwendung
 */

import { TEMP_USERS } from './config/constants.js';
import { fetchBinanceTicker } from './api/binance.js';
import { COIN_DATA } from './config/coinData.js';
import { formatPrice } from './utils/formatting.js';

// State
let currentCoin = 'XRP';

// Login
document.getElementById('loginBtn')?.addEventListener('click', () => {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  
  if (TEMP_USERS[user] && TEMP_USERS[user] === pass) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboardWrapper').style.display = 'block';
    document.getElementById('userBadge').textContent = user.toUpperCase();
    runAnalysis();
  } else {
    document.getElementById('loginError').classList.add('show');
  }
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  document.getElementById('dashboardWrapper').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
});

// Analyse
async function runAnalysis() {
  const sym = currentCoin;
  const d = COIN_DATA[sym];
  
  document.getElementById('priceValue').textContent = d.price;
  document.getElementById('stat24hH').textContent = d.h24;
  document.getElementById('stat24hL').textContent = d.l24;
  document.getElementById('heroBg').textContent = sym;
  
  // Live-Daten laden
  try {
    const ticker = await fetchBinanceTicker(sym);
    if (ticker) {
      document.getElementById('priceValue').textContent = formatPrice(ticker.price);
    }
  } catch (error) {
    console.error('Fehler beim Laden:', error);
  }
}

// Analyze Button
document.getElementById('analyzeBtn')?.addEventListener('click', runAnalysis);

// Coin Select
document.getElementById('coinSelect')?.addEventListener('change', (e) => {
  currentCoin = e.target.value;
  runAnalysis();
});

// Chips
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    currentCoin = chip.dataset.coin;
    document.getElementById('coinSelect').value = currentCoin;
    runAnalysis();
  });
});

// Clock
function updateTime() {
  const now = new Date();
  document.getElementById('timestamp').textContent = 
    now.toLocaleDateString('de-DE') + ' · ' + now.toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'});
}
setInterval(updateTime, 60000);
updateTime();

console.log('✅ Dashboard geladen');
