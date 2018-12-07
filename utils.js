const fs = require('fs');
const path = require('path');

const splitData = (data, delimiter = '\n') => data.split(delimiter);

const readData = (fileName, options = {}) => {
  let data = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
  if (options.split) {
    return splitData(data, options.delimiter);
  }
  return data;
};

module.exports = readData;
