const utils = require('../utils');

const connectedPairs = 10;

utils.readData('./08/input', true).then((data) => {
    const positions = data.map((row) => {
        const split = row.split(',');
        
        return {
            x: Number(split[0]),
            y: Number(split[1]),
            z: Number(split[2])
        };
    });

    const pairs = sortedPairs(positions);
    
    const graphs = [];
    const graphAssignments = new Map();
    let index = 0;
    let connections = 0;

    while (connections < connectedPairs) {
        const pair = pairs[index++];

        let graphA = graphAssignments.get(pair.a) 
        let graphB = graphAssignments.get(pair.b);
        let graph = graphA || graphB;

        if (graphA && graphB) {
            if (graphA == graphB) {
                continue;
            }

            graphA.merge(graphB);
            graph = graphA;
        }

        if (!graph) {
            graph = new utils.Graph();
            graphs.push(graph);
            graphAssignments.set(pair.a, graph);
            graphAssignments.set(pair.b, graph);
        }

        graph.connect(pair.a, pair.b);
        connections++;
    }

    graphs.sort((a, b) => b.size() - a.size());

    const largestCircuits = graphs.slice(0, 3);

    const result = largestCircuits.reduce((acc, circuit) => {
        return acc * circuit.size();
    }, 1);

    console.log(largestCircuits);

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

    distances.sort((a, b) => a.distance - b.distance);

    return distances;
}


function distanceSquared(a, b) {
    return (a.x - b.x) * (a.x - b.x) +
        (a.y - b.y) * (a.y - b.y) +
        (a.z - b.z) * (a.z - b.z);
}
