const utils = require('../utils');

utils.readData('./2020/03/input').then((data) => {
    const map = data.map((row) => row.split(''));

    const counts = [
        countTrees(map, 1, 1),
        countTrees(map, 3, 1),
        countTrees(map, 5, 1),
        countTrees(map, 7, 1),
        countTrees(map, 1, 2)
    ];

    const result = counts.reduce((a, c) => a * c);
    console.log(result);
}).catch(console.error);

function countTrees(map, slopeX, slopeY) {
    const patternWidth = map[0].length;
    
    let x = 0;
    let y = 0;
    let count = 0;

    while (y < map.length) {
        if (map[y][x % patternWidth] == '#') count += 1;
        x += slopeX;
        y += slopeY;
    }

    return count;
}

