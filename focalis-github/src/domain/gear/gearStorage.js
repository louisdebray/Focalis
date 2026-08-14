import { readFromStorage, writeToStorage } from '../storage.js';
import { createEmptyGearProfile, createEmptyTripod } from './gearTypes.js';

const STORAGE_KEY = 'focalis:gear';

function migrateProfile(profile) {
  if (!profile.tripod) {
    return { ...profile, tripod: { ...createEmptyTripod(), available: Boolean(profile.hasTripod) } };
  }
  return profile;
}

export function loadGearProfile() {
  const profile = readFromStorage(STORAGE_KEY, null);
  return profile ? migrateProfile(profile) : createEmptyGearProfile();
}

export function saveGearProfile(profile) {
  writeToStorage(STORAGE_KEY, profile);
}

export function setCamera(profile, camera) {
  const next = { ...profile, camera };
  saveGearProfile(next);
  return next;
}

export function removeCamera(profile) {
  const next = { ...profile, camera: null };
  saveGearProfile(next);
  return next;
}

export function addLens(profile, lens) {
  const next = { ...profile, lenses: [...profile.lenses, lens] };
  saveGearProfile(next);
  return next;
}

export function updateLens(profile, lensId, patch) {
  const next = {
    ...profile,
    lenses: profile.lenses.map((lens) => (lens.id === lensId ? { ...lens, ...patch } : lens)),
  };
  saveGearProfile(next);
  return next;
}

export function removeLens(profile, lensId) {
  const next = { ...profile, lenses: profile.lenses.filter((lens) => lens.id !== lensId) };
  saveGearProfile(next);
  return next;
}

/** Un seul objectif "monté" à la fois. */
export function setMountedLens(profile, lensId) {
  const next = {
    ...profile,
    lenses: profile.lenses.map((lens) => ({ ...lens, isMounted: lens.id === lensId })),
  };
  saveGearProfile(next);
  return next;
}

export function setTripod(profile, tripod) {
  const next = { ...profile, tripod };
  saveGearProfile(next);
  return next;
}
