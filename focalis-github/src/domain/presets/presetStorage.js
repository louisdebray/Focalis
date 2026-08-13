import { readFromStorage, writeToStorage } from '../storage.js';

const STORAGE_KEY = 'focalis:presets';

export function loadPresets() {
  return readFromStorage(STORAGE_KEY, []);
}

function savePresets(presets) {
  writeToStorage(STORAGE_KEY, presets);
}

export function addPreset(presets, preset) {
  const next = [preset, ...presets];
  savePresets(next);
  return next;
}

export function removePreset(presets, presetId) {
  const next = presets.filter((p) => p.id !== presetId);
  savePresets(next);
  return next;
}

export function updatePreset(presets, presetId, patch) {
  const next = presets.map((p) => (p.id === presetId ? { ...p, ...patch } : p));
  savePresets(next);
  return next;
}
