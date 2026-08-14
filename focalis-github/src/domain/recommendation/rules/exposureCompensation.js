export function computeExposureCompensation({ renderIntent }) {
  if (renderIntent.mood === 'sombre') {
    return { value: -0.7, reason: 'Assombrit légèrement pour renforcer le contraste recherché.' };
  }
  return { value: 0.7, reason: 'Éclaircit légèrement pour une ambiance douce et aérée.' };
}
