const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let nums = lines[1].split(' ').map(i => Number(i))

let prev = 0, diff = 0
let status = nums.reduce((a, b) => a + b)
let results = []

nums.forEach((value, index) => {
    diff = value - prev
    prev = value
    status += (diff * index) - diff * (nums.length - index)
    results.push(status)
})

let output = results.map(i => i.toString()).join(' ')

fs.writeFileSync("output.txt", output)
