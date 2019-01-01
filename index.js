const parseArg = (args, allowed) => {
  const sliced = args.slice(2);
  const firstArg = sliced[0];
  if (allowed.indexOf(firstArg) === -1) {
    console.log(`only allowed ${allowed.join(", ")}`);
    process.exit(0);
  }
  return firstArg;
};
exports.parseArg = parseArg;
