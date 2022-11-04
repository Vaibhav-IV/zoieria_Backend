const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

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
// });

require('./routes/product.routes')(app)  //when we hit /product route on web it will goto productRoutes

const ports = process.env.PORT || 3000;
app.listen(ports, () =>
    console.log('listeing on port no', { ports }));