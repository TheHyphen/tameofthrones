import test from "ava";
const { characterHashMap } = require("../index");

test("get correct hash map", t => {
  t.deepEqual(characterHashMap("a"), {
    a: 1
  });
  t.deepEqual(characterHashMap("abc"), {
    a: 1,
    b: 1,
    c: 1
  });
  t.deepEqual(characterHashMap("aabbcccc"), {
    a: 2,
    b: 2,
    c: 3
  });
});

test("handles numbers correctly", t => {
  t.deepEqual(characterHashMap(1), {
    1: 1
  });
  t.deepEqual(characterHashMap(123), {
    "1": 1,
    "2": 1,
    "3": 1
  });
  t.deepEqual(characterHashMap(1122333), {
    1: 2,
    2: 2,
    3: 3
  });
});

test("handles edge cases", t => {
  t.deepEqual(characterHashMap(), {});
  t.deepEqual(characterHashMap(null), {});
  t.deepEqual(characterHashMap(""), {});
});
