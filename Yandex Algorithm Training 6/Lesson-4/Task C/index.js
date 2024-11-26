const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

class ListNode {
    constructor(name) {
        this.name = name
        this.parent = undefined
        this.list = []
        this.height = -1
    }

    addChild(node) {
        this.list.push(node)
    }

    setParent(node) {
        this.parent = node
    }

    setHeight(height) {
        this.height = height
        this.list.forEach(node => node.setHeight(height + 1))
    }
}

let dict = {}

for (let line = 1; line < n; line++) {
    let [child, parent] = lines[line].trim().split(' ')
    if (dict[parent] === undefined) { dict[parent] = new ListNode(parent) }
    if (dict[child] === undefined) { dict[child] = new ListNode(child) }
    dict[parent].addChild(dict[child])
    dict[child].setParent(dict[parent])
}

let names = Object.keys(dict).sort()

let head = dict[names[0]]
while (head.parent !== undefined) head = head.parent
head.setHeight(0)

let ans = []

let line = n
while (lines[line] !== undefined && lines[line].trim().split(' ').length === 2) {
    let [name1, name2] = lines[line].trim().split(' ')
    let node1 = dict[name1], node2 = dict[name2]

    while (node1.height > node2.height) node1 = node1.parent
    while (node2.height > node1.height) node2 = node2.parent

    while (node1.name !== node2.name) {
        node1 = node1.parent
        node2 = node2.parent
    }
    
    ans.push(node1.name)
    line++
}

fs.writeFileSync("output.txt", ans.join("\n"))