export function round1(n) {
  return Math.round(n * 10) / 10;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export const MOVEMENT_LABELS = {
  statique: 'statique',
  lent: 'lent',
  rapide: 'rapide',
  imprevisible: 'imprévisible',
};
