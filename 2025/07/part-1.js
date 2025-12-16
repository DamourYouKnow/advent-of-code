const utils = require('../utils');

utils.readData('./07/input', true).then((data) => {
    const grid = new utils.Grid(data);
    const startPosition = grid.findPosition((value) => value == 'S');

    console.log(startPosition);
    console.log(grid.output());
}).catch(console.error);
