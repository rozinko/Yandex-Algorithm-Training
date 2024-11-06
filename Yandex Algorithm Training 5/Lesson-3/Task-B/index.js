const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let word1 = lines[0].trim().split('')
let word2 = lines[1].trim().split('')

let obj = {}

word1.forEach(char => { obj[char] = 1 + (obj[char] ?? 0) })
word2.forEach(char => { obj[char] = (obj[char] ?? 0) - 1 })

let result = "YES"

Object.keys(obj).forEach(key => {
    if (obj[key] !== 0) result = "NO"
})

fs.writeFileSync("output.txt", result)