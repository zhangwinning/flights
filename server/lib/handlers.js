const Edge = require('../models/edge')
const {
    dijkstr
} = require('../graph')

const loadingGraph = require('./loadingGraph')
function handlers(id) {

    const result = {
        edgeList: [],
        nodeList: [],
    }
    const { airportList, allAirportID, routesData, graph } = global.loadingGraph

    // const { airportList, allAirportID, routesData, graph } = loadingGraph()

    const node = graph.nodes.get(id)

    if (!node) {
        return result
    }

    const { parentMap, distanceMap } = dijkstr(node)

    const formatDistanceMap = new Map()
    for (let [node, distance] of distanceMap) {
        formatDistanceMap.set(node.value, distance)
    }

    if (!parentMap || !distanceMap) {
        return result
    }

    let paths = []
    allAirportID.forEach(airportId => {
        const stack = [airportId]
        let parent = parentMap.get(airportId)
        while (parent && parent !== '*') {
            stack.push(parent)
            parent = parentMap.get(parent)
        }
        if (parent === '*') {
            paths.push(stack)
        }
    })

    paths.forEach(stack => {
        stack = stack.reverse()
    })

    const tmpSets = new Set() //临时变量，记录某些边已经放到边集合中
    paths.forEach(path => {

        // 1、获取路径的经纬度
        for (let i = 0; i < path.length - 1; i++) {
            const begin = path[i]
            const end = path[i + 1]
            const join = begin + '-' + end
            if (!tmpSets.has(join)) {
                tmpSets.add(join)
                result.edgeList.push(new Edge(
                    airportList.get(begin).latitude,
                    airportList.get(begin).longitude,
                    airportList.get(end).latitude,
                    airportList.get(end).longitude
                ))
            }
        }

        const attachNamepath = { path: [], distance: 0 }
        // 2、获取路径中点的位置对应的名称和最短距离
        for (let k = 0; k < path.length; k++) {
            const id = path[k]
            const name = airportList.get(id).name
            attachNamepath['path'].push(name)
        }
        attachNamepath.distance = formatDistanceMap.get(path[path.length - 1])
        result.nodeList.push(attachNamepath)
    })

    return result
}

// let a = run('6493')
// console.log('===>', JSON.stringify(a, null, 2))
module.exports = handlers