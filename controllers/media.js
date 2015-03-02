var Media = require('../models/media');
var mv = require('mv');
var uuid = require('node-uuid');
var fs = require('fs');

// Insert a new Slider record
exports.upload = function(req,res){


	console.log(req.body) // form fields
    console.log(req.files) // form files

    if( typeof req.body.target === 'undefined'  ||  typeof req.body.title === 'undefined' ){
    	res.status(500).end();
    }else{

    	// create media record for database

    	var newMedia = new Media();

    	newMedia.title = req.body.title;
    	newMedia.size = req.files.file.size;
 
    	newMedia.target = req.body.target;

    	// determine the file type by file extension name
    	var ext = req.files.file.extension.toLowerCase();
    	newMedia.ext = ext;

    	if( ext == 'jpg' || ext == 'png' || ext == 'gif'){
    		newMedia.type = 'Image';
    	}else if( 	ext == 'doc' || ext == 'docx' 
    				|| ext == 'xls' ||  ext=='xlsx' 
    				|| ext == 'ppt' || ext == 'pptx'
    				|| ext == 'pdf' 
    			)
    	{
    		newMedia.type = 'Document';
    	}else if( ext == 'mp4' ){
    		newMedia.type = 'Video';
    	}else{
    		newMedia.type = 'Other';
    	}
    	

    	var subPath = '/docs/';
    	subPath += newMedia.type + '/';
    	subPath += newMedia.target + '/';




		// new filename
		var newFileName = uuid.v4() + '.' +req.files.file.extension;
    	// new file location in server
   		var newPath =  'public/' + subPath + newFileName;

   		console.log(newPath);

   		// move file the new folder
    	mv(req.files.file.path, newPath,{mkdirp: true},function(err){
    		console.log('error form moving file');
    		console.log(err);
    	});

    	// doucment record path for http access
    	newMedia.path = subPath +  newFileName;


    	// save db record
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

}


exports.all = function(req,res){

	Media.find({}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});
		
	});

}

exports.get = function(req,res){

	var id = req.params.id;
	Media.find({_id:id}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		if(result.length == 1){
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});	
		}else{
			res.json({
				status: 'fail',
				messages: "multipulte result",
				data: null
			});
		}
		
	});

}


exports.edit = function(req,res){

	var id = req.params.id;
	var media = new Media(req.body);
	media._id = id;

	Media.update({_id:id}, media, { multi: false }, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {

			console.log(result);
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result + ' record(s) effected.'
			});	
		}
	});
}

exports.delete = function(req,res){

	var remove_id = req.params.id;
	console.log('test id : ' +  remove_id);

	Media.find({ _id:remove_id }).remove(function(err,result){

		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {

			console.log(result);

			// remove file
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result + ' record(s) effected.'
			});	
		}
	});


	// Media.update({_id:id}, media, { multi: false }, function(err, result){
	// 	if(err){
	// 		res.json({
	// 			status: 'fail',
	// 			messages: err,
	// 			data: null
	// 		});
	// 	}
	// 	else {

	// 		console.log(result);
	// 		res.json({
	// 			status: 'ok',
	// 			messages: 'successed',
	// 			data: result + ' record(s) effected.'
	// 		});	
	// 	}
	// });
}


/*
// Insert a new Slider record
exports.create = function(req,res){
	var newSlider = new Slider(req.body);
	newSlider.save(function(err,result){
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
}

exports.get = function(req,res){
	console.log('get slider');

	var id = req.params.id;
	Slider.find({_id:id}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		if(result.length == 1){
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});	
		}else{
			res.json({
				status: 'fail',
				messages: "multipulte result",
				data: null
			});
		}
		
	});

}

exports.all = function(req,res){

	Slider.find({}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});
		
	});

}


exports.edit = function(req,res){

	var id = req.params.id;
	var slider = new Slider(req.body);
	slider._id = id;

	Slider.update({_id:id}, slider, { multi: false }, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {

			console.log(result);
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result + ' record(s) effected.'
			});	
		}
	});
}


*/
