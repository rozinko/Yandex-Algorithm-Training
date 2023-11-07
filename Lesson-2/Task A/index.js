const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let s = lines[0]
let n = Number(lines[1])

let p = 1e7 + 7
let results = []

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

let check = function(hashes, xlen, len, a, b) {
    let hashBlen = hashes[b] * xlen % p
    let hashA = (hashes[a+len] + hashBlen) % p
    let hashAlen = hashes[a] * xlen % p
    let hashB = (hashes[b+len] + hashAlen) % p
    return hashA === hashB
}

let x = 257
let xlens = getXlen(s.length, x)
let hashes = getHashes(s, x)

let x2 = 337
let xlens2 = getXlen(s.length, x2)
let hashes2 = getHashes(s, x2)

for (let line = 2; line < n+2; line++) {
    let [len, a, b] = lines[line].split(' ').map(i => Number(i))
    let res = check(hashes, xlens[len], len, a, b) && check(hashes2, xlens2[len], len, a, b)
    results.push(res ? "yes" : "no")
}

let output = results.map(i => i.toString()).join('\n')
fs.writeFileSync("output.txt", output)
