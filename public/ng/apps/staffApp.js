'use strict';

angular.module('staffApp', ['ngRoute','ngResource'])


.controller('StaffController',function StaffController($rootScope,$scope,$routeParams,$location,$http,Staffs,$window){
	 var token = sessionStorage.token;
	 $scope.staffs = getAllStaffs();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 if($routeParams.id !=null){
	 	Staffs.get({id:$routeParams.id}, function(result){
	 		$scope.staff = result.data;
	 	});
	 	
	 }

	 $scope.create = function(isValid){
	 	Staffs.save($scope.staff,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/staff';
 		})
	 }

	 $scope.update = function(isValid) {
	 	Staffs.update($scope.newstaff, function(result){
	 		var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/staff';
	 	})
	 }

 	function getAllStaffs(){
 		return Staffs.query();
 	}


 	function getStaff(){

 	}
})

.factory('Staffs',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/staffs/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}]);
