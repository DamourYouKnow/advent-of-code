const fs = require('fs');

module.exports.readData = function(path, filterEmptyRows) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data = data.toString()
                    .split('\n')
                    .map((row) => row.trim())

                if (filterEmptyRows == undefined || filterEmptyRows == true) {
                    data = data.filter((row) => row != '');
                }
                resolve(data);
            }
        });
    });
};

module.exports.writeData = function(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data.join('\n'), (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

module.exports.trampoline = function(fn, ...args) {
    let x = fn(...args);

    while (typeof x === 'function') {
        x = x();
    }

    return x;
};
