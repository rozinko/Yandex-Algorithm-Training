const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

let dict = {}
for (let line = 1; line < n; line++) {
    let [a, b] = lines[line].trim().split(' ').map(i => Number(i))
    if (dict[a] === undefined) {
        dict[a] = {list: [b], tin: -1, tout: -1}
    } else {
        dict[a].list.push(b)
    }
    if (dict[b] === undefined) {
        dict[b] = {list: [a], tin: -1, tout: -1}
    } else {
        dict[b].list.push(a)
    }
}

let recursion = function(v, tin) {
    dict[v].tin = tin

    let t = tin + 1
    dict[v].list.forEach(sub => {
        if (dict[sub].tin === -1) t = recursion(sub, t)
    })

    dict[v].tout = t
    return t
}

recursion(1, 0)

let ans = []
for (let i = 1; i <= n; i++) {
    ans.push(dict[i].tout - dict[i].tin)
}

fs.writeFileSync("output.txt", ans.join(' '))