const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let nums = lines[0].split(' ').map(i => Number(i))

class TreeNode {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    addChild(value) {
        if (value < this.value) {
            if (this.left === undefined) {
                this.left = new TreeNode(value)
                return 1
            } else {
                let result = this.left.addChild(value)
                return result !== false ? 1 + result : false
            }
        } else if (value > this.value) {
            if (this.right === undefined) {
                this.right = new TreeNode(value)
                return 1
            } else {
                let result = this.right.addChild(value)
                return result !== false ? 1 + result : false
            }
        }
        return false
    }

    getMaxHeight() {
        return 1 + Math.max(this.left ? this.left.getMaxHeight() : 0, this.right ? this.right.getMaxHeight() : 0)
    }
}

class Tree {
    constructor() {
        this.nodes = undefined
        this.lastAddedHeight = undefined
    }

    add(value) {
        if (this.nodes === undefined) {
            this.nodes = new TreeNode(value)
            this.lastAddedHeight = 1
            return true
        } else {
            let result = this.nodes.addChild(value)
            if (result !== false) {
                this.lastAddedHeight = 1 + result
                return true
            }
            return false
        }
        return false
    }

    getMaxHeight() {
        return this.nodes ? this.nodes.getMaxHeight() : 0
    }

    getLastAddedHeight() {
        return this.lastAddedHeight
    }
}

let tree = new Tree()
let ans = []

let i = 0
while (nums[i] !== 0) {
    let added = tree.add(nums[i])
    if (added !== false) {
        ans.push(tree.getLastAddedHeight())
    }
    i++
}

fs.writeFileSync("output.txt", ans.join(' ').toString())