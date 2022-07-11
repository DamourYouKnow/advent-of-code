const utils = require('../utils');

utils.readData('./2020/01/input').then((data) => {
    const numbers = data
        .map((row) => parseInt(row))
        .filter((number) => number <= 2020);
    
    const multiples = findTwo(numbers, (a, b) => a + b == 2020);
    console.log(multiples[0] * multiples[1]);     
}).catch(console.error);


function findTwo(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i != j && predicate(array[i], array[j])) {
                return [array[i], array[j]];
            }
        }
    }

    return null;
}