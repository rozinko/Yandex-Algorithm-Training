const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let input = lines[0].split(' ')

let stack = [], a, b

for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
        case '+':
            // +
            b = stack.pop()
            a = stack.pop()
            stack.push(a + b)
            break;
        case '-':
            // -
            b = stack.pop()
            a = stack.pop()
            stack.push(a - b)
            break;
        case '*':
            // *
            b = stack.pop()
            a = stack.pop()
            stack.push(a * b)
            break;
        default:
            // Numbers
            stack.push(Number(input[i]))
    }
}

let ans = stack[0]

fs.writeFileSync("output.txt", ans.toString())