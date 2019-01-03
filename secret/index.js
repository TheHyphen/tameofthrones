const {
  characterCount,
  characterHashMap,
  isStringLike
} = require("./../utils");
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

const isInputValid = (input, kingdoms) => {
  if (!isStringLike(input)) {
    return false;
  }
  const parts = input.toString().split(",");
  if (parts.length < 2) {
    return false;
  }
  const kingdom = parts[0];
  if (
    kingdoms.map(k => k.toLowerCase()).indexOf(kingdom.toLowerCase().trim()) !==
    -1
  ) {
    return true;
  }
  return false;
};

const getInputHashes = inputs => {
  const normalized = inputs.map(input => input.split(",").map(i => i.trim()));
  return normalized.reduce((acc, input) => {
    return {
      ...acc,
      [input[0]]: input[1]
    };
  }, {});
};

const getInputs = kingdoms => {
  if (!Array.isArray(kingdoms) || !kingdoms.every(isStringLike)) {
    throw new Error("kingdoms must be an array of strings");
  }
  console.log("Enter messages for King Shah:");
  const inputs = [];
  while (true) {
    const input = readlineSync.question("");
    if (input === "") {
      break;
    }
    if (isInputValid(input, kingdoms)) {
      inputs.push(input);
      if (inputs.length >= kingdoms.length) {
        break;
      }
    } else {
      console.log(`Kingdom not allowed. Try again.`);
      console.log(`Allowed: ${kingdoms.join(", ")}`);
    }
  }
  return inputs;
};
exports.getInputs = getInputs;

exports.run = emblemsHash => {
  const kingdoms = Object.keys(emblemsHash);

  const inputs = getInputs(kingdoms);
  const messagesHash = getInputHashes(inputs);

  const inputKingdoms = Object.keys(messagesHash).map(k => k.toLowerCase());

  const allies = inputKingdoms.filter(kingdom =>
    containsLetters(emblemsHash[kingdom], messagesHash[kingdom])
  );

  console.log(allies);
};
