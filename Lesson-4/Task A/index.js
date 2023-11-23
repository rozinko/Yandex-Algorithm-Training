const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

let nums = Array.from({length: n}, (_, i) => i + 1)
let results = [] // add first

let swap = function(i, j) {
    if (i == j) return
    
    let temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
}

let getPermutations = function(from, till) {
    if (till - from > 1) {
        for (let i = from; i <= till; i++) {
            swap(from, i)
            getPermutations(from+1, till)
            swap(from, i)
        }
    } else {
        results.push(Number(nums.join('')))
        swap(from, till)
        if (from !== till) {
            results.push(nums.join(''))
            swap(from, till)
        }
    }
}

getPermutations(0, n-1)

results.sort()

let output = results.join("\n")
fs.writeFileSync("output.txt", output)