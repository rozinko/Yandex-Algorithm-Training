const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let arrayN = n > 0 ? lines[1].split(' ').map(i => Number(i)) : []

let m = Number(lines[2])
let arrayM = m > 0 ? lines[3].split(' ').map(i => Number(i)) : []

let merge = function(n, arrayN, m, arrayM) {
    let result = []
    let i = 0, j = 0
    while (i < n && j < m) {
        if (arrayN[i] < arrayM[j]) {
            result.push(arrayN[i])
            i++
        } else {
            result.push(arrayM[j])
            j++
        }
    }
    while (i < n) {
        result.push(arrayN[i])
        i++
    }
    while (j < m) {
        result.push(arrayM[j])
        j++
    }
    return result
}

let nums = merge(n, arrayN, m, arrayM)

let result = nums.map(i => i.toString()).join(' ')
fs.writeFileSync("output.txt", result)
