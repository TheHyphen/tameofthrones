import test from "ava";

const { getPollResults } = require("./../index");

test("getPollResults should work", t => {
  const emblemsHash = {
    space: "gorilla",
    land: "panda",
    water: "octopus",
    ice: "mammoth",
    air: "owl",
    fire: "dragon"
  };
  const participants = ["space", "land", "water"];
  const messages = [
    {
      ally: "ice",
      message: `hail ${emblemsHash["ice"]}!`,
      participant: "space"
    },
    {
      ally: "fire",
      message: `hail ${emblemsHash["fire"]}!`,
      participant: "space"
    },
    {
      ally: "air",
      message: `hail ${emblemsHash["air"]}!`,
      participant: "water"
    },
    {
      ally: "air",
      message: `hail ${emblemsHash["air"]}!`,
      participant: "land"
    }
  ];

  const output = getPollResults(participants, messages, emblemsHash);

  t.is(output.highScore, 2);
  t.is(output.scoresHash["space"], 2);
  t.is(output.scoresHash["water"], 1);
  t.is(output.scoresHash["land"], 0);
  t.deepEqual(output.alliesHash["space"], ["ice", "fire"]);
});

test("getPollResults should with no messages", t => {
  const emblemsHash = {
    space: "gorilla",
    land: "panda",
    water: "octopus",
    ice: "mammoth",
    air: "owl",
    fire: "dragon"
  };
  const participants = ["space", "land", "water"];
  const messages = [];

  const output = getPollResults(participants, messages, emblemsHash);

  t.is(output.highScore, 0);
  t.deepEqual(output.scoresHash, {
    land: 0,
    space: 0,
    water: 0
  });
  t.deepEqual(output.alliesHash, {
    land: [],
    space: [],
    water: []
  });
});

test("getPollResults should with no participants", t => {
  const emblemsHash = {
    space: "gorilla",
    land: "panda",
    water: "octopus",
    ice: "mammoth",
    air: "owl",
    fire: "dragon"
  };
  const participants = [];
  const messages = [];

  const output = getPollResults(participants, messages, emblemsHash);

  t.is(output.highScore, 0);
  t.deepEqual(output.scoresHash, {});
  t.deepEqual(output.alliesHash, {});
});
