import test from "ava";
const { stringHasLetters } = require("../index");

test("should verify if contains letters", t => {
  t.true(stringHasLetters("a", "a"));
  t.false(stringHasLetters("aaaaa", "a"));

  t.true(stringHasLetters("abc", "abcdef"));
  t.true(stringHasLetters("abc", "abcabcabcdef"));
  t.false(stringHasLetters("abc", "def"));
  t.false(stringHasLetters("a", "def"));
  t.true(stringHasLetters("a", "adef"));
  t.false(stringHasLetters("aa", "defa"));
});

test("should handle numbers", t => {
  t.true(stringHasLetters(123, 312));
  t.true(stringHasLetters(123, "123"));
  t.false(stringHasLetters(111, "123"));
  t.false(stringHasLetters(111, 123));
  t.true(stringHasLetters(111, 111));
});

test("should handle edge cases", t => {
  t.false(stringHasLetters());
  t.false(stringHasLetters("abc"));
  t.false(stringHasLetters(null, "abc"));
  t.false(stringHasLetters(undefined, "abc"));
  t.false(stringHasLetters({}, "abc"));
  t.false(stringHasLetters([], "abc"));
  t.false(stringHasLetters({}, {}));
  t.false(stringHasLetters([], []));
  t.false(stringHasLetters({}, []));
  t.false(stringHasLetters([], {}));
  t.false(stringHasLetters("abc", []));
  t.false(stringHasLetters("abc", {}));
});
