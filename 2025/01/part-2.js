const { start } = require('repl');
const utils = require('../utils');


const dialLength = 100;
const startPosition = 50;


utils.readData('./01/input', true).then((data) => {
    const rotations = data.map((row) => {
            const sign = row.startsWith('L') ? -1 : 1;
            return Number(row.slice(1)) * sign;
    });

    let position = startPosition;
    let zeroCount = 0;

    for (const rotation of rotations) {
        zeroCount += circularTraversals(position, rotation, dialLength);
        position = circularIndex(position + rotation, dialLength);
    }

    console.log(zeroCount);
}).catch(console.error);


function circularIndex(index, length) {
    return ((index % length) + length) % length;
}

function circularTraversals(startIndex, rotation, length) {
    const direction = rotation > 0 ? 1 : -1;   
    let count = 0;
    let index = startIndex;

    while (rotation != 0) {
        index = circularIndex(index + direction, length);
        rotation -= direction;
        if (index == 0) count += 1;
    }

    return count;
}
