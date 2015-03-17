'use strict';

angular.module('ActivityApp', ['ngRoute','ngResource', 'ngBootbox'])

.controller('ActivityCtrl',function ActivityCtrl($rootScope,$scope,$http,Activity,Medias,$window){
	getActivityMedias();
	getActivities();

	$scope.create = function(isValid){
		$scope.returnMessage ="";
		$scope.activity.mediaIds = $scope.array;
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
		$scope.array = [];
	}
})

.controller('ActivityEditCtrl', function ActivityEditCtrl($scope,$http,Activity,Medias,$window){
	var activity_id = url_params.id;

	if(activity_id !=null){
	 	Activity.get({id:activity_id}, function(result){
	 		$scope.activity = result.data;
	 	});	
	 }

	 $scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Activity.update($scope.activity, function(result){
	 			var message = result.messages;	    
	 		    $scope.returnMessage = "profile is save successfully";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 	})
	 }
})

.factory('Activity',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/activities/:id', {}, {
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
}])


.directive("checkboxGroup", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // Determine initial checked boxes
            // if (scope.array.indexOf(scope.item.id) !== -1) {
            //     elem[0].checked = true;
            // }
            // Update array on click
            elem.bind('click', function () {
            	var i = scope.item._id;
                 var index = scope.array.indexOf(scope.item._id);
                 // Add if checked
                if (elem[0].checked) {
                    if (index === -1) scope.array.push(scope.item._id);
                }
                // Remove if unchecked
                else {
                    if (index !== -1) scope.array.splice(index, 1);
                }
                // Sort and update DOM display
                scope.$apply(scope.array.sort(function (a, b) {
                    return a - b
                }));
            });
        }
    }
    });