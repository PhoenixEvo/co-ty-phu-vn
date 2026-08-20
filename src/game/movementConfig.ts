export const MOVEMENT_CONFIG = {
  stepDuration: 620,     // ms per step (ultra deliberate, rhythmic, crystal clear for all players)
  stepDelay: 250,        // ms delay before first step starts
  landingDuration: 600,  // ms landing pause before resolving space / showing action
};

/**
 * Calculates the sequential array of tile positions from startPos to targetPos,
 * correctly handling wrapping around the 40-space board (e.g. 38 -> 39 -> 0 -> 1 -> 2).
 */
export function calculateMovementPath(fromPos: number, toPos: number, totalSpaces = 40): number[] {
  if (fromPos === toPos) return [];

  const path: number[] = [];
  let curr = fromPos;

  while (curr !== toPos) {
    curr = (curr + 1) % totalSpaces;
    path.push(curr);
  }

  return path;
}
