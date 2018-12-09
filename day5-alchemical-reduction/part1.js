const data = require('./input.js');

const checkLowerCase = letter => letter === letter.toLowerCase();

const compareUnits = (a, b) => {
  const aIsLowerCase = checkLowerCase(a);
  const bIsLowerCase = checkLowerCase(b);
  if (aIsLowerCase && bIsLowerCase) return false;
  if (!aIsLowerCase && !bIsLowerCase) return false;
  if (aIsLowerCase && !bIsLowerCase) {
    // first letter is lower, second is not - check if they're same letter
    return a === b.toLowerCase() && a.toUpperCase() === b;
  }
  if (!aIsLowerCase && bIsLowerCase) {
    // second letter is lower, first is not - check if they're same letter
    return b === a.toLowerCase() && b.toUpperCase() === a;
  }
  return false;
};

// tests
// console.log(compareUnits('a', 'b')); // false
// console.log(compareUnits('a', 'B')); // false
// console.log(compareUnits('B', 'b')); // true
// console.log(compareUnits('a', 'A')); // true
// console.log(compareUnits('B', 'A')); // false
// console.log(compareUnits('B', 'a')); // false

const reduction = data => {
  let reduced = data;
  let nextIdx = 1;
  for (let index = 0; nextIdx < reduced.length; index++, nextIdx++) {
    let current = reduced[index];
    let next = reduced[nextIdx];
    let polymer = compareUnits(current, next);

    if (polymer) {
      if (index === 0) {
        reduced = reduced.slice(2);
        index = index = -1;
        nextIdx = nextIdx = 0;
      } else {
        reduced = reduced.slice(0, index).concat(reduced.slice(nextIdx+1));
        index = index - 2;
        nextIdx = nextIdx - 2;
      }
    }
  }
  return { reduced: reduced.join(''), size: reduced.length };
};

// console.log(reduction('dabAcCaCBAcCcaDA'.split('')).reduced === 'dabCBAcaDA');
// console.log(reduction('dabAcCaCBAcCcaDA'.split('')).size === 10);
// console.log(reduction(data));

module.exports = reduction;