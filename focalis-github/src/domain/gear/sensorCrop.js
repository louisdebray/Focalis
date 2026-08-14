/**
 * Conversion focale réelle -> focale équivalente 24x36, utile pour comparer
 * le champ de vision entre boîtiers et pour la règle des 500/300.
 */
export function toEquivalentFocal(focalMm, cropFactor) {
  return Math.round(focalMm * cropFactor);
}

export function toRealFocalFromEquivalent(equivalentMm, cropFactor) {
  return Math.round(equivalentMm / cropFactor);
}
