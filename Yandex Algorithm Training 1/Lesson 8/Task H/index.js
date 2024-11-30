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

    getHeightAVL() {
        let hleft = this.left !== undefined ? this.left.getHeightAVL() : 0
        let hright = this.right !== undefined ? this.right.getHeightAVL() : 0
        return hleft >= 0 && hright >= 0 && Math.abs(hleft - hright) <= 1 ? Math.max(hleft, hright) + 1 : -1
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

    isAVL() {
        return this.nodes.getHeightAVL() >= 0
    }
}

let tree = new Tree()

let i = 0
while (nums[i] !== 0) {
    tree.addNode(nums[i])
    i++
}

let ans = tree.isAVL() ? "YES" : "NO"

fs.writeFileSync("output.txt", ans)