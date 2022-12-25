const utils = require('../utils');

utils.readData('./02/input').then((data) => {
    const items = {
        'A': 'rock',
        'B': 'paper',
        'C': 'scissors',
        'X': 'rock',
        'Y': 'paper',
        'Z': 'scissors'
    };
    const counters = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    };
    const itemValues = {
        'rock': 1,
        'paper': 2,
        'scissors': 3
    };
    
    const scores = data.map((row) => {
        const split = row.split(' ');
        const opponent = items[split[0]];
        const player = items[split[1]];

        if (counters[player] == opponent) {
            return 6 + itemValues[player];
        } else if (counters[opponent] == player) {
            return itemValues[player];
        } else {
            return 3 + itemValues[player];
        }
    });

    const total = scores.reduce((a, c) => a + c);
    console.log(total);
}).catch(console.error);
