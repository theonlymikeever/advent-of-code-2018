const { createNodeTree, tree } = require('./part1');
// const data = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
// const testTree = createNodeTree(data);

const countMetaData = meta => meta.reduce((a, b) => a + b, 0);

const transverseTree = ({children, metadata}) => {
  // base case, no child exist, return reduce of metadata
  if (!children.length) return countMetaData(metadata);
  
  // if children exist, the node's metadata points become references
  let count = 0;
  metadata.forEach((ref) => {
    // check if child ref exists and reduce down recursively
    const child = children[ref - 1];
    if (child) {
      count += transverseTree(child);
    }
  });

  return count;
};

const rootNodeVal = transverseTree(tree);
console.log('value of root node:', rootNodeVal);

module.exports = {
  transverseTree,
  rootNodeVal
};
