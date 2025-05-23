const utils = require('../utils');

utils.readData('./09/input', true).then((data) => {
    data = data[0].split('').map(Number);

    const blocks = [];
    let size = 0;
    for (let i = 0; i < data.length; i++) {
        // i is even, processing block
        if (i % 2 == 0) {
            blocks.push(...Array(data[i]).fill(Math.floor(i / 2)));
            size += data[i];
        }
        // i is odd, processing free space
        else {
            blocks.push(...Array(data[i]).fill(null));
        }
    }

    let backIndex = blocks.length - 1;
    for (let frontIndex = 0; frontIndex < size; frontIndex++) {
        if (blocks[frontIndex] != null) continue;

        while(blocks[backIndex] == null) {
            backIndex--;
        }

        swap(blocks, frontIndex, backIndex);
    }

    const checksum = blocks.reduce((acc, cur, i) => {
        return acc + (cur * i)
    }, 0);

    console.log(checksum);
}).catch(console.error);


function printBlocks(blocks) {
    const blockString = blocks.map((value) => {
        return value == null ? '.' : value.toString(); 
    }).join('');

    console.log(blockString);
}


function swap(array, indexA, indexB) {
    const valueA = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = valueA;
}
