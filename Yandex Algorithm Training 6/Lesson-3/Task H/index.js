const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])

let nums = [], sums = [ 0 ], ans = []

for (let line = 1; line <= n; line++) {
    let command = lines[line]
    switch (command[0]) {
        case '+':
            // push num
            let num = Number(command.substring(1))
            nums.push(num)
            sums.push(num + (sums[sums.length-1] ?? 0))
            break
        case '-':
            // pop num
            ans.push(nums.pop())
            sums.pop()
            break
        case '?':
            // get sum of last k nums
            let k = Number(command.substring(1))
            ans.push(sums[sums.length-1] - sums[sums.length-1-k])
            break
    }
}

fs.writeFileSync("output.txt", ans.join("\n"))