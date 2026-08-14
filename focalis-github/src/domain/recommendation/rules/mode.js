export function computeMode({ situation, renderIntent }) {
  if (renderIntent.controlStyle === 'controle') {
    return { value: 'Manuel', reason: 'Contrôle total demandé : tous les réglages sont pilotés à la main.' };
  }

  const wantsSpeedPriority = situation.movement === 'rapide' || situation.movement === 'imprevisible';

  if (wantsSpeedPriority) {
    return {
      value: 'Priorité vitesse',
      reason: 'La vitesse est le réglage le plus critique ici ; l’ISO auto gère l’exposition.',
    };
  }

  return {
    value: 'Priorité ouverture',
    reason: 'L’ouverture pilote le rendu recherché ; l’ISO auto gère l’exposition.',
  };
}
