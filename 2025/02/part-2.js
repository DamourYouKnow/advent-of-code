const utils = require('../utils');


utils.readData('./02/input', true).then((data) => {
    const ranges = data.join('').split(',').map((range) => {
        const split = range.split('-');
        return { min: Number(split[0]), max: Number(split[1]) };
    });

    const invalidIds = [];
    for (const range of ranges) {
        const invalidInRange = filterRange(range.min, range.max, (id) => {
            return !isValidID(id);
        });

        invalidIds.push(...invalidInRange)
    }

    const result = invalidIds.reduce((acc, id) => acc + id, 0);
    console.log(result);
}).catch(console.error);


function filterRange(min, max, predicate) {
    if (max <= min) return [];

    const filtered = [];

    for (let value = min; value <= max; value++) {
        if (predicate(value)) filtered.push(value);
    }

    return filtered;
}


function isValidID(id) {
    id = id.toString();
    const halfLength = Math.floor(id.length / 2);

    const sequences = [];
    for (let sequenceStart = 0; sequenceStart < id.length; sequenceStart++) {
        for (let length = 1; length <= halfLength; length++) {
            const sequence = id.slice(sequenceStart, sequenceStart + length);
            sequences.push(sequence);
        }
    }

    return sequences.every((sequence) => !isRepeatingSequence(id, sequence));
}


function isRepeatingSequence(string, sequence) {
    let position = 0;
    while (position < string.length) {
        const substring = string.slice(position, position + sequence.length); 
        if (substring != sequence) return false;
        
        position += sequence.length;
    }

    return true;
}
