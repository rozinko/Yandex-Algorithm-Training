const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let numbers = lines[1].split(' ').map(i => Number(i))
let [m, k] = lines[2].split(' ').map(i => Number(i))
let x = lines[3].split(' ').map(i => Number(i))

let dots = [], outsIndexes = []

for (let i = 0; i < n; i++) {
    let now = numbers[i], prev = numbers[i-1] ?? undefined
    if (dots.length === 0) {
        dots.push(i)
    } else if (prev !== undefined && now === prev) {
        dots.push(i)
    }
    if (prev !== undefined && now < prev) {
        dots = [ i ]
    }
    outsIndexes.push(dots[dots.length-1-k] ?? dots[0])
}

let ans = []

for (let i = 0; i < m; i++) {
    // x[] конвертим из порядкового номера в индекс, потом outsIndexes[] конвертим обратно в порядковый номер
    ans.push(outsIndexes[x[i]-1] + 1)
}

fs.writeFileSync("output.txt", ans.join(' ').toString())
