const loadingAirports = require('./loadingAirports')
const loadingRoutes = require('./loadingRoutes')

const { getDistance } = require('geolib');
const edge = require('../models/edge')

const {
    createGraph,
} = require('../graph')

function loadingGraph() {

    let { airportList, allAirportID } = loadingAirports()

    let routesData = loadingRoutes()

    const matrix = []
    for (let i = 0; i < routesData.length; i++) {
        const route = routesData[i]
        const sourceAirportID = route.sourceAirportID
        const destinationAirportID = route.destinationAirportID
        // 根据经纬度计算两点之间的距离
        const distance = getDistance(
            { latitude: airportList.get(sourceAirportID)['latitude'], longitude: airportList.get(sourceAirportID)['longitude'] },
            { latitude: airportList.get(destinationAirportID)['latitude'], longitude: airportList.get(destinationAirportID)['longitude'] },
        )
        const item = [distance, route.sourceAirportID, route.destinationAirportID]
        matrix.push(item)
    }
    const graph = createGraph(matrix)
    return { airportList, allAirportID, routesData, graph }
}

// console.log(loadingGraph())
module.exports = loadingGraph