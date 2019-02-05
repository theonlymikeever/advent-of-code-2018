const { data } = require('./input');

const match = (list, pattern) => {
  if (list.length < pattern.length) return false;

  let slice = list.slice(pattern.length * -1).join('');
  return slice === pattern;
};

const shift = (list, pointer) => {
  return (pointer + 1 + list[pointer]) % list.length;
};

const findRecipeCount = pattern => {
  let list = [3, 7];
  let e1 = 0;
  let e2 = 1;

  while (true) {
    let newRecipe = list[e1] + list[e2];
    if (newRecipe > 9) {
      // recipe is double digits, add tens placement
      list.push(Math.floor( newRecipe / 10));
      if (match(list, pattern)) {
        break;
      }
    }

    // add ones placement of recipe
    list.push(newRecipe % 10);
    if (match(list, pattern)) {
      break;
    }

    // update elf pointers, circularly looking through array
    e1 = shift(list, e1);
    e2 = shift(list, e2);
  }

  return list.length - pattern.length;
};

// Test cases
// const sequence = '51589';
// const sequence = '01245';
// const sequence = '92510';
// const sequence = '59414';

// Solution
const sequence = data.toString();
const result = findRecipeCount(sequence);
console.log('Part 2 Solution:', result);
