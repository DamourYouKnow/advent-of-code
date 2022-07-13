const utils = require('../utils');

utils.readData('./2020/04/input', false).then((data) => {
    const passports = arraySplit(data, (row) => row.length == 0)
        .map((lines) => readKVPs(lines.join(' ').split(' ')));

    const requiredFields = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid'
    ];

    const valid = passports.filter((passport) => {
        const fields = new Set(Object.keys(passport));
        return requiredFields.every((required) => fields.has(required));
    });

    console.log(valid.length);
}).catch(console.error);


function readKVPs(data) {
    const kvps = {};
    for (const kvp of data) {
        const kvpSplit = kvp.split(':');
        kvps[kvpSplit[0]] = kvpSplit[1]
    }
    return kvps;
}

function arraySplit(array, predicate) {
    const groups = [];
    let currentGroup = [];

    for (const elem of array) {
        if (predicate(elem)) {
            groups.push(currentGroup);
            currentGroup = [];
        } else {
            currentGroup.push(elem);
        }
    }

    groups.push(currentGroup);
    return groups;
}
