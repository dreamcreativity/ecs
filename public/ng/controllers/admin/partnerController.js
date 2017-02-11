'use strict';
angular.module('AdminApp')

.controller('partnerCtrl', function PartnerCtrl($scope,$http,StaticMedia,Partner,$modal,Medias,$window){

	StaticMedia.getCurrentYearAcademyCalendar({},function(result){
		$scope.staticCalendar = result.data;
	});	
	$scope.test  = 'andy';

	StaticMedia.getFutureAcademyCalendar({},function(result){
		$scope.staticFutureCalendar = result.data;
	});	


	Medias.getCategoryTargetMedia({target : 'Partner', type:'Image'},function(result){

		$scope.medias=result.data;

		$scope.changeCurrentCalendar = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
			$scope.staticCalendar.media = selectedMedia;
		});


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

