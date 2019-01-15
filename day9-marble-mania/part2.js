const { testData, puzzleData } = require('./input');
// So this is where the optimizations are needed. Using a circular linked list is much, much faster.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.current = null;
    this.length = 0;
  }

  append(val) {
    let node = new Node(val);
    if (!this.current) {
      // adding the first node
      this.current = node;
      this.current.next = node;
      this.current.prev = node;
    } else {
      let current = this.current;
      if (this.length === 1) {
        // adding in the second node
        node.prev = current;
        node.next = current;
        current.prev = node;
        current.next = node;
        this.current = node;
      } else {
        // all other nodes - insert in between 1 and 2 nodes in front of current
        node.prev = current.next;
        node.next = current.next.next;

        current.next.next.prev = node;
        current.next.next = node;
        this.current = node;
      }
    }
    this.length++;
  }

  remove(ticks) {
    let current = this.current;
    let val;

    // cycle through nodes until we satisfy ticks
    for (let i = 0; i < ticks; i++) {
      current = current.prev;
    }

    val = current.val;
    // let the node atrophy
    current.prev.next = current.next;
    current.next.prev = current.prev;
    // current updated to immediate node clockwise
    this.current = current.next;
    // update our length for removal
    this.length--;

    return val;
  }

  placeMarble(marble) {
    if (marble % 23 === 0) {
      /* 
        the marble 7 marbles counter-clockwise from the current marble is removed
        marble located immediately clockwise of the marble that was removed becomes the new current marble
      */
      let removed = this.remove(7);
      let score = marble + removed;
      return score;
    }

    this.append(marble);
    return 0;
  }
}

const playMarbles = (playerCount, maxPoints) => {
  let scoreMap = {}; // score keeping
  let playerNum = 1;
  let circle = new DoublyLinkedList();
  circle.append(0);

  for (let marble = 1; marble <= maxPoints; marble++) {
    // less crazy output
    // if (marble % 10 === 0) console.log('placing marble', marble);

    let score = circle.placeMarble(marble);
    if (score) {
      scoreMap[playerNum] = scoreMap[playerNum] || 0;
      scoreMap[playerNum] += score;
    }
    // increment player or reset after last
    playerNum = playerNum !== playerCount ? playerNum + 1 : 1;
  }

  return {
    circle,
    scoreMap
  };
};

const findHighestScore = scoreMap => {
  let scores = Object.keys(scoreMap).map(player => scoreMap[player]);
  return scores.sort((a, b) => b - a)[0];
};

// let { playerCount, maxPoints, winningScore } = testData[5];
let { playerCount, maxPoints } = puzzleData;
maxPoints = maxPoints * 100; // condition for part 2
const results = playMarbles(playerCount, maxPoints);
const highestScore = findHighestScore(results.scoreMap);

console.log(results.scoreMap);
// console.log('highest:', highestScore, 'correct:', highestScore === winningScore);
console.log('highest:', highestScore);
