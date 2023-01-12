

class UsersServices {
  constructor() {
    this.users = [];

  }
  create() {

  }
  find() {
    return this.users;

  }

  findOne(idUser) {
    return this.users.find(item => item.id === idUser)

  }

  update() {

  }

  delete() {

  }

}

module.exports = UsersServices;
