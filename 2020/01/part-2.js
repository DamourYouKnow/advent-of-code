const utils = require('../utils');

utils.readData('./2020/02/input').then((data) => {
    const numbers = data
        .map((row) => parseInt(row))
        .filter((number) => number <= 2020);
    
    const multiples = findThree(numbers, (a, b, c) => a + b + c == 2020);
    console.log(multiples[0] * multiples[1] * multiples[2]);     
}).catch(console.error);


function findThree(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            for (let k = 0; k < array.length; k++) {
                if (i == j || i == k || k == j) continue;
                if (predicate(array[i], array[j], array[k])) {
                    return [array[i], array[j], array[k]];
                }
            }
        }
    }

    return null;
}