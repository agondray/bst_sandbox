// =================
// For debugging
// =================

const TWO_SECONDS_MS = 2000;

export const isWithinTimeLimit = (startTime, limit = TWO_SECONDS_MS) => {
    if (Date.now() - startTime >= limit) {
        console.log(`* * * This is taking more than ${limit / 1000} seconds! * * *`)
        return false;
    }

    return true
}

// ===================================
// For runtime tests & examples
// ===================================

// generate tree from array of numbers
export const createBSTFromArray = (arr) => {
    const tree = new BST();

    arr.forEach(e => {
        tree.insert(e)
    })

    return tree;
};

export default {
    isWithinTimeLimit,
    createBSTFromArray,
}