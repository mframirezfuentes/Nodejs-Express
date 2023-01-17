
const express = require('express');

const UserService = require('./../services/usersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schema/usersSchema');

const router = express.Router();
const service = new UserService();


router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router
