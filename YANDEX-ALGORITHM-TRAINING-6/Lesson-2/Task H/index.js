const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let numbers = lines[1].split(' ').map(i => Number(i))

let left = Array(n).fill(0)
let right = Array(n).fill(0)
left[0] = [0, 0] // 0 сотрудников переехавших, 0 переездов учтено
right[n-1] = [0, 0] // 0 сотрудников переехавших, 0 переездов учтено


for (let i = 1; i < n; i++) {
    left[i] = [left[i-1][0] + numbers[i-1], left[i-1][1] + left[i-1][0] + numbers[i-1]]
}

for (let i = n - 2; i >= 0; i--) {
    right[i] = [right[i+1][0] + numbers[i+1], right[i+1][1] + right[i+1][0] + numbers[i+1]]
}

let ans = left[0][1] + right[0][1]

for (let i = 1; i < n; i++) {
    ans = Math.min(ans, left[i][1] + right[i][1])
}

fs.writeFileSync("output.txt", ans.toString())
