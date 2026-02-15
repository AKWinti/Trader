/**
 * @file chart.js
 * @description Chart-Rendering-Engine für Kursdiagramme
 * @version 1.0.0
 */

import { CHART_CONFIG, TIME_RANGES } from '../config/constants.js';
import { formatPrice, formatDate } from '../utils/formatting.js';

/**
 * Chart-Klasse für Canvas-Rendering
 */
export class CryptoChart {
  constructor(canvasId, tooltipId) {
    this.canvas = document.getElementById(canvasId);
    this.tooltip = document.getElementById(tooltipId);
    this.ctx = this.canvas.getContext('2d');
    this.currentRange = '7d';
    this.currentCoin = null;
    this.prices = [];
    this.labels = [];
    
    this.setupEventListeners();
  }
  
  /**
   * Zeichnet Chart neu
   * @param {string} coin - Coin-Symbol
   * @param {string} range - Zeitbereich
   * @param {number[]} prices - Preis-Array
   */
  draw(coin, range, prices) {
    this.currentCoin = coin;
    this.currentRange = range;
    this.prices = prices;
    this.labels = this.generateLabels(range, prices.length);
    
    this.clearCanvas();
    this.resizeCanvas();
    
    const { width, height } = this.getDimensions();
    const { top, right, bottom, left } = CHART_CONFIG.PADDING;
    
    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;
    
    // Preis-Range berechnen
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const padding = (maxPrice - minPrice) * 0.12;
    const yMin = minPrice - padding;
    const yMax = maxPrice + padding;
    
    // Helper-Funktionen für Koordinaten
    const xPos = (index) => left + (index / (prices.length - 1)) * chartWidth;
    const yPos = (price) => top + (1 - (price - yMin) / (yMax - yMin)) * chartHeight;
    
    // Hintergrund
    this.drawBackground();
    
    // Grid
    this.drawGrid(width, height, left, top, chartWidth, chartHeight);
    
    // Y-Achse Labels
    this.drawYAxis(yMin, yMax, left, top, chartHeight);
    
    // X-Achse Labels
    this.drawXAxis(left, height, bottom, chartWidth);
    
    // Forecast-Separator (wenn Prognose)
    if (range.startsWith('f')) {
      this.drawForecastLine(left, top, chartHeight);
    }
    
    // Area Fill
    this.drawArea(prices, xPos, yPos, yMin, chartHeight, range);
    
    // Price Line
    this.drawLine(prices, xPos, yPos, range);
    
    // End Dot
    this.drawEndDot(prices, xPos, yPos);
    
    // Speichere Koordinaten für Tooltip
    this.chartData = { prices, xPos, yPos, yMin, yMax, left, top, chartWidth, chartHeight };
  }
  
  /**
   * Canvas clearen
   */
  clearCanvas() {
    const { width, height } = this.getDimensions();
    this.ctx.clearRect(0, 0, width, height);
  }
  
  /**
   * Canvas-Größe anpassen (für Retina)
   */
  resizeCanvas() {
    const width = this.canvas.offsetWidth || 900;
    const height = 280;
    const dpr = CHART_CONFIG.CANVAS_RESOLUTION_MULTIPLIER;
    
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.ctx.scale(dpr, dpr);
  }
  
  /**
   * Dimensionen zurückgeben
   */
  getDimensions() {
    return {
      width: this.canvas.offsetWidth || 900,
      height: 280,
    };
  }
  
  /**
   * Hintergrund zeichnen
   */
  drawBackground() {
    // Optional: Subtiler Gradient
  }
  
  /**
   * Grid zeichnen
   */
  drawGrid(width, height, left, top, chartWidth, chartHeight) {
    this.ctx.strokeStyle = 'rgba(13,42,69,0.7)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash(CHART_CONFIG.GRID_DASH);
    
    for (let i = 0; i <= CHART_CONFIG.GRID_ROWS; i++) {
      const y = top + (i / CHART_CONFIG.GRID_ROWS) * chartHeight;
      this.ctx.beginPath();
      this.ctx.moveTo(left, y);
      this.ctx.lineTo(left + chartWidth, y);
      this.ctx.stroke();
    }
    
    this.ctx.setLineDash([]);
  }
  
