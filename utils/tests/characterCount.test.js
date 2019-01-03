import test from "ava";
const { getCharacterCount } = require("./../index");

test("should count character correctly", t => {
  t.is(getCharacterCount("a", "a"), 1);
  t.is(getCharacterCount("a", "b"), 0);
  t.is(getCharacterCount("a", "aaaabbbb"), 4);
  t.is(getCharacterCount("a", "aaaabbbbaaaa"), 8);
});

test("should handle a number correctly", t => {
  t.is(getCharacterCount(1, 1122), 2);
  t.is(getCharacterCount(1, "1122"), 2);
  t.is(getCharacterCount(1, 234), 0);
});

test("should handle edge cases", t => {
  t.is(getCharacterCount(), 0);
  t.is(getCharacterCount("a"), 0);
  t.is(getCharacterCount("a", ""), 0);
  t.is(getCharacterCount("", "aaaabbbbaaaa"), 0);
});
