const utils = require('../utils');


utils.readData('./03/input').then((data) => {
    const grid = data.map((row) => row.split(''));

    const width = grid[0].length;
    const height = grid.length;

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

    const getNumberNeighbors = (x, y) => {
        const numberNeighbors = [];

        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const checkY = y + yOffset;
            if (checkY < 0 || checkY >= height) continue;

            for (let xOffset = -1; xOffset <= 1; xOffset++) {
                const checkX = x + xOffset;
                if (checkX < 0 || checkX >= width) continue;
                if (xOffset == 0 && yOffset == 0) continue;

                const value = grid[checkY][checkX];
                if (!isNaN(value)) {
                    let backtrack = 0;
                    while (!isNaN(grid[checkY][x + xOffset - backtrack - 1])) {
                        backtrack++;
                    }
                    
                    const positions = readNumber(
                        x + xOffset - backtrack, 
                        checkY
                    );

                    numberNeighbors.push(positions);
                    xOffset += positions.length - backtrack;
                }
            }
        }

        return numberNeighbors;
    };

    const gears = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const value = grid[y][x];
            if (value == '*') {
                const numberNeighbors = getNumberNeighbors(x, y);
                if (numberNeighbors.length == 2) {
                    gears.push(numberNeighbors);
                }
            }
        }
    }

    const ratios = gears.map((gear) => {
        const numbers = gear.map((positions) => {
            return Number(positions.reduce((a, c) => a + grid[c.y][c.x], ''));
        });

        return numbers.reduce((a, c) => a * c, 1);
    });

    const sum = ratios.reduce((a, c) => a + c, 0);

    console.log(sum);

}).catch(console.error);
