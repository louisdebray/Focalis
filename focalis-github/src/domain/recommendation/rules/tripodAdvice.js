import { selectLens } from './lensSelection.js';
import { STABILIZATION_FACTOR, FILE_DENOMINATOR_BY_MOVEMENT } from './shutterSpeed.js';
import { detectLongExposureScene } from './longExposure.js';

/**
 * Est-ce qu'un trépied ferait une différence réelle sur cette prise de vue ?
 * Sert à décider si on demande à l'utilisateur s'il l'a sur lui, plutôt que de
 * poser la question systématiquement peu importe la situation.
 */
export function isTripodRecommended({ gear, situation, renderIntent }) {
  if (detectLongExposureScene(situation)) return true;
  if (renderIntent.motionRendering !== 'file') return false;

  const lens = selectLens({ gear, situation });
  const focalEquivalent = lens.focalUsedEquivalent || 50;
  const lensObj = gear.lenses.find((l) => l.id === lens.lensId) ?? null;
  const hasStabilization = Boolean(gear.camera?.hasStabilization) || Boolean(lensObj?.hasStabilization);
  const handheldMinDenominator = hasStabilization ? focalEquivalent / STABILIZATION_FACTOR : focalEquivalent;
  const targetDenominator = FILE_DENOMINATOR_BY_MOVEMENT[situation.movement] ?? 30;

  return targetDenominator < handheldMinDenominator;
}
