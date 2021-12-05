const { access } = require('fs');
const utils = require('../utils');

utils.readData('./05/input').then((data) => {
    const segments = data.map((row) => {
        const split = row.split(' -> ');
        const startSplit = split[0].split(',');
        const endSplit = split[1].split(',');
        return [
           { x: parseInt(startSplit[0]), y: parseInt(startSplit[1]) },
           { x: parseInt(endSplit[0]), y: parseInt(endSplit[1]) }
        ];
    });
    const points = { };
    const mark = (x, y) => {
        if (!(x in points)) points[x] = { };
        if (!(y in points[x])) points[x][y] = 0
        points[x][y]++;
    }
    for (const line of segments) {
        const slope = (line[0].y - line[1].y) / (line[0].x - line[1].x);
        if (line[0].x == line[1].x) {
            line.sort((a, b) => a.y - b.y);
            for (let y = line[0].y; y <= line[1].y; y++) {
                mark(line[0].x, y);
            }
        }
        else if (line[0].y == line[1].y) {
            line.sort((a, b) => a.x - b.x);
            for (let x = line[0].x; x <= line[1].x; x++) {
                mark(x, line[0].y);
            }
        }
        else if (slope == 1 || slope == -1) {
            line.sort((a, b) => a.x - b.x);
            let y = line[0].y;
            for (let x = line[0].x; x <= line[1].x; x++) {
                mark(x, y);
                y += slope;
            }
        }
    }
    const pointsArray = [];
    for (const x in points) {
        for (const y in points[x]) {
            pointsArray.push({ x: x, y: y, count: points[x][y]});
        }
    }
    const overlaps = pointsArray.filter((point) => point.count >= 2);
    console.log(overlaps.length);
}).catch(console.error);
