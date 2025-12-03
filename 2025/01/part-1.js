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
        position = circularIndex(position + rotation, dialLength);
        if (position == 0) zeroCount += 1;
    }

    console.log(zeroCount);
}).catch(console.error);


function circularIndex(index, length) {
    return ((index % length) + length) % length;
} 
