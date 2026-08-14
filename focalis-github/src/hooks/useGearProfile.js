import { useCallback, useState } from 'react';
import {
  loadGearProfile,
  setCamera as setCameraInStorage,
  removeCamera as removeCameraInStorage,
  addLens as addLensInStorage,
  updateLens as updateLensInStorage,
  removeLens as removeLensInStorage,
  setMountedLens as setMountedLensInStorage,
  setTripod as setTripodInStorage,
} from '../domain/gear/gearStorage.js';

export function useGearProfile() {
  const [profile, setProfile] = useState(() => loadGearProfile());

  const setCamera = useCallback((camera) => setProfile((prev) => setCameraInStorage(prev, camera)), []);
  const removeCamera = useCallback(() => setProfile((prev) => removeCameraInStorage(prev)), []);
  const addLens = useCallback((lens) => setProfile((prev) => addLensInStorage(prev, lens)), []);
  const updateLens = useCallback(
    (lensId, patch) => setProfile((prev) => updateLensInStorage(prev, lensId, patch)),
    []
  );
  const removeLens = useCallback((lensId) => setProfile((prev) => removeLensInStorage(prev, lensId)), []);
  const setMountedLens = useCallback(
    (lensId) => setProfile((prev) => setMountedLensInStorage(prev, lensId)),
    []
  );
  const setTripod = useCallback((tripod) => setProfile((prev) => setTripodInStorage(prev, tripod)), []);

  return {
    profile,
    setCamera,
    removeCamera,
    addLens,
    updateLens,
    removeLens,
    setMountedLens,
    setTripod,
  };
}
