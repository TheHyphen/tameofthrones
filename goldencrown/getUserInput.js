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
    if (input === "" && Object.keys(inputs).length !== 0) {
      break;
    }
    const { kingdom, message } = parseUserInput(input);
    if (isKingdom(kingdom, kingdoms) && isStringLike(message)) {
      inputs[kingdom] = message;
      if (Object.keys(inputs).length >= kingdoms.length) {
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

function parseUserInput(input) {
  const parts = input.split(",").map(trim);
  return {
    kingdom: parts[0],
    message: parts[1]
  };
}
exports.parseUserInput = parseUserInput;
