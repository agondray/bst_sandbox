import { default as BST } from '../classes/bst.js';

export const createBSTFromArray = (arr) => {
    const tree = new BST();

    arr.forEach(e => {
        tree.insert(e)
    })

    return tree;
};

export default { createBSTFromArray };