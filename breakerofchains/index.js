const { emblemsHash, messages } = require("./../data");
const runBallot = require("./runBallot");
const getUserInput = require("./getUserInput");

function run() {
  const kingdoms = Object.keys(emblemsHash);
  const participants = getUserInput(emblemsHash);

  // potential allies are not participants
  const allies = kingdoms.filter(kingdom => {
    return participants.indexOf(kingdom) === -1;
  });
  const result = runBallot(participants, allies, messages, emblemsHash);

  console.log("King:", result.winner);
  console.log("Allies:", result.allies.join(" "));
}
exports.run = run;
