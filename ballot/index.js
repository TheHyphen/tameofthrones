const readlineSync = require("readline-sync");
const { pickRandom, flatten } = require("./../utils");
const { containsLetters } = require("./../secret");

const getValidatedInputs = emblemsHash => {
  const participants = readlineSync.question(
    "Enter competing Kingdoms (separate with a space): "
  );
  console.log("\n");
  const validParticipants = participants.split(" ").filter(participant => {
    return typeof emblemsHash[participant] !== "undefined";
  });
  if (validParticipants.length === 0) {
    return getValidatedInputs(emblemsHash);
  }
  return validParticipants;
};
exports.getValidatedInputs = getValidatedInputs;

const getBallotMessages = (participants, allies, messages) => {
  const ballotMessages = participants.map(participant => {
    const randomMessages = pickRandom(messages, allies.length);

    return allies.map((ally, idx) => ({
      ally,
      participant,
      message: randomMessages[idx]
    }));
  });

  return pickRandom(flatten(ballotMessages), 6);
};
exports.getBallotMessages = getBallotMessages;

const getPollResults = (participants, messages, emblemsHash) => {
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
      if (containsLetters(emblemsHash[ally], message)) {
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
};
exports.getPollResults = getPollResults;
