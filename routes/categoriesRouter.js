const express = require('express')

const router = express.Router()

router.get("/:category_id/products/:product_id", (req, res) => {
  const { category_id, product_id } = req.params;
  res.json({

    category_id,
    product_id,
    name: 'producto 2',
    price: 500
  })
})


module.exports = router
