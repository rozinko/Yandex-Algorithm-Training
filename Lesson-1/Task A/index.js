const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let nums = lines[1].split(' ').map(i => Number(i))
let x = Number(lines[2])

let partition = function(nums, x) {
    let g = 0, n = 0
    while (n < nums.length) {
        if (nums[n] < x) {
            if (n > g) {
                // swap
                let temp = nums[n]
                nums[n] = nums[g]
                nums[g] = temp
            }
            g++
        }
        n++
    }
    return g
}

let p = partition(nums, x)

let result = p.toString() + '\n' + (n - p).toString()

fs.writeFileSync("output.txt", result)
