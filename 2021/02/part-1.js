const utils = require('../utils');

utils.readData('./02/input').then((data) => {
    const commands = data.map((row) => {
        const split = row.split(' ');
        return {
            direction: split[0],
            magnitude: parseInt(split[1])
        };
    });
    let distance = 0;
    let depth = 0;
    const move = {
        'forward': (value) => distance += value,
        'up': (value) => depth -= value,
        'down': (value) => depth += value
    };
    commands.forEach((command) => {
        move[command.direction](command.magnitude)
    });
    console.log(distance * depth);
}).catch(console.error);