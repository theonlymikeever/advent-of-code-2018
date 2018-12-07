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

// console.log(data)
// tests
// console.log(compareUnits('a', 'b')); // false
// console.log(compareUnits('a', 'B')); // false
// console.log(compareUnits('B', 'b')); // true
// console.log(compareUnits('a', 'A')); // true
// console.log(compareUnits('B', 'A')); // false
// console.log(compareUnits('B', 'a')); // false

const reduction = data => {
  let reduced = data; // non destructive copy
  let nextIdx = 1;
  for (let index = 0; nextIdx <= reduced.length; index++, nextIdx++) {
    console.log('reducing', index)
    let current = reduced[index];
    let next = reduced[nextIdx];
    // console.log('comparing', current, next);
    let polymer = compareUnits(current, next);

    if (polymer) {
      // console.log('firshalf', reduced.slice(0, index))
      // console.log('secondhalf', reduced.slice(nextIdx+1))
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
  return reduced.length;
};

// console.log(reduction('dabAcCaCBAcCcaDA'.split('')));
console.log(reduction(data))
