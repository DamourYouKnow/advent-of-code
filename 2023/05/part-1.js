const utils = require('../utils');

utils.readData('./05/input', false).then((data) => {
    const seeds = data[0].split(' ').slice(1).map((val) => Number(val));

    const maps = utils
        .arraySplit(data, (row) => row == '')
        .slice(1)
        .map((value) => createMap(value.slice(1)));

    const locations = [];

    for (const seed of seeds) {
        let next = seed;
        for (const map of maps) {
            next = searchMap(map, next);
        }

        locations.push(next);
    }


    const min = Math.min(...locations);
    console.log(min);

}).catch(console.error);


function createMap(entries) {
    entries = entries.map((entry) => { 
        return entry.split(' ').map((val) => Number(val));
    });

    const map = []
    for (const entry of entries) {
        const destinationStart = entry[0];
        const sourceStart = entry[1];
        const range = entry[2];

        map.push({
            sourceStart: sourceStart,
            destinationStart: destinationStart,
            range: range
        });
    }

    return map;
}

function searchMap(map, value) {
    let next = value;
    for (const entry of map) {
        const sourceEnd = entry.sourceStart + entry.range;
        const destinationEnd = entry.destinationStart + entry.range;
        if (value >= entry.sourceStart && value <= sourceEnd) {
            const step = value - entry.sourceStart;
            next = entry.destinationStart + step;
            return next;
        }
    }

    return value;
}