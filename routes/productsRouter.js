const express = require('express')
const ProductsServices = require('../services/productServices')
//const UsersServices = require('../services/usersService')
//const CategoriesSercices = require('../services/categoriesService')

const router = express.Router();
//Instacia de las clases
const productService = new ProductsServices();
//const userService = new UsersServices();
//const categoriesServices = new CategoriesSercices()

router.get("/", async (req, res) => {
  const products = await productService.find();
  res.json(products)
})
router.get("/filter", (req, res) => {
  res.send('Yo soy un filter')
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const product = await productService.findOne(id)
  res.json(product)

})

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await productService.create(body)
  res.status(201).json({
    message: 'created',
    data: newProduct
  })
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await productService.update(id, body)

  res.json(product)
})

router.delete("/:id", async (req, res) => {

  const { id } = req.params;
  const product = await productService.delete(id)

  res.json(product)
})

module.exports = router;
