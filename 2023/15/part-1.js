const utils = require('../utils');

utils.readData('./15/input', true).then((data) => {
    const sequence = data.join('').split(',');

    const hashes = sequence.map(hash);
    const result = hashes.reduce((a, c) => a + c, 0);

    console.log(result);
}).catch(console.error);


function hash(string) {
    let currentValue = 0;

    for (let c = 0; c < string.length; c++) {
        const ascii = string[c].charCodeAt(0);
        currentValue += ascii;
        currentValue *= 17;
        currentValue %= 256;
    }

    return currentValue;
}
