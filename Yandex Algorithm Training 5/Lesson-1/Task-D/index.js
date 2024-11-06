const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const cells = fileContent.toString().split('\n').map(str => str.split(''))

let board = [...Array(8)].map(a => Array(8).fill("*"))

for (let row = 0; row < 8; row++)
    for (let col = 0; col < 8; col++)
        if (cells[row][col] != "*") board[row][col] = cells[row][col]

for (let row = 0; row < 8; row++)
    for (let col = 0; col < 8; col++) {
        if (board[row][col] == "R") {
            for (let r = row-1; r >= 0 && board[r][col] !== "R" && board[r][col] !== "B"; r--) { board[r][col] = "-" }
            for (let r = row+1; r < 8 && board[r][col] !== "R" && board[r][col] !== "B"; r++) { board[r][col] = "-" }
            for (let c = col-1; c >= 0 && board[row][c] !== "R" && board[row][c] !== "B"; c--) { board[row][c] = "-" }
            for (let c = col+1; c < 8 && board[row][c] !== "R" && board[row][c] !== "B"; c++) { board[row][c] = "-" }
            }
        if (board[row][col] == "B") {
            for (let r = row-1, c = col-1; r >= 0 && c >= 0 && board[r][c] !== "R" && board[r][c] !== "B"; r--, c--) { board[r][c] = "-" }
            for (let r = row+1, c = col-1; r < 8 && c >= 0 && board[r][c] !== "R" && board[r][c] !== "B"; r++, c--) { board[r][c] = "-" }
            for (let r = row+1, c = col+1; r < 8 && c < 8 && board[r][c] !== "R" && board[r][c] !== "B"; r++, c++) { board[r][c] = "-" }
            for (let r = row-1, c = col+1; r >= 0 && c < 8 && board[r][c] !== "R" && board[r][c] !== "B"; r--, c++) { board[r][c] = "-" }
            }
        }

let result = board.flatMap(i => i).filter(i => i === "*").length

fs.writeFileSync("output.txt", result.toString())