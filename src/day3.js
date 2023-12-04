
const fs = require('fs');
const { off } = require('process');
const input = fs.readFileSync('src/inputs/day3.txt',  {encoding: 'utf8', flag: 'r'});

const split = input.split("\n")
const lineLength = split[0].trim().length


const linesCombined = input.split("\n").join("").trim()

const offsets = [ 
    -lineLength - 1, // up left
    -lineLength + 1, // up right
    -lineLength, // up

    1, // right
    -1, // left

    lineLength,  // down
    lineLength + 1, // down right
    lineLength - 1, // down left
    
]

let P1 = 0

let seen = new Set()

for (let i = 0; i < linesCombined.length; i++) {
    const character = linesCombined[i]

    if (character == ".") continue
    if (!isNaN(parseInt(character))) continue

    offsets.forEach((offset) => {
        const at = linesCombined[i + offset]

        if (!isNaN(parseInt(at))) {
            let startIndex, endIndex

            for (let j = i + offset; 0 <= j; j--) {
                if (isNaN(parseInt(linesCombined[j]))) break

                startIndex = j
            }

            let nextLineEnd 
            
            for (let j = 1; j < linesCombined.length; j++) {
                nextLineEnd = j * lineLength - 1

                if (i + offset < nextLineEnd) break
            }

            for (let j = i + offset; j < nextLineEnd; j++) {
                if (isNaN(parseInt(linesCombined[j]))) break

                endIndex = j
            }

            const id = `${startIndex}, ${endIndex}`

            if (seen.has(id)) return
            seen.add(id)

            //console.log(linesCombined.substring(start, end + 1))

            P1 += parseInt(linesCombined.substring(startIndex, endIndex + 1))
        }
    })
}

console.log(P1)