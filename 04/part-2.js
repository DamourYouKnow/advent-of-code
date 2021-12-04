const { access } = require('fs');
const utils = require('../utils');

utils.readData('./04/input').then((data) => {
    const numbers = data[0].split(',').map((number) => parseInt(number));
    const boards = chunks(data.slice(1), 5).map((board) => {
        return board.map((row) => {
            return row.split(' ').filter((token) => token != '').map((val) => {
                return {value: parseInt(val), marked: false};
            });
        });
    });
    const talliedBoards = boards.map((board) => {
        return  {
            board: board,
            tally: tally(board, numbers)
        }
    });
    const losingBoard = talliedBoards.sort((a, b) => {
        return b.tally.count - a.tally.count;
    })[0];
    console.log(losingBoard.tally.score);
}).catch(console.error);

function tally(board, numbers) {
    let count = 0;
    for (const number of numbers) {
        count++;
        if (markBoard(board, number)) {
            const sum = board
                .reduce((a, c) => [...a, ...c])
                .filter((tile) => !tile.marked)
                .map((tile) => tile.value)
                .reduce((a, c) => a + c);
            return {
                score: sum * number,
                count: count,
                number: number
            };
        }
    }
}

function markBoard(board, number) {
    const tile = board
        .reduce((a, c) => [...a, ...c])
        .find((tile) => tile.value == number);
    if (tile) tile.marked = true;
    return checkBoard(board);
}

function checkBoard(board) {
    const transpose = board[0].map((x, i) => board.map(x => x[i]));
    const winningRow = board.find((row) => {
        return row.filter((tile) => !tile.marked).length == 0;
    });
    if (winningRow) return true;
    const winningCol = transpose.find((col) => {
        return col.filter((tile) => !tile.marked).length == 0;
    });
    return winningCol;
}

function chunks(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i = i + size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}
