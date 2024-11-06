const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let [n, k] = lines[0].trim().split(' ').map(i => Number(i))

// prices with best sold
let ranges = lines[1].trim().split(' ').map(i => [Number(i), Number(i)])

for (let i = 1; i < n; i++)
    for (let j = i-k < 0 ? 0 : i-k; j < i; j++)
        if (ranges[i][0] > ranges[j][1]) {
            ranges[j][1] = ranges[i][0]
        }

let result = ranges.reduce((best, range) => { return Math.max(best, range[1] - range[0]) }, ranges[0][1] - ranges[0][0])

fs.writeFileSync("output.txt", result.toString())