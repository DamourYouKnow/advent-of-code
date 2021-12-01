const utils = require('../utils');

utils.readData('./01/input').then((data) => {
    const depths = data.map((row) => parseInt(row));
    const increases = depths
        .map((val, i) => val > depths[i-1])
        .filter(Boolean)
        .length;
    console.log(increases);
}).catch(console.error);