const OBSTACLE_TIPS = {
  vitre: 'Colle ton objectif contre la vitre pour éviter les reflets, et désactive le flash.',
  grillage: 'Rapproche-toi le plus possible du grillage et ouvre au maximum pour le rendre flou.',
  contreJour: 'Expose sur le sujet plutôt que sur le fond, ou joue la silhouette en exposant pour le ciel.',
  reflets: 'Change légèrement d’angle ou utilise un filtre polarisant pour réduire les reflets.',
};

const PHOTO_TYPE_TIPS = {
  paysage: 'Cherche une ligne directrice (chemin, horizon, rivière) pour renforcer la composition.',
  relief: 'Place un élément au premier plan pour donner de la profondeur à la scène.',
  architecture: 'Vérifie l’horizontalité et la verticalité pour éviter des lignes qui convergent mal.',
  portrait: 'Place les yeux au niveau du tiers supérieur du cadre.',
  animalier: 'Passe en autofocus continu (AF-C) et en mode rafale pour ne pas rater l’instant.',
  sport: 'Anticipe la trajectoire du sujet pour déclencher juste avant l’action.',
  automobile: 'Pour un filé net, suis le mouvement du véhicule en pivotant depuis les hanches.',
  ville: 'Attends que la scène se remplisse ou se vide pour renforcer ton propos.',
  autre: 'Prends plusieurs images à des réglages légèrement différents pour comparer.',
};

export function computeTips({ situation }) {
  const tips = [];
  situation.obstacles.forEach((obstacle) => {
    if (OBSTACLE_TIPS[obstacle]) tips.push(OBSTACLE_TIPS[obstacle]);
  });
  if (PHOTO_TYPE_TIPS[situation.photoType]) tips.push(PHOTO_TYPE_TIPS[situation.photoType]);
  return tips.slice(0, 3);
}
