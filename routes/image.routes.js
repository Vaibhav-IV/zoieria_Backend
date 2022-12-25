module.exports = app =>{
    const image = require('../controllers/image.controller')


    app.post("/images/",image.imageCreater)//products.upload

    app.get("/images/all",image.findAllImages);

    app.get('/imageProduct/:id',image.findByProduct)
}
