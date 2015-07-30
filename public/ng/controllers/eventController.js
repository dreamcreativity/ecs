'use strict';
angular.module('AdminApp')

.controller('EventCtrl',function EventCtrl($rootScope,$scope,$http,Events,Medias,$window,DateRanges){
	$scope.dateRanges = DateRanges;
	$scope.dateAfter = $scope.dateRanges[0];
	loading();
	getActivityMedias();

	function loading() {
		$scope.events = Events.query();
		$scope.array = [];
	}

	function getActivityMedias() {
		Medias.get({target : 'Event'},function(result){
			$scope.medias=result;
		})
	}

	$scope.create = function(isValid){
		$scope.returnMessage ="";
		$scope.event.mediaIds=[]
		// $scope.activity.mediaIds = $scope.array;
		for(var i=0; i<$scope.array.length; i++){
			$scope.event.mediaIds.push($scope.array[i]);
		}
	 	Events.save($scope.event,function(result){
	 		    if(result.type == true){
  					 ShowGritterCenter('System Notification','Event document has been updated');
				}else{
					ShowGritterCenter('System Notification','Event document update fail : ' + result.messages.err);
				}
 		})
	}

})

.controller('EventEditCtrl', function ActivityEditCtrl($scope,$http,Events,Medias,$window,DateRanges){
	var event_id = url_params.id;
    $scope.dateRanges = DateRanges;
	$scope.dateAfter = $scope.dateRanges[0];

	if(event_id !=null){
	 	Events.get({id:event_id}, function(result){
	 		$scope.event = result.data;
	 		$scope.event.date = new Date($scope.event.date);
	 		$scope.array = result.data["mediaIds"];
	 	});	
	 }

	 Medias.get({target : 'Activity'},function(result){
			$scope.medias=result;
		})

	 $scope.update = function(isValid) {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Events.update($scope.event, function(result){
	 			// var message = result.messages;	    
	 		 //    $scope.returnMessage = "activity is save successfully";
	 		 //    $("#messageReturn").delay(2000).fadeOut('slow');
	 		 if(result.type == true){
					ShowGritterCenter('System Notification','Event document has been updated');
				}else{
					ShowGritterCenter('System Notification','Event document update fail : ' + result.messages.err);
				}
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

.value('DateRangesEvent', [
  {name:'All', date:moment().subtract(10, 'year')},
  {name:'Last one day', date:moment().subtract(1, 'day')},
  {name:'Last one month', date:moment().subtract(1, 'month')},
  {name:'Last three months', date:moment().subtract(3, 'month')}
])

.directive("checkboxSelectEvent", function () {
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

.directive("checkboxUnselectEvent", function () {
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