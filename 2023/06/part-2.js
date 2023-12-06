const utils = require('../utils');

utils.readData('./06/input').then((data) => {
 
    const race = {
        time: Number(data[0].split(':')[1].replace(/ /g, '')),
        distance: Number(data[1].split(':')[1].replace(/ /g, ''))
    };

    const solution = solveQuadratic(-1, race.time, -race.distance);

    const minHold = Math.ceil(solution[0]);
    const maxHold = Math.floor(solution[1]);

    const options = (maxHold - minHold) + 1;

    console.log(options);
    
}).catch(console.error);


function solveQuadratic(a, b, c) {
    return [
        (-b + Math.sqrt((b * b) - (4 * a * c))) / (2 * a),
        (-b - Math.sqrt((b * b) - (4 * a * c))) / (2 * a)
    ];
}
