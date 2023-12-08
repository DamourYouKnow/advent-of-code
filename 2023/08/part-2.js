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

    const startNodes = Object.keys(neighbours).filter((node) => node[2] == 'A');

    const findZ = (startNode) => {
        let currentNode = startNode;
        let i = 0;

        while (currentNode[2] != 'Z') {
            currentNode = neighbours[currentNode][instructions[i]];
            i = (i + 1) % instructions.length;
        }

        return currentNode;
    };

    const findCycle = (startNode) => {
        const cycle = [];
        let currentNode = startNode;
        let i = 0;

        while (currentNode != startNode || cycle.length == 0) {
            cycle.push(currentNode);
            currentNode = neighbours[currentNode][instructions[i]];
            i = (i + 1) % instructions.length;
        }

        return cycle;
    };

    const zNodes = startNodes.map(findZ);
    const cycles = zNodes.map(findCycle);
    const lengths = cycles.map((cycle) => cycle.length);

    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    const lcm = (a, b) => a * b / gcd(a, b);
    const steps = lengths.reduce(lcm);

    console.log(steps);

}).catch(console.error);
