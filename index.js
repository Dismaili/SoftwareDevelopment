// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from './server.js';
import { preventOutOfBounds } from './preventOutOfBounds.js';
import checkSelfCollision from './checkSelfCollision.js';
import checkSnakeCollision from './checkSnakeCollision.js';
import { getMoveTowardsFood } from './foodTargeting.js';
import { printBoard } from './printBoard.js';



// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "ichindris, dismaili1, rrama5, jkotori123, mmatevski, aganiu",       
    color: "#FF5733",       
    head: "beluga",         
    tail: "bolt",  
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;

  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;

  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;

  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }
  
  isMoveSafe = preventOutOfBounds(myHead, gameState, isMoveSafe);

  isMoveSafe = checkSelfCollision(gameState, myHead, isMoveSafe);

  isMoveSafe = checkSnakeCollision(gameState, myHead, isMoveSafe);

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // food = gameState.board.food;
  // moving for longer survival 
  // choose next move towards food if available otherwise fall back to a random safe move 
  let nextMove = getMoveTowardsFood(gameState, safeMoves);
if (nextMove) {
  console.log(`MOVE ${gameState.turn}: Moving towards food -> ${nextMove}`);
} else {
  nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
  console.log(`MOVE ${gameState.turn}: No food path, random move -> ${nextMove}`);
}

}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
