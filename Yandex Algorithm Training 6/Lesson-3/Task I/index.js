const { count } = require('console');
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])

let ab = lines[1].split(' ').map(i => Number(i))
let roads = [1, 2, 3, 4].sort((a, b) => (ab.includes(b) ? 1 : 0) - (ab.includes(a) ? 1 : 0)) // [main, main, secondary, secondary]
let fastmode = ab[0]+2 == ab[1] || ab[1]+2 == ab[0] // 1 and 3 or 2 and 4
if (!fastmode) {
    // главная дорогая меняет направление, уточнить приоритет для вариантов 1 и 4
    if (roads[0] == 1 && roads[1] == 4) {
        roads[0] = 4
        roads[1] = 1
    }
    if (roads[2] == 1 && roads[3] == 4) {
        roads[2] = 4
        roads[3] = 1
    }
}

let rovers = []
for (let i = 0; i < n; i++) {
    let [d, t] = lines[2+i].split(' ').map(i => Number(i))
    rovers.push([i, d, t])
}
rovers.sort((a, b) => b[2] - a[2]) // sort by time desc

let stacks = [[], [], [], [], []]
let shifts = [0, 0, 0, 0, 0] // for FIFO
let time = 0
let counter = 0
let ans = Array(n)

while (counter < n) {
    time++

    // input rovers
    while (rovers.length > 0 && rovers[rovers.length-1][2] === time) {
        let rover = rovers.pop()
        stacks[rover[1]].push(rover)
    }

    // output rovers
    let r = 0
    while (r < 4) {
        let road = roads[r]
        if (stacks[road].length > shifts[road]) {
            // есть первый ровер на проезд
            let rover = stacks[road][shifts[road]]
            ans[rover[0]] = time
            shifts[road]++
            counter++
            if (fastmode && (r === 0 || r === 2)) {
                // главная/второстепенная ось прямая, проверяем есть ли встречный ровер
                let road2 = roads[r+1]
                if (stacks[road2].length > shifts[road2]) {
                    // нашелся второй ровер на проезд
                    let rover2 = stacks[road2][shifts[road2]]
                    ans[rover2[0]] = time
                    shifts[road2]++
                    counter++
                }
            }
            r = 5
        }
        r++
    }
}

fs.writeFileSync("output.txt", ans.map(i => i.toString()).join("\n"))