const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let [n, m] = lines[0].split(' ').map(i => Number(i))
let nums = lines[1].split(' ').map(i => Number(i))
let output = []

for (let line = 2; line < m+2; line++) {
    let [l, r] = lines[line].split(' ').map(i => Number(i))
    let num1 = nums[l], num2 = nums[r]
    let i = l+1
    while (num1 === num2 && i < r) {
        if (nums[i] !== num2) {
            num2 = nums[i]
        }
        i++
    }
    output.push(num1 !== num2 ? Math.max(num1, num2).toString() : 'NOT FOUND')
}

fs.writeFileSync("output.txt", output.join('\n'))
