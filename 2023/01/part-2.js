const utils = require('../utils');


const tokens = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    'zero': '0',
    'one': '1', 
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
};


const tokensReverse = { };

for (key in tokens) {
    tokensReverse[key.split('').reverse().join('')] = tokens[key];
}




utils.readData('./01/input', false).then((data) => {
    const values = data.map((row) => {
        const digits = [];
        let currentToken = '';

        for (let c = 0; c < row.length; c++) {
            currentToken += row[c];

            if (tokens[currentToken]) {
                digits.push(tokens[currentToken]);
                c -= currentToken.length - 1;
                currentToken = '';
                continue;
            }

            const keepLooking = Object.keys(tokens).some((key) => key.startsWith(currentToken));
            if (!keepLooking) {
                c -= (currentToken.length - 1);
                currentToken = '';
            } 
        }

        if (tokens[currentToken]) {
            digits.push(tokens[currentToken]);
        }

        return Number(digits[0] + digits[digits.length - 1]);
    });

    const result = values.reduce((a, c) => a + c, 0);
    console.log(result);
}).catch(console.error);
