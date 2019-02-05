const { data, testData } = require('./input');

const combineRecipe = (a, b) => {
  let newRecipe = a + b;
  const double = Math.floor(newRecipe / 10);
  const res = double ? [double, newRecipe % 10] : [newRecipe];
  return res;
};

const shift = (list, pointer) => {
  return (pointer + 1 + list[pointer]) % list.length;
};

const round = ({ e1, e2, list }) => {
  // combine recipes together
  let newRecipe = combineRecipe(list[e1], list[e2]);
  // add results to the list
  newRecipe.forEach(i => list.push(i));
  // elf moves x times based on their current recipe score (val) + 1. this is circular
  e1 = shift(list, e1);
  e2 = shift(list, e2);

  return {
    e1,
    e2,
    list
  };
};

const solution = min => {
  let list = [3, 7];
  let e1 = 0;
  let e2 = 1;

  while (list.length < min + 10) {
    const result = round({ e1, e2, list });
    list = result.list;
    e1 = result.e1;
    e2 = result.e2;
  }

  return {
    scoreboard: list,
    sequence: list.slice(min, min + 10).reduce((a, b) => a + b, ''),
  };
};

// Tests
testData.forEach(({ min, scoreboard }) => {
  const result = solution(min);
  console.log('result after ', min, 'recipes:', result.sequence);
  console.log('correct?', result.sequence === scoreboard);
});

// Solution part 1:
const result = solution(data);
console.log('\nPart 1 solution: ', result.sequence);

module.exports = {
  round,
  solution,
  shift,
  combineRecipe
};
