const { DataTypes } = require("sequelize");
const category = require('./category.model')

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
        },
        categoryId:{
            //fk in category table
            type: DataTypes.INTEGER,
            required: true,
            references:{
                model: "category",
                key:"id"
            }
            //allowNull: false
        }


    });
    
    // Product.associate = (models) =>{
    //     Product.belongsTo(category)
    // }

    
    return Product 
}
 