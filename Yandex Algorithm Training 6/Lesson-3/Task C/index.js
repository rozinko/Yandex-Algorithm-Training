const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let [n, k] = lines[0].split(' ').map(i => Number(i))
let numbers = lines[1].split(' ').map(i => Number(i))

let stack = [] // stack of mins [index, num]
let stackshift = 0 // указатель начала стека вместо shift() на каждом шаге
let ans = []

for (let i = 0; i < n; i++) {
    // убираем старые числа, когда окно прошло
    if (stack.length > stackshift && stack[stackshift][0] <= i-k) stackshift++
    // убираем бОльшие числа из стека, так как заявка на новый минимум
    while (stack.length > 0 && stack[stack.length-1][1] >= numbers[i]) stack.pop()
    // проверяем валидность stackshift (если вдруг почистили стек больше, чем активных чисел)
    stackshift = Math.min(stackshift, stack.length)
    // добавляем
    stack.push([i, numbers[i]])
    // пишем минимальный текущий в ответ
    if (i >= k-1) ans.push(stack[stackshift][1])
}

fs.writeFileSync("output.txt", ans.map(i => i.toString()).join("\n"))