const fs = require('fs');
const path = require('path');

const splitData = (data, {delimiter = '\n', format}) => {
  // format will be a function that gets mapped to transform the entries
  if (format) return data.split(delimiter).map(format);
  return data.split(delimiter);
};

const readData = (fileName, options = {}) => {
  let data = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
  data = data.trim(); // why these files have whitespace is beyond me
  if (options.split) {
    return splitData(data, options);
  }
  return data;
};

module.exports = readData;
