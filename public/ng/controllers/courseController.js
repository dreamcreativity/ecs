'use strict';
angular.module('AdminApp')


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
				}, 1000); 
 		})
	 }

})


.controller('CourseEditCtrl', function CourseEditCtrl($rootScope,$scope,$http,$modal,Courses,Duration,$window) {
	var course_id = url_params.id;

	 if(course_id !=null){
	 	Courses.get({id:course_id}, function(result){
	 		$scope.course = result.data;

	 		$scope.newDuration = {
			 	'title': '',
			 	'price': 0.0,
			 	'course': $scope.course._id
			};
	 	});	 	
	 }

	 $scope.selectedDuration = null;

	 $scope.removeDuration = function(object) {
	 	var index = $scope.course.durations.indexOf(object);
  		$scope.course.durations.splice(index, 1);
	 }
	 $scope.editDuration = function(object) {
	 	
	 	$scope.selectedDuration = object;

	 	var newObject = jQuery.extend(true, {}, object);
		var modalInstance = $modal.open({
		  templateUrl: 'myModalContent.html',
		  controller: 'ModalInstanceCtrl',
		  resolve: {
		    editDuration: function () {
		      return newObject;
		    }
		  }
		});

		modalInstance.result.then(function (duration) {
		  //$scope.user.name = user.name;
		  console.log(duration);
		  var result = $.grep($scope.course.durations, function(e){ return e._id == duration._id; });
		  console.log(result[0]);
		  result[0].title = duration.title;
		  result[0].price = duration.price;
		  //$scope.selectedDuration = duration;
		}, function () {
		  	// done
		});
	 	
	 }

	 $scope.createDuration = function() {

	 	Duration.create($scope.newDuration, function(result){
	 		console.log(result);
	 		$scope.course.durations.push(result.data);

	 		$scope.newDuration.title = '';
	 		$scope.newDuration.price = 0.0;

	 		$('#myModal').modal('hide');
	 	});

	 	
	 }

	 $scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Courses.update($scope.course, function(result){
	 			var message = result.messages;	   
	 			console.log(message); 
	 		    $scope.returnMessage = message;
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 			// $window.location='/admin/staff/detail/'+ staff_id;
	 	})
	 }
})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, editDuration) {


  $scope.duration = editDuration;
  $scope.ok = function () {
    $modalInstance.close($scope.duration );
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

// .factory('Courses',['$resource',
// 	function($resource){
// 		return $resource('http://localhost:3000/api/courses/:id', {}, {
// 		query:{ method: 'GET'},
// 		update : { method : 'PUT', params: {id:'@_id'}}
// 	});
// }])

// .factory('authInterceptor', function ($rootScope, $q, $window) {
//   return {
//     request: function (config) {
// 	    config.headers = config.headers || {};
// 		if ($window.sessionStorage.token) {
// 			config.headers.api_token = sessionStorage.token ;
// 	    	console.log($window.sessionStorage.token );
// 		}
// 		return config;
//     },
//     responseError: function (response) {
//       console.log(response.status);
//       if (response.status === 401) {
//         // handle the case where the user is not authenticated
//       }
//       if (response.status === 403) {
//         //console.log('please log in ');
//         window.location = '/admin/login';
//       }
//       return response || $q.when(response);
//     }
//   };
// })









