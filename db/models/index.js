const { User, userSchema } = require('./userModel')

function setupModel(sequelize) {
  User.init(userSchema, User.config(sequelize))
}

module.exports =setupModel
