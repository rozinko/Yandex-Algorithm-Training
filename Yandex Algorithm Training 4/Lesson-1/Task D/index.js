const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let arrayN = n > 0 ? lines[1].split(' ').map(i => Number(i)) : []

let merge = function(arrayN,arrayM) {
    let result = []
    let i = 0, j = 0
    let n = arrayN.length
    let m = arrayM.length
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

let divide = function(arr) {
    if (arr.length < 2) return arr

    let m = Math.ceil((arr.length-1)/2)

    return merge(divide(arr.slice(0, m)), divide(arr.slice(m)))
}

let nums = divide(arrayN)

let result = nums.map(i => i.toString()).join(' ')
fs.writeFileSync("output.txt", result)
