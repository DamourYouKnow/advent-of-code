const utils = require('../utils');

utils.readData('./03/input').then((data) => {
    const grid = data.map((row) => row.split(''));
    let o2Values = grid;
    let co2Values = grid;
    for (let bit = 0; bit < grid[0].length; bit++) {
        if (o2Values.length > 1) {
            const keepBit =  most(transpose(o2Values)[bit]);
            o2Values = o2Values.filter((val) => {
                return val[bit] == keepBit;
            });
        }
        if (co2Values.length > 1) {
            const keepBit =  least(transpose(co2Values)[bit]);
            co2Values = co2Values.filter((val) => {
                return val[bit] == keepBit;
            });
        }
    }
    const o2Value = o2Values[0].join('');
    const co2Value = co2Values[0].join('')
    const lifeSupport = parseInt(o2Value, 2) * parseInt(co2Value, 2);
    console.log(lifeSupport);
}).catch(console.error);

function transpose(grid) {
    return grid[0].map((x, i) => grid.map(x => x[i]));
}

function most(arr) {
    const ones = arr.filter((bit) => bit == '1').length;
    return ones >= arr.length / 2 ? '1' : '0';
}

function least(arr) {
    const zeroes = arr.filter((bit) => bit == '0').length;
    return zeroes <= arr.length / 2 ? '0' : '1';
}
