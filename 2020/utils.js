const fs = require('fs');

module.exports.readData = function(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data = data.toString()
                    .split('\n')
                    .map((row) => row.trim())
                    .filter((row) => row != '');
                resolve(data);
            }
        });
    });
}

module.exports.writeData = function(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data.join('\n'), (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}
