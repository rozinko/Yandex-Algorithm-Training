const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const lines = fileContent.toString().split('\n')

let [n, m, k] = lines[0].trim().split(' ').map(i => Number(i))

// заполняем dict
let dict = {}
for (let i = 1; i <= n; i++) {
    dict[i] = {list: [], flag: false}
}

for (let line = 1; line <= m; line++) {
    let [a, b] = lines[line].trim().split(' ').map(i => Number(i))
    dict[a].list.push(b)
    dict[b].list.push(a)
}

let groups = [], group_mnoj_stack = [], two = 0, more = 0, one = 0, hasInvalid = false

let fact = function(n) {
    let res = 1n
    for (let i = 2; i <= n; i++) res *= BigInt(i)
    return res
}

let getType = function(i) {
    let more = 0, one = 0
    dict[i].list.forEach(j => {
        if (dict[j].list.length == 1) { one++ } else { more++ }
    })
    let mnoj = fact(one)
    let endCount = more >= 2 ? 0 : (more === 1 && one > 0 ? 1 : Math.min(one, 2))
    let isInvalid = more > 2
    return {'i': i, 'one': one, 'more': more, 'mnoj': mnoj, 'endCount': endCount, 'isInvalid': isInvalid}
}

let collectTypes = function(type, collection) {
    if (collection === undefined) {
        return {
            'count': 1,
            'bigNodes': type.more >= 2 || (type.more >= 1 && type.one >= 1) || type.one >= 2 ? 1 : 0, 
            'mnoj': type.mnoj, 
            'groupMnoj': 1,
            'endCount': type.endCount, 
            'isInvalid': type.isInvalid
        }
    }
    collection.count++
    collection.bigNodes += type.more >= 2 || (type.more >= 1 && type.one >= 1) || type.one >= 2 ? 1 : 0
    collection.mnoj *= type.mnoj
    if (collection.count === 1) {
        collection.groupMnoj = 1n
    } else if (collection.count === 2) {
        collection.groupMnoj = 2n
    } else if (collection.count > 2 && collection.bigNodes === 1) {
        collection.groupMnoj = 2n
    } else {
        collection.groupMnoj = 4n
    }

    collection.endCount += type.endCount
    collection.isInvalid = collection.isInvalid || type.isInvalid
    return collection
}

// считаем группы
for (let i = 1; i <= n; i++) {
    if (!dict[i].flag) {
        dict[i].flag = true
        let count = 1
        let stack = [ ...dict[i].list ]
        
        // типы дятлов внутри группы
        // кол-во_длинных_связей, количество_одиночных_хвостов
        let typeI = getType(i)
        let typeCollection = collectTypes(typeI)
        // console.log('type_i', typeI)
        // console.log(typeCollection)

        while (stack.length > 0) {
            let j = stack.pop()
            if (!dict[j].flag) {
                count += 1
                dict[j].flag = true

                let typeJ = getType(j)
                typeCollection = collectTypes(typeJ, typeCollection)
                // console.log('type_j', typeJ)
                // console.log(typeCollection)

                dict[j].list.forEach(sub => {
                    if (!dict[sub].flag) {
                        stack.push(sub)
                    }
                })
            }
        }

        if (count >= 2) {
            group_mnoj_stack.push(typeCollection.mnoj * typeCollection.groupMnoj)
            // console.log('TYPE COLLECTION: ', typeCollection)
            if (typeCollection.endCount !== 2 || typeCollection.isInvalid) {
                hasInvalid = true
            }
        }

        groups.push(count)

        if (count === 1) {
            one++
        } else if (count === 2) {
            two++
        } else {
            more++
        }

    }
}

// console.log('dict: ', dict)
// console.log('groups: ', groups)
// console.log('group_mnoj_stack: ', group_mnoj_stack)
// console.log('one: ', one, 'two: ', two, ' / more: ', more, ' / hasInvalid: ', hasInvalid)

let ans = hasInvalid ? 0n : 1n

// варианты групповые
// * (4 ** more) * (2 ** two)
// ans *= (4n ** BigInt(more)) * (2n ** BigInt(two))
group_mnoj_stack.forEach(mnoj => {
    ans *= BigInt(mnoj)
})

// комбинации групповых вариантов
// * (more + two)!
for (let i = 2; i <= more + two; i++) {
    ans *= BigInt(i)
}

// добавляем вариации с одиночными дятлами
let places_for_one = n - one + 2 // количество дятлов без одиночек но с добавлением +2 мест для них
for (let i = places_for_one; i <= places_for_one + one - 1; i++) {
    ans *= BigInt(i)
}

// берем все по модулю
ans %= BigInt(k)

ans = Number(ans)

// console.log(ans)

fs.writeFileSync("output.txt", ans.toString())