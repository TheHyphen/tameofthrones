import test from "ava";
const { getCharacterCountHash } = require("../index");

test("get correct hash map", t => {
  t.deepEqual(getCharacterCountHash("a"), {
    a: 1
  });
  t.deepEqual(getCharacterCountHash("abc"), {
    a: 1,
    b: 1,
    c: 1
  });
  t.deepEqual(getCharacterCountHash("aabbccccaa"), {
    a: 4,
    b: 2,
    c: 4
  });
});

test("handles numbers correctly", t => {
  t.deepEqual(getCharacterCountHash(1), {
    1: 1
  });
  t.deepEqual(getCharacterCountHash(123), {
    "1": 1,
    "2": 1,
    "3": 1
  });
  t.deepEqual(getCharacterCountHash(1122333), {
    1: 2,
    2: 2,
    3: 3
  });
});

test("handles edge cases", t => {
  t.deepEqual(getCharacterCountHash(), {});
  t.deepEqual(getCharacterCountHash(null), {});
  t.deepEqual(getCharacterCountHash(""), {});
});
