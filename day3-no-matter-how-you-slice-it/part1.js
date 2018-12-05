const { input } = require('./input');

// Grid @ 1000x1000 was too small! Says at LEAST 1000
const createGrid = (width = 1000, height = 1000) => {
  // Map out a H x W array
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );
};

const fillGrid = (info, grid) => {
  console.log(`filling claim ${info.claim}`);
  for (let i = 0; i < info.height; i++) {
    for (let x = 0; x < info.width; x++) {
      grid[i + info.top][x + info.left] += 1;
    }
  }
};

const computeFilledArea = grid => {
  return grid.reduce((a, b) => {
    const rowTotal = b.filter(item => item >= 2);
    return a + rowTotal.length;
  }, 0);
};

const findCorrectCut = () => {
  // Initiate paper!!
  let sheetOfPaper = createGrid();
  // fill the sheet
  input.forEach(info => fillGrid(info, sheetOfPaper));
  // find the overlap
  return computeFilledArea(sheetOfPaper);
};

module.exports = findCorrectCut;
console.log('\nTotal surface area:', findCorrectCut());
