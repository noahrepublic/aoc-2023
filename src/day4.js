
const fs = require('fs');
const { parse } = require('path');
const input = fs.readFileSync('src/inputs/day4.txt',  {encoding: 'utf8', flag: 'r'});

const lines = input.split("\n")

let P1 = 0

let cardMatches = {}

for (let i = 0; i < lines.length; i++) {
    const cards = lines[i].split(": ")[1].split(" | ")

    let card1 = new Set()

    let worth = 0
    let matches = new Set()

    for (let j = 0; j < 2; j++) {
        const card = cards[j].split(" ")

        card.forEach((value) => {
            if (!parseInt(value.trim())) return

            const num = parseInt(value.trim())

            if (j == 0) {
                card1.add(num)
                return
            }

            if (card1.has(num)) {
                matches.add(num)

                if (worth == 0) {
                    worth += 1
                    return
                }

                worth *= 2
            }
        })

        cardMatches[i] = matches.size
    }

    P1 += worth
}

console.log("Part 1: " + P1)

let seen = []

for (let i = 0; i < lines.length; i++) {
    seen[i] = (seen[i] || 0) + 1

    for (let j = 1; j < cardMatches[i] + 1; j++) {
        const newCard = i + j

        if (cardMatches.length < newCard - 1) break

        if (!seen[newCard]) seen[newCard] = 0
        seen[newCard] += seen[i]
    }
}

console.log("Part 2: " + seen.reduce((a, b) => a + b))