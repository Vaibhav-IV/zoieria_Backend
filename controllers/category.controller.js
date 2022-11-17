const db = require('../models');
const Category = db.category
const Op = db.Sequelize.Op
const Product = db.products

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Category cannot be empty"
        });
        return
    }

    const category = {
        title: req.body.title,
        published: req.body.published
    };

    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating the Category"
            });
        });
}


exports.findAll = (req, res) => {
    const title = req.body.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Category.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occured while retriving the category"
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find the category with id= ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retreving Category with id=" + id
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated succesfully"
                })
            } else {
                res.send({
                    message: `Cannot update Category with id=${id} .maybe Category is nt found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating the Category" + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted succesfully"
                })
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id} .maybe Category is nt found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error Category the Category" + id
            })
        })
}