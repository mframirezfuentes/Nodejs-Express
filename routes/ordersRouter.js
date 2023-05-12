const express = require('express');
const passport = require('passport')
const OrderService = require('../services/orderService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schema/orderSchema');

const router = express.Router();
//Instacia de las clases
const service = new OrderService();


router.get("/:id",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await service.findOne(id)
      res.json(order)
    } catch (error) {
      next(error)
    }
  });

router.post("/",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body)
    res.status(201).json({
      message: 'created',
      data: newOrder
    })
  });

router.post("/add-item",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newItem = await service.addItem(body)
    res.status(201).json({
      message: 'created',
      data: newItem
    })
  });


module.exports = router;
