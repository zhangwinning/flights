/**
 * 获取最短路径
 * @param {*} head 
 */
function dijkstra(head) {
    const distanceMap = new Map()   // 存储节点的距离
    const parentMap = new Map()     // 记录路径的 parent 

    console.log('===>', head)
    distanceMap.set(head, 0)

    parentMap.set(head.value, '*')
    const paths = []
    const selectNodes = new Set()   // 已经组成最小值的节点

    let minNode = getMinDistanceAndUnselectedNode(distanceMap, selectNodes)

    while (minNode) {
        const distance = distanceMap.get(minNode)
        for (let edge of minNode.edges) {
            const toNode = edge.to

            if (!distanceMap.has(toNode)) {
                distanceMap.set(toNode, distance + edge.weight)
                parentMap.set(toNode.value, minNode.value)
            }
            // 新加入节点后的路径是否比 原来的路径长，如果较短，则把该路径的父亲节点设置为 这个 minNode
            if ((distance + edge.weight) < distanceMap.get(toNode)) {
                parentMap.set(toNode.value, minNode.value)
            }
            // 如果存在，看下是否需要更新最小值路径
            distanceMap.set(toNode, Math.min(distanceMap.get(toNode), distance + edge.weight))
        }
        selectNodes.add(minNode)
        minNode = getMinDistanceAndUnselectedNode(distanceMap, selectNodes)
    }
    return parentMap
}

function getMinDistanceAndUnselectedNode(distanceMap, touchedNodes) {
    let minNode = null
    let minDistance = Number.MAX_SAFE_INTEGER

    for (let [node, distance] of distanceMap) {
        if (!touchedNodes.has(node) && distance < minDistance) {
            minNode = node
            minDistance = distance
        }
    }
    return minNode
}

module.exports = dijkstra