// TODO
// 1. load nouns from data/nouns.txt
// 2. load ajectives from data/adjectives.txt
// 3. create a function that accepts two arguments
// 3.1 first argument (number of pairs) is a positive number between 1 and 10 as a first argument. if not specified default is 1
// 3.2 second argument (delimeter) is a string character from the string " _-". if not specified default to " " (space)
// 4 a function must return a random pair of noun and ajective separated by a delimeter character. number of pairs must be determined by a first argument (minimum 1)

const fs = require('fs')
const readline = require('readline')




async function readFile(path) {
  return new Promise((accept) => {
    const rl = readline.createInterface(fs.createReadStream(path))
    const data = []
    rl.on('line', (input) => data.push(input))
    
    rl.on('close', () => accept(data))
  })
}

async function main() {
  const nouns = await readFile('./data/nouns.txt')
  const adjectives = await readFile('./data/adjectives.txt')

  console.log('nouns', nouns.length)
  console.log('adjectives', adjectives.length)
}

main().catch(console.error)

// const nonus = readFile('./data/nouns.txt')
// const adjectives = readFile('./data/adjectives.txt')

function passpharase(pairs, d) {
  return ''
}

console.log(passpharase(1)) // one pair of noun and adjective separated by space
console.log(passpharase(2, '-')) // two pairs of noun and adjective separated by '-' hyphen 
// etc.