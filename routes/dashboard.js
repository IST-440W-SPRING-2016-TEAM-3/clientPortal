var express = require('express');
var router = express.Router();
var dashboard = require('../public/javascripts/userDash');

router.get('/', function(req, res, next) {
	if(req.session && req.session.email && req.session.uuid ){
        dashboard.checkUser(req.session.email, req.session.uuid, function(err, user) {
            if (err) {throw err;}
            if(user){
				res.locals.user = {};
				res.locals.user.firstName = user.firstname;
				res.locals.user.lastName = user.lastname;
				res.render('dashboard');
            } else {
				res.clearCookie('session', { path: '/' });
			    res.redirect('login');
            }
        });
    } else {res.redirect('login');}
});

module.exports = router;
