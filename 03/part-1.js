const utils = require('../utils');

utils.readData('./03/input').then((data) => {
    const grid = data.map((row) => row.split(''));
    const transpose = grid[0].map((x, i) => grid.map(x => x[i]));
    const gamma = transpose.map((col) => {
        const ones = col.filter((bit) => bit == '1').length;
        return ones > Math.floor(col.length / 2) ? '1' : '0';
    });
    const epsilon = gamma.map((bit) => bit == '1' ? '0' : '1');
    const power = parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
    console.log(power);
}).catch(console.error);
