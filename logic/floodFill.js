// directions mapped to coordinate deltas
const directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };
  
  // Check if a cell is safe to move into
  function isSafe(cell, board, visited) {
    const { x, y } = cell;
  
    if (
      x < 0 || y < 0 ||
      x >= board.width || y >= board.height ||
      visited[`${x},${y}`]
    ) {
      return false;
    }
  
    // Check if cell is occupied by any snake (excluding tails)
    for (const snake of board.snakes) {
      // Allow moving into tail if it's not going to grow
      for (let i = 0; i < snake.body.length - 1; i++) {
        if (snake.body[i].x === x && snake.body[i].y === y) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  // Flood fill from a cell and count reachable area
  function floodArea(start, board) {
    const stack = [start];
    const visited = {};
    let area = 0;
  
    while (stack.length) {
      const current = stack.pop();
      const key = `${current.x},${current.y}`;
  
      if (!isSafe(current, board, visited)) continue;
  
      visited[key] = true;
      area++;
  
      for (const d of Object.values(directions)) {
        const next = { x: current.x + d.x, y: current.y + d.y };
        stack.push(next);
      }
    }
  
    return area;
  }
  
  // Main function to pick best move using flood fill
  function floodFill(board, you) {
    let bestMove = 'up';
    let maxArea = -1;
  
    for (const [move, delta] of Object.entries(directions)) {
      const nextHead = {
        x: you.head.x + delta.x,
        y: you.head.y + delta.y,
      };
  
      const area = floodArea(nextHead, board);
  
      if (area > maxArea) {
        maxArea = area;
        bestMove = move;
      }
    }
  
    return bestMove;
  }
  
  module.exports = floodFill;
  