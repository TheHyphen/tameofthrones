const { pickRandom, flatten } = require("../utils");

function getBallotMessages(participants, allies, messages) {
  const ballotMessages = participants.map(participant => {
    const randomMessages = pickRandom(messages, allies.length);

    return allies.map((ally, idx) => ({
      ally,
      participant,
      message: randomMessages[idx]
    }));
  });

  return pickRandom(flatten(ballotMessages), 6);
}
module.exports = getBallotMessages;
