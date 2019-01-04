const isStringLike = string => {
  const type = typeof string;
  return type === "string" || type === "number";
};
exports.isStringLike = isStringLike;

function getCharacterCount(character, string) {
  if (!isStringLike(string) || !isStringLike(character)) {
    return 0;
  }
  if (string.toString().length === 0 || character.toString().length === 0) {
    return 0;
  }
  const matches = string
    .toString()
    .match(new RegExp(character.toString(), "g"));
  return matches && matches.length ? matches.length : 0;
}
exports.getCharacterCount = getCharacterCount;

function getCharacterCountHash(string) {
  if (!isStringLike(string)) {
    return {};
  }
  return string
    .toString()
    .split("")
    .reduce((acc, character) => {
      return {
        ...acc,
        [character]: (acc[character] || 0) + 1
      };
    }, {});
}
exports.getCharacterCountHash = getCharacterCountHash;

function pickRandom(array, count) {
  const clone = [...array];
  const output = [];
  for (let i = 0; i < (count <= array.length ? count : array.length); i++) {
    const randomIdx = Math.floor(Math.random() * clone.length);
    output.push(clone[randomIdx]);
    clone.splice(randomIdx, 1);
  }
  return output;
}
exports.pickRandom = pickRandom;

function flatten(array) {
  return array.reduce(
    (prevArray, currArray) => prevArray.concat(currArray),
    []
  );
}
exports.flatten = flatten;

function stringHasLetters(needle, haystack) {
  const needleHashMap = getCharacterCountHash(needle);
  const lettersInNeedle = Object.keys(needleHashMap);
  if (lettersInNeedle.length === 0) {
    return false;
  }
  return lettersInNeedle.every(
    letter => getCharacterCount(letter, haystack) >= needleHashMap[letter]
  );
}
exports.stringHasLetters = stringHasLetters;

function toLowerCase(string) {
  return string.toLowerCase();
}
exports.toLowerCase = toLowerCase;

function trim(string) {
  return string.trim();
}
exports.trim = trim;

function splitter(char) {
  return string => string.split(char);
}

exports.splitter = splitter;
function isKingdom(input, kingdoms) {
  return (
    kingdoms
      .map(toLowerCase)
      .map(trim)
      .indexOf(toLowerCase(trim(input))) !== -1
  );
}
exports.isKingdom = isKingdom;

function uniq() {
  return (value, idx, self) => {
    return self.indexOf(value) === idx;
  };
}
exports.uniq = uniq;

function isUndefined(value) {
  return typeof value === "undefined";
}
exports.isUndefined = isUndefined;
