const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const bodyParser = require('body-parser');
const jwt = require ('jsonwebtoken');


app.use(bodyParser.json());
const User = require('./regSchema');


app.post ('/signup', (req, res, next) => {
    const b = req.body;
    User.find ({ email: b.email}) 
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail exists'
            });
        } else{
            bcrypt.hash (b.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json ({
                        error: err
                    });
                } else {
                    const user = new User ({
                        _id: new mongoose.Types.ObjectId(),
                        email: b.email,
                        password: hash
                    });
                user
                    .save()
                    .then ( result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        })
                    })
                    .catch (err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });                
                    })
                }
            });
        }
    });
});

app.post ('/login', (req, res, next) => {
    const b = req.body;
    User.find ({ email: b.email})
    .exec()
    .then(user => {
        if (user.length <1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(b.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                 }, 'secret',
                 {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json ({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json ({
            error: err
        });       
    });
})


app.delete('/regUser/:id', (req, res, next) => {
    User.remove({_id: req.params.id})
    .exec()
    .then( result => {
        res.status(200).json ({
            message: 'User deleted.'
        });
    })
    .catch( err =>{
        console.log(err);
        res.status(500).json ({
            error: err
        });       
    });
});

module.exports = app;
