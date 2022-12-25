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
    const losses = {
        'rock': 'paper',
        'paper': 'scissors',
        'scissors': 'rock'
    };
    const itemValues = {
        'rock': 1,
        'paper': 2,
        'scissors': 3
    };
    
    const scores = data.map((row) => {
        const split = row.split(' ');
        const opponent = items[split[0]];
        const player = split[1];

        if (player == 'X') {
            return itemValues[counters[opponent]];      
        } else if (player == 'Y') {
            return itemValues[opponent] + 3;
        } else if (player == 'Z') {
            return itemValues[losses[opponent]] + 6;
        }
    });

    const total = scores.reduce((a, c) => a + c);
    console.log(total);
}).catch(console.error);
