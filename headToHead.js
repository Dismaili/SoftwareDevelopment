export function avoidHeadToHeadMoves(gameState, isMoveSafe) {
    const myHead = gameState.you.body[0];
    const myLength = gameState.you.length;
    const opponents = gameState.board.snakes;
  
    for (const snake of opponents) {
      if (snake.id === gameState.you.id) continue; // Skip self
  
      const enemyHead = snake.body[0];
      const enemyLength = snake.length;
  
      // potential positions enemy could move to next turn
      const dangerZones = [
        { x: enemyHead.x + 1, y: enemyHead.y, dir: "left" },
        { x: enemyHead.x - 1, y: enemyHead.y, dir: "right" },
        { x: enemyHead.x, y: enemyHead.y + 1, dir: "down" },
        { x: enemyHead.x, y: enemyHead.y - 1, dir: "up" },
      ];
  
      for (const zone of dangerZones) {
        if (zone.x === myHead.x && zone.y === myHead.y && enemyLength >= myLength) {
          // don't move into a head-to-head or likely you'll lose
          isMoveSafe[zone.dir] = false;
        }
      }
    }
  
    return isMoveSafe;
  }
  