const fs = require('fs')
let fileContent = fs.readFileSync("brackets2.in", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim()) % 2 === 1 ? 0 : Number(lines[0].trim())

let buffer = []

let generateNext = function(s, end)  {
    if (n > s.length + end.length) {
        generateNext(s + "(", ")" + end)
        generateNext(s + "[", "]" + end)
        if (end.length > 0) {   
            generateNext(s + end[0], end.substring(1))
        }
    } else {
        buffer.push(s + end)
        if (buffer.length > 20000) {
            console.log(buffer.join("\n"))
            buffer = []
        }
    }
}

generateNext("", "")
if (buffer.length > 0) {
    console.log(buffer.join("\n"))
    buffer = []
}