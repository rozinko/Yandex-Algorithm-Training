const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())
let s = lines[1].trim()

let results = []
let p = 1e7 + 7

let getHashes = function(s, x) {
    let h = [0]
    for (let i = 1; i <= s.length; i++) {
        h[i] = (h[i-1] * x + s.charCodeAt(i-1)) % p
    }
    return h
}

let getXlen = function(maxlen, x) {
    let xlen = [0, x]
    for (let i = 2; i <= maxlen; i++) {
        xlen[i] = (xlen[i-1] * x) % p
    }
    return xlen
}

let checkReverseZ = function(i, len) {
    let left1 = hashes[len]
    let left2 = hashesRev[n-i-1] * xlens[len] % p
    let right = hashesRev[n-i+len-1]
    return (left1 + left2) % p === right
}

let x = 257
let xlens = getXlen(s.length, x)
let hashes = getHashes(s, x)
let hashesRev = getHashes(s.split('').reverse().join(''), x)

let maxLen = 0

for (let i = 0; i < n; i++) {
    let len = 0
    if (checkReverseZ(i, maxLen)) len = maxLen

    while (len <= i+1 && checkReverseZ(i, len+1)) {
        len++
    }
    if (len > maxLen) {
        maxLen = len
    }
    results.push(len)
}

console.log(results.join(' '))