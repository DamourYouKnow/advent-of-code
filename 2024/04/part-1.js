const utils = require('../utils');

const targetString = 'XMAS';

const adjacencies = [];
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        if (x == 0 && y == 0) continue;
        adjacencies.push({ x: x, y: y });
    }
}

utils.readData('./04/input', true).then((data) => {
    const grid = data.map((row) => row.split(''));

    let result = 0;

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid.length; y++) {
            result += lineSearch(grid, x, y, targetString);
        }
    }

    console.log(result);
}).catch(console.error);


function lineSearch(grid, x, y, string) {
    let count = 0;

    for (let delta of adjacencies) {
        let nextSymbol = getPosition(grid, x, y);
        let line = nextSymbol;

        while (nextSymbol && line == string.slice(0, line.length)) {
            if (line.length == string.length) break;

            nextSymbol = getPosition(
                grid, 
                x + (delta.x * line.length),
                y + (delta.y * line.length)
            ); 

            line += nextSymbol
        }

        if (line == string) count += 1;
    }

    return count;
}

// I misunderstood the problem but this might come in handy for part 2.
function search(grid, position, string) {
    const x = position.x;
    const y = position.y;

    if (x < 0 || x >= grid.length) return 0;
    if (y < 0 || y >= grid.length) return 0;

    if (string.length == 1 && grid[x][y] == string) return 1;

    if (grid[x][y] == string[0]) {
        return adjacencies.reduce((a, c) => {
            const nextPosition = {
                x: x + c.x,
                y: y + c.y
            };

            return a + search(grid, nextPosition, string.slice(1));
        }, 0);
    }

    return 0;
}


function getPosition(grid, x, y) {
    if (x < 0 || x >= grid.length) return null;
    if (y < 0 || y >= grid.length) return null;
    
    return grid[x][y];
}
