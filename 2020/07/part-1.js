const utils = require('../utils');

utils.readData('./2020/07/input').then((data) => {
    const rules = data.map((rule) => parseRule(rule));
    const map = ruleMap(rules);
    let result = 0;
    for (const bag of map.keys()) {
        if (count(map, bag, 'shiny gold') >= 1) result += 1;
    }
    console.log(result);
});

function count(map, source, target) {
    const content = map.get(source);
    if (content.length == 0) return 0;
    const found = content
        .filter((inside) => inside.bag == target)
        .map((childBag) => childBag.quantity);
    let discovered = 0;
    if (found.length > 0) {
        discovered = found.reduce((a, c) => a + c);
    }
    
    const nextQuantities = content.map((childBag) => {
        return discovered + count(map, childBag.bag, target);
    });

    return nextQuantities.reduce((a, c) => a + c);
}

function ruleMap(rules) {
    const map = new Map();
    for (const rule of rules) {
        map.set(rule.bag, rule.content);
    }
    return map;
}

function parseRule(rule) {
    const ruleSplit = rule.split(' contain ');
    const bag = ruleSplit[0].split(' bags')[0];
    const contentString = ruleSplit[1].slice(0, ruleSplit[1].length - 1);
    const content = [];
    if (contentString != 'no other bags') {
        content.push(...contentString.split(', ').map((token) => {
            const tokenSplit = token.split(' ');
            return {
                bag: tokenSplit.slice(
                    1,
                    tokenSplit.length - 1
                ).join(' '),
                quantity: parseInt(tokenSplit[0])
            };
        }));
    }

    return {
        bag: bag,
        content: content
    };
}
