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

    console.log(machines);
    machines.forEach(logMachine);
}).catch(console.error);








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

    return binaryReverse(byte, size);
}
