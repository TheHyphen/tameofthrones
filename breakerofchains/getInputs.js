const readlineSync = require("readline-sync");

function getInputs(emblemsHash) {
  const participants = readlineSync.question(
    "Enter competing Kingdoms (separate with a space): "
  );
  const validParticipants = participants
    .split(" ")
    .filter(participant => {
      return typeof emblemsHash[participant.toLowerCase()] !== "undefined";
    })
    .filter((participant, idx, self) => {
      return self.indexOf(participant) === idx;
    });
  if (validParticipants.length === 0) {
    return getInputs(emblemsHash);
  }
  return validParticipants;
}
module.exports = getInputs;
