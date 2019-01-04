const readlineSync = require("readline-sync");
const { uniq, isUndefined } = require("./../utils");

function validateParticipants(participants, emblemsHash) {
  return participants
    .split(" ")
    .filter(participant => !isUndefined(emblemsHash[participant]))
    .filter(uniq);
}

function getUserInput(emblemsHash) {
  const input = readlineSync.question(
    "Enter competing Kingdoms (separate with a space): "
  );
  const participants = validateParticipants(input, emblemsHash);
  if (participants.length === 0) {
    return getUserInput(emblemsHash);
  }
  return participants;
}
module.exports = getUserInput;
