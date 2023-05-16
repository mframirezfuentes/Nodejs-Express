const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserService = require('./usersService')
const service = new UserService

const nodemailer = require('nodemailer')
const { config } = require('../config/config')

class AuthService {

  constructor() {

  }

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized(), false
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw boom.unauthorized(), false
    }
    delete user.dataValues.password
    return user;
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sing(payload, config.jwt_scret)
    return {
      user,
      token
    };

  }

  async sendMail(email) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized(), false
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.mail,
        pass: config.mail_password
      }
    })
    await transporter.sendMail({
      from: config.mail,
      to: `${user.email}`,
      subject: "Este es un nuevo correo",
      text: "Hola!!!!",
      html: "<b>Hola!</b>"
    });
    return {menssage:'mail sent'}
  }
}

module.exports = AuthService;
