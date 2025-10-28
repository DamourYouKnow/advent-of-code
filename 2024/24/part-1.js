const utils = require('../utils');

const logicGates = {
    'AND': (a, b) => a && b,
    'OR': (a, b) => a || b,
    'XOR': (a, b) => a != b
};

utils.readData('./24/input', false).then((data) => {
    const gates = new Map();

    const seperatorIndex = data.findIndex((row) => row == "");
    const inputGateStrings = data.slice(0, seperatorIndex);
    const logicGateStrings = data.slice(seperatorIndex + 1);

    for (const inputGateString of inputGateStrings) {
        const gate = inputGate(inputGateString);
        gates.set(gate.label, gate);
    }

    for (const logicGateString of logicGateStrings) {
        const gate = logicGate(logicGateString, gates);
        gates.set(gate.label, gate);
    }

    const zGateLabels = Array.from(gates.keys())
        .filter((label) => label[0] == 'z');

    zGateLabels.sort((a, b) => b.localeCompare(a));

    const zGates = zGateLabels.map((label) => gates.get(label));

    const bits = zGates.map((gate) => gate.evaluate() ? '1' : '0').join('');
    const result = parseInt(bits, 2);

    console.log(bits);
    console.log(result)
});


class Gate {
    constructor(label) {
        this.label = label;
        this.a = null;
        this.b = null;
        this.value = null;
        this.operand = null;
    }

    evaluate() {
        if (this.value !== null) {
            return this.value;
        }
        
        if (this.a && this.b && this.operand) {
            return logicGates[this.operand](
                this.a.evaluate(), 
                this.b.evaluate()
            );
        }

        return null;
    }
}

function inputGate(string) {
    const split = string.split(": ");
    const label = split[0];
    const value = Boolean(Number(split[1]));
    
    const gate = new Gate(label);
    gate.value = value;
    return gate;
}

function logicGate(string, gates) {
    const inputsOutputSplit = string.split(" -> ");
    const inputsSplit = inputsOutputSplit[0].split(' ');

    const outputLabel = inputsOutputSplit[1];
    const inputA = inputsSplit[0];
    const inputB = inputsSplit[2];
    const operand = inputsSplit[1];

    const gate = gates.get(outputLabel) || new Gate(outputLabel);
    const gateA = gates.get(inputA) || new Gate(inputA);
    const gateB = gates.get(inputB) || new Gate(inputB);
    gates.set(inputA, gateA);
    gates.set(inputB, gateB);

    gate.a = gateA;
    gate.b = gateB;
    gate.operand = operand;

    return gate;
}