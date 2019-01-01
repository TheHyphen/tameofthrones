const { characterCount, characterHashMap } = require("./../utils");

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
