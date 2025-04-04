export function getMoveTowardsFood(gameState, safeMoves) {
    const myHead = gameState.you.body[0];
    const foodList = gameState.board.food;
  
    if (foodList.length === 0 || safeMoves.length === 0) {
      return null; // No food or no safe moves
    }
  
    // Find closest food by Manhattan distance
    let closestFood = foodList[0];
    let minDistance = getDistance(myHead, closestFood);
  
    for (let food of foodList) {
      const dist = getDistance(myHead, food);
      if (dist < minDistance) {
        closestFood = food;
        minDistance = dist;
      }
    }
  
    // Determine best direction to move towards the closest food
    const dx = closestFood.x - myHead.x;
    const dy = closestFood.y - myHead.y;
  
    const preferredMoves = [];
  
    if (dx > 0 && safeMoves.includes("right")) preferredMoves.push("right");
    if (dx < 0 && safeMoves.includes("left")) preferredMoves.push("left");
    if (dy > 0 && safeMoves.includes("up")) preferredMoves.push("up");
    if (dy < 0 && safeMoves.includes("down")) preferredMoves.push("down");
  
    // Return the first preferred move that is safe
    return preferredMoves.length > 0 ? preferredMoves[0] : null;
  }
  
  function getDistance(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  }
  