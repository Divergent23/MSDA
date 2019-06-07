const express = require('express');
const app = express();
const Users = require('./User.module');
const checkAuth = require('./check-auth');

module.exports = app.get('/searchById/:id', checkAuth, (req, res) => {
    Users.findOne({_id: req.params.id})
    .exec ()
    .then ( result=> {
        res.status(200).json(result);
        console.log(`This user was searched: ${result}`);
    })
    .catch (err => {
        res.status(500).send('The user with this ID was not found');
        console.log(err);
    });
});

module.exports = app.get('/searchByName/:name', checkAuth, (req, res) => {
    Users.findOne({name: req.params.name})
    .exec ()
    .then ( result=> {
        res.status(200).json(result);
        console.log(`This user was searched: ${result}`);
    })
    .catch (err => {
        res.status(500).send('The user with this ID was not found');
        console.log("erori: ",err);
    });
});

module.exports = app.get('/searchBySurname/:surname', checkAuth, (req, res) => {
    Users.findOne({surname: req.params.surname})
    .exec ()
    .then ( result=> {
        res.status(200).json(result);
        console.log(`This user was searched: ${result}`);
    })
    .catch (err => {
        res.status(500).send('The user with this ID was not found');
        console.log("erori: ",err);
    });
});

module.exports = app.get('/searchByNumber/:mobile_number', checkAuth, (req, res) => {
    Users.findOne({mobile_number: req.params.mobile_number})
    .exec ()
    .then ( result=> {
        res.status(200).json(result);
        console.log(`This user was searched: ${result}`);
    })
    .catch (err => {
        res.status(500).send('The user with this ID was not found');
        console.log("erori: ",err);
    });
});