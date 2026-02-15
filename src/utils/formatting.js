export function formatPrice(p) {
  if (!p && p !== 0) return '–';
  if (p >= 10000) return '$' + p.toLocaleString('de-DE', {maximumFractionDigits: 0});
  if (p >= 1000) return '$' + p.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  if (p >= 1) return '$' + p.toFixed(4);
  if (p >= 0.01) return '$' + p.toFixed(4);
  if (p >= 0.0001) return '$' + p.toFixed(6);
  return '$' + p.toFixed(8);
}
export function formatVolume(v) {
  if (!v) return '–';
  if (v >= 1e9) return '$' + (v/1e9).toFixed(2) + ' Mrd';
  if (v >= 1e6) return '$' + (v/1e6).toFixed(1) + ' Mio';
  return '$' + v.toFixed(0);
}
