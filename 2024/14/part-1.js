const utils = require('../utils');

const size = { x: 11, y: 7 };
const runtime = 100;

utils.readData('./14/input', true).then((data) => {
    const robots = data.map(parseRobot);
    
    robots.forEach((robot) => update(robot, runtime));

    draw(robots);
    console.log(safetyFactor(robots));
});

function parseRobot(input) {
    const split = input.split(' ');
    const position = split[0].slice(2).split(',');
    const velocity = split[1].slice(2).split(',');

    return {
        position: { 
            x: Number(position[0]), 
            y: Number(position[1]) 
        },
        velocity: { 
            x: Number(velocity[0]), 
            y: Number(velocity[1]) 
        }
    }
}

function update(robot, time) {
    const unwrappedPosition = {
        x: robot.position.x + (robot.velocity.x * time),
        y: robot.position.y + (robot.velocity.y * time)
    };

    robot.position.x = unwrappedPosition.x - 
        (size.x * Math.floor(unwrappedPosition.x / size.x));

    robot.position.y = unwrappedPosition.y -
        (size.y * Math.floor(unwrappedPosition.y / size.y));
}

function positionQuadrant(position) {
    const center = {
        x: Math.floor(size.x / 2),
        y: Math.floor(size.y / 2)
    };

    const left = position.x >= 0 && position.x < center.x;
    const right = position.x > center.x && position.x < size.x;
    const top = position.y >= 0 && position.y < center.y;
    const bottom = position.y > center.y && position.y < size.y;

    if (left && top) return 0;
    if (right && top) return 1;
    if (left && bottom) return 2;
    if (right && bottom) return 3;

    return null;
}

function safetyFactor(robots) {
    const quadrants = { 0: 0, 1: 0, 2: 0, 3: 0 };

    for (const robot of robots) {
        const quadrant = positionQuadrant(robot.position);
        if (quadrant in quadrants) {
            quadrants[quadrant] += 1;
        }
    }

    return Object.values(quadrants).reduce((a, c) => a * c, 1);
}

function draw(robots) {
    const grid = Array(size.y).fill(0).map(() => Array(size.x).fill(0));

    for (const robot of robots) {
        grid[robot.position.y][robot.position.x] += 1;
    }

    const lines = grid.map((row) => row.join(' '));
    console.log(lines.join('\n'));
}