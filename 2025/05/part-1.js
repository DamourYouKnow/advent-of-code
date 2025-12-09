const utils = require('../utils');


utils.readData('./05/input', false).then((data) => {
    const splitIndex = data.findIndex((row) => row == '');

    const ranges = data.slice(0, splitIndex).map((range) => {
        const split = range.split('-');
        return { min: Number(split[0]), max: Number(split[1]) }; 
    });

    const ids = data.slice(splitIndex + 1).map(Number);

    ranges.sort((a, b) => a.min - b.min);
    ids.sort((a, b) => a - b);

    let startIndex = 0;
    let validCount = 0;

    for (const id of ids) {
        for (let index = startIndex; index < ranges.length; index++) {
            const range = ranges[index];

            if (id >= range.min && id <= range.max) {
                // In range, increase count and move to next ID
                validCount += 1;
                break;
            }
            else if (id > range.min) {
                // Move start index forward for future searches
                startIndex = index;
            }
            else {
                break;
            }
        }
    }

    console.log(validCount);
}).catch(console.error);
