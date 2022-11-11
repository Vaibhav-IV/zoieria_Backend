const { createUser,getUsers,login } = require("../controllers/user.controller");
const router = require("express").Router();
const {checkToken} = require("../services/token_validation");


router.post("/", createUser);
router.get("/",  checkToken, getUsers);
router.post("/login", login);


module.exports = router;