  /**
   * Y-Achse Labels
   */
  drawYAxis(yMin, yMax, left, top, chartHeight) {
    this.ctx.font = '10px Share Tech Mono, monospace';
    this.ctx.fillStyle = CHART_CONFIG.COLORS.TEXT_DIM;
    this.ctx.textAlign = 'right';
    
    for (let i = 0; i <= CHART_CONFIG.GRID_ROWS; i++) {
      const value = yMax - i * (yMax - yMin) / CHART_CONFIG.GRID_ROWS;
      const y = top + (i / CHART_CONFIG.GRID_ROWS) * chartHeight;
      const label = formatPrice(value);
      this.ctx.fillText(label, left - 8, y + 4);
    }
  }
  
  /**
   * X-Achse Labels
   */
  drawXAxis(left, height, bottom, chartWidth) {
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = CHART_CONFIG.COLORS.TEXT_DIM;
    
    this.labels.forEach((label, i) => {
      if (label) {
        const x = left + (i / (this.labels.length - 1)) * chartWidth;
        this.ctx.fillText(label, x, height - bottom + 18);
      }
    });
  }
  
  /**
   * Forecast-Trennlinie
   */
  drawForecastLine(left, top, chartHeight) {
    this.ctx.strokeStyle = 'rgba(255,140,0,0.4)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([6, 4]);
    this.ctx.beginPath();
    this.ctx.moveTo(left, top);
    this.ctx.lineTo(left, top + chartHeight);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    
    this.ctx.font = '9px Share Tech Mono, monospace';
    this.ctx.fillStyle = 'rgba(255,140,0,0.7)';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('JETZT', left, top - 6);
  }
  
