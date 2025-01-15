const utils = require('../utils');

const digitSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

utils.readData('./01/input', true).then((data) => {
    const lists = data.reduce((acc, cur) => {
        const values = cur.split('   ').map(Number);
        acc[0].push(values[0]);
        acc[1].push(values[1]);
        return acc;
    }, [[], []]);

    lists.forEach((list) => list.sort((a, b) => a - b));

    const pairs = transpose(lists);

    const distance = pairs.reduce((acc, cur) => {
        return acc + Math.abs(cur[0] - cur[1]);
    }, 0);
    
    console.log(distance);
}).catch(console.error);


function transpose(matrix) {
    if (!matrix[0]) return [];
    
    const result = [];

    for (let j = 0; j < matrix[0].length; j++) {
        const row = [];
        
        for (let i = 0; i < matrix.length; i++) {
            row.push(matrix[i][j]);
        }

        result.push(row);
    }

    return result;
}
