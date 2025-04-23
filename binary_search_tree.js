// disable recursion limit for console.logs to see beautified object visualization in output
const util = require('util')
util.inspect.defaultOptions.depth = null

// --- debug helpers ---

const isWithinTimeLimit = (startTime, limit) => {
    if (Date.now() - startTime >= limit) {
        console.log(`* * * This is taking more than ${limit / 1000} seconds! * * *`)
        return false;
    }

    return true
}

// --- Node & Tree class definitions ---

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
        return this.count;
    }

    insert(data) {
        this.count++;

        if (!this.root) {
            this.root = new Node(data)
            return;
        } else {
            const searchTree = (n) => {
                if (data < n.data) {
                    if (!n.left) {
                        n.left = new Node(data);
                        return;
                    } else {
                        return searchTree(n.left);
                    }
                } else if (data >= n.data) { // this won't make a true BST due to >= comparison, but it's here for edge cases
                    if (!n.right) {
                        n.right = new Node(data);
                        return
                    } else {
                        return searchTree(n.right);
                    }
                } else {
                    return;
                }
            }

        return searchTree(this.root)
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
    dfsInOrder(data = this.root) {
        let stack = [];



        return stack;
    }

    // pre-order
    // sort by root, left, right -- same order as input array(?)
    dfsPreOrder() {

    }

    //post-order
    // left, right, root
    dfsPostOrder() {

    }

    // --- breadth-first search ---
    // use queue, return values by level
    bfs() {

    }
};

// --- helper: tree generation from array of numbers ---
const createBST = (arr) => {
    const tree = new BST();

    arr.forEach(e => {
        tree.insert(e)
    })

    return tree;
};

// --- runtime test cases, uncomment & edit as needed ---

// const a = 2, b = 1, c = 5;
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

// let arrWithDupes = [2, 1, 5, 1, 2, 2, 2];
// const treeA = createBST(arrWithDupes)
// console.log(treeA)
// console.log(treeA.min())

const arrWithoutDupes = [50, 17, 72, 12, 23, 54, 76, 9, 14, 19, 67];
/*
            50
          /     \
         /       \
        17        72  
      /    \     /   \
    12      23  54    76
   /   \   /      \
  9    14 19      67

*/
// const treeB = createBST(arrWithoutDupes)
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
    /   \   /   \
   2    12 28   39

expected:
    dfsInOrder => [2, 3, 12, 15, 28, 36, 39]
*/
const treeC = createBST(arr3);
console.log(treeC);
// console.log(treeC.dfsInOrder())
