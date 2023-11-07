const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let s = lines[0]

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

let checkWithFirst = function(hashes, xlen, len, from) {
    let buf = hashes[from] * xlen % p 
    let hash = hashes[from+len] - buf
    if (hash < 0) hash += p
    return hashes[len] === hash
}

let x = 257
let xlens = getXlen(s.length, x)
let hashes = getHashes(s, x)

let z = Array(s.length).fill(0)
let maxZ = [0, 0]

for (let i = 1; i < s.length; i++) {
    let j = 1, flag = true
    while (j <= s.length-i && flag) {
        if (i < maxZ[1] && j == 1) {
            // костыль для огромного 92 теста
            let testJ = maxZ[1] - (i - maxZ[0])
            let testCheck = checkWithFirst(hashes, xlens[testJ], testJ, i)
            if (testCheck) {
                j = testJ
            }
        }
        if (flag = checkWithFirst(hashes, xlens[j], j, i)) {
            z[i] = j
            if (j > maxZ[1]) {
                maxZ = [i, j]
            }
        }
        j++
    }
}

let output = z.map(i => i.toString()).join(' ')
fs.writeFileSync("output.txt", output)
