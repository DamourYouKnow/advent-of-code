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

    console.log(invalidIds);
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

    if (id.length % 2 != 0) return true;

    const halfLength = id.length / 2;
    return id.slice(0, halfLength) != id.slice(halfLength);
}
