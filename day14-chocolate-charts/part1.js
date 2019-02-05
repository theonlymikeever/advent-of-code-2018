const { data, testData } = require('./input');

const numSplit = textArray => (''+ textArray).split('').map(Number);

const combineRecipe = (a, b) => {
  const newRecipe = a + b;
  const split = numSplit(newRecipe);
  return split;
};


// console.log(combineRecipe(1, 4));

const modularShift = (list, p1, p2) => {
  // Many thanks to https://stackoverflow.com/a/54427125/3352956 for learning circular array access
  // https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic
  const n = list.length;
  const shift = pointer => {
    const limit = list[pointer] + 2;
    // console.log('shifting', list[pointer] + 1, 'times');
    let res;
    let counter = 0;
    let nextIdx = pointer;
    let mod;
    
    while (counter < limit) {
      // console.log('nextIdx', nextIdx)
      mod = (nextIdx % n + n) % n;
      res = list[mod];
      // console.log('resulting in', res);
      nextIdx += 1;
      counter++;
    }

    return { currentRec: res, pointer: mod};
  };

  return {
    e1: shift(p1),
    e2: shift(p2)
  };
};

const round = ({ e1, e2, list }) => {
  // combine
  let newRecipe = combineRecipe(e1.currentRec, e2.currentRec);
  // console.log('combined', e1.currentRec, ' & ', e2.currentRec, ' = ', newRecipe);
  // add results to the list
  list = [...list, ...newRecipe];
  // elf moves x times based on their current recipe + 1
  // if they hit the end, they loop back to the beginning
  // shift happens FOR NEXT round
  const shifts = modularShift(list, e1.pointer, e2.pointer);
  e1 = shifts.e1;
  e2 = shifts.e2;
  // console.log('e1 current', e1.currentRec, 'at idx', e1.pointer, 'e2 current', e2.currentRec, 'at idx', e2.pointer, );
  return {
    e1, e2, list
  };
};

const solution = min => {
  let list = [3, 7];
  // pointers
  let e1 = { currentRec: 3, pointer: 0 };
  let e2 = { currentRec: 7, pointer: 1 };
  while (list.length < min + 10){
    const result = round({ e1, e2, list });
    // console.log('results', result);
    list = result.list;
    e1 = result.e1;
    e2 = result.e2;
    console.log('list size', list.length);
  }

  const scoreboard = list.slice(min, min + 10);
  return scoreboard.reduce((a, b) => a + b, '');
};


// Tests
testData.forEach(({ min, scoreboard }) => {
  const result = solution(min);
  console.log('result after ', min, 'recipes:', result);
  console.log('correct?', result === scoreboard);
});

// Solution
console.log(solution(data));