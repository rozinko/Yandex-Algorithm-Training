const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())
let numbersIsOdd = lines[1].trim().split(' ').map(i => Number(i.slice(-1)) % 2 == 1)
let result = ""

let i = 1
let prevIsOdd = numbersIsOdd[0]
let nextIsOdd = numbersIsOdd[i]

while (i < n) {
    nextIsOdd = numbersIsOdd[i]
    result += prevIsOdd && nextIsOdd ? "x" : "+"
    prevIsOdd = nextIsOdd || prevIsOdd
    i++
}

fs.writeFileSync("output.txt", result.toString())