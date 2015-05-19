'use strict';

angular.module('studentApp', ['ngRoute','ngResource','ngBootbox'])


.controller('StudentCtrl',function StudentCtrl($rootScope,$scope,$http,Students,Agents,$window){
	 var token = sessionStorage.token;
	 $scope.students = getAllStudents();
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

.factory('Students',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/student/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])

.factory('Agents',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/agent/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])

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
});