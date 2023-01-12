const { faker } = require('@faker-js/faker');

class ProductsServices {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl()
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct;
  }

  find() {
    return this.products
  }

  findOne(idProduct) {

    return this.products.find(item => item.id === idProduct);

  }

  update(idProducto, changes) {
    const index = this.products.findIndex(item => item.id === idProducto)
    if (index === -1) {
      throw new Error('product not found')

    }
    this.products[index] = changes;
    return this.products[index]

  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === idProducto)
    if (index === -1) {
      throw new Error('product not found')

    }
    this.products.splice(index, 1) = changes;
    return { id };
  }
}

module.exports = ProductsServices
