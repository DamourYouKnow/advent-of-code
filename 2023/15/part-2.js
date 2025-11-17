const utils = require('../utils');

utils.readData('./15/input', true).then((data) => {
    const sequence = data.join('').split(',');

    const hashmap = new HASHMAP();

    for (const step of sequence) {
        const operationIndex = step.split('').findIndex((c) => {
            return c == '-' || c == '='
        });
        const lensLabel = step.slice(0, operationIndex);
        const operation = step[operationIndex];
        const focalLength = Number(step.slice(operationIndex + 1));
        const boxIndex = hash(lensLabel);

        if (operation == '-') {
            hashmap.removeLens(boxIndex, lensLabel);
        }
        else if (operation == '=') {
            hashmap.addLens(boxIndex, lensLabel, focalLength);
        }
    }

    console.log(hashmap.focusPower());
}).catch(console.error);

class Box {
    constructor() {
        this.lenses = [];
    }

    removeLens(lensLabel) {
        const lensIndex = this.lensIndex(lensLabel);

        if (lensIndex >= 0) {
            this.lenses.splice(lensIndex, 1);
        }
    }

    addLens(lensLabel, focalLength) {
        const lens = new Lens(lensLabel, focalLength);

        const foundLensIndex = this.lensIndex(lensLabel);
        if (foundLensIndex >= 0) {
            this.lenses[foundLensIndex] = lens; 
        }
        else {
            this.lenses.push(lens);
        }
    }

    lensIndex(lensLabel) {
        return this.lenses.findIndex((lens) => lens.label == lensLabel);
    }
}

class Lens {
    constructor(label, focalLength) {
        this.label = label;
        this.focalLength = focalLength;
    }
}

class HASHMAP {
    constructor() {
        this.boxes = new Array(256).fill(null).map((_) => new Box);
        this.lensBoxes = new Map();
    }

    removeLens(boxIndex, lensLabel) {
        const box = this.boxes[boxIndex];
        box.removeLens(lensLabel);
        this.lensBoxes.delete(lensLabel);
    }

    addLens(boxIndex, lensLabel, focalLength) {
        const box = this.boxes[boxIndex];
        box.addLens(lensLabel, focalLength);
        this.lensBoxes.set(lensLabel, boxIndex);
    }

    focusPower() {
        let power = 0;

        for (const kvp of this.lensBoxes.entries()) {
            const lensLabel = kvp[0];
            const boxIndex = kvp[1];
            
            const box = this.boxes[boxIndex];
            const lensIndex = box.lensIndex(lensLabel);
            const lens = box.lenses[lensIndex];

            const slotNumber = lensIndex + 1;

            const lensPower = (1 + boxIndex) * slotNumber * (lens.focalLength);
            power += lensPower;
        }

        return power;
    }
}

function hash(string) {
    let currentValue = 0;

    for (let c = 0; c < string.length; c++) {
        const ascii = string[c].charCodeAt(0);
        currentValue += ascii;
        currentValue *= 17;
        currentValue %= 256;
    }

    return currentValue;
}
