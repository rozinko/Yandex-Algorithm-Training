const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')
let [n, k, d] = lines[0].trim().split(' ').map(i => Number(i))

function getResult(n, k, d) {
    let a = 0
    let next = n * 10
    while (next % k !== 0 && a < 10) {
        a++
        next = n * 10 + a
    }

    return a >= 10 ? "-1" : (next.toString() + Array(d-1).fill("0").join(""))
}

let result = getResult(n, k, d)

fs.writeFileSync("output.txt", result.toString())