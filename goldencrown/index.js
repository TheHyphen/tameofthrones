const { getUserInput } = require("./getUserInput");
const { stringHasLetters, toLowerCase } = require("./../utils");
const { emblemsHash } = require("./../data");

function run() {
  const kingdoms = Object.keys(emblemsHash);
  const messagesHash = getUserInput(kingdoms);
  const inputKingdoms = Object.keys(messagesHash).map(toLowerCase);

  const allies = inputKingdoms.filter(kingdom =>
    stringHasLetters(emblemsHash[kingdom], messagesHash[kingdom])
  );

  console.log(allies.join(", "));
}
exports.run = run;
