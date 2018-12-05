const input = require('./input');

const findCommon = (first, second) => {
  const split = first.split('');
  let differences = [];
  let common = split.filter((letter, i) => {

    let matched = letter === second[i];
    
    if (!matched) differences.push(letter);
    // check to see it exists in the second id AND is in same location
    return matched;
  });

  if (differences.length === 1) {
    return common.join('');
  }
  return '';
};
// console.log(findCommon("abcde", "axcye"))
// console.log(findCommon("fghij", "fguij"))

const findBoxes = ids => {
  let res = null, stack = ids;
  while (stack.length > 0 && !res) {
    let next = stack.shift();
    stack.forEach(item => {
      let found = findCommon(next, item);
      if (found.length) res = found;
    });
  }
  return res;
};

module.exports = findBoxes;
console.log(findBoxes(input));
