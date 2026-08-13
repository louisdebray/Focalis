import { selectLens } from './rules/lensSelection.js';
import { computeAperture } from './rules/aperture.js';
import { computeShutterSpeed } from './rules/shutterSpeed.js';
import { computeExposure } from './rules/exposureBalance.js';
import { computeMode } from './rules/mode.js';
import { computeExposureCompensation } from './rules/exposureCompensation.js';
import { computeTips } from './rules/tips.js';

/**
 * Point d'entrée unique du moteur de règles : matériel + situation + rendu recherché
 * -> fiche de réglages complète. Chaque étape est une fonction pure et lisible dans rules/,
 * facile à enrichir sans toucher aux autres.
 */
export function generateRecommendation({ gear, situation, renderIntent }) {
  const lens = selectLens({ gear, situation });
  const preferredAperture = computeAperture({ gear, situation, renderIntent, lens });
  const shutterSpeed = computeShutterSpeed({ gear, situation, renderIntent, lens });
  const exposure = computeExposure({ situation, aperture: preferredAperture, shutterSpeed });
  const mode = computeMode({ situation, renderIntent });
  const exposureCompensation = computeExposureCompensation({ renderIntent });
  const tips = computeTips({ situation });

  const aperture = {
    value: exposure.aperture,
    reason: preferredAperture.reason,
    compromise: exposure.apertureCompromise,
  };
  const iso = { value: exposure.iso, reason: exposure.isoReason, compromise: exposure.isoCompromise };

  const compromises = [aperture.compromise, shutterSpeed.compromise, iso.compromise].filter(Boolean);

  if (!lens.isIdeal && lens.lensId) {
    const [eqMin, eqMax] = lens.targetEquivalentRange ?? [];
    compromises.unshift({
      limitation: `Ton objectif ne couvre pas idéalement la focale visée (~${eqMin}-${eqMax} mm éq.).`,
      advice: `On utilise ${lens.lensLabel} à ${lens.focalUsed} mm, le plus proche possible.`,
    });
  }

  return { lens, mode, aperture, shutterSpeed, iso, exposureCompensation, compromises, tips };
}
