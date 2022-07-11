const utils = require('../utils');

utils.readData('./2020/02/input').then((data) => {
    let valid = 0;
    for (const row of data) {
        const rowSplit = row.split(':');
        const policy = rowSplit[0];
        const password = rowSplit[1].trim();

        const policySplit = policy.split(' ');
        const rangeSplit = policySplit[0].split('-');
        const positions = rangeSplit.map((position) => parseInt(position));
        const character = policySplit[1];

        const checks = positions.map((position) => {
            return password[position - 1] == character;
        });
        if (checks.filter((check) => check == true).length == 1) {
            valid += 1;
        }
    }
    console.log(valid);
}).catch(console.error);
