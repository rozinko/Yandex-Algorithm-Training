const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let k = Number(lines[0].trim())

let firstXY = lines[1].trim().split(' ').map(i => Number(i))

let x1 = firstXY[0], x2 = firstXY[0], y1 = firstXY[1], y2 = firstXY[1]

for (let line = 2; line <= k; line++) {
    let xy = lines[line].trim().split(' ').map(i => Number(i))
    x1 = Math.min(x1, xy[0])
    x2 = Math.max(x2, xy[0])
    y1 = Math.min(y1, xy[1])
    y2 = Math.max(y2, xy[1])
}

let result = [x1, y1, x2, y2].map(i => i.toString()).join(" ")

fs.writeFileSync("output.txt", result)