import { default as Node } from './node_class.js';

export class BST {
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

export default BST;