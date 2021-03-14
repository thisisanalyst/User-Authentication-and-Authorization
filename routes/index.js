const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
const users = require('./users');
const router = express.Router();

const userModel = require('./users');

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile');
});

router.post('/reg', function(req, res, next){
  const newUser = new userModel({
    username: req.body.username,
    fname: req.body.fname,
    mobile: req.body.mobile,
  })

  userModel.register(newUser, req.body.password)

  .then(function(userCreated){
    passport.authenticate('local')(req, res, function(){
      res.redirect('/');
    });
  })

  .catch(function (err) {
      res.send(err);    
  })

});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function (req, res, next) { });

router.get('/logout', function (req, res, next){
  req.logOut();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;