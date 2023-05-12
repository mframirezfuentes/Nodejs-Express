const boom = require('@hapi/boom')
const { config } = require('../config/config')

function checkApiKey(req, res, next) {
  const apiKey = req.headers[config.apiKey]
  if (apiKey === '123') {
    next()
  }
  else {
    next(boom.unauthorized())
  }

}

function checkAdminRole(req, res, next) {
  const { role } = req.user
  if (role === 'admin') {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const { role } = req.user

    if (roles.includes(role)) {
      next()
    } else {
      next(boom.unauthorized())
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
