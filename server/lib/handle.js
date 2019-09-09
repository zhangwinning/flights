const edge = require('../models/edge')
const {
    dijkstr
} = require('../graph')

function run(id) {

    const { airportList, allAirportID, routesData, graph } = global.loadingGraph

    const node = graph.nodes.get(id)
    const result = dijkstr(node)

    const stacks = []
    allAirportID.forEach(airportId => {
        const stack = [airportId]
        let parent = result.get(airportId)
        while (parent && parent !== '*') {
            stack.push(parent)
            parent = result.get(parent)
        }
        if (parent === '*') {
            stacks.push(stack)
        }
    })


    stacks.forEach(stack => {
        stack = stack.reverse()
    })

    let db = new Set()
    stacks.forEach(stack => {
        for (let i = 0; i < stack.length - 1; i++) {
            const begin = stack[i]
            const end = stack[i + 1]
            db.add(new edge(
                airportList.get(begin).latitude,
                airportList.get(begin).longitude,
                airportList.get(end).latitude,
                airportList.get(end).longitude
            ))
        }
    })
    return db
}

module.exports = run