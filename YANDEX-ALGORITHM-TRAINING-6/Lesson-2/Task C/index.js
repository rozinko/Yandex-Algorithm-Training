const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let [n, rad] = lines[0].split(' ').map(i => Number(i))
let d = lines[1].split(' ').map(i => Number(i))

let l = 0, r = 1, ans = 0

while (l < n - 1 && r < n) {
    if (d[r] - d[l] <= rad) {
        r++
    } else {
        ans += n - r
        l++
    }
}

fs.writeFileSync("output.txt", ans.toString())
