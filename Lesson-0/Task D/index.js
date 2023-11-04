const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let anagramma = function(str1, str2) {
    if (str1.length !== str2.length) return false
    let res = 0
    for (let i = 0; i < str1.length; i++) {
        res ^= str1.charCodeAt(i) ^ str2.charCodeAt(i)
    }
    return res === 0
}

let output = anagramma(lines[0], lines[1]) ? "YES" : "NO"

fs.writeFileSync("output.txt", output)
