const fs = require('fs')

const route = require('../models/route')

const { root } = require('../../config/helpers.js')

function getRoutes() {
    const routesList = []
    const rootPath = root()
    let data = fs.readFileSync(rootPath + 'server/data/routes.dat')
    data = data.toString()

    const lines = data.split('\r\n')
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i]
        line = line.replace(/"/g, '')
        const elements = line.split(',')
        if (elements[3] === "\\N" || elements[5] === "\\N") {
            continue
        }
        const item = new route(
            elements[2],
            elements[3],
            elements[4],
            elements[5],
        )
        routesList.push(item)
    }
    return routesList
}

module.exports = getRoutes