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

module.exports.readRawData = function(path, filterEmptyRows) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data = data.toString().split('\n');
                resolve(data);
            }
        });
    });
}

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

function collect(array, startIndex, predicate, step=1) {
    const result = [];
    let currentIndex = startIndex;

    while (currentIndex >= 0 && currentIndex < array.length) {
        const currentValue = array[currentIndex];

        if (!predicate(currentValue)) {
            break;
        }

        result.push(currentValue);
        currentIndex += step
    }

    return result;
}
module.exports.collect = collect;

module.exports.binarySearch = function(
    array, 
    target, 
    evaluator, 
    comparator,
    arraySearch = false
) {
    const mid = (min, max) => min + (Math.floor((max - min) / 2));
    
    let minIndex = 0;
    let maxIndex = array.length - 1;
    
    while (minIndex <= maxIndex) {
        const midIndex = mid(maxIndex, minIndex);
        const midValue = evaluator(array[midIndex]);
        const compareResult = comparator(midValue, target);

        if (compareResult < 0) {
            minIndex = midIndex + 1;
        }
        else if (compareResult > 0) {
            maxIndex = midIndex - 1;
        }
        else {
            if (arraySearch) {
                const collectable = (value) => evaluator(value) == midValue;

                return [
                    ...collect(array, midIndex, collectable, -1),
                    ...collect(array, midIndex + 1, collectable, 1)
                ];
            }
            else {
                return array[midIndex];
            }
        }
    }

    return arraySearch ? [] : null;
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

    row(y) {
        const startIndex = y * this.size.x;
        return this.grid.slice(startIndex, startIndex + this.size.x);
    }

    rows() {
        const result = [];

        for (let y = 0; y < this.size.y; y++) {
            result.push(this.row(y));
        }

        return result;
    }

    column(x) {
        const result = [];
        
        for (let y = 0; y < this.size.y; y++) {
            result.push(this.at({x: x, y: y}));
        }

        return result;
    }

    columns() {
        const result = [];

        for (let x = 0; x < this.size.x; x++) {
            result.push(this.column(x));
        }

        return result;
    }

    transpose() {
        const result = this.copy();
        result.size = { x: this.size.y, y: this.size.x };

        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const position = { x: x, y: y };
                const transposePosition = { x: y, y: x };
                result.set(transposePosition, this.at(position));
            }
        }

        return result;
    }

    subgrid(position, size) {
        if (position.x + size.x > this.size.x) {
            size.x -= (position.x + size.x) - this.size.x;
        }
        if (position.y + size.y > this.size.y) {
            size.y -= (position.y + size.y) - this.size.y;
        }

        const subgrid = [];

        for (let y = position.y; y < position.y + size.y; y++) {
            for (let x = position.x; x < position.x + size.x; x++) {
                subgrid.push(this.at({ x: x, y: y }));
            }
        }

        return new Grid(subgrid, size);
    }

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

    findPosition(predicate) {
        for (let index = 0; index < this.grid.length; index++) {
            if (predicate(this.grid[index])) {
                return this.indexToPosition(index);
            }
        }

        return null;
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


class Graph {
    // TODO: Handle providing an adjacency list
    constructor(adjacencyList) {
        this.adjacencyList = new Map();

        if (adjacencyList !== undefined) {
            for (vertex in adjacencyList) {
                for (const neighbor in adjacencyList[vertex]) {
                    this.connect(vertex, neighbor);
                }
            }
        }
    }

    connect(vertexA, vertexB) {
        if (!this.adjacencyList.has(vertexA)) {
            this.adjacencyList.set(vertexA, []);
        }
        if (!this.adjacencyList.has(vertexB)) {
            this.adjacencyList.set(vertexB, []);
        }
        
        const adjacentA = this.adjacencyList.get(vertexA);
        const adjacentB = this.adjacencyList.get(vertexB);

        if (!adjacentA.includes(vertexB)) {
            adjacentA.push(vertexB);
        }
        if (!adjacentB.includes(vertexA)) {
            adjacentB.push(vertexA);
        }
    }

    insert(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    neighbors(vertex) {
        return this.adjacencyList.get(vertex).slice();
    }

    vertices() {
        return Array.from(this.adjacencyList.keys());
    }

    contains(vertex) {
        return this.adjacencyList.has(vertex);
    }

    merge(other) {
        for (const otherVertex of other.adjacencyList.keys()) {
            this.insert(otherVertex);

            for (const neighbor of other.adjacencyList.get(otherVertex)) {
                this.connect(otherVertex, neighbor);
            }
        }
    }

    size() {
        return this.adjacencyList.size;
    }
}

module.exports.Graph = Graph;