'use strict';

var mediaSelector = angular.module('esc.mediaSelector', ['esc.constants'])

mediaSelector.controller('ModalMediaInstanceCtrl', function ($scope, $modalInstance, meidas, MediaType) {

	$scope.MediaTypes = MediaType;
	$scope.Medias = meidas;
	$scope.selectedMedia = null;
	$scope.selectedMediaType = '';
	$scope.searchKeyword = '';

	$scope.ok = function () {
		$modalInstance.close($scope.selectedMedia);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.selectMedia = function(selectedMedia){
		$modalInstance.close(selectedMedia);
	}
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