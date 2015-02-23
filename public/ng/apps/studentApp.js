'use strict';

angular.module('studentApp', ['ngRoute','ngResource'])


.controller('StudentCtrl',function StudentCtrl($rootScope,$scope,$http,Students,$window){
	 var token = sessionStorage.token;
	 $scope.students = getAllStaffs();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	Students.save($scope.student,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/student/all';
 		})
	 }

 	function getAllStaffs(){
 		return Staffs.query();
 	}


 	function getStaff(){

 	}
})

.factory('Students',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/student/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}]);