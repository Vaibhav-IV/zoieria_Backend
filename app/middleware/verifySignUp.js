const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOremail_id = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // email_id
    User.findOne({
      where: {
        email_id: req.body.email_id
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! email_id is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOremail_id: checkDuplicateUsernameOremail_id,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;