const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let [p, v] = lines[0].trim().split(' ').map(i => Number(i))
let [q, m] = lines[1].trim().split(' ').map(i => Number(i))

let result = 0
let x1 = p - v, x2 = p + v, y1 = q - m, y2 = q + m

if (y1 < x1) {
    [x1, x2, y1, y2] = [y1, y2, x1, x2]
}

if (x2 >= y1) {
    result = Math.max(x2, y2) - x1 + 1
} else {
    result = x2 - x1 + y2 - y1 + 2
}

fs.writeFileSync("output.txt", result.toString())