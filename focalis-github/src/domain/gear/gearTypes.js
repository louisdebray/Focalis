/**
 * @typedef {'full-frame' | 'aps-c' | 'micro43' | 'unknown'} SensorSize
 *
 * @typedef {Object} Camera
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {SensorSize} sensorSize
 * @property {number} cropFactor
 * @property {boolean} hasStabilization - stabilisation boîtier (IBIS)
 *
 * @typedef {Object} Lens
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {number} focalMin - mm réels (focale fixe: focalMin === focalMax)
 * @property {number} focalMax
 * @property {number} apertureMaxAtFocalMin - ouverture la plus grande (f/) au grand-angle/focale fixe
 * @property {number} apertureMaxAtFocalMax - ouverture la plus grande au télé (= apertureMaxAtFocalMin si fixe)
 * @property {number} apertureMin - ouverture la plus fermée dispo
 * @property {boolean} hasStabilization - stabilisation optique (OIS)
 * @property {boolean} isMounted - "objectif du jour", monté actuellement
 *
 * @typedef {Object} Tripod
 * @property {boolean} available
 * @property {number | null} maxHeightCm - hauteur max utile (sans la colonne centrale déployée)
 * @property {3 | 4 | null} legSections - nombre de brins par pied : plus il y en a, plus c'est compact mais moins stable/rapide
 *
 * @typedef {Object} GearProfile
 * @property {Camera | null} camera
 * @property {Lens[]} lenses
 * @property {Tripod} tripod
 */

export const SENSOR_CROP_FACTORS = {
  'full-frame': 1,
  'aps-c': 1.5,
  micro43: 2,
  unknown: 1,
};

export const SENSOR_SIZE_LABELS = {
  'full-frame': 'Plein format (24×36)',
  'aps-c': 'APS-C',
  micro43: 'Micro 4/3',
  unknown: 'Je ne sais pas',
};

/** @returns {Camera} */
export function createCamera({ brand, model, sensorSize = 'unknown', hasStabilization = false }) {
  return {
    id: crypto.randomUUID(),
    brand,
    model,
    sensorSize,
    cropFactor: SENSOR_CROP_FACTORS[sensorSize] ?? 1,
    hasStabilization,
  };
}

/** @returns {Lens} */
export function createLens({
  brand,
  model,
  focalMin,
  focalMax,
  apertureMaxAtFocalMin,
  apertureMaxAtFocalMax,
  apertureMin,
  hasStabilization = false,
  isMounted = false,
}) {
  return {
    id: crypto.randomUUID(),
    brand,
    model,
    focalMin,
    focalMax: focalMax ?? focalMin,
    apertureMaxAtFocalMin,
    apertureMaxAtFocalMax: apertureMaxAtFocalMax ?? apertureMaxAtFocalMin,
    apertureMin,
    hasStabilization,
    isMounted,
  };
}

export function isZoomLens(lens) {
  return lens.focalMax > lens.focalMin;
}

export function isVariableAperture(lens) {
  return lens.apertureMaxAtFocalMin !== lens.apertureMaxAtFocalMax;
}

/** @returns {Tripod} */
export function createEmptyTripod() {
  return { available: false, maxHeightCm: null, legSections: null };
}

/** @returns {GearProfile} */
export function createEmptyGearProfile() {
  return { camera: null, lenses: [], tripod: createEmptyTripod() };
}
