const utils = require('../utils');

utils.readData('./08/input', true).then((data) => {
    const positions = data.map((row) => {
        const split = row.split(',');
        
        return {
            x: Number(split[0]),
            y: Number(split[1]),
            z: Number(split[2])
        };
    });

    const graphAssignments = new Map();
    const graphSet = new Set();

    for (const position of positions) {
        const graph = new utils.Graph();
        graph.insert(position);
        graphAssignments.set(position, graph);
        graphSet.add(graph);
    };

    const pairs = sortedPairs(positions);
    let pairIndex = 0;
    let pair = null;

    while (graphSet.size > 1) {
        pair = pairs[pairIndex++];
        const graphA = graphAssignments.get(pair.a) 
        const graphB = graphAssignments.get(pair.b);

        if (graphA != graphB) {
            graphA.merge(graphB);
            graphSet.delete(graphB);

            // Reassign all vertices in graph B to graph A
            for (const vertex of graphB.vertices()) {
                graphAssignments.set(vertex, graphA);
            }
        }

        graphA.connect(pair.a, pair.b);
    }

    const result = pair.a.x * pair.b.x;
    console.log(result);  
}).catch(console.error);


function sortedPairs(positions) {
    const distances = [];

    for (let indexA = 0; indexA < positions.length; indexA++) {
        for (let indexB = indexA + 1; indexB < positions.length; indexB++) {
            const positionA = positions[indexA];
            const positionB = positions[indexB];

            distances.push({
                distance: distanceSquared(positionA, positionB),
                a: positionA,
                b: positionB
            });
        }
    }

    return distances.sort((a, b) => a.distance - b.distance);
}


function distanceSquared(a, b) {
    return ((a.x - b.x) * (a.x - b.x)) +
        ((a.y - b.y) * (a.y - b.y)) +
        ((a.z - b.z) * (a.z - b.z));
}


function graphString(graph) {
    const adjacencyList = graph.adjacencyList;

    const graphString = {};

    for (const vertex of adjacencyList.keys()) {
        const neighbors = adjacencyList.get(vertex).map((neighbor) => {
            return positionString(neighbor);
        });

        graphString[positionString(vertex)] = neighbors;
    }

    return graphString;
}


function positionString(position) {
    return `(${position.x},${position.y},${position.z})`;
}
