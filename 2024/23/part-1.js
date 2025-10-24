const utils = require('../utils');


utils.readData('./23/input', true).then((data) => {
    const network = new Network(data);

    const cliques = network.kCliques(3);

    const foundCliques = cliques.filter((clique) => {
        return clique.some((node) => node[0] == 't');
    });

    console.log(foundCliques.length);
});


class Network {
    constructor(edges) {
        this.adjacencyList = new Map();

        for (const edge of edges) {
            const nodes = edge.split('-');
            this.connect(nodes[0], nodes[1]);
        }
    }

    connect(nodeA, nodeB) {
        // Insert new node-neighbors key-pair into adjacency list if node
        // does not exist.
        if (!this.adjacencyList.has(nodeA)) {
            this.adjacencyList.set(nodeA, []);
        }
        if (!this.adjacencyList.has(nodeB)) {
            this.adjacencyList.set(nodeB, []);
        }

        this.adjacencyList.get(nodeA).push(nodeB);
        this.adjacencyList.get(nodeB).push(nodeA);
    }

    nodes() {
        return this.adjacencyList.keys();
    }
    
    neighbors(node) {
        return this.adjacencyList.get(node);
    }

    kCliques(k) {
        const cliques = [];
        const hashedCliques = new Set();

        for (const node of this.nodes()) {
            const nodeCliques = this.kClique(node, k, hashedCliques);
            cliques.push(...nodeCliques);
        }

        return cliques;
    }

    kClique(node, k, hashedCliques) {
        const cliques = [];
        const neighbors = this.neighbors(node);

        const buildCliques = (currentNode, currentClique) => {
            if (currentClique.length == k) {
                const cliqueHash = hashClique(currentClique);
                if (!hashedCliques.has(cliqueHash)) {
                    cliques.push(currentClique);
                    hashedCliques.add(cliqueHash);
                }
                return;
            }

            const isInClique = currentClique.every((currentCliqueNode) => {
                return this.neighbors(currentCliqueNode).includes(currentNode);
            });

            if (isInClique) {
                currentClique.push(currentNode);
                for (const neighbor of neighbors) {
                    buildCliques(neighbor, [...currentClique]);
                }
            }
        };

        buildCliques(node, []);
        return cliques;
    }
}

function hashClique(clique) { 
    const cliqueCopy = [...clique];
    cliqueCopy.sort();
    return cliqueCopy.join('');
}
