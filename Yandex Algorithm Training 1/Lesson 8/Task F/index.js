const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let nums = lines[0].split(' ').map(i => Number(i))

class TreeNode {
    constructor(value, up, left, right) {
        this.value = value
        this.up = up
        this.left = left
        this.right = right
    }

    inOrder(func) {
        let resultLeft = this.left !== undefined ? this.left.inOrder(func) : []
        let resultThis = func(this)
        let resultRight = this.right !== undefined ? this.right.inOrder(func) : []
        return [...resultLeft, resultThis, ...resultRight]
    }
}

class Tree {
    constructor() {
        this.nodes = undefined
    }

    addNode(value) {
        if (this.nodes === undefined) {
            this.nodes = new TreeNode(value)
        } else {
            let node = this.nodes
            let flag = false
            while (!flag) {
                if (value < node.value) {
                    // to left
                    if (node.left !== undefined) {
                        node = node.left
                    } else {
                        // add new node to left
                        node.left = new TreeNode(value, node)
                        flag = true
                    }
                } else if (value > node.value) {
                    // to right
                    if (node.right !== undefined) {
                        node = node.right
                    } else {
                        // add new node to right
                        node.right = new TreeNode(value, node)
                        flag = true
                    }
                } else {
                    // equal
                    flag = true
                }
            }
        }
    }
}

let tree = new Tree()

let i = 0
while (nums[i] !== 0) {
    tree.addNode(nums[i])
    i++
}

let ans = tree.nodes.inOrder((node) => { return node.left !== undefined && node.right !== undefined ? node.value : 0 }).filter((val) => val !== 0)

fs.writeFileSync("output.txt", ans.join("\n").toString())