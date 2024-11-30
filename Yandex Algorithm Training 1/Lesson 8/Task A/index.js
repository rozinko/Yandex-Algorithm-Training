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
            } else {
                this.left.addChild(value)
            }
        } else if (value > this.value) {
            if (this.right === undefined) {
                this.right = new TreeNode(value)
            } else {
                this.right.addChild(value)
            }
        }
    }

    getMaxHeight() {
        return 1 + Math.max(this.left ? this.left.getMaxHeight() : 0, this.right ? this.right.getMaxHeight() : 0)
    }
}

class Tree {
    constructor() {
        this.nodes = undefined
    }

    add(value) {
        if (this.nodes === undefined) {
            this.nodes = new TreeNode(value)
        } else {
            this.nodes.addChild(value)
        }
    }

    getMaxHeight() {
        return this.nodes ? this.nodes.getMaxHeight() : 0
    }
}

let tree = new Tree()

let i = 0
while (nums[i] !== 0) {
    tree.add(nums[i])
    i++
}

let ans = tree.getMaxHeight()
fs.writeFileSync("output.txt", ans.toString())