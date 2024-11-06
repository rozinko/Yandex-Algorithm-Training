const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let x1 = Number(lines[0])
let y1 = Number(lines[1])
let x2 = Number(lines[2])
let y2 = Number(lines[3])
let x = Number(lines[4])
let y = Number(lines[5])

let obj = {
    '-1': {'-1':"SW", '0': "W", '1': "NW"},
    '0': {'-1':"S", '0': "", '1': "N"},
    '1': {'-1':"SE", '0': "E", '1': "NE"}
}

let result = obj[x < x1 ? "-1" : (x > x2 ? "1" : "0")][y < y1 ? "-1" : (y > y2 ? "1" : "0")]

fs.writeFileSync("output.txt", result)
