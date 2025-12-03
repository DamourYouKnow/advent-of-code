const utils = require('../utils');


utils.readData('./03/input', true).then((data) => {
    const banks = data.map((row) => {
        return row.split('').map(Number);
    });

    const maxJoltages = banks.map((bank) => maxSequence(bank, 12));
    const result = maxJoltages.reduce((acc, cur) => acc + cur, 0);
    console.log(maxJoltages);
    console.log(result);
}).catch(console.error);


function maxSequence(values, size) {
    const selected = [];

    let pivotIndex = 0;

    while (selected.length < size) {
        const cutoffIndex = (values.length - size) + selected.length + 1;
        let pivotMax = -Infinity;
        
        for (let index = pivotIndex; index < cutoffIndex; index++) {
            if (values[index] > pivotMax) {
                pivotIndex = index + 1;
                pivotMax = values[index];
            }
        }

        selected.push(pivotMax);
    }

    return Number(selected.join(''));
}
