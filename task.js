// Step 2 - Prevent your Battlesnake from colliding with itself                         
gameState.you.body.forEach(segment => {
    if (segment.x === myHead.x - 1 && segment.y === myHead.y) isMoveSafe.left = false;
    if (segment.x === myHead.x + 1 && segment.y === myHead.y) isMoveSafe.right = false;
    if (segment.x === myHead.x && segment.y === myHead.y - 1) isMoveSafe.down = false;
    if (segment.x === myHead.x && segment.y === myHead.y + 1) isMoveSafe.up = false;
  });