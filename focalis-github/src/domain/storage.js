/**
 * Petit wrapper localStorage partagé par les modules gear/presets.
 * Centralise la sérialisation JSON et la gestion d'erreurs (quota, JSON invalide).
 */
export function readFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
