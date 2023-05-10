const boom = require('@hapi/boom')
const {config} = require('../config/config')

function checkApiKey(req, res, next) {
  const apiKey = req.headers[config.apiKey]
  if (apiKey === '123') {
    next()
  }
  else {
    next(boom.unauthorized())
  }

}
module.exports = { checkApiKey }
