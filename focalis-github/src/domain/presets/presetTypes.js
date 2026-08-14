/**
 * @typedef {Object} Preset
 * @property {string} id
 * @property {string} name
 * @property {string} photoType
 * @property {import('../situation/situationTypes.js').Situation} situation
 * @property {import('../rendering/renderIntents.js').RenderIntent} renderIntent
 * @property {Object} recommendation - fiche de réglages générée au moment de la sauvegarde
 * @property {string} note
 * @property {number} rating - -1 (n'a pas marché) | 0 (pas noté) | 1 (a bien marché)
 * @property {number} createdAt
 */

export function createPreset({ name, situation, renderIntent, recommendation, note }) {
  return {
    id: crypto.randomUUID(),
    name,
    photoType: situation.photoType,
    situation,
    renderIntent,
    recommendation,
    note: note ?? '',
    rating: 0,
    createdAt: Date.now(),
  };
}
