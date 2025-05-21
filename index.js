import runServer from "./server.js";
import { preventOutOfBounds } from "./preventOutOfBounds.js";
import checkSelfCollision from "./checkSelfCollision.js";
import checkSnakeCollision from "./checkSnakeCollision.js";
import { getMoveTowardsFood } from "./foodTargeting.js";
import { avoidHeadToHeadMoves } from "./headToHead.js";

function info() {
  return {
    apiversion: "1",
    author: "ichindris, dismaili1, rrama5, jkotori123, mmatevski, aganiu",
    color: "#FF5733",
    head: "beluga",
    tail: "bolt",
  };
}

function start(gameState) {
  console.log("GAME START");
}

function end(gameState) {
  console.log("GAME OVER\n");
}

function move(gameState) {
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  else if (myNeck.x > myHead.x) isMoveSafe.right = false;
  else if (myNeck.y < myHead.y) isMoveSafe.down = false;
  else if (myNeck.y > myHead.y) isMoveSafe.up = false;

  isMoveSafe = preventOutOfBounds(myHead, gameState, isMoveSafe);
  isMoveSafe = checkSelfCollision(gameState, myHead, isMoveSafe);
  isMoveSafe = checkSnakeCollision(gameState, myHead, isMoveSafe);
  isMoveSafe = avoidHeadToHeadMoves(gameState, isMoveSafe);

  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);

  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves! Moving down.`);
    return { move: "down" };
  }

  let nextMove = getMoveTowardsFood(gameState, safeMoves);
  if (!nextMove) {
    nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
  }

  return { move: nextMove };
}

// ✅ Start server
runServer({ info, start, move, end });
