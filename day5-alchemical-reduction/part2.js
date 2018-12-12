const data = require('./input.js');
const reduction = require('./part1');

const removeUnit = (letter, data) => {
  return data.filter(item => item.toLowerCase() !== letter.toLowerCase());
};

const alphaMap = {
  a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '', j: '', k: '', l: '', m: '', n: '', o: '', p: '', q: '', r: '', s: '', t: '', u: '', v: '', w: '', x: '', y: '', z: ''};

const removeLetters = () => {
  for (let letter in alphaMap) {
    alphaMap[letter] = removeUnit(letter.toString(), data);
  }
};

const reduceOnMap = () => {
  for (let letter in alphaMap) {
    console.log('reducing', letter)
    let reduced = reduction(alphaMap[letter]);
    alphaMap[letter] = reduced.size;
  }  
};
 
removeLetters();
reduceOnMap();
console.log(alphaMap)
