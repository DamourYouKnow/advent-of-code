const utils = require('../utils');


const neighborOffsets = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 }
];


utils.readData('./03/input').then((data) => {
    const grid = data.map((row) => row.split(''));

    const width = grid[0].length;
    const height = grid.length;

    const hasPartNeighbor = (x, y) => {
        return neighborOffsets.some((offest) => {
            const checkX = x + offest.x;
            const checkY = y + offest.y;

            if (checkX < 0 || checkX >= width) {
                return false;
            }
            if (checkY < 0 || checkY >= height) {
                return false;
            }

            const value = grid[checkY][checkX];
            return value != '.' && isNaN(value);
        })
    };

    const readNumber = (x, y) => {
        const positions = [];
        for (let xOffset = x; x < width; xOffset++) {
            const value = Number(grid[y][xOffset]);
            if (!isNaN(value)) {
                positions.push({ x: xOffset, y: y });
            }
            else {
                break;
            }
        }

        return positions;
    };

    const numberPositions = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const positions = readNumber(x, y);
            if (positions.length > 0) {
                const isPart = positions.some((position) => {
                    return hasPartNeighbor(position.x, position.y);
                });

                if (isPart) {
                    numberPositions.push(positions);
                }

                x += positions.length - 1;
            }
        }
    }

    const numbers = numberPositions.map((positions) => {
        return Number(positions.reduce((a, c) => a + grid[c.y][c.x], ''));
    });

    const sum = numbers.reduce((a, c) => a + c, 0);

    console.log(sum);
}).catch(console.error);
