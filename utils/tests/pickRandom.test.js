import test from "ava";
const { pickRandom } = require("./../index");

test("pickRandom picks n random elements from array", t => {
  const input = ["a", "b", "c", "d"];
  const output = pickRandom(input, 2);
  t.true(Array.isArray(output));
  output.forEach(o => {
    t.true(input.indexOf(o) !== -1);
  });
});

test("pickRandom should handle outOfBounds", t => {
  const input = ["a", "b", "c", "d"];
  const output = pickRandom(input, 6);
  t.is(output.length, 4);
});
