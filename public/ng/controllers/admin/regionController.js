'use strict'

angular.module('AdminApp')

.controller('RegionCtrl', function RegionCtrl($scope,Regions,$window){
	getRegions();


	function getRegions(){
		$scope.regions=Regions.query();
	}

	$scope.create = function(isValid){
		Regions.save($scope.region, function(result){
				 ShowGritterCenter('System Notification','Region has been created');
	 			setInterval(function(){
  					 $window.location='/admin/region/all';
				}, 2000); 
			})
	}
})


.controller('RegionEditCtrl', function RegionEditCtrl($scope,Regions,$window){
	var region_id = url_params.id;

	if(region_id !=null){
	 	Regions.get({id:region_id}, function(result){
	 		$scope.region = result.data;
	 	    $scope.email_tags = result.data.emails;
	 	});	
	 }

	  $scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	$scope.region.emails =[];
	 	for(var i=0; i<$scope.email_tags.length; i++){
	 		$scope.region.emails.push($scope.email_tags[i].text);
	 	}
	 	Regions.update($scope.region, function(result){
	 			var message = result.messages;	    
	 		    ShowGritterCenter('System Notification','Region has been updated');
	 		    // $("#messageReturn").delay(2000).fadeOut('slow');
	 		    setInterval(function(){
  					 $window.location='/admin/region/all';
				}, 2000);
	 	})
	 }
})