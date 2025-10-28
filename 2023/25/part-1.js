const utils = require('../utils');

utils.readData('./25/input', true).then((data) => {
    const graph = new Graph();

    for (const row of data) {
        const vertex = row.slice(0, 3);
        const neighbors = row.slice(5).split(' ');

        for (const neighbor of neighbors) {
            graph.connect(vertex, neighbor);
        }
    }

    let minCutEdges = [];
    while (minCutEdges.length != 3) {
        minCutEdges = graph.copy().kargersAlgorithm();
    }

    console.log(minCutEdges)
});


class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    connect(vertexA, vertexB) {
        if (!this.adjacencyList.has(vertexA)) {
            this.adjacencyList.set(vertexA, []);
        }
        if (!this.adjacencyList.has(vertexB)) {
            this.adjacencyList.set(vertexB, []);
        }

        const neighborsA = this.neighbors(vertexA);
        const neighborsB = this.neighbors(vertexB);

        neighborsA.push(vertexB);
        neighborsB.push(vertexA);  
    }

    disconnect(vertexA, vertexB) {
        const neighborsA = this.neighbors(vertexA);
        const neighborsB = this.neighbors(vertexB);

        this.adjacencyList.set(
            vertexA, 
            neighborsA.filter((vertex) => vertex != vertexB) 
        );

        this.adjacencyList.set(
            vertexB, 
            neighborsB.filter((vertex) => vertex != vertexA) 
        );
    }

    neighbors(vertex) {
        return this.adjacencyList.get(vertex);
    }

    copy() {
        const result = new Graph();

        for (const entry of this.adjacencyList.entries()) {
            result.adjacencyList.set(entry[0], entry[1].slice());
        }

        return result;
    }

    edges() {
        const result = [];

        for (const entry of this.adjacencyList.entries()) {
            const vertex = entry[0];
            const neighbors = entry[1];

            for (const neighbor of neighbors) {
                if (vertex < neighbor) {
                    result.push([vertex, neighbor])
                }
            }
        }

        return result;
    }

    contract(mergerVertex, removedVertex) {
        this.disconnect(mergerVertex, removedVertex);
            
        for (const neighbor of this.neighbors(removedVertex)) {
            this.disconnect(neighbor, removedVertex);
            this.connect(neighbor, mergerVertex);
        }

        this.adjacencyList.delete(removedVertex);
    }

    // https://en.wikipedia.org/wiki/Karger%27s_algorithm
    kargersAlgorithm() {
        let edges = []

        while (this.adjacencyList.size > 2) {
            edges = this.edges();
            const edge = edges[random(0, edges.length - 1)];
            const mergerVertex = edge[0];
            const removedVertex = edge[1];

            this.contract(mergerVertex, removedVertex)
        }

        return filterDuplicates(edges);
    }

}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function filterDuplicates(arrays) {
    const result = [];

    for (const array of arrays) {
        const foundDuplicate = result.some((resultArray) => {
            return arrayEquals(array, resultArray);
        });

        if (!foundDuplicate) {
            result.push(array);
        }
    }

    return result;
}

function arrayEquals(arrayA, arrayB) {
    if (arrayA.length != arrayB.length) return false;

    for (let i = 0; i < arrayA.length; i++) {
        if (arrayA[i] != arrayB[i]) return false;
    }

    return true;
}

/*
function shuffle(array) {
    for (let i = 0; i < array.lenth - 2; i++) {
        j = random(i, array.length - 1);
        const iValue = array[i];
        array[i] = array[j];
        array[j] = iValue;
    }

    return array;
}
*/
