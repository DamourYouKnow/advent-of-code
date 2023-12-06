const utils = require('../utils');

utils.readData('./06/input').then((data) => {
    const readRow = (row) => {
        return row.split(':')[1].split(' ')
            .filter((value) => value != '')
            .map((value) => Number(value));
    };

    const times = readRow(data[0]);
    const distances = readRow(data[1]);

    const races = times.map((time, i) => {
        return { 
            time: time,
            distance: distances[i]
        };
    });

    for (const race of races) {
        race.options = 0;

        for (let hold = 0; hold <= race.distance; hold++) {
            const speed = hold;
            const time = race.time - hold;
            const distance = speed * time;
            if (distance > race.distance) {
                race.options++;
            }
        } 
    }

    const product = races.reduce((a, c) => a * c.options, 1);
    console.log(product);
    
}).catch(console.error);
