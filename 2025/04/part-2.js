const utils = require('../utils');
const vec2 = utils.vector2;

utils.readData('./04/input', true).then((data) => {
    let grid = new utils.Grid(data);

    let lastRemoved = Infinity;
    let totalRemoved = 0;

    while (lastRemoved > 0) {
        lastRemoved = 0;

        grid = grid.map((tile, position) => {
            if (tile == '.') return tile;

            const neighbors = grid.neighbors(position);
            const rollCount = neighbors.filter((tile) => tile == '@').length;

            if (rollCount < 4) {
                lastRemoved += 1;
                return '.';
            }
            else {
                return tile;
            }
        });

        totalRemoved += lastRemoved;
    }

    console.log(totalRemoved);
}).catch(console.error);

