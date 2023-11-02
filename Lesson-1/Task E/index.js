const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let nums = []
for (i = 1; i <= n; i++) nums.push(lines[i])

let output = 'Initial array:\n' + nums.join(', ')

let buckets = [nums, [], [], [], [], [], [], [], [], []]
let phase = 1, phases = buckets[0][0].length

while (phase <= phases) {
    let newBuckets = [[], [], [], [], [], [], [], [], [], []]
    buckets.flatMap(s => s).forEach(s => newBuckets[Number(s[phases-phase])].push(s))
    buckets = newBuckets

    output += '\n**********\nPhase ' + phase.toString()
    buckets.forEach((arr, ind) => output += '\nBucket ' + ind.toString() + ': ' + (arr.length ? arr.join(', ') : 'empty'))

    phase++
}

nums = []
buckets.flatMap(s => s).forEach(s => nums.push(s))

output += '\n**********\nSorted array:\n' + nums.join(', ')

fs.writeFileSync("output.txt", output)
