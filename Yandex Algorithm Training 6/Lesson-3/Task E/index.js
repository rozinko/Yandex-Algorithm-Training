const fs = require('fs');
const { buffer } = require('stream/consumers');
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let checkExpression = function(s) {
    let result = ""

    let isPrevSpace = false
    let openedBracketCount= 0
    let typeBefore = "" // number, operation, openBracket, closeBracket

    // + number after (number with isPrevSpace) and closeBracket return FALSE
    // + operation at the start and after openBracket and after operation return FALSE
    // + operation at the end of line return FALSE
    // + but "-" at the start of line and after openBracket change to "0-"
    // + bracket counting and must be >= 0 and 0 at the end of line
    // openBracket after closeBracket return FALSE

    for (let i = 0; i < s.length; i++) {
        if (s[i] === " " && result.length > 0) {
            // space
            isPrevSpace = true
        } else if (!Number.isNaN(parseInt(s[i]))) {
            // number
            if ((typeBefore === "number" && isPrevSpace) || (typeBefore === "closeBracket")) {
                // console.log("typeBefore = ", typeBefore, " / isPrevSpace = ", isPrevSpace, " / now = ", s[i], " / i = ", i, " / !isNaN(s[i]) = ", !Number.isNaN(parseInt(s[i])))
                return false
            }
            isPrevSpace = false
            result += s[i]
            typeBefore = "number"
        } else if (s[i] === "+" || s[i] === "-" || s[i] === "*") {
            // operation
            if (s[i] == "-" && (result.length === 0 || typeBefore === "openBracket") && s[i+1] !== undefined && !Number.isNaN(parseInt(s[i+1]))) {
                isPrevSpace = false
                result += "0" + s[i]
            } else {
                if (result.length === 0 || typeBefore === "openBracket" || typeBefore === "operation") return false
                if (i === s.length-1) return false
                isPrevSpace = false
                result += s[i]
                typeBefore = "operation"
            }
        } else if (s[i] === "(") {
            // openBracket
            if (typeBefore === "closeBracket") return false
            isPrevSpace = false
            result += s[i]
            typeBefore = "openBracket"
            openedBracketCount++
        } else if (s[i] === ")") {
            // closeBracket
            isPrevSpace = false
            result += s[i]
            typeBefore = "closeBracket"
            if (openedBracketCount <= 0) return false
            openedBracketCount--
        } else {
            return false
        }
    }

    if (openedBracketCount !== 0) return false

    return result
}

let getPostfix = function(infix) {
    let stack = [], back = [], numbuf = ""

    let priority = {"(": 0, "+": 1, "-": 1, "*": 2}

    for (let i = 0; i < infix.length; i++) {
        if (!isNaN(infix[i])) {
            // Number
            numbuf += infix[i]
        } else {
            if (numbuf !== "") {
                stack.push(Number(numbuf))
                numbuf = ""
            }
            if (infix[i] === "+" || infix[i] === "-" || infix[i] === "*") {
                while (back.length > 0 && priority[back[back.length-1]] >= priority[infix[i]]) stack.push(back.pop())
                back.push(infix[i])
            } else if (infix[i] === "(") {
                back.push(infix[i])
            } else if (infix[i] === ")") {
                while (back.length > 0 && back[back.length-1] !== "(") stack.push(back.pop())
                back.pop()
            }
        }
        // console.log("STACK: ", stack.join(" "), "BACK: ", back.join(" "))
    }

    if (numbuf !== "") stack.push(Number(numbuf))

    // console.log("STACK: ", stack.join(" "), "BACK: ", back.join(" "))

    while (back.length > 0) stack.push(back.pop())

    // console.log("STACK: ", stack.join(" "), "BACK: ", back.join(" "))

    return stack.join(' ')
}

let solvePostfix = function(postfix) {
    let stack = [], a, b

    let postfix_input = postfix.split(' ')

    for (let i = 0; i < postfix_input.length; i++) {
        switch (postfix_input[i]) {
            case '+':
                // +
                if (stack.length < 2) return false
                b = stack.pop()
                a = stack.pop()
                stack.push(a + b)
                break;
            case '-':
                // -
                if (stack.length < 2) return false
                b = stack.pop()
                a = stack.pop()
                stack.push(a - b)
                break;
            case '*':
                // *
                if (stack.length < 2) return false
                b = stack.pop()
                a = stack.pop()
                stack.push(a * b)
                break;
            default:
                // Numbers
                stack.push(Number(postfix_input[i]))
        }
    }

    if (stack.length !== 1) return false

    return stack[0]
}

let getAns = function(input) {
    let checked = checkExpression(input)
    if (checked === false) return "WRONG"

    let postfix = getPostfix(checked)
    if (postfix === false) return "WRONG"

    let ans = solvePostfix(postfix)
    if (ans === false) return "WRONG"

    return ans
}

let ans = getAns(lines[0].trim())

fs.writeFileSync("output.txt", ans.toString())