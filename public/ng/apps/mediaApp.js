'use strict';

angular.module('mediaApp', [])

.controller('uploadController',function uploadController($rootScope,$scope,$location,$http,$window){

	$scope.uploadList = [];




	 


	
	$scope.createStatusbar =  function (obj)
	{
	     rowCount++;
	     var row="odd";
	     if(rowCount %2 ==0) row ="even";
	     this.statusbar = $("<div class='statusbar "+row+"'></div>");
	     this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
	     this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
	     this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
	     this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
	     obj.after(this.statusbar);
	 
	    this.setFileNameSize = function(name,size)
	    {
	        var sizeStr="";
	        var sizeKB = size/1024;
	        if(parseInt(sizeKB) > 1024)
	        {
	            var sizeMB = sizeKB/1024;
	            sizeStr = sizeMB.toFixed(2)+" MB";
	        }
	        else
	        {
	            sizeStr = sizeKB.toFixed(2)+" KB";
	        }
	 
	        this.filename.html(name);
	        this.size.html(sizeStr);
	    }
	    this.setProgress = function(progress)
	    {       
	        var progressBarWidth =progress*this.progressBar.width()/ 100;  
	        this.pro/gressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
	        if(parseInt(progress) >= 100)
	        {
	            this.abort.hide();
	        }
	    }
	    this.setAbort = function(jqxhr)
	    {
	        var sb = this.statusbar;
	        this.abort.click(function()
	        {
	            jqxhr.abort();
	            sb.hide();
	        });
	    }
	}
	
	$scope.handleFileUpload = function (files,obj)
	{
	   for (var i = 0; i < files.length; i++) 
	   {	
	
	        var fd = new FormData();
	        fd.append('file', files[i]);
	        fd.append('var','andy');
	 
	 		/*
	        var status = new scrop.createStatusbar(obj); //Using this we can set progress.
	        status.setFileNameSize(files[i].name,files[i].size);
	        */


	        //$scope.sendFileToServer(fd,status);

	        $scope.addFileToList(files[i]);

	      
	 
	   }

	   $scope.$apply();
	}

	$scope.sendFileToServer = function (fileObj)
	{

		fileObj.formData = new FormData();
		
	    fileObj.formData.append('file', fileObj.obj);
	    fileObj.formData.append('target', fileObj.target );
	 
		

	    var uploadURL ="http://localhost:3000/upload"; //Upload URL
	    var extraData ={}; //Extra Data.
	    var jqXHR=$.ajax({
	            xhr: function() {
	            var xhrobj = $.ajaxSettings.xhr();
	            if (xhrobj.upload) {
	                    xhrobj.upload.addEventListener('progress', function(event) {

	                        var percent = 0;
	                        var position = event.loaded || event.position;
	                        var total = event.total;
	                        if (event.lengthComputable) {
	                            percent = Math.ceil(position / total * 100);
	                        }
	                        fileObj.complated = percent;
	                        $scope.$apply();
	 
	                    }, false);
	                }
	            return xhrobj;
	        },
	    url: uploadURL,
	    type: "POST",
	    contentType:false,
	    processData: false,
	        cache: false,
	        data: fileObj.formData,
	        success: function(data){
	
	            fileObj.complated = 100;     
	            $scope.$apply();  
	        }
	    }); 
	 
	    //status.setAbort(jqXHR);
	    fileObj.jqXHR = jqXHR;
	    $scope.$apply(); 

	}


	$scope.addFileToList = function(file){

		console.log('---- add file ------');
		console.log(file);

		var newUploadItem = {
			obj: file,
			file_name: file.name,
			size: file.size,
			complated: 0,
			target: 'Slider',
			type: '',
			jqXHR: null,
			formData: null

		};


		$scope.uploadList.push(newUploadItem);
	}

	

})



.directive('uploadArea', function() {
  return {
  	link: function (scope, element, attrs) {

			//var obj = $("#dragandrophandler");

			element.on('dragenter', function (e) 
			{
			    e.stopPropagation();
			    e.preventDefault();
			    $(this).css('border', '2px solid #0B85A1');
			});
			element.on('dragover', function (e) 
			{
			     e.stopPropagation();
			     e.preventDefault();
			});

			element.on('drop', function (e) 
			{
			 
				$(this).css('border', '2px dotted #0B85A1');
				e.preventDefault();
			
				//var files = e.originalEvent.dataTransfer.files;
				var files = e.dataTransfer.files;

				//We need to send dropped files to Server
				//handleFileUpload(files,obj);

				//-------------------------------- 	
				// send file to server
				//--------------------------------

				scope.handleFileUpload(files,null);
			});


			$(document).on('dragenter', function (e) 
			{
			    e.stopPropagation();
			    e.preventDefault();
			    //element.css('color', 'red!important');
			});
			$(document).on('dragover', function (e) 
			{
			  e.stopPropagation();
			  e.preventDefault();
			  //element.css('border', '2px dotted #0B85A1');
			});
			$(document).on('drop', function (e) 
			{
			    e.stopPropagation();
			    e.preventDefault();
			});




            element.on('click', function () {
        		console.log(scope.uploadList);
            });
        }
  };
});

