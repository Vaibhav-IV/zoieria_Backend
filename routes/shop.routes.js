const { cart } = require('../models');

module.exports = app => {
    const controller = require('../controllers/shop.controller')
    var router = require("express").Router()

    //for cart
    router.get('/cart/:id', controller.getCart);
    router.get('/cart/products/:id', controller.getCartItems);
    router.post('/cart/products/:id', controller.postCartItems);
    router.post('/cart/delete/products/:id', controller.deleteCartItems);

    //for order
    router.get('/order/:id', controller.getOrder);
    router.get('/order/products/:id', controller.getOrderItems);
    router.post('/order/products/:id', controller.postOrderItems);
    router.post('/order/delete/products/:id', controller.deleteOrderItems);


    app.use('/user', router)
}