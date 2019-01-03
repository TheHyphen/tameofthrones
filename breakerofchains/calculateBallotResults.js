const { stringHasLetters } = require("../utils");
function calculateBallotResults(participants, messages, emblemsHash) {
  const scoresHash = {};
  const alliesHash = {};
  const takenAllies = [];
  let highScore = 0;

  participants.forEach(participant => {
    scoresHash[participant] = 0;
    alliesHash[participant] = [];
  });

  messages.forEach(({ message, ally, participant }) => {
    if (takenAllies.indexOf(ally) === -1) {
      if (stringHasLetters(emblemsHash[ally], message)) {
        scoresHash[participant] = scoresHash[participant] + 1;
        if (highScore < scoresHash[participant]) {
          highScore = scoresHash[participant];
        }
        alliesHash[participant].push(ally);
        takenAllies.push(ally);
      }
    }
  });
  return { scoresHash, alliesHash, highScore };
}
module.exports = calculateBallotResults;
