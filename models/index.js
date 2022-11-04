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

module.exports = db;