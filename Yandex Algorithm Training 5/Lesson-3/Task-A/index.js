const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())
let obj = {}

for (let i = 1; i <= n; i++) {
    let songs = lines[i * 2].trim().split(' ')
    songs.forEach(song => {
        obj[song] = 1 + (obj[song] ?? 0)
    })
}

let playlist = []

Object.keys(obj).forEach(key => {
    if (obj[key] == n) playlist.push(key)
})

playlist.sort()

let result = playlist.length.toString() + "\n" + playlist.join(" ")

fs.writeFileSync("output.txt", result)