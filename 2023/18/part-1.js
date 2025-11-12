const { statSync, stat } = require('fs');
const utils = require('../utils');

const directions = {
    'R': { x: 1, y: 0 },
    'D': { x: 0, y: 1 },
    'L': { x: -1, y: 0 },
    'U': { x: 0, y: -1 }
};

utils.readData('./18/input', true).then((data) => {
    const instructions = data.map(parseInstruction);
    const moves = instructions.map((instruction) => instruction.move);
    const gridData = gridFrame(moves);

    console.log(instructions);

    // Create and populate grid
    const grid = new Grid(gridData.size);
    
    let currentPosition = sub({ x: 0, y: 0 }, gridData.topLeft);
    
    for (const instruction of instructions) {
        let remainingMove = { x: instruction.move.x, y: instruction.move.y };
        
        let dir = Math.sign(remainingMove.x);
        while (remainingMove.x != 0) {
            currentPosition = { x: currentPosition.x + dir, y: currentPosition.y };
            remainingMove.x -= dir;
            grid.set(currentPosition, instruction.color);
        }

        dir = Math.sign(remainingMove.y);
        while (remainingMove.y != 0) {
            currentPosition = { x: currentPosition.x, y: currentPosition.y + dir };
            remainingMove.y -= dir;
            grid.set(currentPosition, instruction.color);
        }
    }

    console.log(grid.view());

    // Search for valid interior in grid
    let interiorPosition = null; 
    
    for (let i = 0; i < grid.size.x * grid.size.y; i++) {
        const currentPosition = grid.indexPosition(i);
        if (grid.isInteriorPosition(currentPosition)) {
            interiorPosition = currentPosition;
            break;
        }
    }

    if (!interiorPosition) {
        console.log("No interior position found");
        return;
    }

    // Execute depth first search fill
    grid.depthFirstSearch(
        interiorPosition,
        (currentPosition, _) => {
            grid.set(currentPosition, parseInt('ffc0cb', 16));
        },
        (value) => value == null
    );

    console.log(`\n${grid.view()}`);

    const area = grid.count((value) => value != null);
    console.log(area);
   
}).catch(console.error);

class Grid {
    constructor(size) {
        this.size = size;
        this.grid = Array(size.x * size.y).fill(null);
    }

    at(position) {
        return this.grid[this.positionIndex(position)];
    }

    set(position, value) {
        this.grid[this.positionIndex(position)] = value;
    }

    indexPosition(index) {
        return {
            x: index % this.size.x,
            y: Math.floor(index / this.size.x)
        };
    }

    positionIndex(position) {
        return (position.y * this.size.x) + position.x;
    }

    isValidPosition(position) {
        return position.x >= 0 && position.x < this.size.x
            && position.y >= 0 && position.y < this.size.y;
    }

    isEdgePosition(position) {
        return position.x == 0 || position.x == this.size.x - 1
            || position.y == 0 || position.y == this.size.y - 1;
    }

    isInteriorPosition(position) {
        return this.depthFirstSearch(
            position,
            (currentPosition, _) => !this.isEdgePosition(currentPosition),
            (value) => value == null
        );
    }

    neighborPositions(position) {
        const adjacencies = [
            { x: position.x + 1, y: position.y },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x, y: position.y - 1 }
        ];

        return adjacencies.filter((position) => {
            return this.isValidPosition(position);
        });
    }

    depthFirstSearch(startPosition, callback, filter) {
        const stack = [];
        const visited = new Set();

        if (!filter) filter = () => true;
        if (!callback) callback = () => undefined;

        let currentIndex = this.positionIndex(startPosition);
        
        if (filter(this.grid[currentIndex])) {
            stack.push(currentIndex);
        }
        else {
            return false;
        }
    
        while (stack.length > 0) {
            currentIndex = stack.pop();
            const currentPosition = this.indexPosition(currentIndex);

            if (!visited.has(currentIndex)) {
                visited.add(currentIndex);

                const callbackResult = callback(
                    currentPosition, 
                    this.grid[currentIndex]
                );

                if (callbackResult === false) return false;

                const neighborPositions = this.neighborPositions(
                    currentPosition
                );

                const neighborIndices = neighborPositions.map((position) => {
                    return this.positionIndex(position);
                });

                const filteredIndices = neighborIndices.filter((index) => {
                    return filter(this.grid[index]);
                });

                stack.push(...filteredIndices);
            }
        }

        return true;
    }

    count(predicate) {
        if (!predicate) return this.grid.length;
        return this.grid.reduce((a, c) => predicate(c) ? a + 1 : a, 0);
    } 

    view() {
        const lines = [];
        
        for (let y = 0; y < this.size.y; y++) {
            const start = this.size.x * y;
            const end = this.size.x * (y + 1);

            const line = this.grid.slice(start, end)
                .map((value) => value != null ? colorString('#', value): '.')
                .join('');
            
            lines.push(line);
        }

        return lines.join('\n');
    }
}

function parseInstruction(instruction) {
    const split = instruction.split(' ');
    
    const direction = split[0];
    const magnitude = parseInt(split[1]);
    const color = parseInt(split[2].slice(2, split[2].length - 1), 16);

    return {
        move: mul(directions[direction], magnitude),
        color: color
    };   
}

function mul(vector, scalar) {
    return {
        x: vector.x * scalar,
        y: vector.y * scalar
    };
}

function add(vectorA, vectorB) {
    return {
        x: vectorA.x + vectorB.x,
        y: vectorA.y + vectorB.y
    };
}

function sub(vectorA, vectorB) {
    return  {
        x: vectorA.x - vectorB.x,
        y: vectorA.y - vectorB.y
    };
}

function gridFrame(moves) {
    let currentPosition = { x: 0, y: 0 };
    const positions = [currentPosition];
    
    for (const move of moves) {
        currentPosition = add(currentPosition, move);
        positions.push(currentPosition);
    } 

    let topLeft = { x: Infinity, y: Infinity };
    let bottomRight = { x: -Infinity, y: -Infinity }

    for (const position of positions) {
        if (position.x < topLeft.x) topLeft.x = position.x;
        if (position.y < topLeft.y) topLeft.y = position.y;

        if (position.x > bottomRight.x) bottomRight.x = position.x;
        if (position.y > bottomRight.y) bottomRight.y = position.y;
    }

    
    return {
        size: add(sub(bottomRight, topLeft), { x: 1, y: 1 }),
        topLeft: topLeft,
        bottomRight: bottomRight   
    };
}

function colorString(string, colorHex) {
    if (typeof colorHex == "number") {
        colorHex = colorHex.toString(16);
    }
    if (colorHex.startsWith('#')) {
        colorHex = colorHex.slice(1);
    }

    if (colorHex.length != 6) {
        return string;
    }

    const red = parseInt(colorHex.slice(0, 2), 16);
    const green = parseInt(colorHex.slice(2, 4), 16);
    const blue = parseInt(colorHex.slice(4), 16);
    
    return `\x1b[38;2;${red};${green};${blue}m${string}\x1b[0m`;
}