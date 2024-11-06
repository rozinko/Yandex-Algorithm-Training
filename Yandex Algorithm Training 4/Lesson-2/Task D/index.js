const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let [n, m] = lines[0].split(' ').map(i => Number(i))
let nums = lines[1].split(' ').map(i => Number(i))

let p = 1e7 + 7
let results = []

let getHashes = function(nums, x) {
    let h = [0]
    for (let i = 1; i <= nums.length; i++) {
        h[i] = (h[i-1] * x + nums[i-1]) % p
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

let checkWithRev = function(len) {
    // h[len] + hRev[n-2len] * x^len == hRev[n-len]
    let left1 = hashes[len]
    let left2 = hashesRev[n-2*len] * xlens[len] % p
    let left = (left1 + left2) % p
    let right = hashesRev[n-len]
    return left == right
}

let x = Math.max(m + Math.floor(Math.random() * 257), 257)
let xlens = getXlen(n, x)
let hashes = getHashes(nums, x)

let numsRev = []
for(let i = nums.length-1; i >= 0; i--) {
    numsRev.push(nums[i])
}
let hashesRev = getHashes(numsRev, x)

let from = Math.floor(n/2)
for (let len = from; len >= 1; len--) {
    if (checkWithRev(len)) results.push(n-len)
}

results.push(n)

let output = results.map(i => i.toString()).join(' ')
fs.writeFileSync("output.txt", output)