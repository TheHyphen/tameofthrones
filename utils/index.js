const isStringLike = string => {
  const type = typeof string;
  return type === "string" || type === "number";
};

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

const characterHashMap = string => {};
exports.characterHashMap = characterHashMap;
