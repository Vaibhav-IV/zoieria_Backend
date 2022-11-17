module.exports = app =>{
    const products = require('../controllers/product.controller')
    var router = require("express").Router()

    router.post("/",products.create)//products.upload

    router.get("/",products.findAll);

    router.get('/:id',products.findOne)

    router.put('/:id',products.update)

    router.delete('/:id',products.delete)

    router.delete('/',products.deleteAll)

    router.get('/productCategory/:id',products.findByCategory)

    app.use('/admin/products',router)
}