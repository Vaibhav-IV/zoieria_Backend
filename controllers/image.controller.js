
const db = require('../models')
const Images = db.images
const Op = db.Sequelize.Op


const path = require('path')
const { products } = require('../models')

exports.imageCreater = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Image name cannt be empty"
        });
        return
    }

    const image = {
        //image: req.file.path,    //for multiple images write files insytaed of file
        name: req.body.name,
        productId: req.body.productId
    };

    Images.create(image)
        .then(data => {
            res.send(data);
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating the image"
            });
        });
}


exports.findAllImages = (req, res) => {
    const name = req.params.id;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Images.findAll({ where: condition  })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occured while retriving the images"
            });
        });
}



exports.findByProduct = (req, res) => {
    const id = req.params.id;
    Images.findAll({
        where: { productId: id },
    })
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error occured while retriving the images with product id = "  + id
            });
        });
}
