const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())
let s = lines[1].trim()

let results = []

const start = new Date().getTime();

for (let i = 0; i < n; i++) {
    let j = 0, k = 0
    while (j <= i && s[j] === s[i-j]) {
        j++
        k++
    }
    results.push(k)
}

console.log(results.join(' '))

const end = new Date().getTime();
console.log('Script time: '+ (end - start) + 'ms');