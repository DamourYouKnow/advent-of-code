const utils = require('../utils');
const vec2 = utils.vector2;

utils.readData('./04/input', true).then((data) => {
    const grid = new utils.Grid(data);

    const result = grid.count((tile, position) => {
        if (tile != '@') return false;

        const neighbors = grid.neighbors(position);
        return neighbors.filter((tile) => tile == '@').length < 4;
    });

    console.log(result);
}).catch(console.error);

