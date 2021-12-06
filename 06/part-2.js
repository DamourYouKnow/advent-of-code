const utils = require('../utils');

utils.readData('./06/input').then((data) => {
    const days = data[0].split(',').map((value) => parseInt(value));
    const cycles = { };
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((day) => cycles[day] = 0);
    days.forEach((day) => cycles[day]++);
    for (let day = 1; day <= 256; day++) {
        const zero = cycles[0];
        cycles[0] = 0;
        for (let cycle = 0; cycle < 8; cycle++) {
            let count = cycles[cycle + 1];
            cycles[cycle] += count;
            cycles[cycle + 1] -= count; 
        }
        cycles[6] += zero;
        cycles[8] += zero;
    }
    const total = Object.values(cycles).reduce((a, c) => a + c);
    console.log(total);
}).catch(console.error);
