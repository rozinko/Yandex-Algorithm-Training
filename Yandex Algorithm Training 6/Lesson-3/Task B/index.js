const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let cost = lines[1].split(' ').map(i => Number(i))

let stack = []
let ans = Array(n)

for (let i = 0; i < n; i++) {
    while (stack.length > 0 && stack[stack.length-1][1] > cost[i]) {
        // в текущий переселяются более дорогие предыдущие города
        let popped = stack.pop() // old city [index, cost]
        ans[popped[0]] = i
    }
    // отправляем текущий город путешествовать
    stack.push([i, cost[i]])
}

// заполняем оставшиеся города значениями -1
for (let i = 0; i < stack.length; i++) {
    ans[stack[i][0]] = -1
}

fs.writeFileSync("output.txt", ans.map(i => i.toString()).join(' '))