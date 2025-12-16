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

utils.readRawData('./06/input', true).then((data) => {
    const grid = new utils.Grid(data);

    const operatorRow = grid.row(grid.size.y - 1);
    
    const operatorIndices = operatorRow.reduce((acc, value, index) => {
        return value != ' ' ? [...acc, index] : acc;
    }, []);

    const operations = operatorIndices.map((operatorIndex, i) => {
        const endIndex = operatorIndices[i + 1] || operatorRow.length;

        return {
            operator: operatorRow[operatorIndex],
            operandGrid: grid.subgrid(
                { x: operatorIndex, y: 0 }, 
                { 
                    x: endIndex - operatorIndex, 
                    y: grid.size.y - 1
                }
            )
        };
    });

    const totals = operations.map(operation => {
        const operands = operation.operandGrid.columns().map((column) => {
            return column.filter((value) => value != ' ');
        }).map((digits) => digits.join(''))
            .filter((digits) => digits.length > 0)
            .map(Number);
            
        const operator = operators[operation.operator];

        return operands.reduce(
            (a, c) => operator.func(a, c), 
            operator.identity
        );
    });

    const result = totals.reduce((acc, value) => acc + value, 0);
    console.log(result);
}).catch(console.error);
