var express = require('express');
var encryption = require('../public/javascripts/testUser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var data = req.body,
        userData = {};

    userData.firstName = data.fname;
    userData.lastName = data.lname;
    userData.email = data.email;
    userData.password = data.pass;

    if(userData.firstName !== undefined){
        encryption.checkUserName(userData.email, function(err, exists) {
            if (err) {
                throw err;
            } else if(exists) {
                res.send("Username already exists");
            } else {
                encryption.createUser(userData);
                res.redirect("/");
            }
        });
    }
});
module.exports = router;
