'use strict';

angular.module('courseApp', ['ngRoute','ngResource','ngBootbox'])


.controller('CourseCtrl',function CourseCtrl($rootScope,$scope,$http,Courses,$window){
	 $scope.courses = getAllCourses();

 	function getAllCourses(){
 		return Courses.query();
 	}

 	$scope.create = function(isValid){
	 	Courses.save($scope.course,function(result){
	 		    var message = result.messages;	    
	 		     $scope.returnMessage = "successfully";
	 			setInterval(function(){
  					 $window.location='/admin/course/all';
				}, 2000); 
 		})
	 }

})


.controller('CourseEditCtrl', function CourseEditCtrl($rootScope,$scope,$http,Courses,$window) {
	var course_id = url_params.id;

	 if(course_id !=null){
	 	Courses.get({id:course_id}, function(result){
	 		$scope.course = result.data;
	 	});	 	
	 }

	 $scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Courses.update($scope.course, function(result){
	 			var message = result.messages;	    
	 		    $scope.returnMessage = "profile is save successfully";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 			// $window.location='/admin/staff/detail/'+ staff_id;
	 	})
	 }
})


.factory('Courses',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/courses/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])