const fs = require('fs');

module.exports.readData = function(path, filterEmptyRows) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data = data.toString()
                    .split('\n')
                    .map((row) => row.trim())

                if (filterEmptyRows == undefined || filterEmptyRows == true) {
                    data = data.filter((row) => row != '');
                }
                resolve(data);
            }
        });
    });
};

module.exports.writeData = function(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data.join('\n'), (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

module.exports.trampoline = function(fn, ...args) {
    let x = fn(...args);

    while (typeof x === 'function') {
        x = x();
    }

    return x;
};

module.exports.arraySplit = function(arr, predicate) {
    const chunks = [];
    let currentChunk = [];

    for (const item of arr) {
        if (predicate(item)) {
            chunks.push(currentChunk);
            currentChunk = [];
        } else {
            currentChunk.push(item);
        }
    }

    chunks.push(currentChunk);
    return chunks;
}

const vector2 = {
    add: (a, b) => { 
        return  { x: a.x + b.x, y: a.y + b.y }
    },
    sub: (a, b) => {
         return  { x: a.x - b.x, y: a.y - b.y }
    }
};

module.exports.vector2 = vector2;
 
class Grid {
    constructor(data, size) {
        if (size === undefined) {
            this.size = {
                x: this.width = data[0].length,
                y: data.length
            };

            this.grid = [];
            for (const row of data.slice()) {
                this.grid.push(...row.slice());
            }
        }
        else {
            this.size = size;
            this.grid = data.slice();
        }

        this.adjacencies = [
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 0, y: -1 },
            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: -1, y: 1 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
        ];

        this.squareAdjacencies = [
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: 0 },
            { x: 0, y:  1 }
        ];
    }

    at(position) {
        return this.grid[this.positionToIndex(position)];
    }

    set(position, value) {
        this.grid[this.positionToIndex(position)] = value;
    }

    index(index) {
        return this.grid[index];
    }

    indexToPosition(index) {
        return { x: index % this.size.x, y: Math.floor(index / this.size.x) };
    }

    positionToIndex(position) {
        return (position.y * this.size.x) + (position.x % this.size.x);
    }

    inBounds(position) {
        return position.x >= 0 && position.x < this.size.x
            && position.y >= 0 && position.y < this.size.y
    }

    neighbors(position, adjacencies=this.adjacencies) {
        return adjacencies.map((move) => vector2.add(position, move))
            .filter((position) => this.inBounds(position))
            .map((position) => this.at(position));
    };

    map(func) {
        const mappedGrid = this.copy();
        
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                const position = { x: x, y: y };
                mappedGrid.set(
                    position, 
                    func(this.at(position), position)
                );
            }
        }

        return mappedGrid;
    }

    count(predicate) {
        let count = 0;

        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                const position = { x: x, y: y };
                if (predicate(this.at(position), position)) {
                    count += 1;
                }
            }
        }

        return count;
    }

    copy() {
        return new Grid(this.grid, this.size);
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
};

module.exports.Grid = Grid;
