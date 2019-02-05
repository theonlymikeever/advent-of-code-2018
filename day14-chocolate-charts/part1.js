const { data, testData } = require('./input');

// const numSplit = textArray => ('' + textArray).split('').map(Number);

const combineRecipe = (a, b) => {
  let newRecipe = a + b;
  const double = Math.floor(newRecipe / 10);
  const res = double ? [double, newRecipe % 10] : [newRecipe] ;
  return res;
};

const modularShift = (list, p1, p2) => {
  // Many thanks to https://stackoverflow.com/a/54427125/3352956 for learning circular array access
  // https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic
  const n = list.length;
  const shift = pointer => {
    const limit = list[pointer] + 2;
    let res;
    let counter = 0;
    let nextIdx = pointer;
    let mod;

    while (counter < limit) {
      mod = ((nextIdx % n) + n) % n;
      res = list[mod];
      nextIdx += 1;
      counter++;
    }

    return { currentRec: res, pointer: mod };
  };

  return {
    e1: shift(p1),
    e2: shift(p2)
  };
};

const round = ({ e1, e2, list }) => {
  // combine recipes together
  let newRecipe = combineRecipe(e1.currentRec, e2.currentRec);
  // add results to the list
  newRecipe.forEach(i => list.push(i));
  // elf moves x times based on their current recipe score (val) + 1. this is circular
  const shifts = modularShift(list, e1.pointer, e2.pointer);
  e1 = shifts.e1;
  e2 = shifts.e2;

  return {
    e1,
    e2,
    list
  };
};

const solution = min => {
  let list = [3, 7];
  let e1 = { currentRec: 3, pointer: 0 };
  let e2 = { currentRec: 7, pointer: 1 };

  while (list.length < min + 10) {
    const result = round({ e1, e2, list });
    list = result.list;
    e1 = result.e1;
    e2 = result.e2;
    // console.log('elf 1 curr recipe: ', e1.currentRec, 'elf 2 curr recipe: ', e2.currentRec);
    // console.log('recipe scoreboard size', list.length);
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
console.log('\nPuzzle solution: ', result.sequence);

module.exports = {
  round,
  solution
};
