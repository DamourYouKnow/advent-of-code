const utils = require('../utils');

utils.readData('./2020/09/input').then((data) => {
    const preambleLength = 25;
    const targetCount = 2;

    const numbers = data.map((row) => parseInt(row));
    const result = [];
    for (let i  = preambleLength; i < numbers.length; i++) {
        const preamble = numbers.slice(i - preambleLength, i);
        const found = sum2(preamble, numbers[i], targetCount);
        if (!found) result.push(numbers[i]);
    }

    console.log(result[0]);
});

function sum2(values, target) {
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
            if (i != j && values[i] + values[j] == target) {
                return [values[i], values[j]];
            }
        }
    }
    return undefined;
}

function sum(values, target, size) {
    values = Array.from(new Set(values.filter((value) => value < target)));
    const perms = nCombinations(values, size);
    return perms.find((perm) => perm.reduce((a, c) => a + c) == target)
}

function nCombinations(array, size) {
    const perms = [];
    const helper = (arr, size) => {
        if (arr.length == size) {
            perms.push(arr);
        }
        if (arr.length > size) {
            for (let i = 0; i < arr.length; i++) {
                helper([...arr.slice(0, i), ...arr.slice(i+1)], size);
            }
        }
    };
    helper(array, size);
    return perms;
}




