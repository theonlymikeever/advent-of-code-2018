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
    const slice = state.slice(i, i + 5);
    const matchedNote = notes.find(n => n.rule === slice);
    if (matchedNote) {
      // update pot based on rule
      newState[i + 2] = matchedNote.outcome;
    }
  }
  return newState.join('');
};

const processGenerations = (state, n) => {
  let offset = 5;
  let previousGeneration = state;
  const allIterations = [];
  let gen = 0;
  for (let i = 0; i < n; i++) {
    previousGeneration = generation(previousGeneration);
    const b = previousGeneration.split('').reverse().indexOf('#');
    const f = previousGeneration.indexOf('#');
    const padBack = b < 5 ? 5 - b : 0;
    const padFront = f < 5 ? 5 - f : 0;
    offset += padFront;

    const iteration = previousGeneration.replace(/\./g, ' ').trim();
    // We'll look for a repeat in history! We can break the cycle as the generations will repeat themselves (on a long enough timeline)
    if (allIterations.includes(iteration)){
      gen = i + 1; // account for starting at zero
      i = n;
    } else {
      allIterations.push(iteration);
      previousGeneration = '.'.repeat(padFront) + previousGeneration + '.'.repeat(padBack);
    }
  }
  
  // console.log('loop gen', gen)
  return {
    state: previousGeneration,
    offset,
    gen
  };
};

const countPlants = ({state, offset, gen}, generationCount) => {
  // generation will be the calc of 
  const generation = generationCount - gen;
  let total = 0;
  total = state.split('').reduce((a, b, i) => b === '#' ? (i - offset + generation) + a : a, total);
  console.log('total', total);
};

const paddedState = '.'.repeat(5) + initialState + '.'.repeat(5);
const generationCount = 50000000000;
const lastGen = processGenerations(paddedState, generationCount);
countPlants(lastGen, generationCount);
