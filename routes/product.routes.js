module.exports = app =>{
    const products = require('../controllers/product.controller')
    var router = require("express").Router()

    router.post("/",products.create)//products.upload

    router.get("/",products.findAll);

    router.get("/search/:id",products.findAllSearch);

    router.get('/:id',products.findOne)

    router.get('/cat/wedding',products.getWeddingCatProducts)

    router.put('/:id',products.update)

    router.delete('/:id',products.delete)

    router.delete('/',products.deleteAll)

    router.get('/productCategory/:id',products.findByCategory)

    router.get('/productCategory/related/:id',products.getRelatedProducts)

    router.get('/count/productCount',products.getCount)

    app.use('/admin/products',router)
}