const utils = require('../utils');


const bag = {
    'red': 12,
    'green': 13,
    'blue': 14
};


utils.readData('./02/input').then((data) => {
    const games = data.map(parseGame);

    const validGames = games.filter((game) => {
        return game.sets.every((set) => {
            return Object.keys(set).every((key) => {
                return bag[key] && set[key] <= bag[key]
            });
        });
    });

    const sum = validGames.reduce((a, c) => a + c.id, 0);
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
