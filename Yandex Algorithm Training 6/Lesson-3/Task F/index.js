const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])

let cost = {}
for (let i = 0; i < lines[1].length; i++) cost[lines[1][i]] = i

let pairs = {'(': ')', '[': ']'}
let openBracket = cost['('] < cost['['] ? '(' : '['

let stack = [], back = []

for (let i = 0; i < lines[2].length; i++) {
    let now = lines[2][i]
    if (pairs[now] !== undefined) {
        // это ( или [
        stack.push(now)
        back.push(pairs[now])
    } else {
        // это ) или ]
        // так как условия валидны, значит можно убирать последний элемент из back
        stack.push(now)
        back.pop()
    }
}

let need = n - stack.length - back.length

let i = 0
while (i < need) {
    // каждая следующая будет либо начинаться на openBracket лбо закрывать предыдущие скобки
    if (back.length === 0 || cost[openBracket] < cost[back[back.length-1]]) {
        // открываем новые
        stack.push(openBracket)
        back.push(pairs[openBracket])
        // так как мы открыли новые скобки, то надо учитывать и длину закрытия скобок
        i += 2
    } else {
        // закрываем предыдущие
        stack.push(back.pop())
        // ничего не добавили, i не увеличиваем
    }
}

if (back.length > 0) stack.push(...back.reverse())
let ans = stack.join('')

fs.writeFileSync("output.txt", ans)