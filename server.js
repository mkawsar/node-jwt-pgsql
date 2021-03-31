const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./app/models');
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    initial();
});

var corsOption = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: 'Welcome to nodeJS with JWT application.'});
})

// set port, listen for requests
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
   
    Role.create({
        id: 2,
        name: "moderator"
    });
   
    Role.create({
        id: 3,
        name: "admin"
    });
}