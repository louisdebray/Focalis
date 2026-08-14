import {
  IconBokeh,
  IconDeepFocus,
  IconMotionBlur,
  IconFrozen,
  IconContrast,
  IconAiry,
  IconSpontaneous,
  IconManualControl,
} from '../../components/icons/Icons.jsx';

/**
 * @typedef {Object} RenderIntent
 * @property {'bokeh' | 'netTotal'} depthOfField
 * @property {'file' | 'fige'} motionRendering
 * @property {'sombre' | 'lumineuse'} mood
 * @property {'spontane' | 'controle'} controlStyle
 */

export const DEPTH_OF_FIELD_OPTIONS = [
  { value: 'bokeh', label: 'Bokeh', description: 'Arrière-plan flou, sujet détaché', icon: IconBokeh },
  { value: 'netTotal', label: 'Tout net', description: 'Grande profondeur de champ', icon: IconDeepFocus },
];

export const MOTION_RENDERING_OPTIONS = [
  { value: 'file', label: 'Filé', description: 'Eau lissée, panning, traînées', icon: IconMotionBlur },
  { value: 'fige', label: 'Figé net', description: 'Mouvement arrêté net', icon: IconFrozen },
];

export const MOOD_OPTIONS = [
  { value: 'sombre', label: 'Sombre et contrasté', description: 'Ambiance dramatique', icon: IconContrast },
  { value: 'lumineuse', label: 'Lumineuse et aérée', description: 'Ambiance douce, claire', icon: IconAiry },
];

export const CONTROL_STYLE_OPTIONS = [
  { value: 'spontane', label: 'Spontané', description: 'Rapide, moins de contrôle manuel', icon: IconSpontaneous },
  { value: 'controle', label: 'Contrôle total', description: 'Mode manuel, réglages précis', icon: IconManualControl },
];

export function createEmptyRenderIntent() {
  return { depthOfField: '', motionRendering: '', mood: '', controlStyle: '' };
}

export function isRenderIntentComplete(renderIntent) {
  return Boolean(
    renderIntent.depthOfField && renderIntent.motionRendering && renderIntent.mood && renderIntent.controlStyle
  );
}
