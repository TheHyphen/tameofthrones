const readlineSync = require("readline-sync");
const {
  isStringLike,
  splitBy,
  isKingdom,
  trim,
  toLowerCase
} = require("../utils");

function validate(input, kingdoms) {
  if (!isStringLike(input)) {
    return false;
  }
  const parts = input.toString().split(",");
  if (parts.length < 2) {
    return false;
  }
  const kingdom = parts[0];
  if (isKingdom(kingdom, kingdoms)) {
    return true;
  }
  return false;
}

function getUserInput(kingdoms) {
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
      inputs.push(toLowerCase(trim(input)));
      if (inputs.length >= kingdoms.length) {
        break;
      }
    } else {
      console.log(`Kingdom not allowed. Try again.`);
      console.log(`Allowed: ${kingdoms.join(", ")}`);
    }
  }
  return getKindomMessagesHash(inputs);
}
exports.getUserInput = getUserInput;

function getKindomMessagesHash(inputs) {
  return inputs.map(splitBy(",")).reduce((acc, input) => {
    return {
      ...acc,
      [input[0]]: input[1]
    };
  }, {});
}
exports.getHashFromInputs = getKindomMessagesHash;
