const db = require("../models");
const config = require("../config/auth.config")

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      gender: req.body.gender,
      contact_number: req.body.contact_number,
      address: req.body.address,
      email_id: req.body.email_id,
      password: bcrypt.hashSync(req.body.password, 10)
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          // by deafault user
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
        const id = user.id;
        return user;
      })
      
      .then(user => {
        return user.createCart(),user.createOrder();
      })



      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.signin = (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: "1h" 
        });
  
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email_id: user.email_id,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            address:user.address,
            contact_number:user.contact_number,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.signout = async (req, res) => {
    try {
      req.headers["x-access-token"] = null;
      return res.status(200).send({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    }
  };