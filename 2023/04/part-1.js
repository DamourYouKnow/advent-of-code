const utils = require('../utils');

utils.readData('./04/input').then((data) => {
    const cards = data.map((row) => {
        const numbersSplit = row.split(':')[1].split('|');

        const winningString = numbersSplit[0].trim();
        const attemptString = numbersSplit[1].trim();

        const winning = winningString
            .split(' ')
            .filter((value) => value != undefined)
            .map((value) => Number(value.trim()));

        const attempt = attemptString
            .split(' ')
            .filter((value) => value != '')
            .map((value) => Number(value.trim()));

        return {
            winning: new Set(winning),
            attempt: new Set(attempt)
        };
    });

    const scores = cards.map((card) => {
        let matches = 0;
        for (const number of card.attempt) {
            if (card.winning.has(number)) {
                matches++;
            }
        }

        return matches == 0 ? 0 : Math.pow(2, matches - 1);
    });

    const results = scores.reduce((a, c) => a + c, 0);

    console.log(results);
}).catch(console.error);
