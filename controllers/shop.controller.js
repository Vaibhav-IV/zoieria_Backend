const db = require('../models')
const Product = db.products
const Op = db.Sequelize.Op
const Category = db.category
const Cart = db.cart
const CartItem = db.cartItem
const User = db.user;
const Order = db.order
const OrderItem = db.orderItem


let cartProducts = [];
let orderProducts = [];

let cartProductsQuantity = [];

exports.getCart = (req, res) => {
    const id = req.params.id;

    Cart.findOne({
        where: { userId: id }
    })
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find the cart with id= ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retreving Cart with id=" + id
            });
        });
}






exports.getCartItems = (req, res) => {
    const id = req.params.id;

    Cart.findOne({
        where: { userId: id }
    })
        .then(cart => {
            if (!cart) {
                return res.status(404).send({ message: "Cart Not found." });
            }
            CartItem.findAll({
                where: { cartId: cart.id },
                attributes: ['productId', 'quantity']
            })
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        //console.log(data[i].productId);
                        cartProducts.push(data[i].productId);
                        cartProductsQuantity.push(data[i].quantity);
                    }

                    console.log("59", cartProducts);
                    console.log("dahciuac",cartProductsQuantity);
                    //res.send(data);
                })
                .then(data => {
                    console.log("63", cartProducts);


                    Product.findAll({
                        where: {
                            id: cartProducts
                        },
                        attributes: ['id', 'title', 'description', 'cost', 'categoryId','imageTitle']
                        
                    })

                        .then(data => {
                            if (data) {
                                res.send({data,
                                     quantity: cartProductsQuantity})
                            } else {
                                res.status(404).send({
                                    message: `Cannot find the product with id= ${id}`
                                })
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error retreving Product with id=" + id
                            });
                        });



                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error receiving products from cart with id=" + id
                    });
                });
        })
    cartProducts.length = 0;
    cartProductsQuantity.length = 0
}



exports.postCartItems = (req, res) => {
    const id = req.params.id;
    Cart.findOne({
        where: { userId: id }
    })
        .then(cart => {
            if (!cart) {
                return res.status(404).send({ message: "Cart Not found." });
            }
            const item = {
                quantity: req.body.quantity,
                cartId: cart.id,
                productId: req.body.productId,
            };
            CartItem.create(item)
                .then(data => {
                    res.send(data);
                    console.log(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || `Error occured while creating the item for cart with id= ${id}`
                    });
                });
        })
}

exports.deleteCartItems = (req, res) => {
    const id = req.params.id;
    const prodId = req.body.productId;
    Cart.findOne({
        where: { userId: id }
    })
        .then(cart => {
            if (!cart) {
                return res.status(404).send({ message: "Cart Not found." });
            }
            CartItem.destroy({
                where: { cartId: cart.id, productId: prodId }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: `Product was deleted succesfully cart with id= ${id}`
                        })
                    } else {
                        res.send({
                            message: `Cannot delete product with cart id=${id}`
                        })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error deleting the product with cart" + id
                    })
                })
        })
}



exports.getOrder = (req, res) => {
    const id = req.params.id;

    Order.findOne({
        where: { userId: id }
    })
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find the order with id= ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retreving Order with id=" + id
            });
        });
}


exports.getOrderItems = (req, res) => {
    const id = req.params.id;

    Order.findOne({
        where: { userId: id }
    })
        .then(order => {
            if (!order) {
                return res.status(404).send({ message: "Order Not found." });
            }
            OrderItem.findAll({
                where: { orderId: order.id },
                attributes: ['productId']
            })
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        //console.log(data[i].productId);
                        orderProducts.push(data[i].productId);
                    }

                    console.log("208", orderProducts);
                    //res.send(data);
                })
                .then(data => {
                    console.log("212", orderProducts);


                    Product.findAll({
                        where: {
                            id: orderProducts
                        },
                        attributes: ['id', 'title', 'description', 'cost', 'categoryId']

                    })

                        .then(data => {
                            if (data) {
                                res.send(data)
                            } else {
                                res.status(404).send({
                                    message: `Cannot find the product with id= ${id}`
                                })
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error retreving Product with id=" + id
                            });
                        });



                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error receiving products from order with id=" + id
                    });
                });
        })
    orderProducts.length = 0;
}




exports.postOrderItems = (req, res) => {
    const id = req.params.id;
    Order.findOne({
        where: { userId: id }
    })
        .then(order => {
            if (!order) {
                return res.status(404).send({ message: "Order Not found." });
            }
            const item = {
                quantity: req.body.quantity,
                orderId: order.id,
                productId: req.body.productId,
            };
            OrderItem.create(item)
                .then(data => {
                    res.send(data);
                    console.log(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || `Error occured while creating the item for order with id= ${id}`
                    });
                });
        })
}

exports.deleteOrderItems = (req, res) => {
    const id = req.params.id;
    const prodId = req.body.productId;
    Order.findOne({
        where: { userId: id }
    })
        .then(order => {
            if (!order) {
                return res.status(404).send({ message: "Order Not found." });
            }
            OrderItem.destroy({
                where: { orderId: order.id, productId: prodId }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: `Product was deleted succesfully order with id= ${id}`
                        })
                    } else {
                        res.send({
                            message: `Cannot delete product with order id=${id} .maybe product is nt found`
                        })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error deleting the product with order " + id
                    })
                })
        })
}







// exports.postCartItems = (req, res) => {
//     const id = req.params.id;
//     const prodId = req.body.productId;
//     let fetchedCart;
//     let newQty = 1;
//     Cart.findOne({
//         where: { userId: id },
//         attributes:['userId']
//     })
//     .then(cart => {
//         fetchedCart = cart;
//             return cart.getProducts({
//                 where: {
//                     id: prodId
//                 }
//             });
//         })
//         .then(products => {
//             let product;
//             if (products.length > 0) {
//                 product = products[0];
//             }
//             if (product) {
//                 const oldQty = product.cartItem.quantity;
//                 newQty = oldQty + 1;
//                 return product;
//             } else {
//                 return Product.findByPk(prodId);
//             }
//         })
//         .then((product) => {
//             return fetchedCart.addProduct(product, {
//                 through: {
//                     quantity: newQty
//                 }
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Error occured while creating the product"
//             });
//         });
// }