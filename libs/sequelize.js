const { Sequelize } = require('sequelize')

const { config } = require('./../config/config')
const setupModel = require('../db/models')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModel(sequelize)
//hace una sincronización
sequelize.sync();

module.exports= sequelize;