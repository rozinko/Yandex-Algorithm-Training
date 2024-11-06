const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let [n, k] = lines[0].trim().split(' ').map(i => Number(i))
let nums = lines[1].trim().split(' ')

let obj = {}
let result = "NO"

let p1 = 0, p2 = 0
while (p2 - p1 < k && p2 < n) {
    if (obj[nums[p2]] !== undefined && obj[nums[p2]] >= 1) {
        result = "YES"
        p2 = n
    }
    obj[nums[p2]] = 1 + (obj[nums[p2]] ?? 0)
    p2++
}

while (p2 < n) {
    if (obj[nums[p2]] !== undefined && obj[nums[p2]] >= 1) {
        result = "YES"
        p2 = n
    } else {
        obj[nums[p2]] = 1 + (obj[nums[p2]] ?? 0)
        obj[nums[p1]]--
        p1++
        p2++
    }
}


fs.writeFileSync("output.txt", result)