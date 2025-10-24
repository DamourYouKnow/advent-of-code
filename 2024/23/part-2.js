const utils = require('../utils');


utils.readData('./23/input', true).then((data) => {
    const network = new Network(data);

    const foundClique = network.maxClique();
    foundClique.sort();
    const password = foundClique.join(',');

    console.log(password);
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
        return Array.from(this.adjacencyList.keys());
    }
    
    neighbors(node) {
        return this.adjacencyList.get(node);
    }

    maxClique() {
        let foundMaxClique = [];

        // https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
        const bronKerbosh = (r, p, x) => {
            if (p.size == 0 && x.size == 0) {
                const clique = Array.from(r);
                if (clique.length > foundMaxClique.length) {
                    foundMaxClique = Array.from(r);
                }
            }

            for (const node of p) {
                const v = new Set([node]);
                const neighbors = new Set(this.neighbors(node));
                
                bronKerbosh(
                    r.union(v),
                    p.intersection(neighbors),
                    x.intersection(neighbors)
                );

                p = p.difference(v);
                x = x.union(v);
            }
        };

        bronKerbosh(new Set(), new Set(this.nodes()), new Set());
        return foundMaxClique;
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
