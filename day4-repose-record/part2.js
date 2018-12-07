const { findMaxMinute, guardMap } = require('./part1');

const createFrequencies = guardMap => {
  const frequencies = [];
  for (let guard in guardMap) {
    const foundMinute = findMaxMinute(guardMap[guard]);
    frequencies.push({ ...foundMinute, id: guard });
  }
  return frequencies;
};

const findMostFrequentlyAsleep = records => {
  return records.reduce((prev, curr) => {
    if (curr.max > prev.max) return curr;
    return prev;
  });
};

const solution = record => record.id.slice(1) * record.maxIndex;

const frequencies = createFrequencies(guardMap);
const mostFreqGuardRec = findMostFrequentlyAsleep(frequencies);
// console.log(frequencies);
console.log('solution', solution(mostFreqGuardRec));
