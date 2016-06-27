	'use strict';
	angular.module('AdminApp')

	.controller('CalendarStaticCtrl', function CalendarStaticCtrl($scope,$http,StaticMedia,$modal,Medias,$window){

		StaticMedia.getCurrentYearAcademyCalendar({},function(result){
			$scope.staticCalendar = result.data;
		});	


		StaticMedia.getFutureAcademyCalendar({},function(result){
			$scope.staticFutureCalendar = result.data;
		});	


		Medias.getCategoryTargetMedia({target : 'Calendar', type:'Document'},function(result){

			$scope.medias=result.data;
  
			$scope.changeCurrentCalendar = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.staticCalendar.media = selectedMedia;
			});


			// $scope.changeFetureCalendar = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
			// 	$scope.staticFutureCalendar.media = selectedMedia;
			// });

		})

		$scope.update = function() {

	 		console.log('do save');

	 		StaticMedia.updateCurrentYearAcademyCalendar($scope.staticCalendar,function(result){
				console.log(result);
				
			});

			StaticMedia.updateFutureAcademyCalendar($scope.staticFutureCalendar,function(result){
				console.log(result);
				
			});	
		}
	});

