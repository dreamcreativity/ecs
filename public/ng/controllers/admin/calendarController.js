	'use strict';
	angular.module('AdminApp')

	.controller('CalendarStaticCtrl', function CalendarStaticCtrl($scope,$http,Calendar,$modal,Medias,$window){

		Calendar.getCalendarEvent({},function(result){
			
			$scope.staticCalendar = result.data;
			
		});	

		Medias.getCategoryTargetMedia({target : 'Calendar', type:'Document'},function(result){
			$scope.medias=result.data;
			//console.log($scope.medias);

  
			$scope.changeEvent = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				//$scope.event.cover = selectedMedia;
				//console.log(selectedMedia);
				$scope.staticCalendar.media = selectedMedia;
			});

		})

		$scope.update = function() {

	 		console.log('do save');

	 		Calendar.updateCalendarEvent($scope.staticCalendar,function(result){
				console.log(result);
				
			});	
		}
	});
