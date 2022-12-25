const utils = require('../utils');

utils.readData('./01/input', false).then((data) => {
    const groups = chunks(data, (row) => row == '');
    const sums = groups.map((group) => {
        return group.reduce((a, c) => Number(a) + Number(c), 0);
    });
    sums.sort((a, b) => b - a);
    const result = sums.slice(0, 3).reduce((a, c) => a + c);
    console.log(result);
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