const utils = require('../utils');

const targetString = 'XMAS';

const patterns = [
    [
        ['M', null, 'S'],
        [null, 'A', null],
        ['M', null, 'S']
    ],
    [
        ['S', null, 'S'],
        [null, 'A', null],
        ['M', null, 'M']
    ],
    [
        ['S', null, 'M'],
        [null, 'A', null],
        ['S', null, 'M']
    ],
    [
        ['M', null, 'M'],
        [null, 'A', null],
        ['S', null, 'S']
    ]
];

utils.readData('./04/input', true).then((data) => {
    const grid = data.map((row) => row.split(''));

    let result = 0;

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid.length; y++) {
            for (let pattern of patterns) {
                if (check(grid, pattern, x, y)) result += 1;
            }
        }
    }

    console.log(result);
}).catch(console.error);


function check(grid, pattern, x, y) {
    for (let patternX = 0; patternX < pattern.length; patternX++) {
        for (let patternY = 0; patternY < pattern[0].length; patternY++) {
            if (pattern[patternX][patternY] == null) continue;

            let gridX = x + patternX;
            let gridY = y + patternY;

            if (gridX >= grid.length) return false;
            if (gridY >= grid[0].length) return false;

            if (grid[gridX][gridY] != pattern[patternX][patternY]) return false;
        }
    }

    return true;
}