const {input} = require('input');

const findRepeat = sequence => {
  let repeat = 0;
  let results = [0];

  while (!repeat) {
    const move = sequence.shift();
    const newFreq = results[results.length - 1] + move;
    if (results.indexOf(newFreq) >= 0) {
      repeat = newFreq;
      break;
    } else {
      results.push(newFreq);
      sequence.push(move); // move instruction to the back of the list
    }
  }
  return repeat;
}

module.exports = findRepeat;
console.log(findRepeat(input));