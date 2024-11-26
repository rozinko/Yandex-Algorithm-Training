const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0].trim())

class ListNode {
    constructor(name) {
        this.name = name
        this.parent = undefined
        this.list = []
        this.tin = -1
        this.tout = -1
    }

    addChild(node) {
        this.list.push(node)
    }

    setParent(node) {
        this.parent = node
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

let node = head
let t = 0
while (node !== undefined) {
    if (node.tin === -1) {
        // новый элемент, заходим
        node.tin = t
        t++
    } else {
        // это не новый элемент и мы смотрим детей которых не посещали
        let i = 0
        while (i < node.list.length && node.list[i].tin >= 0) i++

        if (i < node.list.length) {
            // найден непосещенный ребенок
            node = node.list[i]
        } else {
            // ничего не нашли, выходим из элемента помечая время выхода
            node.tout = t
            node = node.parent
        }
    }
}

let ans = names.map(name => [name, dict[name].tout - dict[name].tin - 1])

fs.writeFileSync("output.txt", ans.map(a => a.map(i => i.toString()).join(' ')).join("\n"))