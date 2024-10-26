const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let a = Number(lines[0]) // майки синие
let b = Number(lines[1]) // майки красные
let c = Number(lines[2]) // носки синие
let d = Number(lines[3]) // носки красные

let results = [] // array of [m, n, sum]

if (a && c) { // можно собрать синие
    results.push([b ? b + 1 : 1, d ? d + 1 : 1, (b ? b + 1 : 1) + (d ? d + 1 : 1)])
}

if (b && d) { // можно собрать красные
    results.push([a ? a + 1 : 1, c ? c + 1 : 1, (a ? a + 1 : 1) + (c ? c + 1 : 1)])
}

if (a && b && c && d) {
    results.push([Math.max(a, b) + 1, 1, Math.max(a, b) + 2])
    results.push([1, Math.max(c, d) + 1, Math.max(c, d) + 2])
}

let result = results.reduce((a, cur) => a[2] < cur[2] ? a : cur)
result.pop()

fs.writeFileSync("output.txt", result.map(i => i.toString()).join(" "))