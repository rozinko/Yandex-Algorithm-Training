const { count } = require('console');
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let [n, targetWidth] = lines[0].split(' ').map(i => Number(i))
let hs = lines[1].split(' ').map(i => Number(i))
let ws = lines[2].split(' ').map(i => Number(i))

let stack = []
for (let i = 0; i < n; i++) stack.push([ws[i], hs[i]])
stack.sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : b[0] - a[0])
for (let i = 0; i < n; i++) stack[i].push(i > 0 ? Math.abs(stack[i][1] - stack[i-1][1]) : 0)

let actualWidth = stack[0][0] // first
let stackHeights = []
let shift = 0, shiftHeights = 0, pos = 1

let ans = actualWidth >= targetWidth ? 0 : (stack.reduce((acc, cur) => acc < cur[2] ? cur[2] : acc, 0) + 10)

while (pos < n) {
    actualWidth += stack[pos][0]
    // delete lower heights
    while (stackHeights.length > 0 && stackHeights[stackHeights.length-1][1] <= stack[pos][2]) stackHeights.pop()
    shiftHeights = Math.min(shiftHeights, stackHeights.length)
    // add new height
    stackHeights.push([pos, stack[pos][2]])

    if (actualWidth >= targetWidth) {
        // check new ans
        ans = Math.min(ans, stackHeights[shiftHeights] !== undefined ? stackHeights[shiftHeights][1] : 0)

        // shift while actualWidth >= targetWidth
        while (actualWidth >= targetWidth) {
            actualWidth -= stack[shift][0]
            // check height stack for shift
            if (stackHeights.length > shiftHeights && stackHeights[shiftHeights][0] <= shift+1) shiftHeights++
            // shift main stack
            shift++
            if (actualWidth >= targetWidth) {
                // check new ans
                ans = Math.min(ans, stackHeights[shiftHeights] !== undefined ? stackHeights[shiftHeights][1] : 0)
            }
        }
    }
    pos++
    if (ans <= 0) pos = n
}

fs.writeFileSync("output.txt", ans.toString())