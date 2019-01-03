const { getInputs, getHashFromInputs } = require("./getInputs");
const { stringHasLetters } = require("./../utils");
const { emblemsHash } = require("./../data");

function run() {
  const kingdoms = Object.keys(emblemsHash);

  const inputs = getInputs(kingdoms);
  const messagesHash = getHashFromInputs(inputs);
  const inputKingdoms = Object.keys(messagesHash).map(k => k.toLowerCase());

  const allies = inputKingdoms.filter(kingdom =>
    stringHasLetters(emblemsHash[kingdom], messagesHash[kingdom])
  );

  console.log(allies.join(", "));
}
exports.run = run;
