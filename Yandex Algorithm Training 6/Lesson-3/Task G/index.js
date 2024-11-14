const { count } = require('console');
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let line0 = lines[0].split(' ')
let n = Number(line0[0])
let b = BigInt(line0[1])
let clients = lines[1].split(' ').map(i => Number(i))

let ans = 0n, now = 0n

for (let i = 0; i < n; i++) {
    now += BigInt(clients[i])
    ans += now
    if (now > b) { now -= b } else { now = 0n }
}

ans += now

fs.writeFileSync("output.txt", ans.toString())