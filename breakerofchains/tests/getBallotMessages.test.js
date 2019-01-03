import test from "ava";
const getBallotMessages = require("./../getBallotMessages");

test("getBallotMessages should return flat messages list", t => {
  const participants = ["air", "water"];
  const allies = ["ice", "fire"];
  const messages = ["a", "b", "c", "d"];

  const output = getBallotMessages(participants, allies, messages);

  t.true(
    // output is flat
    output.every(o => typeof o === "object" && !Array.isArray(o))
  );

  t.true(
    output.every(
      o =>
        typeof o.ally === "string" &&
        typeof o.participant === "string" &&
        typeof o.message === "string"
    )
  );
});
