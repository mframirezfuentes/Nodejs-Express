const { faker } = require('@faker-js/faker');
const {Op} = require('sequelize')
const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')


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
    const newProduct = await models.Product.create(data)
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id)
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
