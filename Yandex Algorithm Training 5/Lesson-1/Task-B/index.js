const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let first = lines[0].trim().split(':').map(i => Number(i))
let second = lines[1].trim().split(':').map(i => Number(i))
let atHome = Number(lines[2].trim())

let result = first[1] + second[1] - first[0] - second[0]

if (atHome === 1 && (second[0] + result) <= first[1]) result++
if (atHome === 2 && first[0] <= second[1]) result++
if (result < 0) result = 0

fs.writeFileSync("output.txt", result.toString())