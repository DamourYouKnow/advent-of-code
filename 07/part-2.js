const utils = require('../utils');

utils.readData('./07/input').then((data) => {
    const distances = data[0].split(',').map((value) => parseInt(value));
    const totalCosts = [...Array(distances.length).keys()].map((pos) => {
        const costs = distances.map((dist) => {
            const step = Math.abs(dist - pos);
            return ((step * step) + step) / 2
        });
        return costs.reduce((a, c) => a + c);
    });
    console.log(Math.min(...totalCosts));
}).catch(console.error);
