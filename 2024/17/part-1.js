const utils = require('../utils');

utils.readData('./17/input', false).then((data) => {
    const readString = (row) => row.split(': ')[1];
    const readNumber = (row) => Number(readString(row));
    const readArray = (row) => readString(row).split(',').map(Number);

    const computer = new Computer({ 
        A: readNumber(data[0]),
        B: readNumber(data[1]),
        C: readNumber(data[2])
    }, readArray(data[4]));

    computer.execute();

    console.log(computer.output.join(','));
});

class Computer {
    registers = { A: 0, B: 0, C: 0 };
    program = [];
    pointer = 0;
    output = [];

    instructions = {
        'adv': (operand) => {
            this.registers.A = Math.floor(
                this.registers.A / Math.pow(2, this.combo(operand))
            );
        },
        'bxl': (operand) => {
            this.registers.B = this.registers.B ^ operand;
        },
        'bst': (operand) => {
            this.registers.B = this.combo(operand) % 8;
        },
        'jnz': (operand) => {
            if (this.registers.A == 0) return;
            this.pointer = operand;
        },
        'bxc': () => {
            this.registers.B = this.registers.B ^ this.registers.C;
        },
        'out': (operand) => {
            this.output.push(this.combo(operand) % 8);
        },
        'bdv': (operand) => {
            this.registers.B = Math.floor(
                this.registers.A / Math.pow(2, this.combo(operand))
            );
        },
        'cdv': (operand) => {
            this.registers.C = Math.floor(
                this.registers.A / Math.pow(2, this.combo(operand))
            );
        }
    };

    operationCodes = {
        0: 'adv',
        1: 'bxl',
        2: 'bst',
        3: 'jnz',
        4: 'bxc',
        5: 'out',
        6: 'bdv',
        7: 'cdv'
    };

    constructor(registers, program) {
        this.registers = registers;
        this.program = program;
    }

    combo(value) {
        switch (value) {
            case 0: return 0;
            case 1: return 1;
            case 2: return 2;
            case 3: return 3;
            case 4: return this.registers.A;
            case 5: return this.registers.B;
            case 6: return this.registers.C;
            default: return -1;
        }
    }

    execute() {
        while (this.pointer < this.program.length) {
            const operationCode = this.program[this.pointer];
            const operand = this.program[this.pointer + 1];

            if (!(operationCode in this.operationCodes)) {
                throw Error(`Invalid operation: ${operationCode}`);
            }

            const instruction = this.operationCodes[operationCode];
            this.pointer += 2;
            this.instructions[instruction](operand);
        }
    }
}
