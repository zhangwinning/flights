const fs = require('fs')

const { root } = require('../../config/helpers.js')
const airport = require('../models/airport')
function getAirports() {
    const allAirportID = []
    const tmpSegmentLine = []
    const airportList = new Map()
    const rootPath = root()
    let data = fs.readFileSync(rootPath + 'server/data/airports.dat')

    data = data.toString()
    const lines = data.split('\n')
    lines.forEach(line => {
        line = line.replace(/"/g, '')
        const elements = line.split(',')
        const port = new airport(
            elements[0],
            elements[1],
            elements[2],
            elements[3],
            elements[4],
            elements[5],
            elements[6],
            elements[7],
        )
        airportList.set(elements[0], port)
        allAirportID.push(elements[0])
    });
    return { airportList, allAirportID }
}

module.exports = getAirports