const readlineSync = require("readline-sync");
const { isStringLike, isKingdom, trim } = require("../utils");

function getUserInput(kingdoms) {
  if (!Array.isArray(kingdoms) || !kingdoms.every(isStringLike)) {
    throw new Error("kingdoms must be an array of strings");
  }
  console.log("Enter messages for King Shah:");
  const inputs = {};

  while (true) {
    const input = readlineSync.question("");
    if (input === "" && getObjectLength(inputs) !== 0) {
      break;
    }

    const parsedInput = parseUserInput(input);
    if (isValid(parsedInput)) {
      const { kingdom, message } = parsedInput;
      inputs[kingdom] = message;

      if (getObjectLength(inputs) >= kingdoms.length) {
        break;
      }
    } else {
      console.log(`Invalid input, please try again.`);
      console.log(`Allowed Kingdoms: ${kingdoms.join(", ")}`);
      console.log(`Format: <kindom>, <message for the kingdom>`);
    }
  }
  return inputs;
}
exports.getUserInput = getUserInput;

function getObjectLength(object) {
  return Object.keys(object).length;
}

function isValid({ kingdom, message }) {
  return isKingdom(kingdom) && isStringLike(message);
}

function parseUserInput(input) {
  const parts = input.split(",").map(trim);
  return {
    kingdom: parts[0],
    message: parts[1]
  };
}
exports.parseUserInput = parseUserInput;
