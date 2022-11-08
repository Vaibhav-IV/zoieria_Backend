const { DataTypes } = require("sequelize");

module.exports = (sequelize,Sequelize) => {
    const Product = sequelize.define("product",{
        // image:{
        //     type: DataTypes.STRING
        // },
        title:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING
        },
        cost:{
            type: DataTypes.INTEGER
        },
        published:{
            type: DataTypes.BOOLEAN
        }
    });
    return Product 
}
