const utils = require('../utils');

utils.readData('./2020/05/input').then((data) => {
    const seats = data.map((string) => {
        const row = search(string.slice(0, 7), 128);
        const column = search(string.slice(7), 8);
        return {
            row: row,
            column: column,
            id: (row * 8) + column
        };
    });

    console.log(Math.max(...seats.map((seat) => seat.id)));
}).catch(console.error);


function search(string, size) {
    const converter = { 'F' : 0, 'B': 1, 'R': 1, 'L': 0 };
    let min = 0;
    let max = size - 1;

    for (const char of string) {
        if (converter[char] == 1) {
            min += Math.ceil((max - min) / 2)
        } else {
            max -= Math.ceil((max - min) / 2);
        }
    }

    return max == min ? max : null;
}
