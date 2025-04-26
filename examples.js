import { default as helpers } from './util/index.js';
import { default as util } from 'util';

// disable recursion limit for console.logs to see object structure in output
util.inspect.defaultOptions.depth = null

const { createBSTFromArray } = helpers;

// =================
// Runtime Examples
// uncomment & edit as needed
// =================

const a = 2, b = 1, c = 5;
/*
      2
     / \
    1   5
*/
// let sampTree = new BST(a)
// console.log(sampTree)
// sampTree.insert(b)
// console.log(sampTree)
// sampTree.insert(c)
// console.log(sampTree)

let arrWithDupes = [2, 1, 5, 1, 2, 2, 2];
const treeA = createBSTFromArray(arrWithDupes)
// console.log(treeA)
// console.log(treeA.min())

const arrWithoutDupes = [50, 17, 72, 12, 23, 54, 76, 9, 14, 19, 67];
/*
             50
           /    \
          /      \
        17        72  
      /    \     /   \
    12      23  54    76
   /  \    /     \
  9   14  19      67

*/
const treeB = createBSTFromArray(arrWithoutDupes)
// console.log(treeB)
// console.log(treeB.min())
// console.log(treeB.max())
// console.log(treeB.contains(23))
// console.log(treeB.find(12))
// console.log(treeB.find(11))

const arr3 = [15, 3, 36, 28, 12, 2, 39];
/*
         15
       /    \
      3      36
    /  \    /   \
   2   12  28   39

expected:
    dfsInOrderTraversedPath AND dfsPreOrderSort -> [15, 3, 2, 12, 36, 28, 39]
    dfsInOrderSort -> [2, 3, 12, 15, 28, 36, 39]
    dfsPostOrderSort -> [2, 12, 3, 28, 39, 36, 15]
    bfsShowLevels -> [5, 3, 36, 2, 12, 28, 39]
*/
const treeC = createBSTFromArray(arr3);
console.log(treeC);
console.log(treeC.dfsInOrderTraversedPath());
console.log(treeC.dfsInOrderSort());
console.log(treeC.dfsPreOrderSort());
console.log(treeC.dfsPostOrderSort());
console.log(treeC.bfsShowLevels());