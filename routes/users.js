const express = require('express');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
//const router = express.Router();


mongoose.connect('mongodb://localhost/facebook');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  fname: String,
  mobile: String
});

userSchema.plugin(passportLocalMongoose);

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

module.exports = mongoose.model('user', userSchema);
//module.exports = router;