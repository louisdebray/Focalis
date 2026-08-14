const OBSTACLE_TIPS = {
  vitre: 'Colle ton objectif contre la vitre pour éviter les reflets, et désactive le flash.',
  grillage: 'Rapproche-toi le plus possible du grillage et ouvre au maximum pour le rendre flou.',
  contreJour: 'Expose sur le sujet plutôt que sur le fond, ou joue la silhouette en exposant pour le ciel.',
  reflets: 'Change légèrement d’angle ou utilise un filtre polarisant pour réduire les reflets.',
};

/**
 * Astuces contextuelles : chaque règle précise QUAND elle s'applique (type de photo,
 * mouvement réel, rendu recherché) plutôt qu'une astuce fixe par type de photo.
 */
const CONTEXTUAL_TIPS = [
  {
    when: (s, r) => s.photoType === 'automobile' && r.motionRendering === 'file' && s.movement !== 'statique',
    tip: 'Pour un filé net, suis le mouvement du véhicule en pivotant depuis les hanches.',
  },
  {
    when: (s) => s.photoType === 'automobile' && s.movement === 'statique',
    tip: 'Change d’angle pour éviter les reflets parasites sur la carrosserie.',
  },
  {
    when: (s) => s.photoType === 'sport' && (s.movement === 'rapide' || s.movement === 'imprevisible'),
    tip: 'Anticipe la trajectoire du sujet pour déclencher juste avant l’action.',
  },
  {
    when: (s) => s.photoType === 'sport' && s.movement === 'statique',
    tip: 'Cherche un fond dégagé pour détacher l’athlète du décor.',
  },
  {
    when: (s) => s.photoType === 'animalier' && s.movement !== 'statique',
    tip: 'Passe en autofocus continu (AF-C) et en mode rafale pour ne pas rater l’instant.',
  },
  {
    when: (s) => s.photoType === 'animalier' && s.movement === 'statique',
    tip: 'Vise la mise au point sur l’œil de l’animal pour un regard vivant.',
  },
  { when: (s) => s.photoType === 'paysage', tip: 'Cherche une ligne directrice (chemin, horizon, rivière) pour renforcer la composition.' },
  { when: (s) => s.photoType === 'relief', tip: 'Place un élément au premier plan pour donner de la profondeur à la scène.' },
  { when: (s) => s.photoType === 'architecture', tip: 'Vérifie l’horizontalité et la verticalité pour éviter des lignes qui convergent mal.' },
  { when: (s) => s.photoType === 'portrait', tip: 'Place les yeux au niveau du tiers supérieur du cadre.' },
  { when: (s) => s.photoType === 'ville', tip: 'Attends que la scène se remplisse ou se vide pour renforcer ton propos.' },
  { when: (s) => s.photoType === 'autre', tip: 'Prends plusieurs images à des réglages légèrement différents pour comparer.' },
];

export function computeTips({ situation, renderIntent }) {
  const tips = [];

  situation.obstacles.forEach((obstacle) => {
    if (OBSTACLE_TIPS[obstacle]) tips.push(OBSTACLE_TIPS[obstacle]);
  });

  CONTEXTUAL_TIPS.forEach(({ when, tip }) => {
    if (when(situation, renderIntent)) tips.push(tip);
  });

  return tips.slice(0, 3);
}
