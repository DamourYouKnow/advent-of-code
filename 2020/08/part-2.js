const utils = require('../utils');

utils.readData('./2020/08/input').then((data) => {
    const lines = data.map((line) => {
        const lineSplit = line.split(' ');
        return  {
            instruction: lineSplit[0],
            value: parseInt(lineSplit[1])
        };
    });

    let state = execute(lines);
    let currFix = null;
    let lastFix = null;
    const fixLines = lines.slice().reverse();
    const swapInstruction = (line) => {
        if (line.instruction == 'nop') line.instruction = 'jmp';
        else if (line.instruction == 'jmp') line.instruction = 'nop';
    };
    while (!state.terminated) {
        if (lastFix) {
            swapInstruction(lastFix);
        }
        currFix = fixLines.pop();
        swapInstruction(currFix);
        lastFix = currFix;
        state = execute(lines);
    }

    console.log(state.acc);
});

function execute(lines) {
    const state = {
        line: 0,
        acc: 0,
        terminated: false
    };
    const instructions = {
        'acc': (state, value) => state.acc += value,
        'nop': () => undefined,
        'jmp': (state, value) => state.line += value - 1
    };
    const executedLines = new Set();

    while (state.line < lines.length && !executedLines.has(state.line)) {
        const line = lines[state.line];
        executedLines.add(state.line);
        instructions[line.instruction](state, line.value);
        state.line += 1;
    }

    state.terminated = !executedLines.has(state.line);
    return state;
}
