const input = require('./input');

const reduceInput = (sequence, startingPoint = 0) => {
  return sequence.reduce((prev, curr) => prev + curr, startingPoint);
}

module.exports = reduceInput;
console.log(reduceInput(input));
