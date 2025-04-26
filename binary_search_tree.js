const helpers = require('./helpers/index.js');

const { createBSTFromArray } = helpers;

// disable recursion limit for console.logs to see object structure in output
const util = require('util')
util.inspect.defaultOptions.depth = null

// =============================
// Node & Tree Class Definitions
// =============================

class Node {
    constructor(data, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class BST {
    constructor(data) { // assumes integer data
        this.root = !!data ? new Node(data) : null; // guard against undefined initialization (e.g. let a = new BST())
        this.count = !!data ? 1 : 0; // if initializing with data, set to 1
    }

    getRoot() {
        return this.root;
    }

    size() {
        return this.length;
    }

    insert(data) {
        this.length++;

        if (!this.root) {
            this.root = new Node(data)
            return;
        } else {
            this.#searchTreeRec(this.root, data)
        }
    }

    // min & max will only work if the tree has no duplicate values
    min() {
        let current = this.root;

        while (current.left) {
            current = current.left;
        }

        return current;
    }

    max() {
        let current = this.root;

        while (current.right) {
            current = current.right;
        }

        return current;
    }

    contains(data) {
        let current = this.root;

        while (current) {
            if (data === current.data) {
                return true
            } else if (data < current.data) {
                current = current.left
            } else if (data > current.data) {
                current = current.right
            }
        }

        return false;
    }

    find(data) {
        let current = this.root;

        while(current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
            }

            if (current === null) {
                return `${data} not found.`
            }
        }

        return current;
    }

    remove(data) {
        // WIP
    }

    replace(data) {
        // WIP
    }

    // --- depth-first search ---

    // in-order
    // sort by left, root, right
    // POST-IMPLEMENTATION NOTE: tracing the path traversed this way is actually the same as dfsPreOrder
    dfsInOrderTraversedPath() {
        let stack = [this.root];
        let traversalOrder = []

        // LIFO: set traversal order
        while (stack.length) {
            let current = stack.shift();
            traversalOrder.push(current.data)

            if (current.right) {
                stack.unshift(current.right)
            }

            if (current.left) {
                stack.unshift(current.left)
            }
        }

        return traversalOrder;
    }

    dfsInOrderSort() {
        let result = [];

        const traverse = (node) => {
            if (!node) return;

            traverse(node.left);
            result.push(node.data);
            traverse(node.right);

        }

        traverse(this.root);

        return result;
    }

    // pre-order
    // sort by root, left, right
    // implementing recursively as opposed to iteratively in dfsInOrderTraversedPath
    dfsPreOrderSort() {
        let result = [];

        const traverse = (node) => {
            if (!node) return;

            result.push(node.data);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);

        return result;
    }

    //post-order
    // left, right, root
    dfsPostOrderSort() {
        let result = [];

        const traverse = (node) => {
            if (!node) return;

            traverse(node.left);
            traverse(node.right);
            result.push(node.data);
        }

        traverse(this.root);

        return result;
    }

    // --- breadth-first search ---

    // use queue, return values by level
    bfsShowLevels() {
        let queue = [this.root];
        let result = [];

        this.#bfsTraverseRec(this.root, queue, result);

        return result;
    }

    // #private methods

    // FIFO
    #bfsTraverseRec(node, queue, result) {
        if(!node) return;

        const current = queue.shift();

        if (current.left) {
            queue.push(current.left)
        }

        if (current.right) {
            queue.push(current.right)
        }

        result.push(current.data);

        this.#bfsTraverseRec(current.left, queue, result);
        this.#bfsTraverseRec(current.right, queue, result);
    }

    #searchTreeRec(n, data) {
        if (data < n.data) {
            if (!n.left) {
                n.left = new Node(data);
                return;
            } else {
                this.#searchTreeRec(n.left, data);
            }
        } else if (data >= n.data) { // this won't make a true BST due to >= comparison. it's arbitrarily here for cases like arrWithDupes
            if (!n.right) {
                n.right = new Node(data);
                return
            } else {
                this.#searchTreeRec(n.right, data);
            }
        } else {
            return;
        }
    }
};



// WIP - other ideas for practice:
// left sum, right sum
// find & count shortest path to node
// !!! GUI of a "mouse" solving a maze using BST traversals, with toggles & controls !!!

// =================
// Runtime Tests
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
// console.log(treeC.dfsInOrderTraversedPath());
// console.log(treeC.dfsInOrderSort());
// console.log(treeC.dfsPreOrderSort());
// console.log(treeC.dfsPostOrderSort());
console.log(treeC.bfsShowLevels());