const utils = require('../utils');

const tiles = {
    empty: '.',
    wall: '#',
    box: 'O',
    robot: '@'
};

const moveInstructions = {
    '>': { x: 1, y: 0 },
    '^': { x: 0, y: -1 },
    '<': { x: -1, y: 0 },
    'v': { x: 0, y: 1 }
};

utils.readData('./15/input', false).then((data) => {
    const seperatorIndex = data.findIndex((row) => row.length == 0);
    const gridRows = data.slice(0, seperatorIndex);
    const instructions = data.slice(seperatorIndex + 1).join('').split('');

    const grid = new Grid(gridRows);
    
    console.log(`${grid.output()}\n\n${instructions.join('')}`);
    console.log(grid.robot);

    for (const instruction of instructions) {
        grid.move(moveInstructions[instruction]);
    }

    console.log(`${grid.output()}\n\n${instructions.join('')}`);
    console.log(grid.robot);
    console.log(grid.gpsSum());
});

class Grid {
    grid = [];
    size = { x: 0, y: 0 };
    robot = { x: 0, y: 0 };

    constructor(rows) {
        this.size = { x: rows[0].length, y: rows.length };
        
        rows.forEach((row) => this.grid.push(...row.split('')));
        
        const robotIndex = this.grid.findIndex((tile) => tile == tiles.robot);
        this.robot = this.indexToPosition(robotIndex);
    }

    at(position) {
        return this.grid[this.positionToIndex(position)];
    }

    set(position, tile) {
        this.grid[this.positionToIndex(position)] = tile;
    }

    move(displacement) {
        let currentPosition = add(this.robot, displacement);

        const boxPositions = [];

        while (this.at(currentPosition) == tiles.box) {
            boxPositions.push(currentPosition);
            currentPosition = add(currentPosition, displacement);
        }

        if (this.at(currentPosition) != tiles.empty) return;

        let currentBoxPosition = boxPositions.pop();
        while (currentBoxPosition) {
            this.set(add(currentBoxPosition, displacement), tiles.box);
            this.set(currentBoxPosition, tiles.empty);

            currentBoxPosition = boxPositions.pop();
        }

        const nextRobotPosition = add(this.robot, displacement);
        this.set(nextRobotPosition, tiles.robot);
        this.set(this.robot, tiles.empty);
        this.robot = nextRobotPosition;
    }

    gpsSum() {
        const boxPositions = filterIndices(this.grid, (tile) => {
            return tile == tiles.box
        }).map((index) => this.indexToPosition(index));

        const gpsCoordinates = boxPositions.map((position) => {
            return (position.y * 100) + position.x;
        });

        return gpsCoordinates.reduce((a, c) => a + c, 0);
    }

    output() {
        const rows = [];
        
        for (let y = 0; y < this.size.y; y++) {
            const sliceStart = this.positionToIndex({ x: 0, y: y });
            const sliceEnd = this.positionToIndex({ x: 0, y: y + 1 });
            rows.push(this.grid.slice(sliceStart, sliceEnd));
        }

        return rows.map((row) => row.join('')).join('\n');
    }

    positionToIndex(position) {
        return (position.y * this.size.x) + (position.x % this.size.x);
    }

    indexToPosition(index) {
        return { x: index % this.size.x, y: Math.floor(index / this.size.x) };
    }
}

function add(positionA, positionB) {
    return { x: positionA.x + positionB.x, y: positionA.y + positionB.y };
}

function filterIndices(array, predicate) {
    const indices = [];
    
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            indices.push(i);
        }
    }

    return indices;
}
