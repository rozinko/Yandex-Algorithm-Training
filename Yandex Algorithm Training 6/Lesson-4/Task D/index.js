const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

class TreeNode {
    constructor(value, height) {
        this.value = value
        this.height = height
        this.left = undefined
        this.right = undefined
    }

    add(value) {
        if (value < this.value) {
            // to left
            if (this.left !== undefined) {
                return this.left.add(value)
            } else {
                this.left = new TreeNode(value, this.height + 1)
                return true
            }
        } else if (value > this.value) {
            // to right
            if (this.right !== undefined) {
                return this.right.add(value)
            } else {
                this.right = new TreeNode(value, this.height + 1)
                return true
            }
        } else {
            // already exists
            return false
        }
    }

    search(value) {
        if (value < this.value) {
            // to left
            return this.left !== undefined ? this.left.search(value) : false
        } else if (value > this.value) {
            // to right
            return this.right !== undefined ? this.right.search(value) : false
        } else {
            // yep, this!
            return true
        }
    }

    print() {
        let result = []
        if (this.left !== undefined) {
            result.push(...this.left.print())
        }
        result.push(".".repeat(this.height-1) + this.value.toString())
        if (this.right !== undefined) {
            result.push(...this.right.print())
        }
        return result
    }
}

class Tree {
    constructor() {
        this.head = undefined
    }

    // return: true - DONE, false - ALREADY
    add(value) {
        if (this.head === undefined) {
            this.head = new TreeNode(value, 1)
            return true
        } else {
            return this.head.add(value)
        }
    }

    // return: true - YES, false - NO
    search(value) {
        return this.head === undefined ? false : this.head.search(value)
    }

    // return: array
    print() {
        return this.head === undefined ? [] : this.head.print()
    }
}

let tree = new Tree()
let ans = []

let line = 0
while (lines[line] !== undefined && lines[line].trim().length > 0) {
    let [cmd, val] = (lines[line].trim() + " 0").split(' ')
    
    switch (cmd) {
        case 'ADD':
            ans.push(tree.add(Number(val)) ? "DONE" : "ALREADY")
            break
        case 'SEARCH':
            ans.push(tree.search(Number(val)) ? "YES" : "NO")
            break
        case 'PRINTTREE':
            ans.push(...tree.print())
            break
    }

    line++
}

fs.writeFileSync("output.txt", ans.join("\n"))