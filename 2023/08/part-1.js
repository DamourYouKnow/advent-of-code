const utils = require('../utils');

utils.readData('./08/input', false).then((data) => {
    const instructions = data[0].split('');

    const neighbours = {};
    for (const row of data.slice(2)) {
        const node = row.slice(0, 3);
        const left = row.slice(7, 10);
        const right = row.slice(12, 15);

        neighbours[node] = {
            'L': left,
            'R': right
        };
    }

    let currentNode = 'AAA';
    let steps = 0;
    let i = 0;

    while (currentNode != 'ZZZ') {
        currentNode = neighbours[currentNode][instructions[i]];
        i = (i + 1) % instructions.length;
        steps++;
    }

    console.log(steps);

}).catch(console.error);
