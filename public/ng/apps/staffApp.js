'use strict';

angular.module('staffApp', ['ngRoute','ngResource'])


.controller('StaffCtrl',function StaffCtrl($rootScope,$scope,$http,Staffs,$window){
	 var token = sessionStorage.token;
	 $scope.staffs = getAllStaffs();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	Staffs.save($scope.staff,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/staff/all';
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
	 	Staffs.update($scope.staff, function(result){
	 			var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/staff/all';
	 	})
	 }
})

.factory('Staffs',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/staffs/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}]);
