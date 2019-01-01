import test from "ava";
import sinon from "sinon";

const readlineSync = require("readline-sync");
const { getInputs } = require("./../index");

test("should get inputs", t => {
  const mockInputs = ["air, something", "FiRe, somethingelse", ""];
  readlineSync.question = sinon.mock().returnValues(mockInputs);

  const inputs = getInputs(["air", "fire"]);
  t.deepEqual(inputs, mockInputs);
});

test("should handle incorrect kingdoms", t => {
  const mockInputs = ["air, something", "someone, somethingelse", ""];
  readlineSync.question = sinon.mock().returnValues(mockInputs);
  console.log = sinon.spy();

  const inputs = getInputs(["air", "fire"]);
  t.true(console.log.called);
  t.deepEqual(inputs, [mockInputs[0]]);
});
