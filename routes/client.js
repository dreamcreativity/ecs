var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');

/* GET home page. */


router.get('/', function(req, res) {
	template(req,res,'client_main','client/main.html',{ title: 'Express 333' });
});

router.get('/login', function(req, res) {
	template(req,res,'client_main','client/login.html',{ });
});

router.post('/upload', function(req, res) {
	console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end();
});





module.exports = router;

