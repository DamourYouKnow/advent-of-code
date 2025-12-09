const utils = require('../utils');


utils.readData('./05/input', false).then((data) => {
    const splitIndex = data.findIndex((row) => row == '');

    const ranges = data.slice(0, splitIndex).map((range) => {
        const split = range.split('-');
        return { min: Number(split[0]), max: Number(split[1]) }; 
    });

    ranges.sort((a, b) => a.min - b.min);

    const mergedRanges = [];
    for (let i = 0; i < ranges.length; i++) {
        const currentRange = ranges[i];
        const nextRange = ranges[i+1];

        const mergeable = nextRange != undefined
            && currentRange.min <= nextRange.min
            && currentRange.max >= nextRange.min;

        if (mergeable) {
            const mergedRange = {
                min: currentRange.min, 
                max: Math.max(currentRange.max, nextRange.max)
            };
            ranges[i+1] = mergedRange;
        }
        else {
            mergedRanges.push(currentRange);
        }
    }

    const result = mergedRanges.reduce((acc, range) => {
        return acc + range.max - range.min + 1;
    }, 0)

    console.log(result);
}).catch(console.error);
