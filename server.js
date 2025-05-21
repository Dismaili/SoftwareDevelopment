
import express from "express";

export default function runServer(handlers) {
  const app = express();
  app.use(express.json());
  const express = require('express');
  const { notifyTeam } = require('./db/connection');
  const direction = floodFill(board, you);
  res.json({ move: direction });


  // === Health check endpoint ===
  app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
  });

  app.get("/", (req, res) => {
    res.send(handlers.info());
  });

  // === Game start handler ===
  app.post('/start', (req, res) => {
  const { game } = req.body;

  if (!game || !game.id) {
    return res.status(400).json({ error: 'Invalid game data' });
  }
  // Respond with customization
  res.json({
    color: "#FF9900",
    headType: "safe",
    tailType: "round-bum"
  });
  });

  // === Move handler ===
  app.post('/move', (req, res) => {
  const { you, board } = req.body;

  if (!you || !board) {
    return res.status(400).json({ error: 'Missing board or snake data' });
  }

  // Placeholder move
  res.json({ move: 'up' });
  });

  // === End game handler ===
  app.post('/end', (req, res) => {
  const { game } = req.body;

  if (!game || !game.id) {
    return res.status(400).json({ error: 'Missing game info' });
  }
  notifyTeam(game.id, 'Game Over');
  res.status(200).send('Game finished');
  });

  // === Start server ===
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  });

  app.use(function (req, res, next) {
    res.set("Server", "battlesnake/github/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}

import express from "express";

export default function runServer(handlers) {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send(handlers.info());
  });

  app.post("/start", (req, res) => {
    handlers.start(req.body);
    res.send("ok");
  });

  app.post("/move", (req, res) => {
    res.send(handlers.move(req.body));
  });

  app.post("/end", (req, res) => {
    handlers.end(req.body);
    res.send("ok");
  });

  app.use(function (req, res, next) {
    res.set("Server", "battlesnake/github/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}

