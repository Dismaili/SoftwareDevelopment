import checkSnakeCollision from '../checkSnakeCollision.js';

describe('checkSnakeCollision', () => {
  it('marks direction unsafe if a snake is adjacent', () => {
    const gameState = {
      board: {
        snakes: [
          {
            body: [{ x: 5, y: 5 }],
          },
        ],
      },
    };
    const myHead = { x: 5, y: 4 };
    const isMoveSafe = {
      up: true, down: true, left: true, right: true,
    };

    const result = checkSnakeCollision(gameState, myHead, isMoveSafe);
    expect(result.up).toBe(false);
  });
});
