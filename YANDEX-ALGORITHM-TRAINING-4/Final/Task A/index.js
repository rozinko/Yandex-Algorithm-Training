const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

let a = 1, b = 1, anext = 1, bnext = 1
let x = 0, xnow = 0
while (x < n) {
    if (anext === bnext) {
        x++
        xnow = anext
        a++
        anext = a ** 2
        b++
        bnext = b ** 3
    } else if (anext < bnext) {
        x++
        xnow = anext
        a++
        anext = a ** 2
    } else if (bnext < anext) {
        x++
        xnow = bnext
        b++
        bnext = b ** 3
    }
}

console.log(xnow)