const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

let getResult = function(n, dinos, lastpos, blocks) {
    let res = 0

    let pos = lastpos + 1;
    let lastPosInLine = (Math.floor(pos / n) + 1) * n - 1
    while (pos <= lastPosInLine) {
        let i = Math.floor(pos / n), j = pos % n
        let bi = i
        let bj = j + 11
        let d1 = i - j + 32
        let d2 = i + j + 53
        if (blocks[bi]) {
            // go to next line
            pos = (i+1)*n-1
        } else if (!blocks[bj] && !blocks[d1] && !blocks[d2]) {
                // good position!
                if (dinos > 1) {
                    // go position next dino
                    let bibefore = blocks[bi]
                    let bjbefore = blocks[bj]
                    let d1before = blocks[d1]
                    let d2before = blocks[d2]
                    blocks[bi] = true
                    blocks[bj] = true
                    blocks[d1] = true
                    blocks[d2] = true
                    res += getResult(n, dinos-1, (i+1)*n-1, blocks)
                    blocks[bi] = bibefore
                    blocks[bj] = bjbefore
                    blocks[d1] = d1before
                    blocks[d2] = d2before
                } else {
                    // last dino, good!
                    res++
                }
            }
        pos++
    }

    return res
}

let results = getResult(n, n, -1, Array(80).fill(false))

fs.writeFileSync("output.txt", results.toString())
