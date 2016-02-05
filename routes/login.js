var express = require('express');
var router = express.Router();
var login = require('../public/javascripts/userLogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var data = req.body,
        userData = {};

    userData.email = data.email;
    userData.password = data.pass;

    if(userData.email !== undefined){
        login.checkUser(userData.email, userData.password, function(err, user) {
            if (err) {
                throw err;
            }
            if(user){
                req.session.email = user.email;
                req.session.uuid = user.uuid;
                res.redirect("/");
            } else {
                res.send("Username or Password is incorrect. Please try again.");
            }
        });
    }
});
module.exports = router;