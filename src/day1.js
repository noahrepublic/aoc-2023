const { CommandInteractionOptionResolver } = require('discord.js');
const fs = require('fs');


const input = fs.readFileSync('src/inputs/day1.txt',  {encoding: 'utf8', flag: 'r'});

let p1 = 0;

let lines = input.split('\n');

for (let i = 0; i < lines.length; i++) {
    let first, last
    const line = lines[i]

    for (let j = 0; j < line.length; j++) {
        let digit = parseInt(line[j])
        
        if (isNaN(digit)) {
            continue   
        }
     
        first = digit
        last = first
        break   
    }

    for (let j = line.length; j > 0; j--) {
        let digit = parseInt(line[j])
        
        if (isNaN(digit)) {
            continue   
        }
     
        last = digit
        break   
    }

    p1 += parseInt(first.toString() + last.toString())
}

const lookingFor = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
    1, 2, 3, 4, 5, 6, 7, 8, 9 
]

let p2 = 0

for (let i = 0; i < lines.length; i++) {

    const line = lines[i]

    let first, last
    let firstIndex = Number.MAX_VALUE
    let lastIndex = -1

    lookingFor.forEach((value, key) => {
        const low = line.indexOf(value)
        const high = line.lastIndexOf(value)

        let digit = key

        if (!isNaN(parseInt(value))) {
            digit = parseInt(value) - 1
        }
   
        if (digit < 9) {
            digit += 9
        } 

        let currentDigit = lookingFor[digit]
    
        if (low != -1 && firstIndex > low) {
            first = currentDigit
            firstIndex = low
        }

        if (high != -1 && lastIndex < high) {
            last = currentDigit
            lastIndex = high
        }
    })

    p2 += parseInt(first.toString() + last.toString())
 
}

console.log("P1 Answer: " + p1)
console.log("P2 Answer: " + p2)
