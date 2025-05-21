import { getMoveTowardsFood } from '../foodTargeting.js';

describe('getMoveTowardsFood', () => {
  const createGameState = (head, food) => ({
    you: { body: [head] },
    board: { food }
  });

  test('returns correct move towards food (right)', () => {
    const gameState = createGameState({ x: 2, y: 2 }, [{ x: 4, y: 2 }]);
    const safeMoves = ['right', 'up', 'down'];
    const move = getMoveTowardsFood(gameState, safeMoves);
    expect(move).toBe('right');
  });

  test('returns correct move towards food (up)', () => {
    const gameState = createGameState({ x: 2, y: 2 }, [{ x: 2, y: 4 }]);
    const safeMoves = ['up'];
    const move = getMoveTowardsFood(gameState, safeMoves);
    expect(move).toBe('up');
  });

  test('returns null when no safe move exists in food direction', () => {
    const gameState = createGameState({ x: 2, y: 2 }, [{ x: 4, y: 2 }]);
    const safeMoves = ['left', 'up'];
    const move = getMoveTowardsFood(gameState, safeMoves);
    expect(move).toBe(null);
  });

  test('returns null when there is no food', () => {
    const gameState = createGameState({ x: 2, y: 2 }, []);
    const safeMoves = ['right', 'left'];
    const move = getMoveTowardsFood(gameState, safeMoves);
    expect(move).toBe(null);
  });

  test('returns null when there are no safe moves', () => {
    const gameState = createGameState({ x: 2, y: 2 }, [{ x: 4, y: 2 }]);
    const safeMoves = [];
    const move = getMoveTowardsFood(gameState, safeMoves);
    expect(move).toBe(null);
  });

  test('chooses the closest food if multiple exist', () => {
    const gameState = createGameState({ x: 0, y: 0 }, [
      { x: 5, y: 5 },
      { x: 1, y: 0 },
      { x: 0, y: 3 }
    ]);
    const safeMoves = ['right', 'down'];
    const move = getMoveTowardsFood(gameState, safeMoves);
    expect(move).toBe('right');
  });
});


