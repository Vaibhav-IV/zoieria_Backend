module.exports = app =>{
    const category = require('../controllers/category.controller')
    var router = require("express").Router()

    router.post("/",category.create)//category .upload

    router.get("/",category.findAll);

    router.get('/:id',category.findOne)

    router.put('/:id',category.update)

    router.delete('/:id',category.delete)

    app.use('/admin/category',router)
}