const utils = require('../utils');

utils.readData('./09/input').then((data) => {
    const grid = data.map((row) => row.split('').map((val) => parseInt(val)));
    const lowPointHeights = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const neighbors = [
                grid[x]?.[y+1],
                grid[x]?.[y-1],
                grid[x+1]?.[y],
                grid[x-1]?.[y],
            ].filter((val) => val != undefined);
            if (neighbors.every((n) => n > grid[x][y])) {
                lowPointHeights.push(grid[x][y]);
            }
        }
    }
    const risks = lowPointHeights.map((height) => height + 1);
    const totalRisk = risks.reduce((a, c) => a + c);
    console.log(totalRisk);
}).catch(console.error);