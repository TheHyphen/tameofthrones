const readlineSync = require("readline-sync");
const { isStringLike } = require("./../utils");

function validate(input, kingdoms) {
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
}

function getInputs(kingdoms) {
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
    if (validate(input, kingdoms)) {
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
}
exports.getInputs = getInputs;

function getHashFromInputs(inputs) {
  const normalized = inputs.map(input => input.split(",").map(i => i.trim()));
  return normalized.reduce((acc, input) => {
    return {
      ...acc,
      [input[0]]: input[1]
    };
  }, {});
}
exports.getHashFromInputs = getHashFromInputs;
