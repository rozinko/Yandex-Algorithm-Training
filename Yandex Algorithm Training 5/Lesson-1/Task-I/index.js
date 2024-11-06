const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.toString().split('\n')

let holidaysCount = Number(lines[0].trim())
let year = Number(lines[1].trim())
let firstWeek = lines[holidaysCount + 2].trim()

let holidays = {}
for (let line = 2; line < 2 + holidaysCount; line++) {
    holidays[lines[line].trim()] = true
}

let monthsOfYear = {
    'January': 31,
    'February': year % 400 == 0 || (year % 4 == 0 && year % 100 !== 0) ? 29 : 28,
    'March': 31,
    'April': 30,
    'May': 31,
    'June': 30,
    'July': 31,
    'August': 31,
    'September': 30,
    'October': 31,
    'November': 30,
    'December': 31
}
let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
while (daysOfWeek[0] !== firstWeek) { daysOfWeek.push(daysOfWeek.shift()) }

let workDays = {"Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0, "Sunday": 0}

let j = 0
Object.keys(monthsOfYear).forEach(key => {
    for (let i = 1; i <= monthsOfYear[key]; i++) {
        if (holidays[i.toString() + " " + key] === undefined) workDays[daysOfWeek[j]]++
        j = (j+1) % 7
    }
})

let result = ["Monday", "Monday"]
Object.keys(workDays).forEach(key => {
    if (workDays[key] > workDays[result[0]]) result[0] = key
    if (workDays[key] < workDays[result[1]]) result[1] = key
})

fs.writeFileSync("output.txt", result.join(" ").toString())