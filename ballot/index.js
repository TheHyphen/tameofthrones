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

const runBallot = (participants, allies, messages, emblemsHash) => {
  const ballotMessages = getBallotMessages(participants, allies, messages);
  const { scoresHash, alliesHash, highScore } = getPollResults(
    participants,
    ballotMessages,
    emblemsHash
  );

  const tiedParticipants = Object.keys(scoresHash).filter(participant => {
    return scoresHash[participant] === highScore;
  });

  if (tiedParticipants.length === 1) {
    const winner = tiedParticipants[0];
    return {
      winner,
      allies: alliesHash[winner],
      result: highScore
    };
  }

  return runBallot(tiedParticipants, allies, messages, emblemsHash);
};
exports.runBallot = runBallot;

const run = (emblemsHash, messages) => {
  const kingdoms = Object.keys(emblemsHash);
  const participants = getValidatedInputs(emblemsHash);

  // potential allies are not participants
  const allies = kingdoms.filter(kingdom => {
    return participants.indexOf(kingdom) === -1;
  });
  const result = runBallot(participants, allies, messages, emblemsHash);

  console.log("King:", result.winner);
  console.log("Allies:", result.allies.join(" "));
};
exports.run = run;
