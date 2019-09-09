class node {
    constructor(value, indegree, outdegree, nexts, edges) {
        this.value = value
        this.indegree = 0   // 默认入度是 0
        this.outdegree = 0  // 默认出度是 0
        this.nexts = new Set()  // 下一级的节点
        this.edges = new Set()   // 边(从次节点出去的边)
    }
}

module.exports = node

