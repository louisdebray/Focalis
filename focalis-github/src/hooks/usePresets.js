import { useCallback, useState } from 'react';
import {
  loadPresets,
  addPreset as addPresetInStorage,
  removePreset as removePresetInStorage,
  updatePreset as updatePresetInStorage,
} from '../domain/presets/presetStorage.js';

export function usePresets() {
  const [presets, setPresets] = useState(() => loadPresets());

  const addPreset = useCallback((preset) => setPresets((prev) => addPresetInStorage(prev, preset)), []);
  const removePreset = useCallback((presetId) => setPresets((prev) => removePresetInStorage(prev, presetId)), []);
  const updatePreset = useCallback(
    (presetId, patch) => setPresets((prev) => updatePresetInStorage(prev, presetId, patch)),
    []
  );

  return { presets, addPreset, removePreset, updatePreset };
}
