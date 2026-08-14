import { PHOTO_TYPES_WITH_OBSTACLES } from './situationTypes.js';

/**
 * Arbre de champs conditionnels : chaque étape déclare quand elle est pertinente
 * à partir des réponses déjà données. getSteps() ne retourne que les étapes
 * applicables, dans l'ordre — pas un formulaire fixe.
 *
 * La question du trépied n'est plus une étape fixe ici : c'est le moteur de
 * recommandation qui décide, une fois le rendu recherché connu, si un trépied
 * ferait une différence pour CETTE prise — voir rules/tripodAdvice.js.
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
];

export function getRelevantSteps(situation) {
  return STEP_DEFS.filter((step) => step.isRelevant(situation)).map((step) => step.id);
}

export function isSituationComplete(situation) {
  return Boolean(situation.light);
}
