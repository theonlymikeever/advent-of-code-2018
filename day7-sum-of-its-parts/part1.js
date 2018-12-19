const steps = require('./input');

const createDepMap = steps => {
  let map = {};
  // Iterate through steps and create dependency tree
  steps.forEach(step => {
    step = step.split(' ');
    const a = step[1];
    const b = step[7];
    map[a] = map[a] || { val: a, deps: {} };
    map[b] = map[b] || { val: b, deps: {} };
    map[b].deps[a] = true;
  });
  return map;
};

const processDepMap = map => {
  let answer = '';
  let stack = Object.values(map);

  while (stack.length > 0) {
    // Process stack, looking at each node's dep tree, and sorting alphabetically
    stack = Object.values(map)
      .filter(item => !Object.keys(item.deps).length)
      .sort((a, b) => (a.val < b.val ? -1 : 1));
    // if stack is empty, we can assume we've finished
    if (!stack[0]) break;
    // otherwise, add val to the answer
    const val = stack[0].val;
    answer += val;
    // remote the node, as it's been processed from top level map, as well as every other dependency tree
    delete map[val];
    Object.values(map).forEach(item => {
      delete item.deps[val];
    });
  }

  return answer;
};

const depMap = createDepMap(steps);
const solution = processDepMap(depMap);
console.log(solution);

module.exports = {
  processDepMap,
  createDepMap
};
