const input = require('./input');

/* 
  data structure
  {
    guardID: [
        {
          date: date
          motions: [0...59]
        }
      ]
    }
  }
*/

const createNewTimeStamp = (id, date) => {
  /* 
    motions array represents time during the midnight hour 00:00 => 00:59
   */
  return {
    id,
    date,
    motions: Array.from({ length: 60 }, () => 0)
  };
};

const tagInputs = input => {
  const partsRegex = new RegExp('\\[(.*) (.*):(.*)] (.*)');
  const actionRegex = new RegExp('wakes|#\\d*|asleep');

  let asleep = 0;
  let tagged = [];

  input.forEach(item => {
    const [fullStr, date, hour, min, note] = item.match(partsRegex);
    const [parsed] = item.match(actionRegex);
    if (parsed === 'asleep') {
      asleep = +min;
    } else if (parsed === 'wakes') {
      let lastIdx = tagged.length - 1;
      tagged[lastIdx]['motions'] = tagged[lastIdx]['motions'].map(
        (timeSlot, idx) => (idx >= asleep && idx < +min ? 1 : timeSlot)
      );
      asleep = +min;

    } else if (parsed[0] === '#') {
      tagged.push(createNewTimeStamp(parsed, date));
      asleep = 0; // reset
    }
  });

  return tagged;
};

const taggedList = tagInputs(input);
const compare = (a, b) => b - a > 0;

const createGuardMap = taggedList => {
  const guardMap = {};
  taggedList.forEach(record => {
    let timeAsleep = record.motions.filter(i => i).length;
    if (guardMap[record.id]) {
      guardMap[record.id] = {
        ...guardMap[record.id],
        motions: [...guardMap[record.id].motions, record.motions],
        totalTime: guardMap[record.id].totalTime + timeAsleep
      };
    } else {
      // first entry in the map
      guardMap[record.id] = {
        totalTime: timeAsleep,
        motions: [record.motions]
      };
    }
  });
  return guardMap;
};

const findMostSleepy = guardMap => {
  let mostSleepy = null;
  let totalSleep = 0;
  for (let guard in guardMap) {
    if (compare(totalSleep, guardMap[guard].totalTime)) {
      totalSleep = guardMap[guard].totalTime;
      mostSleepy = {
        id: guard,
        totalTime: totalSleep
      };
    }
  }

  return mostSleepy;
};

// This could be muchhhhh more efficient
const findCommonMinute = (guard, taggedList) => {
  const clock = Array.from({length: 60}, () => 0);
  const guardList = taggedList.filter(i => i.id === guard.id);
  guardList.forEach(record => {
    let {motions} = record;
    motions.forEach((minute, idx) => {
      if (minute > 0) {
        clock[idx] = clock[idx] ? ++clock[idx] : 1;
      }
    });
  });
  let maxMin = clock.indexOf(Math.max(...clock));
  return maxMin;
};

const guardMap = createGuardMap(taggedList);
const foundGuard = findMostSleepy(guardMap);
const foundMinute = findCommonMinute(foundGuard, taggedList);

const solution = () => foundGuard.id.slice(1) * foundMinute;
console.log(solution());

module.exports = {
  taggedList,
  solution,
  guardMap
};

// console.log(findCommonMinute(foundGuard, taggedList));
