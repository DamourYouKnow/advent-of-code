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

    const validationRules = {
        'byr': (value) => isNumberInRange(value, 1920, 2002),
        'iyr': (value) => isNumberInRange(value, 2010, 2020),
        'eyr': (value) => isNumberInRange(value, 2020, 2030),
        'hgt': (value) => {
            const unit = value.slice(value.length - 2);
            const unitRules = {
                'cm': (height) => isNumberInRange(height, 150, 193),
                'in': (height) => isNumberInRange(height, 59, 76)
            };
            if (!(unit in unitRules)) return false;
            return unitRules[unit](value.slice(0, value.length - unit.length));
        },
        'hcl': (value) => {
            const allowed = new Set(Array.from('0123456789abcdef'));
            if (value.length != 7) return false;
            if (value[0] != '#') return false;
            return Array.from(value.slice(1))
                .every((char) => allowed.has(char));
        },
        'ecl': (value) => {
            const allowed = new Set([
                'amb',
                'blu',
                'brn',
                'gry',
                'grn',
                'hzl',
                'oth'
            ]);
            return allowed.has(value);
        },
        'pid': (value) => {
            if (value.length != 9) return false;
            return Array.from(value).every((char) => !isNaN(char));
        }
    };

    const valid = passports.filter((passport) => {
        const fields = new Set(Object.keys(passport));
        const hasRequiredFields = requiredFields.every((required) => {
            return fields.has(required);
        });
        const hasAllValidFields = Object.keys(passport).every((field) => {
            if (!(field in validationRules)) return true;
            return validationRules[field](passport[field]);
        });
        return hasRequiredFields && hasAllValidFields;
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

function isNumberInRange(value, min, max) {
    const number = Number(value);
    if (isNaN(number)) return false;
    return number >= min && number <= max;
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
