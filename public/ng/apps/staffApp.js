'use strict';

angular.module('staffApp', ['ngRoute','ngResource', 'ngBootbox','ngTagsInput','esc.resources'])


.controller('StaffCtrl',function StaffCtrl($rootScope,$scope,$http,Regions,Staffs,$window){
	 var token = sessionStorage.token;
	 loading();
	 //$scope.staffs = loading();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	$scope.returnMessage ="";
	 	$scope.staff.regions =[];
	 	for(var i=0; i<$scope.region_tags.length; i++){
	 		$scope.staff.regions.push($scope.region_tags[i].text);
	 	}
	 	Staffs.save($scope.staff,function(result){
	 		     ShowGritterCenter('System Notification','Staff has been created');
	 			setInterval(function(){
  					 $window.location='/admin/staff/all';
				}, 2000); 
 		})
	 }

	 function loading() {
	 	var list = [];
	 	var regions = null;
	 	Regions.query(function(result){
	 		regions = result;
	 		for(var i=0; i<regions.data.length; i++){
	 			list.push({"text" : regions.data[i].name});
	 		}
	 		Staffs.query(function(result){
	 			$scope.staffs = result;
	 			$scope.region_tags = result.data.regions;
	 			$scope.loadTags = function(query) {
	 				return list;
	 			};
	 		});
	 	});
	 }
})

.controller('StaffEditCtrl', function StaffEditCtrl($rootScope,$scope,$http,Regions,Staffs,$window) {
	var staff_id = url_params.id;
	loading();

	$scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	$scope.staff.regions =[];
	 	for(var i=0; i<$scope.region_tags.length; i++){
	 		$scope.staff.regions.push($scope.region_tags[i].text);
	 	}
	 	Staffs.update($scope.staff, function(result){
	 			var message = result.messages;	    
	 		    ShowGritterCenter('System Notification','Staff has been updated');
	 	})
	 }

	 function loading() {
	 	var list = [];
	 	var regions = null;
	 	Regions.query(function(result){
	 		regions = result;
	 		for(var i=0; i<regions.data.length; i++){
	 			list.push({"text" : regions.data[i].name});
	 		}
	 		if(staff_id !=null){
	 			Staffs.get({id:staff_id}, function(result){
	 				$scope.staff = result.data;
	 				$scope.region_tags = result.data.regions;
	 				$scope.loadTags = function(query) {
	 					return list;
	 				};
	 			});

	 		}
	 	});
	 }
})

.controller('DetailCtrl', function DetailCtrl($scope,Staffs,Agents,SendEmail,$window){
	var staff_id = url_params.id;
	$scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 if(staff_id !=null){
	 	Staffs.get({id:staff_id}, function(result){
	 		$scope.staff = result.data;

	 		Agents.get({name:$scope.staff.region}, function(result){
	 			 $scope.agents = result.data;	
	 		});

	 	});
	 }

.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
	    config.headers = config.headers || {};
		if ($window.sessionStorage.token) {
			config.headers.api_token = sessionStorage.token ;
	    	console.log($window.sessionStorage.token );
		}
		return config;
    },
    responseError: function (response) {
      console.log(response.status);
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      if (response.status === 403) {
        //console.log('please log in ');
        window.location = '/admin/login';
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');


	 function sendEmail() {
>>>>>>> origin/dev-new
	 	var email_list = $scope.email_list;
	 	var data = {"from" : "stiron88@gmail.com", 
	 	"to": "stiron88@gmail.com", 
	 	"subject" : "Hello world", 
	 	"text": "Testing"
		 };
	 	SendEmail.postEmail(data, function(err,result){
	 		console.log("send email success");
	 	})
	 }


});



