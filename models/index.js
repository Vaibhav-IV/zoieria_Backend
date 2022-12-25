const Sequelize = require("sequelize");
const dbconfig = require('../config/config');


const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./product.model")(sequelize, Sequelize)
db.category = require("./category.model")(sequelize, Sequelize)
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.images = require("./image.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize);
db.cartItem = require("./cart-item.model")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);
db.orderItem = require("./order-item.model")(sequelize, Sequelize);

//associations
//category
db.category.hasMany(db.products)
// //products
db.products.belongsTo(db.category, { foreignKey: 'categoryId' })

//user and role
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

//for images
db.products.hasMany(db.images)
db.images.belongsTo(db.products, { foreignKey: 'productId' })


//for cart and order assocication
db.user.hasOne(db.cart);
db.cart.belongsTo(db.user);
db.cart.belongsToMany(db.products, {
    through: db.cartItem
});
db.products.belongsToMany(db.cart, {
    through: db.cartItem
});

db.order.belongsTo(db.user);
db.user.hasMany(db.order);
db.order.belongsToMany(db.products, {
    through: db.orderItem
});
db.products.belongsToMany(db.order, {
    through: db.orderItem
});

module.exports = db;