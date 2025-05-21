
// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// Your Battlesnake logic goes here

import runServer from "./server.js";
import { preventOutOfBounds } from "./preventOutOfBounds.js";
import checkSelfCollision from "./checkSelfCollision.js";
import checkSnakeCollision from "./checkSnakeCollision.js";
import { getMoveTowardsFood } from "./foodTargeting.js";
import { avoidHeadToHeadMoves } from "./headToHead.js";

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/snake/settings', (req, res) => {
  const { name, color } = req.body;
  console.log('Updated Snake Settings:', name, color);
  // Optionally store these in memory or file for game usage
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Battlesnake + UI server running at http://localhost:${port}`);
});


// info is called when your Battlesnake is created

function info() {
  console.log("INFO");


function info() {
  return {
    apiversion: "1",
    author: "ichindris, dismaili1, rrama5, jkotori123, mmatevski, aganiu",
    color: "#FF5733",
    head: "beluga",
    tail: "bolt",
  };
}


// Called at the start of each game

function start(gameState) {
  console.log("GAME START");
}


// Called at the end of each game

function end(gameState) {
  console.log("GAME OVER\n");
}

// Called every turn — decides the move

function move(gameState) {
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];


  // Prevent moving backwards
  if (myNeck.x < myHead.x) {
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) {
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) {
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) {
    isMoveSafe.up = false;
  }

  // Avoid collisions and unsafe moves
  isMoveSafe = preventOutOfBounds(myHead, gameState, isMoveSafe);
  isMoveSafe = checkSelfCollision(gameState, myHead, isMoveSafe);
  isMoveSafe = checkSnakeCollision(gameState, myHead, isMoveSafe);
  isMoveSafe = avoidHeadToHeadMoves(gameState, isMoveSafe); // ✅ Head-to-head logic

  // Filter to only safe moves
  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);

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


  // Try moving toward food
  let nextMove = getMoveTowardsFood(gameState, safeMoves);

  if (nextMove) {
    console.log(`MOVE ${gameState.turn}: Going for food -> ${nextMove}`);
  } else {
    nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    console.log(`MOVE ${gameState.turn}: Random safe move -> ${nextMove}`);

  let nextMove = getMoveTowardsFood(gameState, safeMoves);
  if (!nextMove) {
    nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  }

  return { move: nextMove };
}

// Start server
runServer({
  info: info,
  start: start,
  move: move,
  end: end,
});

// ✅ Start server
runServer({ info, start, move, end });
