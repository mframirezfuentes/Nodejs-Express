const express = require('express')
const ProductsServices = require('../services/productServices')
//const UsersServices = require('../services/usersService')
//const CategoriesSercices = require('../services/categoriesService')

const router = express.Router();
//Instacia de las clases
const productService = new ProductsServices();
//const userService = new UsersServices();
//const categoriesServices = new CategoriesSercices()

router.get("/", (req, res) => {
  const products = productService.find();
  res.json(products)
})
router.get("/filter", (req, res) => {
  res.send('Yo soy un filter')
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  const product = productService.findOne(id)
  res.json(product)

})

router.post("/", (req, res) => {
  const body = req.body;
  const newProduct = productService.create(body)
  res.status(201).json({
    message: 'created',
    data: newProduct
  })
})

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = productService.update(id, body)

  res.json(product)
})

router.delete("/:id", (req, res) => {

  const { id } = req.params;
  const product = productService.delete(id)

  res.json(product)
})

module.exports = router;
