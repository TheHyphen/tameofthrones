import test from "ava";
const { containsLetters } = require("./../index");

test("should verify if contains letters", t => {
  t.true(containsLetters("a", "a"));
  t.false(containsLetters("aaaaa", "a"));

  t.true(containsLetters("abc", "abcdef"));
  t.true(containsLetters("abc", "abcabcabcdef"));
  t.false(containsLetters("abc", "def"));
  t.false(containsLetters("a", "def"));
  t.true(containsLetters("a", "adef"));
  t.false(containsLetters("aa", "defa"));
});

test("should handle numbers", t => {
  t.true(containsLetters(123, 312));
  t.true(containsLetters(123, "123"));
  t.false(containsLetters(111, "123"));
  t.false(containsLetters(111, 123));
  t.true(containsLetters(111, 111));
});

test("should handle edge cases", t => {
  t.false(containsLetters());
  t.false(containsLetters("abc"));
  t.false(containsLetters(null, "abc"));
  t.false(containsLetters(undefined, "abc"));
});
