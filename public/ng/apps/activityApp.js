'use strict';

angular.module('ActivityApp', ['ngRoute','ngResource', 'ngBootbox'])

.controller('ActivityCtrl',function ActivityCtrl($rootScope,$scope,$http,Activity,Medias,$window){
	getActivityMedias();
	getActivities();

	$scope.create = function(isValid){
		$scope.returnMessage ="";
	 	Activity.save($scope.activity,function(result){
	 		     $scope.returnMessage = "successfully";
	 			setInterval(function(){
  					 $window.location='/admin/activity/all';
				}, 2000); 
 		})
	}

	function getActivityMedias() {
		Medias.get({target : 'Activity'},function(result){
			$scope.medias=result;
		})
	}

	function getActivities() {
		$scope.activities = Activity.query();
	}



})

.factory('Activity',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/activity/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])


.factory('Medias',['$resource',
	function($resource){
		return $resource('/api/media/target/:target', {}, {
		query:{ method: 'GET'},
		get : { method : 'GET', params: {target:'@target'}}
	});
}]);