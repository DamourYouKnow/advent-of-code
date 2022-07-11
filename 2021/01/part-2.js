const utils = require('../utils');

utils.readData('./01/input').then((data) => {
    const depths = data.map((row) => parseInt(row));
    const windows = depths.map((val, i) => [val, depths[i+1], depths[i+2]]);
    const sums = windows
        .map((window) => window.map((val) => val || 0)
        .reduce((a, c) => a + c))
    const increases = sums
        .map((val, i) => val > sums[i-1])
        .filter(Boolean)
        .length;
    console.log(increases);
}).catch(console.error);