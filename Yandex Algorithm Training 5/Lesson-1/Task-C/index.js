const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

let nums = []
for (let i = 1; i <= n; i++) nums.push(Number(lines[i].trim()))

let result = nums.reduce((prev, value) => {
    return prev + Math.floor(value / 4) + (value % 4 > 1 ? 2 : value % 4)
}, 0)

fs.writeFileSync("output.txt", result.toString())