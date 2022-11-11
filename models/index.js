const Sequelize = require("sequelize");
const dbconfig = require('../config/config');

const sequelize = new Sequelize(dbconfig.DB,dbconfig.USER,dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: 0,

    pool:{
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize




db.products = require("./product.model")(sequelize,Sequelize)
db.category = require("./category.model")(sequelize,Sequelize)
//associations
//category
db.category.hasMany(db.products)

// //products
db.products.belongsTo(db.category,{foreignKey: 'categoryId'})



module.exports = db;