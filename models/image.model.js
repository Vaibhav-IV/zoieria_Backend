module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define("images", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
  
    return Images;
  };
