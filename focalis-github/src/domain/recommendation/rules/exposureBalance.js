import { round1 } from '../mathUtils.js';

/** EV approximatif à ISO 100 pour chaque condition de lumière. */
const LIGHT_EV_AT_ISO100 = {
  pleinSoleil: 15,
  goldenHour: 13,
  nuageux: 12,
  interieurEclaire: 8,
  faibleLumiere: 5,
  nuit: 2,
};

const STANDARD_ISOS = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200];

/** Sensibilité "propre" au-delà de laquelle on préfère rouvrir le diaphragme plutôt que monter en ISO. */
const COMFORT_ISO_CEILING = 1600;
/** Sensibilité au-delà de laquelle, même à pleine ouverture, on prévient d'un bruit visible. */
const NOISY_ISO_THRESHOLD = 6400;

function roundToStandardIso(iso) {
  return STANDARD_ISOS.reduce((closest, candidate) =>
    Math.abs(candidate - iso) < Math.abs(closest - iso) ? candidate : closest
  );
}

function isoNeededFor(aperture, shutterDenominator, ev) {
  const seconds = 1 / shutterDenominator;
  const evNeeded = Math.log2((aperture * aperture) / seconds);
  const stops = evNeeded - ev;
  return Math.max(100, 100 * Math.pow(2, stops));
}

/**
 * Arbitre l'ouverture finale et l'ISO ensemble : plutôt que de garder l'ouverture visée
 * et laisser l'ISO grimper sans limite, on rouvre le diaphragme (dans la limite de l'objectif)
 * pour rester sous un ISO "propre", et seulement si ça ne suffit pas on accepte un ISO élevé.
 */
export function computeExposure({ situation, aperture, shutterSpeed }) {
  const ev = LIGHT_EV_AT_ISO100[situation.light] ?? 10;
  const denom = shutterSpeed.denominator;

  const rawIsoAtTarget = isoNeededFor(aperture.value, denom, ev);

  if (aperture.isBokeh || rawIsoAtTarget <= COMFORT_ISO_CEILING) {
    const value = roundToStandardIso(rawIsoAtTarget);
    return {
      aperture: aperture.value,
      apertureCompromise: null,
      iso: value,
      isoReason: value <= 400 ? 'Lumière suffisante pour rester propre.' : 'Nécessaire pour bien exposer avec ces réglages.',
      isoCompromise:
        value >= NOISY_ISO_THRESHOLD
          ? {
              limitation: 'La lumière disponible est insuffisante même à pleine ouverture.',
              advice: `ISO ${value} : attends-toi à du bruit visible, ou ralentis la vitesse si le sujet le permet.`,
            }
          : null,
    };
  }

  // On rouvre le diaphragme pour limiter l'ISO, sans dépasser l'ouverture maximale de l'objectif.
  const seconds = 1 / denom;
  const apertureForCeiling = Math.sqrt((COMFORT_ISO_CEILING * seconds * Math.pow(2, ev)) / 100);
  const finalAperture = round1(Math.min(aperture.value, Math.max(aperture.widest, apertureForCeiling)));
  const finalIso = roundToStandardIso(Math.max(100, isoNeededFor(finalAperture, denom, ev)));

  const apertureCompromise =
    finalAperture < aperture.value
      ? {
          limitation: 'Lumière trop faible pour garder une grande profondeur de champ à cette vitesse.',
          advice: `Ouverture élargie à f/${finalAperture} (au lieu de f/${aperture.value}) pour limiter la sensibilité.`,
        }
      : null;

  const isoCompromise =
    finalIso >= NOISY_ISO_THRESHOLD
      ? {
          limitation: 'Même à pleine ouverture, la lumière disponible reste insuffisante.',
          advice: `ISO ${finalIso} : attends-toi à du bruit visible, ou ralentis la vitesse si le sujet le permet.`,
        }
      : null;

  return {
    aperture: finalAperture,
    apertureCompromise,
    iso: finalIso,
    isoReason: 'Compromis nécessaire pour bien exposer avec une lumière faible.',
    isoCompromise,
  };
}
