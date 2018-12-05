const _ = require('lodash');
const input = require('./input');

const countRepeats = sequence => {
  const result = { double: 0, triple: 0 };
  sequence.forEach(id => {
    let letterCounts = {id};
    id.split('').forEach(letter => {
      if (!letterCounts[letter]) {
        letterCounts[letter] = 1;
      } else {
        letterCounts[letter]++;
      }
    });

    const keys = _.keys(letterCounts);
    const hasDouble = keys.filter(item => letterCounts[item] === 2);
    const hasTriple = keys.filter(item => letterCounts[item] === 3);

    // check if there's a double
    if (hasDouble.length) {
      result.double++;
    }
    // check if there's a triple (can count for both)
    if (hasTriple.length){
      result.triple++;
    }
  });
  return result;
};

const checksum = input => {
  const { double, triple } = countRepeats(input);
  return double * triple;
};

module.exports = checksum;
console.log(checksum(input));