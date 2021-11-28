// const crypto = require('crypto')

const buf = Buffer.from('example1')
let token = ''

for (const [i, n] of buf.entries()) {
  token += '' + n % 10
  console.log(`${i}\t${n}`)
}


console.log(''.padStart(12, '-'))
console.log(token)
