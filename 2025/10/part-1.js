const utils = require('../utils');

utils.readData('./10/input', true).then((data) => {
    const machines = data.map((row) => {
        const split = row.split(' ');
        const size = split[0].length - 2;

        return {
            desiredState: parseLights(split[0]),
            buttons: split.slice(1, split.length - 1).map((button) => {
                return parseButton(button, size);
            }),
            size: size
        };
    });

    let result = 0;
    for (const machine of machines) {
        result += search(0, machine.desiredState, machine.buttons);
    }
    console.log(result);
}).catch(console.error);


function search(startState, targetState, expansions) {
    // Breadth-first
    // Can be modified to A* search using hamming distance heuristic.
    const queue = new utils.Queue([startState]);
    const visited = new Set([startState]); 
    const parents = new Map();

    while (!queue.empty()) {
        const currentState = queue.dequeue();
        
        if (currentState == targetState) {
            // Found path, backtrack to calculate distance.
            let distance = 0;
            let backtrack = currentState;
            
            while (backtrack != null) {
                backtrack = parents.get(backtrack);
                distance += 1;
            }

            return distance - 1;
        }

        // Traverse neighboring states using XOR on expansion list.
        for (const expansion of expansions) {
            const neighborState = currentState ^ expansion;
            
            if (!visited.has(neighborState)) {
                visited.add(neighborState);
                parents.set(neighborState, currentState);
                queue.enqueue(neighborState);
            }
        }
    }

    return null;
}


function hammingDistance(a, b) {
    let xorResult = a ^ b;
    let distance = 0;

    while (xorResult != 0) {
        xorResult &= (xorResult - 1);
        distance += 1;
    }

    return distance;
}

function binaryToByte(binary) {
    return parseInt(binary, 2);
}

function byteToBinary(byte, size) {
    return byte.toString(2).padStart(size, '0');
}

function logMachine(machine) {
    const buttons = machine.buttons.map((button) => {
        return byteToBinary(button, machine.size);
    }).join(' ');

    const desiredState = byteToBinary(machine.desiredState, machine.size);

    console.log(`${desiredState} - ${buttons}`);
}

function parseLights(string) {
    const binary = string.slice(1, string.length - 1).split('').map((char) => {
        return char == '#' ? '1' : '0';
    }).join('');

    return binaryToByte(binary);
}

function binaryReverse(byte, size) {
    const binary = byteToBinary(byte, size);
    return binary.split('').toReversed().join('');
}

function parseButton(string, size) {
    const indices = string.slice(1, string.length - 1).split(',').map(Number);
    
    let byte = binaryReverse(0, size);
    for (const index of indices) {
        byte ^= (1 << index);
    }

    return binaryToByte(binaryReverse(byte, size));
}
