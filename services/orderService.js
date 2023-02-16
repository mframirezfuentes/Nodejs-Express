const boom = require('@hapi/boom')

class OrderService {

  constructor()

  async create(data) {
    return data
  }

  async find(){
    return []
  }

  async findOne(id){

    return {id}
  }

  async update(id, change){
    return {id, change}
  }

  async delete(id){
    return {id}
  }

}
