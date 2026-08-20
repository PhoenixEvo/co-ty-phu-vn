export const MOVEMENT_CONFIG = {
  stepDuration: 200, // ms per step
  stepDelay: 50,     // ms pause between steps
  landingDuration: 250, // ms landing bounce effect
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
