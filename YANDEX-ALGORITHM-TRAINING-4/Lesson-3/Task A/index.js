const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let [n, s, f] = lines[0].trim().split(' ').map(i => Number(i))
let data = {}
for (let i = 1; i <= n; i++) {
	let nums = lines[i].trim().split(' ').map(i => Number(i))
	data[i] = {
		visited: false,
		mincost: i == s ? 0 : -1,
		nexts: [-1, ...nums]
	}
}

let next = s
while (next !== -1 && !data[f].visited) {
	data[next].visited = true
	data[next].nexts.forEach((val, index) => {
		if (val >= 0 && (data[next].mincost + val < data[index].mincost || data[index].mincost === -1)) {
			data[index].mincost = data[next].mincost + val
		}
	})
	// find next
	next = -1
	nextcost = -1
	Object.keys(data).forEach(key => {
		if (!data[key].visited && data[key].mincost >= 0 && (data[key].mincost < nextcost || nextcost === -1)) {
			next = key
			nextcost = data[key].mincost
		}
	})
}

let output = data[f].mincost.toString()
fs.writeFileSync("output.txt", output)
