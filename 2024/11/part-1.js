const utils = require('../utils');


utils.readData('./11/input', true).then((data) => {
    if (!data[0]) return;

    const stones = new LinkedStones(
        data[0].split(' ').map(Number)
    );

    for (let i = 0; i < 25; i++) {
        stones.blink();
    }

    console.log(stones.values().length);
});

class LinkedStones {
    head = null;

    constructor(values) {
        if (values && values[0]) {
            this.head = new Node(values[0]);
            let currentNode = this.head;
            values.slice(1).forEach((value) => {
                currentNode = this.insertAfter(currentNode, new Node(value));
            });
        }
    }

        // TODO: Move to LinkedStones as .insertAfter(target, newNode)
    insertBefore(targetNode, newNode) {
        newNode.previous = targetNode.previous;

        if (targetNode.previous) {
            targetNode.previous.next = newNode;
        }
   
        newNode.next = targetNode;
        targetNode.previous = newNode;

        if (targetNode == this.head) {
            this.head = newNode;
        }

        return newNode;
    }

    insertAfter(targetNode, newNode) {
        newNode.next = targetNode.next;

        if (targetNode.next) {
            targetNode.next.previous = newNode;
        }

        newNode.previous = targetNode;
        targetNode.next = newNode;

        return newNode;
    }

    remove(node) {
        if (!this.head) return;

        if (node == this.head) {
            this.head = this.head.next;
        }

        if (node.previous) {
            node.previous.next = node.next;
        }
        if (node.next) {
            node.next.previous = node.previous;
        }
    }

    each(func) {
        let currentNode = this.head;
        while (currentNode) {
            func(currentNode.value);
            currentNode = currentNode.next;
        }
    }

    blink() {
        let currentNode = this.head;
        while (currentNode) {
            const valueString = currentNode.value.toString();
            
            if (currentNode.value == 0) {
                currentNode.value = 1;
            }
            else if (valueString.length % 2 == 0) {
                const leftString = valueString.slice(0, valueString.length / 2);
                const rightString = valueString.slice(valueString.length / 2);
                
                const leftValue = Number(leftString);
                const rightValue = Number(rightString);

                this.insertBefore(currentNode, new Node(leftValue));

                currentNode.value = rightValue;
            }
            else {
                currentNode.value *= 2024;
            }

            currentNode = currentNode.next;
        }
    }

    values() {
        const values = [];
        this.each((value) => values.push(value));
        return values;
    }
}

class Node {
    value = null;
    previous = null;
    next = null;

    constructor(value) {
        this.value = value;
    }
}