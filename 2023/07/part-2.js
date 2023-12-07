const utils = require('../utils');


const cardValues = {
    'J': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
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
        (handA, handB) => handType(handA.cards) - handType(handB.cards),
        (handA, handB) => handWeight(handA.cards) - handWeight(handB.cards)
    );

    const total = hands.reduce((a, hand, i) => {
        return a + (hand.bid * (i + 1));
    }, 0);

    console.log(hands);
    console.log(total);
}).catch(console.error);


function handType(cards) {
    let cardCounts = countCards(cards);
    let counts = Object.values(cardCounts);

    const jokers = cardCounts[cardValues['J']];
    if (jokers == 5) {
        cardCounts = {
            13: 5
        };
    }
    else if (jokers) {
        delete cardCounts[cardValues['J']];
        counts = Object.values(cardCounts);
        let maxCount = Math.max(...counts);

        for (card in cardCounts) {
            if (cardCounts[card] == maxCount) {
                cardCounts[card] += jokers;
                break;
            }
        }
    }

    counts = Object.values(cardCounts);

    if (counts.includes(5)) {
        return 7;
    }
    if (counts.includes(4)) {
        return 6;
    }
    if (counts.includes(3) && counts.includes(2)) {
        return 5;
    }
    if (counts.includes(3)) {
        return 4;
    }
    if (counts.filter((count) => count == 2).length == 2) {
        return 3;
    }
    if (counts.includes(2)) {
        return 2;
    }

    return 1;
}


function handWeight(cards) {
    let weigthString = cards.reduce((a, c) => {
        return a + (c >= 10 ? c : `0${c}`);
    }, '');

    if (weigthString.startsWith('0')) {
        weigthString = weigthString.slice(1);
    }

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
