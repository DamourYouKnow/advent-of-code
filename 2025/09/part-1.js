const utils = require('../utils');

const vec2 = utils.vector2;

utils.readData('./09/input', true).then((data) => {
    const corners = data.map((row) => {
        const split = row.split(',');
        return { 
            x: Number(split[0]),
            y: Number(split[1]) 
        };
    });

    const pairs = cornerPairs(corners);

    const areas = pairs.map((pair) => {
        const size = {
            x: Math.abs(pair.a.x - pair.b.x) + 1,
            y: Math.abs(pair.a.y - pair.b.y) + 1
        };

        return size.x * size.y
    });

    const result = Math.max(...areas);

    console.log(result);
}).catch(console.error);


function cornerPairs(corners) {
    const pairs = [];

    for (let indexA = 0; indexA < corners.length; indexA++) {
        for (let indexB = indexA + 1; indexB < corners.length; indexB++) {
            pairs.push({
                a: corners[indexA],
                b: corners[indexB]
            });
        }
    }

    return pairs;
}
