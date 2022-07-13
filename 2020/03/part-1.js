const utils = require('../utils');

utils.readData('./2020/03/input').then((data) => {
    const map = data.map((row) => row.split(''));
    const patternWidth = map[0].length;
    const right = 3;
    const down = 1;
    
    let x = 0;
    let y = 0;
    let count = 0;

    while (y < map.length) {
        if (map[y][x % patternWidth] == '#') count += 1;
        x += right;
        y += down;
    }

    console.log(count);
}).catch(console.error);

