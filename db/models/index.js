const { User, userSchema } = require('./userModel')
const { Product, productSchema } = require('./productModel')
const { Customer, customerSchema } = require('./customerModel')

function setupModel(sequelize) {
  User.init(userSchema, User.config(sequelize))
  Product.init(productSchema, Product.config(sequelize))
  Customer.init(customerSchema, Customer.config(sequelize))


  //iniciamos las asociaciones o relaciones
  Customer.associate(sequelize.models)
  User.associate(sequelize.models)

}

module.exports = setupModel;
