require("dotenv").config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const userRouter = require('./routes/user.routes')

const app = express();

var corsoptions = {
    origin: "http://localhost:4200"
}

app.use(cors(corsoptions));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync()
    .then(() => {
        console.log("Db is synced using sequelize");
    })
    .catch((err) => {
        console.log("falied to sync db using sequelize", + err.message);
    })

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//        initial();
// });

const Role = db.role;

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

require('./routes/product.routes')(app)  //when we hit /product route on web it will goto productRoutes
require('./routes/category.routes')(app)
//app.use("/api/users", userRouter)

require('./routes/shop.routes')(app) //for order and cart
require('./routes/image.routes')(app) //for image


//statis images folder
app.use('./../images', express.static('./../images'))

const ports = process.env.PORT || 3000;
app.listen(ports, () =>
    console.log('listeing on port no', { ports }));