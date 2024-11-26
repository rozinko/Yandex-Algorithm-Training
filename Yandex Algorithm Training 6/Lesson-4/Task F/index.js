const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())
let data = lines[1] !== undefined ? [0, 0, ...lines[1].trim().split(' ').map(i => Number(i))] : [0, 0]

let dict = {}
for (let i = 1; i <= n; i++) {
    dict[i] = {
        list: [], 
        listShift: 0,
        parent: data[i], 
        height: data[i] > 0 ? dict[data[i]].height + 1 : 1, 
        tin: -1, 
        tout: -1,
        coins: 0
    }
    if (data[i] > 0) dict[data[i]].list.push(i)
}

let t = 0
let now = 1
while (now > 0) {
    if (dict[now].tin === -1) {
        // запускаем счетчик, если не запущен
        dict[now].tin = t
    } else {
        // счетчик запущен, обрабатываем подчиненных
        if (dict[now].listShift < dict[now].list.length) {
            // найден непосещенный подчиненный
            now = dict[now].list[dict[now].listShift++]
        } else {
            // ничего не нашли, значит будет отдуваться этот
            // счетчик +1 за задание, закрываем его счетчик, выписываем монеты
            t++
            dict[now].tout = t
            dict[now].coins = dict[now].list.reduce((acc, cur) => acc + dict[cur].coins, 0) + dict[now].tout - dict[now].tin
            // идем в родителя
            now = dict[now].parent
        }
    }
}

let ans = []
for (let i = 1; i <= n; i++) ans.push(dict[i].coins)

fs.writeFileSync("output.txt", ans.join(' '))