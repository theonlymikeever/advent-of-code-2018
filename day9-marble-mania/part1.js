const { testData, puzzleData } = require('./input');

const test = [0];

const placeMarble = (currentMarble, circle, marble) => {
  let newCircle;
  // if marble is multiple of 23
  if (marble % 23 === 0) {
    // the marble 7 marbles counter-clockwise from the current marble is removed
    // marble located immediately clockwise of the marble that was removed becomes the new current marble
    let removalPoint = currentMarble - 7;
    let removed = circle[removalPoint];
    console.log('adding', marble, '&', removed)
    let score = marble + removed;
    newCircle = [...circle.slice(0, removalPoint), ...circle.slice(removalPoint + 1)];
    currentMarble = removalPoint;
    console.log('** Point scored!', score);
    console.log('current marble', currentMarble)
    return { newCircle, currentMarble, score };
  }
  // do stuff
  if (circle.length === 1) return {newCircle: [...circle, marble], currentMarble: 1};
  /* 
    marble is placed clockwise:
      - to the right of currentMarble if currentMarble idx < circle.length
      - to the right of idx 1, if currentMarble is in slot
  */

  if (currentMarble === circle.length - 1) {
    // going full circle! place in first slot
    newCircle = [circle[0], marble, ...circle.slice(1)];
  } else {
    newCircle = [...circle.slice(0, currentMarble + 2), marble, ...circle.slice(currentMarble + 2)];
  }

  currentMarble = newCircle.indexOf(marble);

  return {
    currentMarble,
    newCircle
  };
};

const playMarbles = (playerCount, maxPoints) => {
  let scoreMap = {}; // score keeping
  let marble = 0;
  let circle = [marble];
  let currentMarble = marble;

  while (marble < maxPoints) {
    // console.log('new round')
    for (let playerNum = 1; playerNum <= playerCount && marble < maxPoints; playerNum++) {
      marble++; // increase marble size
      console.log('player', playerNum, 'placing marble', marble);
      let result = placeMarble(currentMarble, circle, marble);
      if (result.score) {
        scoreMap[playerNum] = scoreMap[playerNum] || 0;
        scoreMap[playerNum] += result.score;
      }
      circle = result.newCircle;
      currentMarble = result.currentMarble;
    }
  }
  console.log(circle)
  return {
    circle,
    scoreMap
  };
};

const findHighestScore = scoreMap => {
  let scores = Object.keys(scoreMap).map(player => scoreMap[player]);
  return scores.sort((a, b) => b - a);
};
let {playerCount, maxPoints} = testData[1];
const results = playMarbles(playerCount, maxPoints);
console.log(results.scoreMap)
console.log('highest', findHighestScore(results.scoreMap)[0]);
