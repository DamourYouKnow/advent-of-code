const utils = require('../utils');

utils.readData('./2020/08/input').then((data) => {
    const lines = data;
    const state = {
        line: 0,
        acc: 0
    };
    const instructions = {
        'acc': (state, value) => state.acc += value,
        'nop': () => undefined,
        'jmp': (state, value) => state.line += value - 1
    };
    const executed = new Set();

    while (state.line < data.length && !executed.has(state.line)) {
        executed.add(state.line);
        const lineSplit = lines[state.line].split(' ');
        const instruction = lineSplit[0];
        const value = parseInt(lineSplit[1]);
        instructions[instruction](state, value);
        state.line += 1;
    }

    console.log(state.acc);
});
