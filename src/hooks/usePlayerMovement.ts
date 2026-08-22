'use client';

import { useState, useEffect, useRef } from 'react';
import { GameState } from '@/game/types';
import { MOVEMENT_CONFIG, calculateMovementPath } from '@/game/movementConfig';
import { sounds } from '@/utils/sound';

interface MovementTask {
  playerId: string;
  fromPos: number;
  toPos: number;
  isJailEscort?: boolean;
}

export function usePlayerMovement(gameState: GameState | null) {
  const [visualPositions, setVisualPositions] = useState<Record<string, number>>({});
  const [isMoving, setIsMoving] = useState(false);
  const [activeDestination, setActiveDestination] = useState<number | null>(null);
  const [steppingPlayerId, setSteppingPlayerId] = useState<string | null>(null);

  const lastKnownPositions = useRef<Record<string, number>>({});
  const movementQueue = useRef<MovementTask[]>([]);
  const isProcessingQueue = useRef(false);

  // Process the animation queue sequentially
  const processNextInQueue = () => {
    if (movementQueue.current.length === 0) {
      isProcessingQueue.current = false;
      setIsMoving(false);
      setSteppingPlayerId(null);
      setActiveDestination(null);
      return;
    }

    isProcessingQueue.current = true;
    const task = movementQueue.current.shift()!;
    const { playerId, fromPos, toPos, isJailEscort } = task;

    // Special Jail Escort: smooth fly transition from Space 30 to Space 10
    if (isJailEscort) {
      setIsMoving(true);
      setSteppingPlayerId(playerId);
      setActiveDestination(10);
      sounds.playPoliceSiren();

      // Pause at Space 30 for 600ms, then slide to Space 10
      setTimeout(() => {
        setVisualPositions(prev => ({ ...prev, [playerId]: 10 }));
        sounds.playJailSlam();

        setTimeout(() => {
          setIsMoving(false);
          setSteppingPlayerId(null);
          setActiveDestination(null);
          processNextInQueue();
        }, 800);
      }, 700);
      return;
    }

    // Direct teleport if card or general teleport
    const path = calculateMovementPath(fromPos, toPos);

    if (path.length === 0 || path.length > 20) {
      setVisualPositions(prev => ({ ...prev, [playerId]: toPos }));
      setTimeout(processNextInQueue, 150);
      return;
    }

    setIsMoving(true);
    setSteppingPlayerId(playerId);
    setActiveDestination(toPos);

    let stepIndex = 0;

    const executeStep = () => {
      if (stepIndex < path.length) {
        const currentStepPos = path[stepIndex];

        setVisualPositions(prev => ({
          ...prev,
          [playerId]: currentStepPos
        }));

        // Play step tick sound
        sounds.playDiceRoll();

        stepIndex++;
        setTimeout(executeStep, MOVEMENT_CONFIG.stepDuration);
      } else {
        // Reached destination for this task
        setSteppingPlayerId(null);

        // Landing bounce effect before moving to the next task
        setTimeout(() => {
          setActiveDestination(null);
          processNextInQueue();
        }, MOVEMENT_CONFIG.landingDuration);
      }
    };

    // Initial delay before starting the hops
    setTimeout(executeStep, MOVEMENT_CONFIG.stepDelay);
  };

  useEffect(() => {
    if (!gameState || !gameState.players.length) return;

    let hasNewTasks = false;

    // Check each player's position against their last known position
    for (const player of gameState.players) {
      const prevPos = lastKnownPositions.current[player.id];

      if (prevPos === undefined) {
        // First time seeing this player: initialize position immediately
        lastKnownPositions.current[player.id] = player.position;
        setVisualPositions(prev => ({ ...prev, [player.id]: player.position }));
      } else if (prevPos !== player.position) {
        // Did player get sent to Jail (Space 10)?
        const isSentToJail = player.inJail && player.position === 10 && prevPos !== 10;
        
        let steppedOnSpace30 = false;
        if (isSentToJail && gameState.lastDice) {
          const diceTotal = gameState.lastDice[0] + gameState.lastDice[1];
          if ((prevPos + diceTotal) % 40 === 30) {
            steppedOnSpace30 = true;
          }
        }

        if (steppedOnSpace30) {
          // STEP 1: Walk normally from prevPos to Space 30 (Go To Jail tile)
          movementQueue.current.push({
            playerId: player.id,
            fromPos: prevPos,
            toPos: 30
          });
          // STEP 2: Police arrest escort from Space 30 to Space 10 (Trại Giam)
          movementQueue.current.push({
            playerId: player.id,
            fromPos: 30,
            toPos: 10,
            isJailEscort: true
          });
        } else if (isSentToJail) {
          // Sent to jail via 3 doubles or card: Escort directly from prevPos to 10
          movementQueue.current.push({
            playerId: player.id,
            fromPos: prevPos,
            toPos: 10,
            isJailEscort: true
          });
        } else {
          // Normal step-by-step movement
          movementQueue.current.push({
            playerId: player.id,
            fromPos: prevPos,
            toPos: player.position
          });
        }

        lastKnownPositions.current[player.id] = player.position;
        hasNewTasks = true;
      }
    }

    // If there are new tasks and the processor is idle, start it
    if (hasNewTasks && !isProcessingQueue.current) {
      processNextInQueue();
    }
  }, [gameState]);

  return {
    visualPositions,
    isMoving,
    activeDestination,
    steppingPlayerId
  };
}
