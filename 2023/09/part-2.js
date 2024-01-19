const utils = require('../utils');

utils.readData('./09/input', false).then((data) => {
    const sequences = data.map((row) => {
        return row.split(' ').map((value) => Number(value));
    });

    const histories = sequences.map(expand);
    const extrapolatedValues = histories.map(extrapolate);
    const result = extrapolatedValues.reduce((a, c) => a + c, 0);

    console.log(result);
}).catch(console.error);


function expand(sequence) {
    const history = [];
    let nextSequence = sequence;

    while (nextSequence.some((value) => value != 0)) {
        history.push(nextSequence);
        nextSequence = delta(nextSequence);
    }

    history.push(nextSequence);
    return history;
}


function delta(sequence) {
    const result = [];

    for (let i = 1; i < sequence.length; i++) {
        result.push(sequence[i] - sequence[i-1]);
    }

    return result;
}


function extrapolate(history) {
    const originalSequence = history[0];
    history.at(-1).push(0);

    for (let i = 1; i < history.length; i++) {
        const level = history.length - i - 1;

        const currentSequence = history[level];
        const lastSequence = history[level + 1];

        const currentValue = currentSequence.at(-1);
        const increment = lastSequence.at(-1);

        currentSequence.push(currentValue + increment);
    }

    return originalSequence.at(-1);
}


