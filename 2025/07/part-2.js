const { time } = require('console');
const utils = require('../utils');

utils.readData('./07/input', true).then((data) => {
    const grid = new utils.Grid(data);
    const startPosition = grid.findPosition((value) => value == 'S');
    grid.set(startPosition, '|');

    // Memoize how many timelines impact position
    const timelines = new utils.Grid(
        new Array(grid.grid.length).fill(0),
        grid.size
    );

    for (let y = startPosition.y; y < grid.size.y; y++) {
        for (let x = 0; x < grid.size.x; x++) {
            const currentPosition = { x: x, y: y };

            if (grid.at(currentPosition) == '|') {
                const visitedTimelines = timelines.at(currentPosition) || 1;

                const below = { 
                    x: currentPosition.x, 
                    y: currentPosition.y + 1 
                };
                
                const nextPositions = grid.at(below) == '^' ? [
                    { x: below.x - 1, y: below.y }, 
                    { x: below.x + 1, y: below.y }
                ] : [below];

                for (const position of nextPositions) {
                    grid.set(position, '|');

                    timelines.set(
                        position, 
                        timelines.at(position) + visitedTimelines
                    );
                }
            }
        }
    }

    const totalTimelines = timelines.row(timelines.size.y - 1)
        .reduce((acc, value) => acc + value, 0);

    console.log(totalTimelines);
}).catch(console.error);
