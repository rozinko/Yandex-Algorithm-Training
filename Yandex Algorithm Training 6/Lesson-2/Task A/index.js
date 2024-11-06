const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let numbers = lines[1].split(' ').map(i => Number(i))

let now = 0
let result = []

numbers.forEach(val => {
    now += val
    result.push(now)
})

fs.writeFileSync("output.txt", result.map(i => i.toString()).join(' '))
