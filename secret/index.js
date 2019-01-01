const { characterCount, characterHashMap } = require("./../utils");
const readlineSync = require("readline-sync");

const containsLetters = (needle, haystack) => {
  const needleHashMap = characterHashMap(needle);
  const lettersInNeedle = Object.keys(needleHashMap);
  if (lettersInNeedle.length === 0) {
    return false;
  }
  return lettersInNeedle.every(
    letter => characterCount(letter, haystack) >= needleHashMap[letter]
  );
};
exports.containsLetters = containsLetters;

const getInputs = () => {
  console.log("Enter messages for King Shah.");
  console.log(
    `
Press enter after each message to submit.
Submit an empty message to complete submissions

Eg: Air, aabbccdd
------------------------------------
`
  );
  const inputs = [];
  while (true) {
    const input = readlineSync.question("");
    if (input === "") {
      break;
    }
    inputs.push(input);
  }
  return inputs;
};
exports.getInputs = getInputs;

const run = () => {
  const inputs = getInputs();
  console.log(inputs);
};
exports.run = run;
