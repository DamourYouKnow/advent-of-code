const utils = require('../utils');

utils.readData('./08/input').then((data) => {
    const displays = data.map((row) => {
        const split = row.split(' | ');
        return {
            patterns: split[0].split(' '),
            output: split[1].split(' ')
        };
    });

    const test = permutations([1, 2, 3, 4, 5, 6, 7]);

    const segments = {
        0: [0, 1, 2, 4, 5, 6],
        1: [5, 6],
        2: [2, 5, 3, 1, 4],
        3: [2, 5, 3, 6, 4],
        4: [0, 3, 5, 6],
        5: [2, 0, 3, 6, 4],
        6: [2, 0, 1, 4, 6, 3],
        7: [2, 5, 6],
        8: [0, 1, 2, 3, 4, 5, 6],
        9: [2, 0, 3, 5, 6, 4]
    };

    const digits = Object.keys(segments).map((x) => parseInt(x));

    let outputs = [];
    for (const display of displays) {
        const orderings = permutations('abcdefg'.split(''));
        const validOrdering = orderings.find((ordering) => {
            return display.patterns.every((pattern) => {
                const indices = pattern.split('').map((segment) => {
                    return ordering.indexOf(segment);
                });
                const matchingDigit = digits.find((digit) => {
                    return segments[digit].every((segIndex) => {
                        return indices.includes(segIndex);
                    }) && segments[digit].length == indices.length;
                });
                return matchingDigit != undefined;
            });
        });

        const outputDigits = display.output.map((outputDigit) => {
            return digits.find((digit) => {
                const indices = outputDigit.split('').map((segment) => {
                    return validOrdering.indexOf(segment);
                });
                return segments[digit].every((segIndex) => {
                    return indices.includes(segIndex);
                }) && segments[digit].length == indices.length;
            });
        });
        outputs.push(parseInt(outputDigits.join('')));
    }
    const total = outputs.reduce((a, c) => a + c);
    console.log(total);
}).catch(console.error);

function permutations(arr) {
    const perms = [];
    permute(arr, [], perms);
    return perms;
}

function permute(arr, chosen, perms) {
    if (arr.length == 0) {
        perms.push(chosen);
    } else {
        for (let i = 0; i < arr.length; i++) {
            permute(
                [...arr.slice(0, i), ...arr.slice(i+1)],
                [...chosen, arr[i]],
                perms
            );
        }
    }
}