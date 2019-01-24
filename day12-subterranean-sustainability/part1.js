const { data } = require('./input');

const initialState = data[0].split(' ')[2];
const notes = data.slice(1).map(note => {
  const parts = note.split(' ');
  return {
    rule: parts[0],
    outcome: parts[2]
  };
});

// Note makeup: LLCRR => N
const generation = state => {
  // will return a new state after a generation
  let newState = Array.from({ length: state.length }, () => '.');

  for (let i = 0; i < state.length; i++) {
    let slice = state.slice(i, i + 5);
    notes.forEach(note => {
      // run through notes to find matches
      if (note.rule === slice) {
        newState[i + 2] = note.outcome;
      }
    });
  }
  return newState.join('');
};

const processGenerations = (state, n) => {
  let offset = 5;
  let previousGeneration = state;
  for (let i = 0; i < n; i++) {
    previousGeneration = generation(previousGeneration);
    const b = previousGeneration.split('').reverse().indexOf('#');
    const f = previousGeneration.indexOf('#');
    const padBack = b < 5 ? 5 - b : 0;
    const padFront = f < 5 ? 5 - f : 0;
    if (padFront) {
      offset += padFront;
    }
    previousGeneration = '.'.repeat(padFront) + previousGeneration + '.'.repeat(padBack);
  }
  return {
    state: previousGeneration,
    offset
  };
};

const countPlants = ({state, offset}) => {
  let total = 0;
  total = state.split('').reduce((a, b, i) => b === '#' ? (i - offset) + a : a, total);
  console.log('total', total);
};

const paddedState = '.'.repeat(5) + initialState + '.'.repeat(5);
const lastGen = processGenerations(paddedState, 20);
// countPlants({state: '.#....##....#####...#######....#.#..##.', offset: 3 })
// countPlants(lastGen);

module.exports = {
  processGenerations,
  countPlants
};
