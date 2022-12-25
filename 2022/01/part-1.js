const utils = require('../utils');

utils.readData('./01/input', false).then((data) => {
    const groups = chunks(data, (row) => row == '');
    const sums = groups.map((group) => {
        return group.reduce((a, c) => Number(a) + Number(c), 0);
    });
    console.log(sums);
    const max = Math.max(...sums);
    console.log(max);
}).catch(console.error);


function chunks(arr, predicate) {
    const chunks = [];
    let currentChunk = [];
    for (const item of arr) {
        if (predicate(item)) {
            chunks.push(currentChunk);
            currentChunk = [];
        } else {
            currentChunk.push(item);
        }
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }

    return chunks;
}