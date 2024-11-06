const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a, b, c, d] = fileContent.toString().split(' ').map(i => Number(i))

let m = a * d + c * b
let n = b * d

let k = 2
while (k <= n) {
    if (m % k === 0 && n % k === 0) {
        m /= k
        n /= k
    } else {
        k++
    }
}

let output = m.toString() + " " + n.toString()

fs.writeFileSync("output.txt", output)
