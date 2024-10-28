const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let n = Number(lines[0])

let data = []

data.push([...Array(n+2).fill(".")])

for (let i = 1; i <= n; i++) {
    data.push([".", ...lines[i].split(""), "."])
}

data.push([...Array(n+2).fill(".")])

// убираем повторяющиеся строки
for (let i = data.length - 1; i > 0; i--) {
    if (JSON.stringify(data[i]) === JSON.stringify(data[i-1])) {
        data.splice(i, 1)
    }
}

// убираем повторяющиеся столбцы
for (let j = data[0].length - 1; j > 0; j--) {
    let flag = true
    for (let i = 0; i < data.length; i++) {
        if (data[i][j-1] !== data[i][j]) flag = false
    }
    if (flag) {
        // удаляем столбец
        for (let i = 0; i < data.length; i++) {
            data[i].splice(j, 1)
        }
    }
}

// убираем точки по краям
data.shift()
data.pop()
for (let i = 0; i < data.length; i++) {
    data[i].shift()
    data[i].pop()
}

let presets = [
    {
        'ch': "I",
        'preset': [['#']]
    },
    {
        'ch': "O",
        'preset': [
            ['#', '#', '#'], 
            ['#', '.', '#'], 
            ['#', '#', '#']
        ]
    },
    {
        'ch': "C",
        'preset': [
            ['#', '#'], 
            ['#', '.'], 
            ['#', '#']
        ]
    },
    {
        'ch': "L",
        'preset': [
            ['#', '.'], 
            ['#', '#']
        ]
    },
    {
        'ch': "H",
        'preset': [
            ['#', '.', '#'], 
            ['#', '#', '#'], 
            ['#', '.', '#']
        ]
    },
    {
        'ch': "P",
        'preset': [
            ['#', '#', '#'], 
            ['#', '.', '#'],
            ['#', '#', '#'], 
            ['#', '.', '.']
        ]
    },
]

let result = "X"

presets.forEach( preset => {
    if (JSON.stringify(data) === JSON.stringify(preset.preset)) {
        result = preset.ch
    }
})

fs.writeFileSync("output.txt", result)