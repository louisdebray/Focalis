/**
 * Détecte les scènes qui appellent une pose longue (plusieurs secondes, pas une simple
 * "vitesse lente" de quelques fractions de seconde) : astrophotographie, traînées
 * lumineuses de nuit, lissage d'eau en mouvement. Ces cas ont une physique différente
 * du filé classique — l'ouverture et l'ISO ne s'arbitrent plus contre la vitesse, la
 * pose longue est la contrainte de départ.
 */
export function detectLongExposureScene(situation) {
  const subject = (situation.subject || '').toLowerCase();
  const isNight = situation.light === 'nuit';

  if (isNight && /astro|voie lact|etoile|ciel/.test(subject)) {
    return 'astro';
  }
  if (isNight && (situation.photoType === 'ville' || situation.photoType === 'automobile')) {
    return 'lightTrails';
  }
  if (
    (situation.photoType === 'paysage' || situation.photoType === 'relief') &&
    /cascade|rivi[eè]re|riviere|chute|eau/.test(subject)
  ) {
    return 'smoothWater';
  }
  return null;
}

export const LONG_EXPOSURE_LABELS = {
  astro: 'Astrophotographie',
  lightTrails: 'Traînées lumineuses',
  smoothWater: 'Eau lissée',
};

function formatSeconds(seconds) {
  return `${Math.round(seconds)}s`;
}

/**
 * Calcule les réglages d'une scène à pose longue. Les paramètres widestAperture/
 * narrowestAperture viennent de l'objectif sélectionné ; focalEquivalent sert à la
 * règle des 500 pour l'astrophotographie (limite avant que les étoiles ne filent).
 */
export function computeLongExposure({ kind, focalEquivalent, widestAperture, narrowestAperture }) {
  if (kind === 'astro') {
    const seconds = Math.max(4, Math.min(25, Math.round(500 / Math.max(focalEquivalent, 1))));
    return {
      aperture: { value: widestAperture, reason: 'Ouverture maximale pour capter un maximum de lumière du ciel.' },
      shutterSpeed: {
        value: formatSeconds(seconds),
        denominator: 1 / seconds,
        reason: `Pose la plus longue possible avant que les étoiles ne filent (règle des 500 à ${Math.round(focalEquivalent)} mm équivalent).`,
      },
      iso: { value: 3200, reason: 'Nécessaire pour compenser la très faible lumière du ciel nocturne.' },
      mode: { value: 'Manuel', reason: 'La pose longue se règle entièrement à la main.' },
      tips: [
        'Utilise le retardateur ou une télécommande pour éviter les vibrations au déclenchement.',
        'Coupe la stabilisation optique/boîtier une fois l’appareil sur trépied.',
      ],
    };
  }

  if (kind === 'lightTrails') {
    const seconds = 8;
    return {
      aperture: {
        value: Math.min(11, narrowestAperture),
        reason: 'Ouverture fermée pour une bonne profondeur de champ et des points de lumière nets.',
      },
      shutterSpeed: {
        value: formatSeconds(seconds),
        denominator: 1 / seconds,
        reason: 'Assez long pour capter des traînées lumineuses continues.',
      },
      iso: { value: 100, reason: 'La pose longue apporte déjà toute la lumière nécessaire.' },
      mode: { value: 'Manuel', reason: 'La pose longue se règle entièrement à la main.' },
      tips: ['Déclenche pendant un flux de circulation continu pour des traînées ininterrompues.'],
    };
  }

  if (kind === 'smoothWater') {
    const seconds = 2;
    return {
      aperture: {
        value: Math.min(13, narrowestAperture),
        reason: 'Ouverture fermée pour limiter la lumière entrante sur une pose de quelques secondes.',
      },
      shutterSpeed: {
        value: formatSeconds(seconds),
        denominator: 1 / seconds,
        reason: 'Assez lent pour lisser complètement l’eau en mouvement.',
      },
      iso: { value: 100, reason: 'Le plus bas possible pour permettre une pose plus longue.' },
      mode: { value: 'Manuel', reason: 'La pose longue se règle entièrement à la main.' },
      tips: ['En plein jour, un filtre ND est presque indispensable pour ne pas surexposer à cette vitesse.'],
    };
  }

  return null;
}
