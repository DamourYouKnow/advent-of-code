const utils = require('../utils');

const digitSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

utils.readData('./01/input', false).then((data) => {
    const values = data.map((row) => {
        const digits = [];
        for (const char of row) {
            if (digitSet.has(char)) {
                digits.push(char);
            }
        }

        return Number(digits[0] + digits[digits.length - 1]);
    });

    const result = values.reduce((a, c) => a + c, 0);
    console.log(result);
}).catch(console.error);
