import { detectLongExposureScene } from './longExposure.js';
import { widestApertureAtFocal } from './aperture.js';

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

/** Écart de cadrage toléré (35%) au-delà duquel un objectif est jugé "pas adapté du tout" à la focale visée. */
const FRAMING_TOLERANCE = 0.35;

function getDesiredEquivalentFocalRange(situation) {
  // L'astrophotographie veut du grand-angle pour cadrer le ciel, peu importe la
  // "distance au sujet" choisie (les étoiles sont toujours très lointaines).
  if (detectLongExposureScene(situation) === 'astro') return [14, 24];

  const table = FOCAL_RANGES_BY_TYPE[situation.photoType] ?? FOCAL_RANGES_BY_TYPE.autre;
  return table[situation.distance.category] ?? table.moyenne;
}

/**
 * Score un objectif candidat pour ce cadrage : l'écart de focale prime toujours (inutile
 * d'avoir une ouverture de rêve si le cadrage est impossible), mais SI le cadrage est
 * raisonnablement atteignable ET que le rendu recherché est du bokeh, l'ouverture devient
 * le critère décisif entre plusieurs objectifs qui cadrent tous correctement — c'est
 * exactement ce qui fait qu'un 25mm f/1.8 fixe l'emporte sur un zoom f/3.5-5.6 pour un
 * portrait, même si le zoom "couvre" la focale sur toute sa plage.
 */
function scoreLens(lens, targetReal, wantsWideAperture) {
  const focalUsed = Math.min(Math.max(targetReal, lens.focalMin), lens.focalMax);
  const framingError = Math.abs(focalUsed - targetReal) / targetReal;
  const apertureAtFocal = widestApertureAtFocal(lens, focalUsed);

  if (!wantsWideAperture || framingError > FRAMING_TOLERANCE) {
    // Cadrage impossible à ce point, ou l'ouverture n'a pas d'importance pour ce rendu :
    // seul l'écart de cadrage compte.
    return { focalUsed, framingError, apertureAtFocal, score: framingError };
  }

  // Cadrage acceptable pour plusieurs objectifs : celui avec l'ouverture la plus grande
  // (f/ le plus petit) l'emporte, le cadrage ne les distingue plus vraiment.
  return { focalUsed, framingError, apertureAtFocal, score: apertureAtFocal / 10 };
}

export function selectLens({ gear, situation, renderIntent }) {
  const cropFactor = gear.camera?.cropFactor ?? 1;
  const [eqMin, eqMax] = getDesiredEquivalentFocalRange(situation);
  const targetReal = (eqMin + eqMax) / 2 / cropFactor;
  const wantsWideAperture = renderIntent?.depthOfField === 'bokeh';

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

  let best = null;
  let bestResult = null;
  for (const lens of candidates) {
    const result = scoreLens(lens, targetReal, wantsWideAperture);
    if (!bestResult || result.score < bestResult.score) {
      best = lens;
      bestResult = result;
    }
  }

  const { focalUsed, framingError, apertureAtFocal } = bestResult;
  const isIdeal = framingError <= FRAMING_TOLERANCE;

  let reason;
  if (mounted) {
    reason = `Objectif du jour, utilisé à ${Math.round(focalUsed)} mm.`;
  } else if (wantsWideAperture && isIdeal) {
    reason = `La meilleure ouverture de ton sac à cette focale (f/${apertureAtFocal.toFixed(1)}) pour détacher le sujet.`;
  } else {
    reason = `Le meilleur choix de ton sac pour ce sujet, à ${Math.round(focalUsed)} mm.`;
  }

  return {
    lensId: best.id,
    lensLabel: `${best.brand} ${best.model}`,
    focalUsed: Math.round(focalUsed),
    focalUsedEquivalent: Math.round(focalUsed * cropFactor),
    reason,
    isIdeal,
    targetEquivalentRange: [eqMin, eqMax],
  };
}
