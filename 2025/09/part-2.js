const utils = require('../utils');

const vec2 = utils.vector2;

utils.readData('./09/input', true).then((data) => {
    const vertices = data.map((row) => {
        const split = row.split(',');
        return { 
            x: Number(split[0]),
            y: Number(split[1]) 
        };
    });

    const sortedVertices = sortVertices(vertices);

    const polygon = linkVertices(vertices, sortedVertices);

    console.log(polygon);

}).catch(console.error);


function cornerPairs(corners) {
    const pairs = [];

    for (let indexA = 0; indexA < corners.length; indexA++) {
        for (let indexB = indexA + 1; indexB < corners.length; indexB++) {
            pairs.push({
                a: corners[indexA],
                b: corners[indexB]
            });
        }
    }

    return pairs;
}


function linkVertices(vertices, sortedVertices) {
    if (vertices.length == 0) return [];
    
    const result = [vertices[0]];

    const comparator = (a, b) => a - b;
    const linked = new Set(result);

    while (result.length < vertices.length) {
        const lastVertex = result[result.length - 1];

        const xAlignedVertices = utils.binarySearch(
            sortedVertices.x, 
            lastVertex.x,
            (vertex) => vertex.x,
            comparator,
            true
        );

        const yAlignedVertices = utils.binarySearch(
            sortedVertices.y,
            lastVertex.y,
            (vertex) => vertex.y,
            comparator,
            true
        );

        const findUnique = (vertex) => !linked.has(vertex);
        
        const xAlignedVertex = xAlignedVertices.find(findUnique);
        const yAlignedVertex = yAlignedVertices.find(findUnique);
        const nextVertex = xAlignedVertex || yAlignedVertex;

        if (!nextVertex) return [];

        result.push(nextVertex);
        linked.add(nextVertex);
    }

    return result;
}


function sortVertices(vertices) {
    vertices = vertices.slice();

    return {
        x: vertices.sort((a, b) => a.x - b.x).slice(),
        y: vertices.sort((a, b) => a.y - b.y).slice()
    };
}


