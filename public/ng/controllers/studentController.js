'use strict';
angular.module('AdminApp')

.controller('StudentCtrl',function StudentCtrl($rootScope,$scope,$http,Students,Agents,$window){
	 var token = sessionStorage.token;
	 $scope.students = getAllStudents();


	 console.log($scope.students);
	 $scope.agents = Agents.query();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	Students.save($scope.student,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/student/all';
 		})
	 }

 	function getAllStudents(){
 		return Students.query();
 	}

})

.controller('StudentEditCtrl', function StudentEditCtrl($rootScope,$scope,$http,Students,$window) {
	var student_id = url_params.id;

	 if(student_id !=null){
	 	Students.get({id:student_id}, function(result){
	 		$scope.student = result.data;
	 	});
	 	
	 }

	$scope.update = function(isValid) {
	 	Students.update($scope.student, function(result){
	 			var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/student/all';
	 	})
	 }
})

.controller('StudentRegister', function StudentRegister($rootScope, $scope, $http, Students, $window){
	$scope.register = function(isValid){
	}
});














