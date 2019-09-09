const Node = require('./node')
const Edge = require('./edge')
const Graph = require('./graph')
function createGraph(matrix) {
    const graph = new Graph()
    for (let i = 0; i < matrix.length; i++) {
        const weight = matrix[i][0]
        const from = matrix[i][1]
        const to = matrix[i][2]
        if (!graph.nodes.has(from)) {
            graph.nodes.set(from, new Node(from))
        }
        if (!graph.nodes.has(to)) {
            graph.nodes.set(to, new Node(to))
        }
        const fromNode = graph.nodes.get(from)
        const toNode = graph.nodes.get(to)

        const edge = new Edge(weight, fromNode, toNode)
        fromNode.nexts.add(toNode)
        fromNode.outdegree++
        toNode.indegree++
        fromNode.edges.add(edge)
        graph.edges.add(edge)
    }
    return graph
}

module.exports = createGraph
// const matrix = [[200, 1, 2],[200, 2, 3],[50, 3, 1]]

// console.log('===>', createGraph(matrix))