const utils = require('../utils');

const operators = [
    (a, b) => a + b,
    (a, b) => a * b
];

utils.readData('./07/input', true).then((data) => {
    const equations = data.map((row) => {
        const split = row.split(': ');
        return {
            result: Number(split[0]),
            operands: split[1].split(' ').map(Number)
        };
    });

    const possibleEquations = equations.filter((equation) => {
        return generateEvaluations(equation).includes(equation.result);
    });

    const result = possibleEquations.reduce((a, c) => a + c.result, 0);
    console.log(result);
});

function generateEvaluations(equation) {
    // Expansion function
    const expand = (previousEvaluations, nextOperand) => {
        const nextEvaluations = [];
        
        for (const evaluation of previousEvaluations) {
            for (const operator of operators) {
                const result = operator(evaluation, nextOperand);

                if (result <= equation.result) {
                    nextEvaluations.push(result);
                } 
            }
        }

        return nextEvaluations;
    };

    // Stack of unexpanded operands
    const operandStack = equation.operands.slice(1).reverse();

    // List of generated evaluations
    let evaluations = [equation.operands[0]];

    // Regenerate evaluations until all operands are processed
    while (operandStack.length > 0) {
        const currentOperand = operandStack.pop();
        evaluations = expand(evaluations, currentOperand);
    }

    return evaluations;
}
