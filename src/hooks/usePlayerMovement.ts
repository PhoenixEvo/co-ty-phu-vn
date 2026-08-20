'use client';

import { useState, useEffect, useRef } from 'react';
import { Player, GameState } from '@/game/types';
import { MOVEMENT_CONFIG, calculateMovementPath } from '@/game/movementConfig';
import { sounds } from '@/utils/sound';

export function usePlayerMovement(gameState: GameState | null) {
  // Map of playerId -> current visual position on the board
  const [visualPositions, setVisualPositions] = useState<Record<string, number>>({});
  const [isMoving, setIsMoving] = useState(false);
  const [activeDestination, setActiveDestination] = useState<number | null>(null);
  const [steppingPlayerId, setSteppingPlayerId] = useState<string | null>(null);

  // Keep track of the last known positions to detect server state changes
  const prevPositionsRef = useRef<Record<string, number>>({});
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!gameState || !gameState.players.length) return;

    // Initialize visual positions if not set yet (e.g. on first load / refresh)
    if (Object.keys(prevPositionsRef.current).length === 0) {
      const initialMap: Record<string, number> = {};
      gameState.players.forEach(p => {
        initialMap[p.id] = p.position;
      });
      prevPositionsRef.current = initialMap;
      setVisualPositions(initialMap);
      return;
    }

    // Check if any player's authoritative position changed
    for (const player of gameState.players) {
      const prevPos = prevPositionsRef.current[player.id] ?? player.position;
      const targetPos = player.position;

      if (prevPos !== targetPos && !isAnimatingRef.current) {
        // Calculate intermediate hops (e.g. 8 -> 9 -> 10 -> 11 -> 12 -> 13)
        const path = calculateMovementPath(prevPos, targetPos);
        
        if (path.length > 0) {
          isAnimatingRef.current = true;
          setIsMoving(true);
          setSteppingPlayerId(player.id);
          setActiveDestination(targetPos);

          // Animate step by step
          let stepIndex = 0;

          const executeStep = () => {
            if (stepIndex < path.length) {
              const currentStepPos = path[stepIndex];

              setVisualPositions(prev => ({
                ...prev,
                [player.id]: currentStepPos
              }));

              // Small step sound
              sounds.playDiceRoll();

              stepIndex++;
              setTimeout(executeStep, MOVEMENT_CONFIG.stepDuration);
            } else {
              // Reached destination!
              prevPositionsRef.current[player.id] = targetPos;
              setSteppingPlayerId(null);
              
              // Landing pause effect
              setTimeout(() => {
                setIsMoving(false);
                setActiveDestination(null);
                isAnimatingRef.current = false;
              }, MOVEMENT_CONFIG.landingDuration);
            }
          };

          // Short delay before starting movement
          setTimeout(executeStep, MOVEMENT_CONFIG.stepDelay);
        } else {
          prevPositionsRef.current[player.id] = targetPos;
          setVisualPositions(prev => ({ ...prev, [player.id]: targetPos }));
        }
        break; // Process one movement at a time
      }
    }
  }, [gameState]);

  return {
    visualPositions,
    isMoving,
    activeDestination,
    steppingPlayerId
  };
}
