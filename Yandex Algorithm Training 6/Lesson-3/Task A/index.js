const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let s = lines[0].trim()

let checkBrackets = function(s) {
    let stack = []
    let pairs = {')': '(', ']': '[', '}': '{'}

    for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '(':
            case '[':
            case '{':
                stack.push(s[i])
                break
            case ')':
            case ']':
            case '}':
                if (stack.length === 0 || stack.pop() !== pairs[s[i]]) return false
                break
        }
    }

    return stack.length === 0
}

let ans = checkBrackets(s) ? "yes" : "no"

fs.writeFileSync("output.txt", ans.toString())
