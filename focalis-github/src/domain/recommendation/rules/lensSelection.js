import { detectLongExposureScene } from './longExposure.js';

/**
 * Détermine l'objectif à utiliser (parmi ceux du profil) et la focale précise à viser,
 * à partir du type de photo et de la distance au sujet.
 * Toutes les focales de cette table sont exprimées en équivalent 24x36.
 */
const FOCAL_RANGES_BY_TYPE = {
  portrait: { proche: [35, 50], moyenne: [70, 135], lointaine: [135, 200], tresLointaine: [135, 200] },
  animalier: { proche: [70, 135], moyenne: [135, 300], lointaine: [300, 500], tresLointaine: [500, 600] },
  paysage: { proche: [16, 24], moyenne: [16, 35], lointaine: [24, 35], tresLointaine: [24, 50] },
  relief: { proche: [16, 24], moyenne: [16, 35], lointaine: [24, 35], tresLointaine: [24, 50] },
  ville: { proche: [24, 35], moyenne: [24, 50], lointaine: [35, 70], tresLointaine: [70, 135] },
  architecture: { proche: [14, 24], moyenne: [16, 24], lointaine: [24, 35], tresLointaine: [35, 50] },
  sport: { proche: [24, 50], moyenne: [70, 135], lointaine: [200, 400], tresLointaine: [400, 600] },
  automobile: { proche: [24, 35], moyenne: [50, 135], lointaine: [135, 300], tresLointaine: [300, 400] },
  autre: { proche: [35, 50], moyenne: [35, 70], lointaine: [70, 135], tresLointaine: [135, 200] },
};

function getDesiredEquivalentFocalRange(situation) {
  // L'astrophotographie veut du grand-angle pour cadrer le ciel, peu importe la
  // "distance au sujet" choisie (les étoiles sont toujours très lointaines).
  if (detectLongExposureScene(situation) === 'astro') return [14, 24];

  const table = FOCAL_RANGES_BY_TYPE[situation.photoType] ?? FOCAL_RANGES_BY_TYPE.autre;
  return table[situation.distance.category] ?? table.moyenne;
}

/** Distance (en focale réelle) entre une cible et la plage couverte par l'objectif ; 0 si dans la plage. */
function distanceToRange(lens, targetFocal) {
  if (targetFocal < lens.focalMin) return lens.focalMin - targetFocal;
  if (targetFocal > lens.focalMax) return targetFocal - lens.focalMax;
  return 0;
}

export function selectLens({ gear, situation }) {
  const cropFactor = gear.camera?.cropFactor ?? 1;
  const [eqMin, eqMax] = getDesiredEquivalentFocalRange(situation);
  const targetReal = (eqMin + eqMax) / 2 / cropFactor;

  const mounted = gear.lenses.find((lens) => lens.isMounted);
  const candidates = mounted ? [mounted] : gear.lenses;

  if (candidates.length === 0) {
    return {
      lensId: null,
      lensLabel: null,
      focalUsed: Math.round(targetReal),
      focalUsedEquivalent: Math.round(targetReal * cropFactor),
      reason: 'Aucun objectif enregistré dans ton profil — voici la focale idéale à viser.',
      isIdeal: false,
      targetEquivalentRange: [eqMin, eqMax],
    };
  }

  const best = candidates.reduce((a, b) => (distanceToRange(a, targetReal) <= distanceToRange(b, targetReal) ? a : b));
  const focalUsed = Math.min(Math.max(targetReal, best.focalMin), best.focalMax);
  const gap = distanceToRange(best, targetReal);
  const isIdeal = gap < targetReal * 0.35;

  return {
    lensId: best.id,
    lensLabel: `${best.brand} ${best.model}`,
    focalUsed: Math.round(focalUsed),
    focalUsedEquivalent: Math.round(focalUsed * cropFactor),
    reason: mounted
      ? `Objectif du jour, utilisé à ${Math.round(focalUsed)} mm.`
      : `Le meilleur choix de ton sac pour ce sujet, à ${Math.round(focalUsed)} mm.`,
    isIdeal,
    targetEquivalentRange: [eqMin, eqMax],
  };
}
