import { PHOTO_TYPES_WITH_OBSTACLES } from './situationTypes.js';

/**
 * Arbre de champs conditionnels : chaque étape déclare quand elle est pertinente
 * à partir des réponses déjà données. getSteps() ne retourne que les étapes
 * applicables, dans l'ordre — pas un formulaire fixe.
 */
const STEP_DEFS = [
  { id: 'photoType', isRelevant: () => true },
  { id: 'subject', isRelevant: (s) => Boolean(s.photoType) },
  { id: 'distance', isRelevant: (s) => Boolean(s.photoType) },
  { id: 'movement', isRelevant: (s) => Boolean(s.distance.category) },
  { id: 'light', isRelevant: (s) => Boolean(s.movement) },
  {
    id: 'obstacles',
    isRelevant: (s) => Boolean(s.light) && PHOTO_TYPES_WITH_OBSTACLES.includes(s.photoType),
  },
  { id: 'tripodUsedNow', isRelevant: (s) => Boolean(s.light) },
];

export function getRelevantSteps(situation) {
  return STEP_DEFS.filter((step) => step.isRelevant(situation)).map((step) => step.id);
}

export function isSituationComplete(situation) {
  const steps = getRelevantSteps(situation);
  return steps[steps.length - 1] === 'tripodUsedNow' && Boolean(situation.light);
}
