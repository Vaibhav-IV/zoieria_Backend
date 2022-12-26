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
        mrp:{
            type: DataTypes.INTEGER
        },
        published:{
            type: DataTypes.BOOLEAN
        },
        color:{
            type: DataTypes.STRING
        },
        size:{
            type: DataTypes.STRING
        },
        material:{
            type: DataTypes.STRING
        },
        imageTitle:{
            type: DataTypes.STRING
        }
        // categoryId:{
        //     //fk in category table
        //     type: DataTypes.INTEGER,
        //     required: true,
        //     references:{
        //         model: "category",
        //         key:"id"
        //     }
        //     //allowNull: false
        // }


    });
    
    return Product 
}
 