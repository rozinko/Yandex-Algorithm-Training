const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let [n, k] = lines[0].split(' ').map(i => Number(i))
let numbers = lines[1].split(' ').map(i => Number(i))

numbers.sort((a, b) => a - b)

let days = Array(n).fill(0)
let next = 1, last = 0, ans = 1 // ans это количество дней (оно же максимальное значение в days)
days[0] = 1

while (next < n) {
    if (numbers[next] - numbers[last] <= k) {
        // нужен новый день для дела
        ans++
        days[next] = ans
    } else {
        // подойдет старый день, разница в деле достаточная
        days[next] = days[last]
        last++
    }
    next++
}

fs.writeFileSync("output.txt", ans.toString())
