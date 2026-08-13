import { MOVEMENT_LABELS } from '../mathUtils.js';

/** Facteur de marge accordé par la stabilisation, en "stops" équivalents. */
const STABILIZATION_FACTOR = 4;

const FIGE_DENOMINATOR_BY_MOVEMENT = { statique: 125, lent: 250, rapide: 1000, imprevisible: 2000 };
/** Pour le filé, la valeur est le dénominateur de la vitesse recherchée (1/x) — plus petit x = plus de flou. */
const FILE_DENOMINATOR_BY_MOVEMENT = { statique: 4, lent: 15, rapide: 60, imprevisible: 125 };

function formatShutter(denominator) {
  return `1/${Math.max(1, Math.round(denominator))}`;
}

export function computeShutterSpeed({ gear, situation, renderIntent, lens }) {
  const focalEquivalent = lens.focalUsedEquivalent || 50;
  const lensObj = gear.lenses.find((l) => l.id === lens.lensId) ?? null;
  const hasStabilization = Boolean(gear.camera?.hasStabilization) || Boolean(lensObj?.hasStabilization);
  const usingTripod = situation.tripodUsedNow && gear.tripod.available;

  const handheldMinDenominator = hasStabilization ? focalEquivalent / STABILIZATION_FACTOR : focalEquivalent;

  if (renderIntent.motionRendering === 'fige') {
    const target = FIGE_DENOMINATOR_BY_MOVEMENT[situation.movement] ?? 250;
    const value = usingTripod ? target : Math.max(target, handheldMinDenominator);
    return {
      value: formatShutter(value),
      denominator: value,
      reason: `Assez rapide pour figer un mouvement ${MOVEMENT_LABELS[situation.movement] ?? ''}.`,
      compromise: null,
    };
  }

  const targetDenominator = FILE_DENOMINATOR_BY_MOVEMENT[situation.movement] ?? 30;

  if (usingTripod) {
    return {
      value: formatShutter(targetDenominator),
      denominator: targetDenominator,
      reason: 'Vitesse lente pour lisser le mouvement, stabilisée par le trépied.',
      compromise: null,
    };
  }

  if (targetDenominator < handheldMinDenominator) {
    return {
      value: formatShutter(handheldMinDenominator),
      denominator: handheldMinDenominator,
      reason: 'Vitesse la plus lente tenable à main levée pour ce filé.',
      compromise: {
        limitation: 'Sans trépied, tu ne pourras pas lisser complètement le mouvement à cette focale.',
        advice: 'Cale-toi contre un appui fixe, ou pose l’appareil quelque part pour un filé plus marqué.',
      },
    };
  }

  return {
    value: formatShutter(targetDenominator),
    denominator: targetDenominator,
    reason: 'Vitesse lente pour lisser le mouvement.',
    compromise: null,
  };
}
