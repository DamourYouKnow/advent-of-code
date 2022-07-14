const utils = require('../utils');

utils.readData('./2020/06/input', false).then((data) => {
    const groups = arraySplit(data, (row) => row == '')
        .map((row) => row.map((entry) => Array.from(entry)));

    const groupCounts = groups.map((group) => {
        const answerSets = group.map((person) => new Set(person));
        const answerIntersection = intersection(...answerSets)
        return answerIntersection?.size || 0;
    });

    console.log(groupCounts.reduce((a, c) => a + c));
});


function intersection(...sets) {
    if (sets.length == 0) return undefined;
    
    const intersect = (setA, setB) => {
        return new Set(Array.from(setA).filter((elem) => setB.has(elem)));
    };

    return sets.reduce((a, c) => intersect(a, c));
}

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
