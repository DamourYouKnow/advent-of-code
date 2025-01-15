const utils = require('../utils');

const digitSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

utils.readData('./01/input', true).then((data) => {
    const lists = data.reduce((acc, cur) => {
        const values = cur.split('   ').map(Number);
        acc[0].push(values[0]);
        acc[1].push(values[1]);
        return acc;
    }, [[], []]);

    const rightCounts = numberCounts(lists[1]);

    const result = lists[0].reduce((acc, cur) => {
        return acc + (cur * (rightCounts[cur] || 0));
    }, 0);

    console.log(result);
}).catch(console.error);


function numberCounts(arr) {
    const counts = { };
    
    for (const value of arr) {
        if (value in counts) {
            counts[value] += 1;
        }
        else {
            counts[value] = 1;
        }
    }

    return counts;
}