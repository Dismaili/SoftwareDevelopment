export default function checkSnakeCollision(gameState, myHead, isMoveSafe) {
  gameState.board.snakes.forEach((snake) => {
    snake.body.forEach((segment) => {
      if (segment.x === myHead.x - 1 && segment.y === myHead.y)
        isMoveSafe.left = false;
      if (segment.x === myHead.x + 1 && segment.y === myHead.y)
        isMoveSafe.right = false;
      if (segment.x === myHead.x && segment.y === myHead.y - 1)
        isMoveSafe.down = false;
      if (segment.x === myHead.x && segment.y === myHead.y + 1)
        isMoveSafe.up = false;
    });
  });

  return isMoveSafe;
}
