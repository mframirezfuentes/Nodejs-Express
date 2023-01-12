class CategoriesService {
  constructor() {
    this.categories = []
  }
  create() {

  }
  find() {
  return  this.categories

  }
  findOne(idCtegory) {
  return  this.categories.find(item=>item.id==idCtegory)

  }
  update() {

  }
  delete() {

  }

}

module.exports = CategoriesService;
