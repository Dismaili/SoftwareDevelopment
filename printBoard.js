export function printBoard(board) {
    const width = board.width;
    const height = board.height;
  
    const grid = Array.from({ length: height }, () => Array(width).fill("."));
  
    board.food.forEach(({ x, y }) => {
      grid[y][x] = "F";
    });
  
    board.snakes.forEach(snake => {
      snake.body.forEach(({ x, y }, index) => {
        if (index === 0) {
          grid[y][x] = "H";
        } else {
          grid[y][x] = "S";
        }
      });
    });
  
    console.log("\nCurrent Board:");
    for (let y = height - 1; y >= 0; y--) {
      for (let x = 0; x < width; x++) {
        process.stdout.write(grid[y][x] + " ");
      }
      process.stdout.write("\n");
    }
  }