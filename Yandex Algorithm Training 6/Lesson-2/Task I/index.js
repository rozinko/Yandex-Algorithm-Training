const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])
let a = lines[1].split(' ').map(i => Number(i))
let b = lines[2].split(' ').map(i => Number(i))
let p = lines[3].split(' ').map(i => Number(i))

let arrA = Array(n), arrB = Array(n), done = Array(n).fill(false)

for (let i = 0; i < n; i++) {
    arrA[i] = [a[i], b[i], i]
    arrB[i] = [b[i], a[i], i]
}

let compare = function(a, b) {
    // сортировка по 1-му полю (9 -> 1), иначе по 2-му полю (9 -> 1), иначе по 3-му (1 -> 9)
    return a[0] !== b[0] ? b[0] - a[0] : (a[1] !== b[1] ? b[1] - a[1] : a[2] - b[2])
}

arrA.sort(compare)
arrB.sort(compare)

let pA = 0, pB = 0
let ans = []

for (let i = 0; i < n; i++) {
    if (p[i] == 0) {
        // берем интересные алгоритмы из arrA проверяя что он не изучен
        while (done[arrA[pA][2]]) pA++
        ans.push(arrA[pA][2])
        done[arrA[pA][2]] = true
    } else {
        // берем полезные алгоритмы из arrB проверяя что он не изучен
        while (done[arrB[pB][2]]) pB++
        ans.push(arrB[pB][2])
        done[arrB[pB][2]] = true
    }
}

// меняем индексы алгоритмов на порядковые номера
ans = ans.map(i => i + 1)

fs.writeFileSync("output.txt", ans.join(' ').toString())
