import { round1, clamp } from '../mathUtils.js';

const NET_TOTAL_TARGET_BY_TYPE = {
  portrait: 8,
  animalier: 8,
  paysage: 8,
  relief: 8,
  ville: 8,
  architecture: 10,
  sport: 8,
  automobile: 8,
  autre: 8,
};

/** Ouverture la plus grande (f/ le plus petit) disponible sur l'objectif à une focale donnée. */
export function widestApertureAtFocal(lens, focal) {
  if (!lens) return 4;
  if (lens.focalMax === lens.focalMin) return lens.apertureMaxAtFocalMin;
  const t = (focal - lens.focalMin) / (lens.focalMax - lens.focalMin);
  return lens.apertureMaxAtFocalMin + t * (lens.apertureMaxAtFocalMax - lens.apertureMaxAtFocalMin);
}

/**
 * Calcule l'ouverture "préférée" (visée) selon le rendu recherché, ainsi que les bornes
 * de l'objectif. La décision finale (arbitrage avec l'ISO selon la lumière) est faite
 * par exposureBalance.js — cette règle ne connaît que l'intention créative, pas la lumière.
 */
export function computeAperture({ gear, situation, renderIntent, lens }) {
  const lensObj = gear.lenses.find((l) => l.id === lens.lensId) ?? null;
  const widest = round1(widestApertureAtFocal(lensObj, lens.focalUsed));
  const narrowest = round1(lensObj?.apertureMin ?? 22);

  if (renderIntent.depthOfField === 'bokeh') {
    return {
      value: widest,
      widest,
      narrowest,
      isBokeh: true,
      reason: 'Ouverture la plus grande possible pour détacher le sujet du fond.',
    };
  }

  const target = NET_TOTAL_TARGET_BY_TYPE[situation.photoType] ?? 8;
  const value = round1(clamp(target, widest, narrowest));

  return {
    value,
    widest,
    narrowest,
    isBokeh: false,
    reason: 'Grande profondeur de champ pour garder la scène nette du premier plan à l’arrière-plan.',
  };
}
