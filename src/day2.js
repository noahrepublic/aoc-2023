const fs = require('fs');

const input = fs.readFileSync('src/inputs/day2.txt',  {encoding: 'utf8', flag: 'r'});

const lines = input.split("\n")

let possibleGames = 0

const maxRed = 12
const maxBlue = 14
const maxGreen = 13

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    const info = line.split(": ")
    const game = info[0]

    const gameId = parseInt(game.split(" ")[1])

    let sets = info[1].trim().split("; ")

    let valid = true
   
    for (let j = 0; j < sets.length; j++) {

        if (!valid) break

        let cubes = {blue: 0, red: 0, green: 0}
        const set = sets[j]

        const colorDatas = set.split(", ")

        for (let z = 0; z < colorDatas.length; z++) {
            const colorData = colorDatas[z]

          
            const data = colorData.split(" ")
            const amount = parseInt(data[0])
            const color = data[1]
            
            cubes[color] += amount

            valid = cubes["blue"] <= maxBlue && cubes["red"] <= maxRed && cubes["green"] <= maxGreen
        }
    }

    if (valid) possibleGames += gameId
}
  
let p2Sum = 0

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    const info = line.split(": ")
    const game = info[0]

    const gameId = parseInt(game.split(" ")[1])

    let sets = info[1].trim().split("; ")

    let smalledCubes = {red: -1, green: -1, blue: -1}

    for (let j = 0; j < sets.length; j++) {
        const set = sets[j]

        const colorDatas = set.split(", ")

        for (let z = 0; z < colorDatas.length; z++) {
            const colorData = colorDatas[z]

          
            const data = colorData.split(" ")
            const amount = parseInt(data[0])
            const color = data[1]

            console.log(amount, smalledCubes[color])
            
            smalledCubes[color] = Math.max(amount, smalledCubes[color])
        }
    }

    p2Sum += (smalledCubes["red"] * smalledCubes["green"] * smalledCubes["blue"])
}

console.log("P2: " + p2Sum)