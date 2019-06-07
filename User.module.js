var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    name: String,
    surname: String,
    mobile_number: Number,
});

module.exports = mongoose.model('User', UserSchema);