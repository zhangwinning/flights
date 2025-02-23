const fs = require('fs');
const path = require('path');

const { root } = require('../../config/helpers.js')
const rootPath = root()

const handlers = require('../lib/handlers')

module.exports = (app) => {
  // API routes
  /**
   * 获取机场 map, 其中 key 是对应的机场，value 是机场对应的id
   */
  app.get('/api/airportList', (req, res, next) => {
    const { id } = req.body

    let data = fs.readFileSync(rootPath + 'server/data/airportsMap.json')

    data = JSON.parse(data)

    res.send({
      success: true,
      result: data
    })
  })

  app.post('/api/getPath', (req, res, next) => {
    const { id } = req.body

    const result = handlers(id)

    res.send({
      success: true,
      result: result
    })
  })
};
