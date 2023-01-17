const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

const sequelize = require('../libs/sequelize')

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();

  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct;
  }

  async find() {
    const query = 'SELECT * FROM tasks'
    const [data] = await sequelize.query(query)
    return data
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found')
    } else {
      if (product.isBlocked) {
        throw boom.conflict('product is block')
      } else {
        return product
      }

    };

  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')

    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]

  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsServices
