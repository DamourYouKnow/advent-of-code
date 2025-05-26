const utils = require('../utils');


utils.readData('./10/input', true).then((data) => {
    const grid = data.map((row) => {
        return row.split('').map((value) => {
            return value == '.' ? null : Number(value);
        });
    });

    let score = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            score += search(grid, x, y, 0);
        }
    }

    console.log(score);
}).catch(console.error);


const offsets = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 }
]


function search(grid, x, y, step) {
    const currentValue = grid[x][y];
    
    if (currentValue != step) return 0; 
    if (currentValue == 9) return 1;


    let score = 0;

    for (const offset of offsets) {
        const nextX = x + offset.x;
        const nextY = y + offset.y;

        if (nextX < 0 || nextX >= grid.length) continue;
        if (nextY < 0 || nextY >= grid[0].length) continue;

        score += search(grid, nextX, nextY, step + 1);
    }

    return score;
}
