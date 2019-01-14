let data = require('./input');
// testing data:
// const data = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];

const createNodeTree = input => {

  const sliceMeta = (pointer, metaCount, input) => {
    return input.slice(pointer, pointer + metaCount);
  };
  
  const findNodeDepth = ({ children, metadata }) => {
    // if child nodes exist, we'll perform a depth first search on the BST
    let length = 2;

    if (children.length) {
      children.forEach((child) => {
        length += findNodeDepth(child);
      });
    }
  
    return length + metadata.length;
  };

  const createNode = input => {
    // pull out first 2 entries for instructions;
    const [childCount, metaCount] = input;
    const children = [];
    let pointer = 2;

    // check if we should go deeper through tree
    if (childCount > 0) {
      for (let idx = 0; idx < childCount; idx++) {
        const nextInput = input.slice(pointer, input.length);
        const childNode = createNode(nextInput);
        // adjust pointer forward, depending how far down current child tree goes
        pointer += findNodeDepth(childNode);
        children.push(childNode);
      }
    }
    const metadata = sliceMeta(pointer, metaCount, input);
    return { children, metadata };
  };

  const tree = createNode(input);
  return tree;
};

const countTotalMeta = (tree, count = 0) => {
  count = tree.metadata.reduce((a, b) => a + b);
  if (tree.children.length) {
    count += tree.children.reduce((a, b) => a + countTotalMeta(b), 0);
  }

  return count;
};

const tree = createNodeTree(data);
const result = countTotalMeta(tree);
console.log('total metadata:', result);

module.exports = {
  tree,
  createNodeTree
};
