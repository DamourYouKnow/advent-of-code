const utils = require('../utils');


const cardValues = {
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 7,
    '9': 8,
    'T': 9,
    'J': 10,
    'Q': 11,
    'K': 12,
    'A': 13
};


utils.readData('./07/input').then((data) => {
    const hands = data.map((row) => {
        const rowSplit = row.split(' ');
        
        return {
            string: rowSplit[0],
            cards: rowSplit[0].split('').map((value) => cardValues[value]),
            bid: Number(rowSplit[1])
        };
    });

    multiSort(
        hands,
        (handA, handB) => handType(handB.cards) - handType(handA.cards),
        (handA, handB) => handWeight(handA.cards) - handWeight(handB.cards)
    );

    const total = hands.reduce((a, hand, i) => {
        return a + (hand.bid * (i + 1));
    }, 0);

    console.log(hands);
    console.log(total);
}).catch(console.error);


function handType(cards) {
    const cardCounts = countCards(cards);
    const counts = Object.values(cardCounts);

    if (counts.includes(5)) {
        return 1;
    }
    if (counts.includes(4)) {
        return 2;
    }
    if (counts.includes(3) && counts.includes(2)) {
        return 3;
    }
    if (counts.includes(3)) {
        return 4;
    }
    if (counts.filter((count) => count == 2).length == 2) {
        return 5;
    }
    if (counts.includes(2)) {
        return 6;
    }

    return 7;
}


function handWeight(cards) {
    const weigthString = cards.reduce((a, c) => {
        return a + (c >= 10 ? c : `0${c}`);
    }, '');
    return Number(weigthString);
}


function countCards(cards) {
    const counts = {};

    for (const card of cards) {
        if (counts[card]) {
            counts[card]++;
        }
        else {
            counts[card] = 1;
        }
    }

    return counts;
}


function multiSort(array, ...comparators) {
    array.sort((a, b) => {
        let value = 0;
        
        for (const comparator of comparators) {
            value = comparator(a, b);
            if (value != 0) {
                return value;
            }
        }

        return value;
    });
}
