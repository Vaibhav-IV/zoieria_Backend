module.exports = (sequelize,Sequelize) => {
    const Product = sequelize.define("product",{
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        cost:{
            type: Sequelize.INTEGER
        }
    });
    return Product
}
