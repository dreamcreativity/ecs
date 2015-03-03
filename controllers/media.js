var Media = require('../models/media');
var mv = require('mv');
var uuid = require('node-uuid');
var fs = require('fs');
var path = require('path');

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

exports.getByTarget = function(req,res){

	var target = req.params.target;
	console.log(target);
	Media.find({target:target}, function(err, result){
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

	Media.update({_id:id}, req.body, { multi: false }, function(err, result){
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



	Media.find({_id:remove_id}, function(err, obj){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}


		var file_path = path.resolve(__dirname) + path.resolve(obj[0].path);

		file_path = file_path.replace("controllers", "public"); 


		fs.unlinkSync(file_path);
		// fs.unlink(file_path, function(err){
		// 	console.log(err);			
		// });


		Media.find({ _id:remove_id }).remove(function(err,result){

			if(err){
				res.json({
					status: 'fail',
					messages: err,
					data: null
				});
			}
			else {


				// remove file
				res.json({
					status: 'ok',
					messages: 'successed',
					data: result + ' record(s) effected.'
				});	
			}
		});
		
	});

}

