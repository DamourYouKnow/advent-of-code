const utils = require('../utils');

utils.readData('./07/input').then((data) => {
    const distances = data[0].split(',').map((value) => parseInt(value));
    const mid = Math.floor(distances.length / 2);
    const median = distances.slice(0).sort((a, b) => a - b)[mid];
    const costs = distances.map((dist) => Math.abs(dist - median));
    const totalCost = costs.reduce((a, c) => a + c);
    console.log(totalCost);
}).catch(console.error);