  /**
   * Area Fill zeichnen
   */
  drawArea(prices, xPos, yPos, yMin, chartHeight, range) {
    const { top } = CHART_CONFIG.PADDING;
    const isForecast = range.startsWith('f');
    const isUp = prices[prices.length - 1] >= prices[0];
    
    const gradient = this.ctx.createLinearGradient(0, top, 0, top + chartHeight);
    
    if (isForecast) {
      gradient.addColorStop(0, 'rgba(255,140,0,0.18)');
      gradient.addColorStop(1, 'rgba(255,140,0,0.01)');
    } else {
      if (isUp) {
        gradient.addColorStop(0, 'rgba(0,212,255,0.2)');
        gradient.addColorStop(1, 'rgba(0,212,255,0.01)');
      } else {
        gradient.addColorStop(0, 'rgba(255,58,58,0.15)');
        gradient.addColorStop(1, 'rgba(255,58,58,0.01)');
      }
    }
    
    this.ctx.beginPath();
    this.ctx.moveTo(xPos(0), yPos(prices[0]));
    
    for (let i = 1; i < prices.length; i++) {
      const xc = (xPos(i - 1) + xPos(i)) / 2;
      const yc = (yPos(prices[i - 1]) + yPos(prices[i])) / 2;
      this.ctx.quadraticCurveTo(xPos(i - 1), yPos(prices[i - 1]), xc, yc);
    }
    
    this.ctx.lineTo(xPos(prices.length - 1), yPos(prices[prices.length - 1]));
    this.ctx.lineTo(xPos(prices.length - 1), yPos(yMin));
    this.ctx.lineTo(xPos(0), yPos(yMin));
    this.ctx.closePath();
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
  
  /**
   * Preis-Linie zeichnen
   */
  drawLine(prices, xPos, yPos, range) {
    const isForecast = range.startsWith('f');
    const isUp = prices[prices.length - 1] >= prices[0];
    const lineColor = isForecast 
      ? CHART_CONFIG.COLORS.ORANGE 
      : (isUp ? CHART_CONFIG.COLORS.PRIMARY : CHART_CONFIG.COLORS.DANGER);
    
    this.ctx.beginPath();
    this.ctx.moveTo(xPos(0), yPos(prices[0]));
    
    for (let i = 1; i < prices.length; i++) {
      const xc = (xPos(i - 1) + xPos(i)) / 2;
      const yc = (yPos(prices[i - 1]) + yPos(prices[i])) / 2;
      this.ctx.quadraticCurveTo(xPos(i - 1), yPos(prices[i - 1]), xc, yc);
    }
    
    this.ctx.lineTo(xPos(prices.length - 1), yPos(prices[prices.length - 1]));
    
    if (isForecast) {
      this.ctx.setLineDash([8, 5]);
    }
    
    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }
  
  /**
   * End-Punkt zeichnen
   */
  drawEndDot(prices, xPos, yPos) {
    const lastX = xPos(prices.length - 1);
    const lastY = yPos(prices[prices.length - 1]);
    const isForecast = this.currentRange.startsWith('f');
    const isUp = prices[prices.length - 1] >= prices[0];
    const color = isForecast 
      ? CHART_CONFIG.COLORS.ORANGE 
      : (isUp ? CHART_CONFIG.COLORS.PRIMARY : CHART_CONFIG.COLORS.DANGER);
    
    // Innerer Punkt
    this.ctx.beginPath();
    this.ctx.arc(lastX, lastY, CHART_CONFIG.DOT_RADIUS, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle = '#040810';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Äußerer Ring
    this.ctx.beginPath();
    this.ctx.arc(lastX, lastY, 10, 0, Math.PI * 2);
    this.ctx.strokeStyle = color.replace(')', ',0.4)').replace('rgb', 'rgba');
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
  }
  
  /**
   * Labels generieren für X-Achse
   */
  generateLabels(range, count) {
    const now = new Date();
    const labels = [];
    const config = TIME_RANGES[range];
    
    for (let i = 0; i < count; i++) {
      // Nur an bestimmten Stellen Label zeigen
      if (i % Math.floor(count / 6) === 0) {
        labels.push(formatDate(now, 'short'));
      } else {
        labels.push('');
      }
    }
    
    return labels;
  }
  
  /**
   * Event-Listener setup
   */
  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
  }
  
  /**
   * Mouse-Move Handler
   */
  handleMouseMove(e) {
    if (!this.chartData) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const { left, chartWidth, prices, xPos, yPos } = this.chartData;
    
    const relX = mouseX - left;
    
    if (relX < 0 || relX > chartWidth) {
      this.tooltip.style.opacity = '0';
      return;
    }
    
    const index = Math.round((relX / chartWidth) * (prices.length - 1));
    
    if (index < 0 || index >= prices.length) return;
    
    const price = prices[index];
    const pct = index > 0 
      ? ((price - prices[0]) / prices[0] * 100).toFixed(2) 
      : '0.00';
    const sign = parseFloat(pct) >= 0 ? '+' : '';
    const color = parseFloat(pct) >= 0 ? '#00ff88' : '#ff3a3a';
    
    // Tooltip-Content
    this.tooltip.innerHTML = `
      <span style="color:${CHART_CONFIG.COLORS.PRIMARY};font-size:10px;">${this.labels[index] || '–'}</span><br>
      <span style="font-size:13px;font-weight:700;">${formatPrice(price)}</span>
      <span style="color:${color};margin-left:6px;">${sign}${pct}%</span>
    `;
    
    // Position
    const tx = mouseX + 14;
    const ty = e.clientY - rect.top - 30;
    const { width } = this.getDimensions();
    
    this.tooltip.style.left = (tx + 120 > width ? tx - 140 : tx) + 'px';
    this.tooltip.style.top = Math.max(0, ty) + 'px';
    this.tooltip.style.opacity = '1';
    
    // Crosshair zeichnen
    this.draw(this.currentCoin, this.currentRange, this.prices);
    this.drawCrosshair(index);
  }
  
  /**
   * Crosshair zeichnen
   */
  drawCrosshair(index) {
    if (!this.chartData) return;
    
    const { xPos, yPos, prices, left, top, chartWidth, chartHeight } = this.chartData;
    
    this.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);
    
    const x = xPos(index);
    const y = yPos(prices[index]);
    
    // Vertikale Linie
    this.ctx.beginPath();
    this.ctx.moveTo(x, top);
    this.ctx.lineTo(x, top + chartHeight);
    this.ctx.stroke();
    
    // Horizontale Linie
    this.ctx.beginPath();
    this.ctx.moveTo(left, y);
    this.ctx.lineTo(left + chartWidth, y);
    this.ctx.stroke();
    
    this.ctx.setLineDash([]);
    
    // Punkt
    const isForecast = this.currentRange.startsWith('f');
    const isUp = prices[prices.length - 1] >= prices[0];
    const color = isForecast 
      ? CHART_CONFIG.COLORS.ORANGE 
      : (isUp ? CHART_CONFIG.COLORS.PRIMARY : CHART_CONFIG.COLORS.DANGER);
    
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
  
  /**
   * Mouse-Leave Handler
   */
  handleMouseLeave() {
    this.tooltip.style.opacity = '0';
    this.draw(this.currentCoin, this.currentRange, this.prices);
  }
}
