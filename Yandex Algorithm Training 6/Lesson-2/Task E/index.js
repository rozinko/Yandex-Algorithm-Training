const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let numbers = lines[1].split(' ').map(i => Number(i))

numbers.sort((a, b) => a - b)

let ans = []
let l, r

if (n % 2 === 1) {
    // нечетное количество, начинаем с центра
    ans.push(numbers[(n-1)/2])
    l = (n-1)/2 - 1
    r = (n-1)/2 + 1
} else {
    // четное количество
    l = n/2 - 1
    r = n/2
}

while (l >= 0 && r < n) {
    if (numbers[l] <= numbers[r]) {
        ans.push(numbers[l], numbers[r])
    } else {
        ans.push(numbers[r], numbers[l])
    }
    l--
    r++
}

fs.writeFileSync("output.txt", ans.join(" ").toString())
