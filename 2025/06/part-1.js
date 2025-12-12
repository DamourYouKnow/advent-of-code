const utils = require('../utils');

const operators = {
    '+': {
        func: (a, b) => a + b,
        identity: 0
    },
    '*': {
        func: (a, b) => a * b,
        identity: 1
    }
};

utils.readData('./06/input', true).then((data) => {
    const notEmpty = (str) => str != "";

    const operandRows = data.slice(0, data.length - 1).map((row) => {
        return row.split(' ').filter(notEmpty).map(Number);
    });

    const operandGroups = new utils.Grid(operandRows).transpose().rows();
    const operatorList = data[data.length - 1].split(' ').filter(notEmpty);

    const operations = operandGroups.map((operands, index) => {
        return { 
            operands: operands, 
            operator: operatorList[index]
        };
    });

    console.log(operations);

    const results = operations.map((operation) => {
        const operator = operators[operation.operator];

        return operation.operands.reduce((acc, operand) => {
            return operator.func(acc, operand);
        }, operator.identity);
    });

    const total = results.reduce((acc, value) => acc + value, 0);
    console.log(total);
}).catch(console.error);
