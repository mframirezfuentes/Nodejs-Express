const { User, userSchema } = require('./userModel')
const {Product, productSchema} = require('./productModel')

function setupModel(sequelize) {
  User.init(userSchema, User.config(sequelize))
  Product.init(productSchema, Product.config(sequelize))
}

module.exports =setupModel
