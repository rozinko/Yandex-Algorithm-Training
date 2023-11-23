const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

let data = {}
for (let line = 1; line <= n; line++) {
	let nums = lines[line].trim().split(' ').map(i => Number(i))
	data[line] = {
		visited: false,
		nexts: [-1, ...nums]
	}
}

let getPreBestResult = function() {
    let now = 1
    let visited = 0
    let preBestResult = 0

    while (visited < n && now > 0) {
        data[now].visited = true
        visited++
        let next = -1
        for (let i = 1; i <= n; i++) {
            if (i !== now && data[i].visited === false && data[now].nexts[i] > 0) {
                if (next === -1 || data[now].nexts[i] < data[now].nexts[next]) {
                    next = i
                }
            }
        }

        if (next > 0) {
            // go to next
            preBestResult += data[now].nexts[next]
            now = next
        } else {
            // return to 1
            preBestResult += data[now].nexts[1]
            now = -1
        }
    }

    for (let i = 1; i <= n; i++) {
        data[i].visited = false
    }

    if (visited == n) result = preBestResult
}

let getResult = function(now, visited, nowresult) {
    if (result > 0 && nowresult > result) return

    data[now].visited = true
    visited++

    if (visited < n) {
        for (let i = 2; i <= n; i++) {
            if (!data[i].visited && data[now].nexts[i] > 0) {
                nowresult += data[now].nexts[i]
                getResult(i, visited, nowresult)
                nowresult -= data[now].nexts[i]
            }
        }
    } else {
        if (data[now].nexts[1] > 0 && (nowresult + data[now].nexts[1] < result || result < 0)) {
            result = nowresult + data[now].nexts[1]
        }
    }

    data[now].visited = false
    visited--
}

let result = -1

getPreBestResult()
getResult(1, 0, 0)

fs.writeFileSync("output.txt", result.toString())
