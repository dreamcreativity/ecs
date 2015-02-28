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



var Media = require('../models/media');
var mv = require('mv');


router.post('/upload', function(req, res) {
	console.log(req.body) // form fields
    console.log(req.files) // form files

    if( typeof req.body.target === 'undefined'  ||  typeof req.body.title === 'undefined' ){
    	res.status(500).end();
    }else{

    	// create media record for database

    	var newMedia = new Media();

    	newMedia.title = req.body.title;
    	newMedia.size = req.files.file.size;
    	var newPath = 'public/uploads/' +  req.files.file.originalname;
    	console.log(req.files.file.path);
    	console.log(newPath);
    	mv(req.files.file.path, newPath,function(err){
    		console.log(err);
    	});
    	newMedia.path = newPath;
    	newMedia.target = req.body.target;
    	newMedia.target = req.files.file.extension;

    	


	    newMedia.save(function(err,result){
			if(err){
				res.json({
					type:false,
					data:"Error occured: " +err
					});
			}
			res.json({
				type:true,
				data:result
			});
		});

    	//res.status(204).end();	
    }
    
});





module.exports = router;

