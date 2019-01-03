const isStringLike = string => {
  const type = typeof string;
  return type === "string" || type === "number";
};
exports.isStringLike = isStringLike;

const characterCount = (character, string) => {
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
};
exports.characterCount = characterCount;

const characterHashMap = string => {
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
};
exports.characterHashMap = characterHashMap;

const pickRandom = (array, count) => {};
exports.pickRandom = pickRandom;
