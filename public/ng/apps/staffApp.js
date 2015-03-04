'use strict';

angular.module('staffApp', ['ngRoute','ngResource', 'ngBootbox'])


.controller('StaffCtrl',function StaffCtrl($rootScope,$scope,$http,Staffs,$window){
	 var token = sessionStorage.token;
	 $scope.staffs = getAllStaffs();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	$scope.returnMessage ="";
	 	Staffs.save($scope.staff,function(result){
	 		     $scope.returnMessage = "successfully";
	 			setInterval(function(){
  					 $window.location='/admin/staff/all';
				}, 2000); 
 		})
	 }

 	function getAllStaffs(){
 		return Staffs.query();
 	}


 	function getStaff(){

 	}
})

.controller('StaffEditCtrl', function StaffEditCtrl($rootScope,$scope,$http,Staffs,$window) {
	var staff_id = url_params.id;

	 if(staff_id !=null){
	 	Staffs.get({id:staff_id}, function(result){
	 		$scope.staff = result.data;
	 	});
	 	
	 }

	$scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Staffs.update($scope.staff, function(result){
	 			var message = result.messages;	    
	 		    $scope.returnMessage = "profile is save successfully";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 			// $window.location='/admin/staff/detail/'+ staff_id;
	 	})
	 }
})

.controller('DetailCtrl', function DetailCtrl($scope,Staffs,Agents,$window){
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
})


.factory('Staffs',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/staffs/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])

.factory('Agents',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/agent/region/:name', {}, {
		query:{ method: 'GET'}
	});
}]);

