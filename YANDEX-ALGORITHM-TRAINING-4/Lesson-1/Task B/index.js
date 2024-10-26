const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let nums = n > 0 ? lines[1].split(' ').map(i => Number(i)) : []

let partition = function(nums, from, till) {
    let e = from, g = from, n = from
    let x = nums[from + Math.floor(Math.random()*(till - from + 1))]

    while (n <= till) {
        if (nums[n] < x) {
            let temp = nums[n]
            nums[n] = nums[g]
            nums[g] = nums[e]
            nums[e] = temp
            e++
            g++
        } else if (nums[n] == x) {
            let temp = nums[n]
            nums[n] = nums[g]
            nums[g] = temp
            g++
        }
        n++
    }

    if (e > from + 1) {
        partition(nums, from, e - 1)
    }
    if (g < till) {
        partition(nums, g, till)
    }
}

partition(nums, 0, nums.length-1)

let result = nums.map(i => i.toString()).join(' ')

fs.writeFileSync("output.txt", result)
