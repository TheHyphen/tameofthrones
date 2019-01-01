import test from "ava";
const { characterCount } = require("./../index");

test("should count character correctly", t => {
  t.is(characterCount("a", "a"), 1);
  t.is(characterCount("a", "b"), 0);
  t.is(characterCount("a", "aaaabbbb"), 4);
  t.is(characterCount("a", "aaaabbbbaaaa"), 8);
});

test("should handle a number correctly", t => {
  t.is(characterCount(1, 1122), 2);
  t.is(characterCount(1, "1122"), 2);
  t.is(characterCount(1, 234), 0);
});

test("should handle edge cases", t => {
  t.is(characterCount(), 0);
  t.is(characterCount("a"), 0);
  t.is(characterCount("a", ""), 0);
  t.is(characterCount("", "aaaabbbbaaaa"), 0);
});
