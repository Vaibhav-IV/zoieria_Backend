const db = require('../models')
const Product = db.products
const Op = db.Sequelize.Op


exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Product cannot be empty"
        });
        return
    }

    const product = {
        title: req.body.title,
        description: req.body.description,
        cost: req.body.cost
    };

    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating the product"
            });
        });
}


exports.findAll = (req, res) => {
    const title = req.body.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Product.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occured while retriving the products"
            });
        });
}


exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
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
}


exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated succesfully"
                })
            } else {
                res.send({
                    message: `Cannot update product with id=${id} .maybe product is nt found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updatingf the product" + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted succesfully"
                })
            } else {
                res.send({
                    message: `Cannot delete product with id=${id} .maybe product is nt found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting the product" + id
            })
        })
}

exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} products were deleted succesfully` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occured while deleting all the products"
            })
        })
}


