'use strict';
angular.module('AdminApp')


.controller('ActivityCtrl',function ActivityCtrl($rootScope,$scope,$http,Activity,Medias,$window,DateRanges){
	getActivityMedias();
	getActivities();
	$scope.dateRanges = DateRanges;
	$scope.dateAfter = $scope.dateRanges[0];

	$scope.create = function(isValid){
		$scope.returnMessage ="";
		$scope.activity.mediaIds=[]
		// $scope.activity.mediaIds = $scope.array;
		for(var i=0; i<$scope.array.length; i++){
			$scope.activity.mediaIds.push($scope.array[i]);
		}
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

.controller('ActivityEditCtrl', function ActivityEditCtrl($scope,$http,$modal,Activity,Medias,$window,DateRanges){
	var activity_id = url_params.id;
	$scope.dateRanges = DateRanges;
	$scope.dateAfter = $scope.dateRanges[0];

	if(activity_id !=null){
	 	Activity.get({id:activity_id}, function(result){
	 		$scope.activity = result.data;
	 		$scope.array = result.data["mediaIds"];
	 	});	
	 }

	Medias.getCategoryTargetMedia({target : 'Activity',type:'Image'},function(result){
			$scope.medias=result.data;
			$scope.selectedMedias = [];

			$scope.changeMediaList = createMultiMediaSelectorFunction($modal,$scope.medias,$scope.selectedMedias, function(result){

			});

	});

	 $scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Activity.update($scope.activity, function(result){
	 			var message = result.messages;	    
	 		    $scope.returnMessage = "activity is save successfully";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 	})
	 }
})

.filter('isAfter', function() {
  return function(medias, dateAfter) {
     if(!medias || !medias.length){return;}
     return medias.filter(function(item){
      return moment(item.createDate).isAfter(dateAfter);
    })
  }
})

.value('DateRanges', [
  {name:'All', date:moment().subtract(10, 'year')},
  {name:'Last one day', date:moment().subtract(1, 'day')},
  {name:'Last one month', date:moment().subtract(1, 'month')},
  {name:'Last three months', date:moment().subtract(3, 'month')}
])

.factory('Activity',['$resource',
	function($resource){
		return $resource('/api/activities/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])


.directive("checkboxSelect", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // Update array on click
            elem.bind('click', function () {
                var index = scope.array.indexOf(scope.item._id);
                if (index === -1) {
                	scope.array.push(scope.item._id);
                }  
                else {          
                	scope.array.splice(index, 1);             
                }            
                scope.$apply(scope.array.sort(function (a, b) {
                    return a - b
                }));
            });
        }
    }
    })

.directive("checkboxUnselect", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // Update array on click
            elem.bind('click', function () {
            	var index = scope.array.indexOf(scope.item._id);
				scope.array.splice(index, 1);     
                scope.$apply(scope.array.sort(function (a, b) {
                    return a - b
                }));
            });
        }
    }
});
