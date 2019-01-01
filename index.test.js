const { parseArg } = require("./index");
import test from "ava";
import sinon from "sinon";

console.log = sinon.spy();

test("parseArg should get first arg", t => {
  const args = ["node", "file.js", "something"];
  t.is(parseArg(args, ["something"]), "something");
});

test("parseArg should show help when no args", t => {
  const args = ["node", "file.js"];
  parseArg(args, []);
  t.true(console.log.called);
});

test("parseArg should show help when not allowed", t => {
  const args = ["node", "file.js", "something"];
  parseArg(args, ["else"]);
  t.true(console.log.called);
});
