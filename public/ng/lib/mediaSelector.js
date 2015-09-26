'use strict';

var mediaSelector = angular.module('esc.mediaSelector', ['esc.filters','esc.constants'])

mediaSelector.controller('ModalMediaInstanceCtrl', function ($scope, $modalInstance, meidas, MediaType) {

	$scope.MediaTypes = MediaType;
	$scope.Medias = meidas;
	$scope.selectedMedia = null;
	$scope.selectedMediaType = '';
	$scope.searchKeyword = '';
	$scope.selectedDate = '0';
	$scope.dateFilter = '0';
	var today = new Date();
	today = new Date(today.getFullYear(),today.getMonth(), today.getDate()+1);
	$scope.dateFilter = today;

	$scope.ok = function () {
		$modalInstance.close($scope.selectedMedia);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.selectMedia = function(selectedMedia){
		$modalInstance.close(selectedMedia);
	}

	$scope.$watch('selectedDate', function(newValue, oldValue) {
	  	console.log($scope.selectedDate );
	  	if(newValue != oldValue){
	  		$scope.dateFilter.setDate(today.getDate() - $scope.selectedDate );	
	  		console.log($scope.dateFilter);
	  	}
	  		
	});
})


var createMediaSelectorFunction = function($modal, mediaList, selectCallback){
	
return function(){

	var modalInstance = $modal.open({
		templateUrl: 'courseMedias.html',
		controller: 'ModalMediaInstanceCtrl',
		windowClass: 'app-modal-lg',
		resolve: {
			meidas: function(){
				return mediaList;
			}
		}
	});

	modalInstance.result.then(function (selectedMedia) {
		//$scope.user.name = user.name;
		selectCallback(selectedMedia);
		  
	  	//$scope.selectedDuration = duration;
	}, function () {
	  	// done
	});

};

};