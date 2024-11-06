const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())
let lens = lines[1].trim().split(' ').map(i => Number(i))

let max = Math.max(...lens)
let sumWithoutMax = lens.reduce((a, b) => a + b, 0) - max

let result = max > sumWithoutMax ? max - sumWithoutMax : max + sumWithoutMax

fs.writeFileSync("output.txt", result.toString())