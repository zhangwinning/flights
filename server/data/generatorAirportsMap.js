const fs = require('fs')

const { root } = require('../../config/helpers.js')
const rootPath = root()

function run() {

    const result = []
    let data = fs.readFileSync(rootPath + 'server/data/airports.dat')

    // console.log('==>', data)
    data = data.toString()
    const lines = data.split('\n')
    lines.forEach(line => {
        line = line.replace(/"/g, '')
        const elements = line.split(',')
        const name = elements[1]
        const item = {
            name : elements[1],
            id : elements[0]
        }
        result.push(item)
    });
    console.log('===>', result)
    // setTimeout(() => {
    fs.writeFileSync('./airportsMap.json', JSON.stringify(result, null, 2))
    // }, 1);
}

run()