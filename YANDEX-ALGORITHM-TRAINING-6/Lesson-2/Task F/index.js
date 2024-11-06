const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let numbers = lines[1].split(' ').map(i => Number(i))

let left = Array(n).fill(0)
let right = Array(n).fill(0)

let mod = 1000000007
let ans = 0

for (let i = 1; i < n - 1; i++) {
    left[i] = (left[i-1] + numbers[i-1]) % mod
}
left[0] = 1

for (let i = n - 2; i > 0; i--) {
    right[i] = (right[i+1] + numbers[i+1]) % mod
}
right[n-1] = 1

for (let i = 1; i < n - 1; i++) {
    let add = BigInt(numbers[i]) * BigInt(left[i]) * BigInt(right[i]) % BigInt(mod)
    ans = (ans + Number(add)) % mod
}

fs.writeFileSync("output.txt", ans.toString())
