const calculateBallotResults = require("./calculateBallotResults");
const getBallotMessages = require("./getBallotMessages");

function runBallot(participants, allies, messages, emblemsHash) {
  const ballotMessages = getBallotMessages(participants, allies, messages);
  const { scoresHash, alliesHash, highScore } = calculateBallotResults(
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
}
module.exports = runBallot;
