const data = require('./input');
let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const parseStep = input => [input.charAt(5), input.charAt(36)];
const instructions = data.map(parseStep);

const sortAlphabetic = arr => arr.sort((a, b) => alpha.indexOf(a) - alpha.indexOf(b));
const sortReverseAlphabetic = arr => arr.sort((a, b) => alpha.indexOf(b) - alpha.indexOf(a));

const createStepMap = instructions => {
  const map = {};
  instructions.forEach(([first, next]) => {
    // check to see if the rule exists in map or add
    map[first] = map[first] || {};
    // create set of rules or add to existing
    if (!map[first].rules) {
      map[first].rules = [next];
    } else {
      map[first].rules.push(next);
    }
  });

  // Organize rules alphabetically
  for (let letter in map) {
    map[letter].rules = sortAlphabetic(map[letter].rules);
  }

  return map;
};

// const findStartingPoint = instructions => {
//   const firsts = instructions.map(([first]) => first);
//   const seconds = instructions.map(([_, second]) => second);
//   return firsts.filter(letter => seconds.indexOf(letter) < 0);

//   console.log(firsts, seconds)
// }

const createDependencyMap = map => {
  // const dependencyMap = {};
  const treeList = [];

  for (let key in map) {
    map[key].rules.forEach(rule => {
      const node = treeList.find(item => item.current === rule);
      if (!node) {
        treeList.push({
          current: rule,
          dependencies: [key],
          depth: 1
        });
      } else {
        node.dependencies.push(key);
        node.dependencies = sortReverseAlphabetic(node.dependencies);
        node.depth++;
      }
    });
    if (!treeList.find(item => item.current === key)) {
      treeList.push({
        current: key,
        dependencies: [],
        depth: 0
      });
    }
  }
  // for (let key in map) {
  //   map[key].rules.forEach(rule => {
  //     if (!dependencyMap[rule]) {
  //       dependencyMap[rule] = { dependencies: [] };
  //     }
  //     dependencyMap[rule].dependencies.push(key);
  //     dependencyMap[rule].depth = dependencyMap[rule].dependencies.length;
  //   });
  // }
  return treeList;
  // return dependencyMap;
};

const processSteps = dependencyMap => {
  // going in reverse, we'll start from the node with most dependencies
  let startingPoint = dependencyMap.sort((a, b) => b.depth - a.depth)[0];
  let stack = dependencyMap.filter(item => item.current !== startingPoint.current);
  // let stack = dependencyMap.sort((a, b) => b.depth - a.depth);
  let queue = [];
  // let queue = sortReverseAlphabetic([...startingPoint.dependencies]);
  let node;
  // let stack = [startingPoint];
  let answer = [];
  // let next = startingPoint.dependencies.shift();
  // let i = 0;
  while (stack.length > 0) {
    // i++;
    // console.log(stack)
    node = stack.shift();
    console.log('current node', node)
    answer.push(node.current); // Add the step to our letters
    console.log('answer', answer)
    // let next = node.dependencies ? node.dependencies.shift() : null;

    console.log('adding to queue')
    // merge the current queue, remove the duplicates and sory by reverse alphabetic
    queue = [...queue, ...stack.filter(item => node.dependencies.indexOf(item.current))];
    queue = queue.filter((item, i) => queue.indexOf(item) === i);
    queue = sortReverseAlphabetic(queue);
    console.log('queue is now', queue);
    // let nextLetter = queue.length ? queue.shift() : noDeps.filter(item => item.current !== node.current);
    if (node.dependencies.length < 1) {
      console.log('stackkkk', stack)
      answer = [...answer, ...sortReverseAlphabetic(stack.map(x => x.current))];
      stack = [];
    } else {
      let next = queue.shift();
      // let next = queue.find(item => !item.dependencies.length);
      // queue = queue.filter(item => item !== next);
      console.log('next', next)
      stack = [stack.find(item => item.current === next.current), ...stack.filter(item => item.current !== next.current)];
      // console.log(stack)
      // node = stack.shift();
    }
    // stack.push(dependencyMap.find(item => item.current === nextLetter));
    console.log('\n')
    // let next = queue.length ? node.dependencies : sortReverseAlphabetic([...queue, ...node.dependencies]);

    // if (next) {
    //   queue = [...queue, ...next.dependencies]
    //   stack.push()
    // }
  }

  return answer.reverse().join('');
};

const stepMap = createStepMap(instructions);
const dependencyMap = createDependencyMap(stepMap)
const stepStac = [];

processSteps(dependencyMap);
// console.log(dependencyMap)
// console.log(findStartingPoint(instructions));