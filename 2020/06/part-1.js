const utils = require('../utils');

utils.readData('./2020/06/input', false).then((data) => {
    const groups = arraySplit(data, (row) => row == '')
        .map((row) => row.map((entry) => Array.from(entry)));

    const groupCounts = groups.map((group) => {
        let yesAnwsers = new Set();
        for (const person of group) {
            for (const answer of person) {
                yesAnwsers.add(answer);
            }
        }
        return yesAnwsers.size;
    });

    console.log(groupCounts.reduce((a, c) => a + c));
});


function arraySplit(array, predicate) {
    const groups = [];
    let currentGroup = [];

    for (const elem of array) {
        if (predicate(elem)) {
            groups.push(currentGroup);
            currentGroup = [];
        } else {
            currentGroup.push(elem);
        }
    }

    groups.push(currentGroup);
    return groups;
}