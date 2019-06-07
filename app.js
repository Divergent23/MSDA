const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const Users = require('./User.module');
const reg = require ('./reg');
const checkAuth = require('./check-auth');
const search = require('./searches.module');
const port = process.env.PORT || 3000;
    app.listen (port, () => console.log(`Listening on port ${port}...`));
const db = 'mongodb://localhost/phonebook';
    mongoose.connect(db);

app.use(search);
app.use(reg);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res){
    res.sendFile(__dirname + '/main.html')
});

app.get ('/users', checkAuth, (req, res) => {
    console.log('getting all contacts');
    var query = Users.find({});
    query.exec((err, users)=>{
        if (err) return res.status(404).send('Users were not found');
        else {
            res.json(users);
            console.log(users);
        }
    });
});

app.post('/user', checkAuth, (req, res) => {
    var newUser = new Users();
     newUser.name = req.body.name;
     newUser.surname = req.body.surname;
     newUser.mobile_number = req.body.mobile_number;
     newUser.save ((err, user) => {
         if (err) {
            return res.status(404).send('Something went wrong!');
         } else {
             res.send(user);
             console.log(`The new user was added: ${user}`);
         }
     });
});

app.patch ('/users/:id', checkAuth, (req, res) => {
    const id = req.params.id;
    const b = req.body;
    Users.update({ _id: id }, { $set: {name: b.name, surname: b.surname, mobile_number: b.mobile_number} })
    .exec()
    .then( result => {
        console.log(`This user was updated: ${result}`);
        res.status (200).json(result); 
    })
    .catch( err=> {
        console.log(err);
        res.status(500).send('Something went wrogn!')
    });
});

app.delete ('/users/:id', checkAuth, (req, res) => {
    const id = req.params.id;
    Users.findOneAndRemove ({
        _id: id
    })
    .exec()
    .then( result => {
        console.log(`This user was removed: ${result}`);
        res.status (200).json(result); 
    })
    .catch( err=> {
        console.log(err);
        res.status(500).send('Something went wrogn!')
    });
});