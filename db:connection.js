// Simulate async DB/team logging
function notifyTeam(gameId, result) {
    console.log(`Notifying team: Game ${gameId} ended with result: ${result}`);
  }
  
  module.exports = { notifyTeam };
  