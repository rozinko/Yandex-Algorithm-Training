const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let line_0_split = lines[0].split(' ')
let n = Number(line_0_split[0])
let c = BigInt(line_0_split[1])
let s = lines[1]

let arrA = Array(n).fill(0n)
let arrBA = Array(n).fill(0n)
let arrB = Array(n).fill(0n)

for (let i = 0; i < n; i++) {
    arrA[i] = (s[i] === "a" ? 1n : 0n) + (arrA[i-1] ?? 0n)
}

for (let i = 0; i < n; i++) {
    arrB[i] = (s[i] === "b" ? 1n : 0n) + (arrB[i-1] ?? 0n)
    arrBA[i] = (s[i] === "b" ? arrA[i] : 0n) + (arrBA[i-1] ?? 0n)
}

let l = 0, r = 0, ans = 0

while (r < n) {
    let nowC = arrBA[r] - (arrBA[l-1] ?? 0n) - (arrA[l-1] ?? 0n) * (arrB[r] - (arrB[l-1] ?? 0n))
    while (nowC > c) {
        l++
        nowC = arrBA[r] - (arrBA[l-1] ?? 0n) - (arrA[l-1] ?? 0n) * (arrB[r] - (arrB[l-1] ?? 0n))
    }
    ans = Math.max(ans, r - l + 1)
    r++
}

fs.writeFileSync("output.txt", ans.toString())
