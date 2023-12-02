const utils = require('../utils');


utils.readData('./02/input').then((data) => {
    const games = data.map(parseGame);

    const powers = games.map((game) => {
        const maxColors = {
            'red': 0,
            'green': 0,
            'blue': 0
        };

        for (const set of game.sets) {
            for (const color in set) {
                if (set[color] > maxColors[color]) {
                    maxColors[color] = set[color];
                }
            }
        }

        return Object.values(maxColors).reduce((a, c) => a * c, 1);
    });

    const sum = powers.reduce((a, c) => a + c, 0);
    console.log(sum);
}).catch(console.error);


function parseGame(gamestr) {
    const idSetsSplit = gamestr.split(':');
    const id = Number(idSetsSplit[0].split(' ')[1]);
    const setStrings = idSetsSplit[1].split(';');

    const sets = setStrings.map((setString) => {
        const pairs = setString.trim().split(',').map((s) => s.trim());
        const set = {};
        for (const pair of pairs) {
            const pairSplit = pair.split(' ');
            set[pairSplit[1]] = Number(pairSplit[0]);
        }
        return set;
    });

    return {
        'id': id,
        'sets': sets
    };
}
