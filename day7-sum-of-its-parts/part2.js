/* 
  This day's challenge took me a while to solve. There's comes a point where you learn
  to work smarter instead of longer and longer. Thus I got a lot of help by  reading and
  trying to break down other people's solutions on reddit.

  The one thing I truly love about being a developer, is the community. There are a million
  ways to paint a portrait, and sometimes the best way is to start by studying how Courbet 
  understands and depicts a shadow, by breaking it down to gradients of color
*/

const steps = require('./input');

// = charCode minus 64 (capital letters starting at 65) + 60 seconds, or just minus 4;
const letterTiming = l => l.charCodeAt(l) - 4;

// map is same as part one, only this time we're adding the timing for each letter
const createDepMap = steps => {
  let map = {};
  steps.forEach(step => {
    step = step.split(' ');
    const a = step[1];
    const b = step[7];
    map[a] = map[a] || { val: a, deps: {}, time: letterTiming(a) };
    map[b] = map[b] || { val: b, deps: {}, time: letterTiming(b) };
    map[b].deps[a] = true;
  });
  return map;
};

const depMap = createDepMap(steps);

const processTiming = map => {
  let timing = 0;
  let stack = Object.values(map);
  let workerQueue = Array.from({ length: 5 }, () => '.');

  while (Object.values(map).length > 0) {
    /* 
      Same as part one -> look at each node's dep tree for smallest 
      & sort alphabetically
    */

    stack = Object.values(map)
      .filter(item => !Object.keys(item.deps).length)
      .sort((a, b) => (a.val < b.val ? -1 : 1));

    // if stack is empty, we can assume we've finished
    if (!stack[0]) break;

    /*
      look to see whether or not anything in the stack is currently being worked
      on concurrently, via the workerQueue
    */
    stack = stack.filter(step => !workerQueue.includes(step.val));
    let i = -1;
    /* 
      cycle workerQueue against current stack to determine if step should be picked up
      which is only the case when there are multiple same-level left and thus picked alphabetically
    */
    workerQueue = workerQueue.map(step => {
      // they're already working on something, return that step
      if (step !== '.') return step;
      else {
        ++i;
        return stack[i] ? stack[i].val : '.';
      }
    });
    // now process the workerQueue
    workerQueue.forEach((step, i) => {
      // check if it's an idle worker
      if (step === '.') return;
      // decrement the time remaining for step, by one second per pass
      map[step].time -= 1;
      /* 
        see if we're clear to process the next item (because time = 0)
        also meaning we can delete the nodes across the dep trees
      */
      if (!map[step].time) {
        delete map[step];
        workerQueue[i] = '.'; // clear item in workerQueue
        // remove from all other dep trees
        Object.values(map).forEach(s => delete s.deps[step]);
      }
    });

    // account for timing pass;
    timing += 1;
  }
  return timing;
};

const solution = processTiming(depMap);
console.log(solution);
module.exports = processTiming;
// console.log(processTiming(depMap));
