const db = require('../models')
const Product = db.products
const Op = db.Sequelize.Op

const multer = require('multer')
const path = require('path')
const { category } = require('../models')


exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Product cannot be empty"
        });
        return
    }

    const product = {
        //image: req.file.path,    //for multiple images write files insytaed of file
        title: req.body.title,
        description: req.body.description,
        cost: req.body.cost,
        mrp: req.body.mrp,
        published: req.body.published,
        categoryId: req.body.categoryId,
        color: req.body.color,
        size: req.body.size,
        material: req.body.material,
        imageTitle: req.body.imageTitle
    };

    Product.create(product)
        .then(data => {
            res.send(data);
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating the product"
            });
        });
}

exports.findAll = (req, res) => {
    const title = req.params.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Product.findAll({ where: condition  })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occured while retriving the products"
            });
        });
}


exports.findAllSearch = (req, res) => {
    const title = req.params.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Product.findAll({ where: condition  })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occured while retriving the products"
            });
        });
}

exports.findByCategory = (req, res) => {
    const id = req.params.id;
    Product.findAll({
        where: { categoryId: id },
    })
        .then(data => {
            res.send(data)
        })
}

exports.getWeddingCatProducts =(req,res) =>{
    const id = 1
        Product.findAll({
        where: { categoryId: id },
    })
        .then(data => {
            res.send(data)
        })
}

exports.getRelatedProducts = (req, res) => {
    const id = req.params.id;
    Product.findAll({
        where: { categoryId: id },
        limit: 4
    })
        .then(data => {
            res.send(data)
        })
}

exports.getCount = async (req, res) => {

    const count = Product.count()
    const catCount = category.count()
    count.then(data =>{
       return console.log(data);
    })
    catCount.then(data=>{
        return console.log(data);
    })
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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))    // 2/1/22.png
    }
})

exports.upload = multer({
    storage: storage,   //initilized at line 138
    limits: { fileSize: '100000000' }, //6 zeros is 1kb
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|png|jpg|gif/
        const mimeType = fileTypes.test(file.mimetype)  //it will chk systems file mimetype and save it into mimeType const
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper Format files')
    }
}).single('image')

//for multiple images write .array('images',5) want tyo add 5 images


//module.exports = uplaod