const loadingAirports = require('./loadingAirports')
const loadingRoutes = require('./loadingRoutes')

const edge = require('../models/edge')
const {
    createGraph,
    dijkstr
} = require('../graph')

function loadingGraph() {
    
    let { airportList, allAirportID } = loadingAirports()

    let routesData = loadingRoutes()

    const matrix = []
    for (let i = 0; i < routesData.length; i++) {
        const route = routesData[i]
        const item = [1, route.sourceAirportID, route.destinationAirportID]
        matrix.push(item)
    }
    const graph = createGraph(matrix)

    return { airportList, allAirportID, routesData, graph}
}

module.exports = loadingGraph