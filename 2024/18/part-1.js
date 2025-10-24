const utils = require('../utils');

const gridSize = { x: 7, y: 7 };

const bytes = 12;

const tiles = {
    safe: '.',
    corrupted: '#'
};

const validMoves = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
];

utils.readData('./18/input', true).then((data) => {
    const grid = new Grid(gridSize);

    const positions = data.slice(0, bytes).map((row) => {
        const split = row.split(',');
        return { x: Number(split[0]), y: Number(split[1]) };
    });

    positions.forEach((position) => grid.set(position, tiles.corrupted));
    
    console.log(grid.output());

    const path = grid.search({ x: 0, y: 0 }, { x: 6, y: 6 });

    console.log(path);
    console.log(path.length - 1);
});

class Grid {
    size = { x: 0, y: 0 }
    grid = [];

    constructor(size) {
        this.size = size;
        this.grid = Array(size.x * size.y).fill(tiles.safe);
    }

    // https://en.wikipedia.org/wiki/A*_search_algorithm
    search(startPosition, goalPosition) {
        const buildPath = (cameFrom, currentIndex) => {
            const path = [currentIndex];
            const startIndex = this.positionToIndex(startPosition);

            while (cameFrom.has(currentIndex)) {
                currentIndex = cameFrom.get(currentIndex);
                path.push(currentIndex);
                if (currentIndex == startIndex) break;
            }
            path.reverse();
            return path.map((index) => this.indexToPosition(index));
        };

        const distance = (positionA, positionB) => {
            return Math.abs(positionA.x - positionB.x) 
                + Math.abs(positionA.y - positionB.y);
        };

        const startIndex = this.positionToIndex(startPosition);
        const goalIndex = this.positionToIndex(goalPosition);

        const openSet = new Set([startIndex]);
        const cameFrom = new Map();

        const gScore = new Map();
        gScore.set(startIndex, 0);

        const fScore = new Map();
        fScore.set(startIndex, distance(startPosition, goalPosition));

        while (openSet.size > 0) {
            let minFScore = Infinity;
            let currentIndex = null;
            for (const index of openSet) {
                const currentFScore = fScore.get(index);
                if (currentFScore < minFScore) {
                    minFScore = currentFScore;
                    currentIndex = index;
                }
            }

            if (currentIndex == goalIndex) {
                return buildPath(cameFrom, currentIndex);
            }

            openSet.delete(currentIndex);

            const currentPosition = this.indexToPosition(currentIndex);
            const neighborPositions = this.neighbors(currentPosition);

            for (const neighborPosition of neighborPositions) {
                const neighborIndex = this.positionToIndex(neighborPosition);
                const tentativeGScore = gScore.get(currentIndex) + 1;
                
                if (tentativeGScore < (gScore.get(neighborIndex) || Infinity)) {
                    cameFrom.set(neighborIndex, currentIndex);
                    
                    gScore.set(neighborIndex, tentativeGScore);
    
                    fScore.set(
                        neighborIndex, 
                        tentativeGScore + distance(neighborPosition, goalPosition)
                    );

                    if (!openSet.has(neighborIndex)) {
                        openSet.add(neighborIndex);
                    }
                }
            }
        }

        return [];
    }

    neighbors(position) {
        return validMoves.map((move) => {
            return {
                x: position.x + move.x,
                y: position.y + move.y
            };
        }).filter((position) => {
            const inBounds = position.x >= 0 && position.y < this.size.x
                && position.y >= 0 && position.y < this.size.y;

            return inBounds && this.at(position) == tiles.safe;
        });
    }

    at(position) {
        return this.grid[this.positionToIndex(position)];
    }

    set(position, tile) {
        this.grid[this.positionToIndex(position)] = tile;
    }

    positionToIndex(position) {
        return (position.y * this.size.x) + (position.x % this.size.x);
    }

    indexToPosition(index) {
        return { x: index % this.size.x, y: Math.floor(index / this.size.x) };
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
}
