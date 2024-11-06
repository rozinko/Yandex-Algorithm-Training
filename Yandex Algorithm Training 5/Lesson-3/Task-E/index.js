const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let nums = [
    ...lines[1].trim().split(' ').filter((v, i, a) => a.indexOf(v) === i),
    ...lines[3].trim().split(' ').filter((v, i, a) => a.indexOf(v) === i),
    ...lines[5].trim().split(' ').filter((v, i, a) => a.indexOf(v) === i)
].map(i => Number(i))

nums.sort((a, b) => a - b)

let result = []

let i = 1
while (i < nums.length) {
    if (nums[i] === nums[i-1]) {
        result.push(nums[i])
        while(i < nums.length && nums[i] === nums[i-1]) i++
    }
    i++
}

fs.writeFileSync("output.txt", result.join(" "))