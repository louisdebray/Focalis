import {
  IconPortrait,
  IconAnimal,
  IconLandscape,
  IconMountain,
  IconCity,
  IconArchitecture,
  IconSport,
  IconCar,
  IconOther,
  IconDistanceNear,
  IconDistanceMedium,
  IconDistanceFar,
  IconDistanceVeryFar,
  IconMovementStatic,
  IconMovementSlow,
  IconMovementFast,
  IconMovementUnpredictable,
  IconSunny,
  IconGoldenHour,
  IconCloudy,
  IconIndoor,
  IconLowLight,
  IconNight,
  IconGlassPane,
  IconFence,
  IconBacklight,
  IconSparkle,
} from '../../components/icons/Icons.jsx';

/**
 * @typedef {Object} Situation
 * @property {string} photoType
 * @property {string} subject
 * @property {{ category: string, meters: number | null }} distance
 * @property {string} movement
 * @property {string} light
 * @property {string[]} obstacles
 * @property {boolean} tripodUsedNow
 */

export const PHOTO_TYPES = [
  { value: 'portrait', label: 'Portrait', icon: IconPortrait },
  { value: 'animalier', label: 'Animalier / zoo', icon: IconAnimal },
  { value: 'paysage', label: 'Paysage', icon: IconLandscape },
  { value: 'relief', label: 'Montagne / relief', icon: IconMountain },
  { value: 'ville', label: 'Ville', icon: IconCity },
  { value: 'architecture', label: 'Architecture', icon: IconArchitecture },
  { value: 'sport', label: 'Sport', icon: IconSport },
  { value: 'automobile', label: 'Automobile', icon: IconCar },
  { value: 'autre', label: 'Autre', icon: IconOther },
];

export const SUBJECT_SUGGESTIONS = {
  portrait: [
    'Portrait visage serré',
    'Portrait en pied',
    'Portrait en studio',
    'Portrait de rue',
    'Couple',
    'Portrait en mouvement',
  ],
  animalier: [
    'Oiseau en vol',
    'Oiseau posé',
    'Animal au zoo derrière une vitre',
    'Animal au zoo sans vitre',
    'Animal sauvage lointain',
    'Animal domestique proche',
    'Insecte / macro',
  ],
  paysage: ['Lever ou coucher de soleil', 'Montagne', 'Mer ou lac', 'Forêt', 'Cascade / rivière', 'Champ / campagne'],
  relief: ['Sommet montagneux', 'Vallée', 'Randonnée', 'Falaise', 'Glacier'],
  ville: ['Rue animée', 'Scène de nuit', 'Skyline', 'Marché / vie locale', 'Graffiti / street art'],
  architecture: ['Façade de bâtiment', 'Intérieur', 'Détail architectural', 'Escalier / lignes', 'Vitrail', 'Monument historique'],
  sport: [
    'Football',
    'Tennis',
    'Sport auto (course, rallye)',
    'Basketball',
    'Cyclisme',
    'Athlétisme',
    'Sport nautique',
    'Sport de combat',
  ],
  automobile: [
    'Voiture à l’arrêt (expo, stand)',
    'Voiture en mouvement (filé)',
    'Course automobile',
    'Détail / carrosserie',
    'Voiture de collection',
  ],
  autre: ['Macro', 'Astrophotographie', 'Événement / mariage'],
};

export const DISTANCE_OPTIONS = [
  { value: 'proche', label: 'Proche', description: '< 2 m', icon: IconDistanceNear },
  { value: 'moyenne', label: 'Moyenne', description: '2-10 m', icon: IconDistanceMedium },
  { value: 'lointaine', label: 'Lointaine', description: '> 10 m', icon: IconDistanceFar },
  { value: 'tresLointaine', label: 'Très lointaine', description: '> 50 m', icon: IconDistanceVeryFar },
];

export const MOVEMENT_OPTIONS = [
  { value: 'statique', label: 'Statique', icon: IconMovementStatic },
  { value: 'lent', label: 'Mouvement lent', icon: IconMovementSlow },
  { value: 'rapide', label: 'Mouvement rapide', icon: IconMovementFast },
  { value: 'imprevisible', label: 'Imprévisible', icon: IconMovementUnpredictable },
];

export const LIGHT_OPTIONS = [
  { value: 'pleinSoleil', label: 'Plein soleil', icon: IconSunny },
  { value: 'goldenHour', label: 'Golden hour', icon: IconGoldenHour },
  { value: 'nuageux', label: 'Nuageux', icon: IconCloudy },
  { value: 'interieurEclaire', label: 'Intérieur éclairé', icon: IconIndoor },
  { value: 'faibleLumiere', label: 'Faible lumière', icon: IconLowLight },
  { value: 'nuit', label: 'Nuit', icon: IconNight },
];

export const OBSTACLE_OPTIONS = [
  { value: 'vitre', label: 'Vitre', icon: IconGlassPane },
  { value: 'grillage', label: 'Grillage', icon: IconFence },
  { value: 'contreJour', label: 'Contre-jour', icon: IconBacklight },
  { value: 'reflets', label: 'Reflets', icon: IconSparkle },
];

/** Types de photo pour lesquels la question des obstacles est pertinente. */
export const PHOTO_TYPES_WITH_OBSTACLES = ['animalier', 'ville', 'architecture', 'sport', 'automobile'];

export function createEmptySituation() {
  return {
    photoType: '',
    subject: '',
    distance: { category: '', meters: null },
    movement: '',
    light: '',
    obstacles: [],
    tripodUsedNow: false,
  };
}
