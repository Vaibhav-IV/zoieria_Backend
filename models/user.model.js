module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      contact_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      email_id: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  }