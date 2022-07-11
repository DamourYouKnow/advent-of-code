const utils = require('../utils');

utils.readData('./08/input').then((data) => {
    const displays = data.map((row) => {
        const split = row.split(' | ');
        return {
            patterns: split[0].split(' '),
            output: split[1].split(' ')
        };
    });
    
    const segments = {
        2: '1',
        4: '4',
        3: '7',
        7: '8'
    };

    let count = 0;
    for (const display of displays) {
        for (const digit of display.output) {
            count += segments[digit.length] ? 1 : 0;
        }
    }

    console.log(count);
}).catch(console.error);