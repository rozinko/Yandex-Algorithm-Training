const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let [d, v] = lines[1].trim().split(' ').map(i => Number(i))
let r = Number(lines[2])

let data = {}

for (let i = 1; i <= n; i++) {
	data[i] = {
		visited: false,
		mintime: i == d ? 0 : -1,
		routes: []
	}
}

for (let line = 3; line < r + 3; line++) {
	let [from, departure, to, arrival] = lines[line].trim().split(' ').map(i => Number(i))
	data[from].routes.push({destination: to, departure: departure, arrival: arrival})
}

let now = d, nowtime = 0
while (now !== -1 && !data[v].visited) {
	data[now].visited = true
	data[now].routes.forEach(route => {
		if (route.departure >= data[now].mintime && (route.arrival < data[route.destination].mintime || data[route.destination].mintime === -1)) {
			data[route.destination].mintime = route.arrival
		}
	})
	// find next
	now = -1
	nowtime = -1
	Object.keys(data).forEach(key => {
		if (!data[key].visited && data[key].mintime >= 0 && (data[key].mintime < nowtime || nowtime === -1)) {
			now = key
			nowtime = data[key].mintime
		}
	})
}

let output = data[v].mintime.toString()
fs.writeFileSync("output.txt", output)
