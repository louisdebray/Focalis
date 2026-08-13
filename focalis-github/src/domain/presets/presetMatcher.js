/**
 * Score de similarité entre deux situations. Le type de photo est éliminatoire :
 * deux situations de types différents ne sont jamais considérées comme proches.
 */
function similarityScore(a, b) {
  if (a.photoType !== b.photoType) return 0;
  let score = 4;
  if (a.distance.category === b.distance.category) score += 2;
  if (a.movement === b.movement) score += 1;
  if (a.light === b.light) score += 1;

  const bObstacles = new Set(b.obstacles);
  const overlap = a.obstacles.filter((o) => bObstacles.has(o)).length;
  score += overlap * 0.5;

  return score;
}

const MATCH_THRESHOLD = 5;

/**
 * Trouve le preset le plus proche d'une situation donnée, en favorisant légèrement
 * ceux notés comme ayant bien fonctionné (pondération simple, pas de vrai ML).
 */
export function findMatchingPreset(situation, presets) {
  let best = null;
  let bestScore = 0;

  for (const preset of presets) {
    const score = similarityScore(situation, preset.situation) + preset.rating * 0.3;
    if (score > bestScore) {
      bestScore = score;
      best = preset;
    }
  }

  return bestScore >= MATCH_THRESHOLD ? best : null;
}
