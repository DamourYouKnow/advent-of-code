const utils = require('../utils');

utils.readData('./09/input').then((data) => {
    const grid = data.map((row, x) => row.split('').map((val, y) => {
        return {
            x: x,
            y: y,
            height: parseInt(val),
            visited: false
        };
    }));
    const lowPoints = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const neighbors = [
                grid[x]?.[y+1],
                grid[x]?.[y-1],
                grid[x+1]?.[y],
                grid[x-1]?.[y],
            ].filter((n) => n != undefined);
            if (neighbors.every((n) => n.height > grid[x][y].height)) {
                lowPoints.push({ x: x, y: y });
            }
        }
    }

    const basinSizes = lowPoints.map((point) => {
        const flooded = [];
        flood(grid.slice(0), point.x, point.y, flooded);
        return flooded.length;
    });

    const largest = basinSizes.sort((a, b) => b - a).slice(0, 3);
    const result = largest.reduce((a, c) => a * c);
    console.log(result);
}).catch(console.error);

function flood(grid, x, y, flooded) {
    if (grid[x][y].visited) return;
    flooded.push({ x: x, y: y });
    grid[x][y].visited = true;
    const neighbors =  [
        grid[x]?.[y+1],
        grid[x]?.[y-1],
        grid[x+1]?.[y],
        grid[x-1]?.[y],
    ].filter((n) => n != undefined);
    const targets = neighbors.filter((point) => {
        return point.height < 9 && !point.visited
    });
    for (const target of targets) {
        flood(grid, target.x, target.y, flooded);
    }
}