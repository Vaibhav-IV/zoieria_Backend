const { DataTypes } = require("sequelize");
const product = require('./product.model')

module.exports = (sequelize,Sequelize) => {
    const Category = sequelize.define("category",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING
        },
        published:{
            type: DataTypes.BOOLEAN
        }
    });
    return Category 
}
