import { selectLens } from './rules/lensSelection.js';
import { computeAperture, widestApertureAtFocal } from './rules/aperture.js';
import { computeShutterSpeed } from './rules/shutterSpeed.js';
import { computeExposure } from './rules/exposureBalance.js';
import { computeMode } from './rules/mode.js';
import { computeExposureCompensation } from './rules/exposureCompensation.js';
import { computeTips } from './rules/tips.js';
import { detectLongExposureScene, computeLongExposure } from './rules/longExposure.js';
import { round1 } from './mathUtils.js';

function lensCompromise(lens) {
  if (lens.isIdeal || !lens.lensId) return null;
  const [eqMin, eqMax] = lens.targetEquivalentRange ?? [];
  return {
    limitation: `Ton objectif ne couvre pas idéalement la focale visée (~${eqMin}-${eqMax} mm éq.).`,
    advice: `On utilise ${lens.lensLabel} à ${lens.focalUsed} mm, le plus proche possible.`,
  };
}

/**
 * Point d'entrée unique du moteur de règles : matériel + situation + rendu recherché
 * -> fiche de réglages complète. Chaque étape est une fonction pure et lisible dans rules/,
 * facile à enrichir sans toucher aux autres.
 */
export function generateRecommendation({ gear, situation, renderIntent }) {
  const lens = selectLens({ gear, situation });
  const lensObj = gear.lenses.find((l) => l.id === lens.lensId) ?? null;
  const usingTripod = situation.tripodUsedNow && gear.tripod.available;
  const longExposureKind = detectLongExposureScene(situation);

  if (longExposureKind) {
    const widest = round1(widestApertureAtFocal(lensObj, lens.focalUsed));
    const narrowest = round1(lensObj?.apertureMin ?? 16);
    const result = computeLongExposure({
      kind: longExposureKind,
      focalEquivalent: lens.focalUsedEquivalent || 50,
      widestAperture: widest,
      narrowestAperture: narrowest,
    });

    const exposureCompensation = computeExposureCompensation({ renderIntent });
    const tips = [...result.tips, ...computeTips({ situation, renderIntent })].slice(0, 4);

    const compromises = [lensCompromise(lens)].filter(Boolean);
    if (!usingTripod) {
      compromises.push({
        limitation: 'Cette pose longue nécessite un appareil parfaitement immobile.',
        advice: gear.tripod.available
          ? 'Prends ton trépied avec toi la prochaine fois, ou pose l’appareil sur un support fixe.'
          : 'Pose l’appareil sur un muret, un sac ou tout support stable — un trépied serait idéal.',
      });
    }

    return {
      lens,
      mode: result.mode,
      aperture: { ...result.aperture, compromise: null },
      shutterSpeed: { ...result.shutterSpeed, compromise: null },
      iso: { ...result.iso, compromise: null },
      exposureCompensation,
      compromises,
      tips,
      sceneKind: longExposureKind,
    };
  }

  const preferredAperture = computeAperture({ gear, situation, renderIntent, lens });
  const shutterSpeed = computeShutterSpeed({ gear, situation, renderIntent, lens });
  const exposure = computeExposure({ situation, aperture: preferredAperture, shutterSpeed });
  const mode = computeMode({ situation, renderIntent });
  const exposureCompensation = computeExposureCompensation({ renderIntent });
  const tips = computeTips({ situation, renderIntent });

  const aperture = {
    value: exposure.aperture,
    reason: preferredAperture.reason,
    compromise: exposure.apertureCompromise,
  };
  const iso = { value: exposure.iso, reason: exposure.isoReason, compromise: exposure.isoCompromise };

  const compromises = [lensCompromise(lens), aperture.compromise, shutterSpeed.compromise, iso.compromise].filter(
    Boolean
  );

  return { lens, mode, aperture, shutterSpeed, iso, exposureCompensation, compromises, tips };
}
