const utils = require('../utils');


utils.readData('./05/input', false).then((data) => {
    const orders = data.filter((row) => row.includes('|')).map((rule) => {
        return {
            predecessor: Number(rule.split('|')[0]),
            successor: Number(rule.split('|')[1])
        };
    });
    
    const updates = data.filter((row) => row.includes(',')).map((update) => {
        return update.split(',').map(Number);
    });

    const successors = new Map();
    for (const order of orders) {
        if (!successors.has(order.predecessor)) {
            successors.set(order.predecessor, new Set());
        }

        successors.get(order.predecessor).add(order.successor);
    }

    const validUpdates = updates.filter((update) => {
        for (let i = 0; i < update.length; i++) {
            if (successors.has(update[i])) {
                for (let j = 0; j < i; j++) {
                    if (successors.get(update[i]).has(update[j])) {
                        return false;
                    }
                }
            }
        }

        return true;
    });

    const result = validUpdates.reduce((acc, update) => {
        return acc + update[Math.floor(update.length / 2)];
    }, 0);

    console.log(result);
}).catch(console.error);


