const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let [n, k] = lines[0].split(' ').map(i => Number(i))
let numbers = lines[1].split(' ').map(i => Number(i))

let l = 0, r = 0, now = numbers[0]
let result = 0

while (r < numbers.length || now > k) {
    if (now === k) {
        result++
        now -= numbers[l++]
        now += numbers[++r]
    } else if (now > k) {
        now -= numbers[l++]
    } else {
        now += numbers[++r]
    }
    if (l > r) {
        now += numbers[++r]
    }
}

fs.writeFileSync("output.txt", result.toString())
