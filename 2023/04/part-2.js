"use strict";

const utils = require('../utils');

utils.readData('./04/input').then((data) => {
    const cards = data.map((row) => {
        const numbersSplit = row.split(':')[1].split('|');
        const cardIdStringSplit = row.split(':')[0].split(' ');
        
        const id = Number(cardIdStringSplit[cardIdStringSplit.length - 1]);
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
            id: id,
            winning: new Set(winning),
            attempt: new Set(attempt)
        };
    });


    const cardCounts = Array(cards.length).fill(0);


    const copies = [];

    for (const card of cards) {
        copies.push(card);
    }

    copies.reverse();

    while (copies.length > 0) {
        const card = copies.pop();
        cardCounts[card.id - 1]++;

        const score = scoreCard(card);
        if (score == 0) continue;

        const startIndex = Math.min(card.id, cards.length - 1);
        const endIndex = Math.min(startIndex + score - 1, cards.length - 1);

        for (let i = endIndex; i >= startIndex; i--) {
            copies.push(cards[i]);
        }
    }

    const total = cardCounts.reduce((a, c) => a + c, 0);

    console.log(total);
}).catch(console.error);


function scoreCard(card) {
    let matches = 0;
    for (const number of card.attempt) {
        if (card.winning.has(number)) {
            matches++;
        }
    }

    return matches;
}
