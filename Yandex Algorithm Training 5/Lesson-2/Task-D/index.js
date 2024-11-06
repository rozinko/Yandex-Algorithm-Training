const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let board = [...Array(10)].map(a => Array(10).fill(0))

let n = Number(lines[0].trim())
let dxdy = [ [-1, 0], [0, -1], [1, 0], [0, 1] ]

for (let line = 1; line <= n; line++) {
    let [x, y] = lines[line].trim().split(' ').map(i => Number(i))
    board[y][x] -= 100
    dxdy.forEach(dd => { board[y+dd[1]][x+dd[0]] += 1 })
}

let result = board.flat().filter(i => i > 0).reduce((a, b) => a + b, 0)

fs.writeFileSync("output.txt", result.toString())