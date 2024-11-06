const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())
let sectors = lines[1].trim().split(' ').map(i => Number(i))
let [a, b, k] = lines[2].trim().split(' ').map(i => Number(i))

let maxSector = Math.max(...sectors)
let sectorsRev = [sectors[0], ...sectors.slice(1).reverse()]

let max = Math.min(...sectors)

let fullround = sectors.length * k
let from = a > fullround ? a % fullround : a
let till = b - (a - from)

if (till - from >= fullround + 1) {
    max = maxSector
} else {
    let sliceSectors = Math.floor((from-1) / k)
    let sliceSectorsLength = Math.floor((till - 1 - (sliceSectors * k)) / k) + 1

    sectors = [...sectors.slice(sliceSectors), ...sectors.slice(0, sliceSectors)].slice(0, sliceSectorsLength)
    sectorsRev = [...sectorsRev.slice(sliceSectors), ...sectorsRev.slice(0, sliceSectors)].slice(0, sliceSectorsLength)

    max = Math.max(max, ...sectors, ...sectorsRev)
}

let result = max.toString()

fs.writeFileSync("output.txt", result)