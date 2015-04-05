'use strict';

angular.module('RegionApp', ['ngRoute','ngResource', 'ngBootbox','ngTagsInput','esc.resources'])

.controller('RegionCtrl',function RegionCtrl($scope,$http,$window,Regions){
		getRegions();

		$scope.create = function(isValid){
			Regions.save($scope.region, function(result){
				 ShowGritterCenter('System Notification','Region has been created');
	 			setInterval(function(){
  					 $window.location='/admin/region/all';
				}, 2000); 
			})
		}

		function getRegions(){
			$scope.regions = Regions.query();
		}
})


.controller('RegionEditCtrl', function RegionEditCtrl($scope,$http,Regions){
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
	 	})
	 }

})


.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        config.headers.token = $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (response) {
      console.log(response.status);
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      if (response.status === 403) {
        console.log('please log in ');
        //window.location = '/admin/login';
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});