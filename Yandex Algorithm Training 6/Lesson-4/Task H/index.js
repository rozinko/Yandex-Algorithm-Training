const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

// const start = new Date().getTime();

let n = Number(lines[0].trim())
let costs = [0, ...lines[n].trim().split(' ').map(i => Number(i))]

// заполняем начальными данными
let lists = Array(n + 1)
let dp_flag = Array(n + 1)
let dp_ready = Array(n + 1)
let dp_results = Array(n + 1)
let back_flag = Array(n + 1)

for (let i = 0; i <= n; i++) {
    lists[i] = []
    dp_flag[i] = false
    dp_ready[i] = 0
    dp_results[i] = [0, 0]
    back_flag[i] = false
}

// добавляем ребра
for (let line = 1; line <= n - 1; line++) {
    let [a, b] = lines[line].trim().split(' ').map(i => Number(i))
    lists[a].push(b)
    lists[b].push(a)
}

// console.log("LISTS = ", lists)
// console.log("COSTS = ", costs)

let dp_stack = []
// заполняем стек одиночными вершинами
for (let i = 1; i <= n; i++) {
    if (lists[i].length === 1) {
        dp_stack.push(i)
    }
}

if (n == 1) {
    dp_stack.push(1, 1)
}

// одну вершину не будем считать, туда упадет ответ dp
let dp_last_num = dp_stack.pop()

// console.log("DP_STACK = ", dp_stack)
// console.log("DP_LAST_NUM", dp_last_num)

let dp_calc = function(now) {
    let dp = [BigInt(0), BigInt(costs[now])]

    // получаем соседние данные
    lists[now].filter(i => dp_flag[i]).forEach(i => {
        let row = dp_results[i]
        dp[0] += row[1]
        dp[1] += row[0] < row[1] ? row[0] : row[1]
    })

    return dp
}

while (dp_stack.length > 0) {
    let now = dp_stack.pop()
    
    while (!dp_flag[now] && dp_ready[now] >= lists[now].length - 1) {
        let nexts = lists[now].filter(i => !dp_flag[i])
        // console.log("dp => now =", now, " with dp_ready =", dp_ready[now], " / nexts =", nexts)

        dp_results[now] = dp_calc(now)
        dp_flag[now] = true
        nexts.forEach(i => { dp_ready[i]++ })

        if (nexts.length === 1) {
            // prev = now
            now = nexts[0]
        }
    }

}

// dp_stack = undefined

// console.log("DP_READY = ", dp_ready)
// console.log("DP_RESULTS = ", dp_results)

// стек для бэктрекинга, [i, prev_marked]
let back_stack = [ [dp_last_num, n > 1 ? true : false] ]

let ans_sum = n > 1 && dp_results[dp_last_num][0] < dp_results[dp_last_num][1] ? dp_results[dp_last_num][0] : dp_results[dp_last_num][1]
let ans_marked = []

while (back_stack.length > 0) {
    let [now, prev_marked] = back_stack.pop()
    // let prev = now
    // console.log("back_stack start >>> now =", now)

    while (!back_flag[now]) {
        let nexts = lists[now].filter(i => !back_flag[i])
        let now_mark = !prev_marked || dp_results[now][1] <= dp_results[now][0] // если одинаковые значения - нужно маркеровать

        // console.log("back_stack while >>> now =", now, " / dp_res =", dp_results[now], " / prev_marked =", prev_marked)
        // console.log("back_stack while >>> now_mark =", now_mark, " / nexts =", nexts)

        if (now_mark) {
            ans_marked.push(now)
        }
        back_flag[now] = true
        if (nexts.length > 0) {
            now = nexts.pop()
            prev_marked = now_mark
        }
        while (nexts.length > 0) {
            let i = nexts.pop()
            back_stack.push([i, now_mark])
        }
    }
}

// console.log(ans_sum, ans_marked)

ans_marked.sort((a, b) => a - b)

// const end = new Date().getTime();
// console.log('SecondWay:', Number(end - start), 'ms');
// console.log('Memory:', Math.trunc(process.memoryUsage().rss / 1024 / 1024), 'mb')

fs.writeFileSync("output.txt", ans_sum.toString() + " " + ans_marked.length.toString() + "\n" + ans_marked.map(i => i.toString()).join(' '))