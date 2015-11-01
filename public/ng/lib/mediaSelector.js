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
	  	
	  	if(newValue != oldValue){
	  		$scope.dateFilter.setDate(today.getDate() - $scope.selectedDate );	
	  		console.log($scope.dateFilter);
	  	}
	  		
	});
});

mediaSelector.controller('ModalMultiMediaInstanceCtrl', function ($scope, $modalInstance, meidas, selectedMeidas, MediaType) {

	$scope.MediaTypes = MediaType;
	$scope.Medias = meidas;
	$scope.filteredItems = [];
	$scope.SelectedMedias = [];
	for (var i = 0; i < selectedMeidas.length; i++) {

		var tempArr = $scope.Medias.filter(function(obj) { 
			return obj._id == selectedMeidas[i]._id; 
		});
		console.log(tempArr);
		if(tempArr.length > 0)
			$scope.SelectedMedias.push(tempArr[0]);
	};
	
	$scope.selectedMedia = null;
	$scope.selectedMediaType = '';
	$scope.searchKeyword = '';
	$scope.selectedDate = '0';
	$scope.dateFilter = '0';
	var today = new Date();
	today = new Date(today.getFullYear(),today.getMonth(), today.getDate()+1);
	$scope.dateFilter = today;


	$scope.selectAll = function () {
	
		$scope.SelectedMedias.length = 0;
		for (var i = 0; i < $scope.filteredItems.length; i++) {
			$scope.SelectedMedias.push($scope.filteredItems[i]);
		};
	};

	$scope.clearAll = function () {
	
		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if( $scope.SelectedMedias.indexOf($scope.filteredItems[i]) >= 0){
				 $scope.SelectedMedias.splice($scope.SelectedMedias.indexOf($scope.filteredItems[i]) ,1);
			}
		};
	};


	$scope.ok = function () {
		selectedMeidas.length = 0;
		for (var i = 0; i < $scope.SelectedMedias.length; i++) {
			selectedMeidas.push($scope.SelectedMedias[i]);
		};
		//$modalInstance.close($scope.SelectedMedias);
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.selectMedia = function(selectedMedia){
		//$modalInstance.close(selectedMedia);
		if( $scope.SelectedMedias.indexOf(selectedMedia) < 0){
			$scope.SelectedMedias.push(selectedMedia);
		}else{
			 $scope.SelectedMedias.splice($scope.SelectedMedias.indexOf(selectedMedia) ,1);
		}
	}

	$scope.isMediaSelected =  function(m){
		if( $scope.SelectedMedias.indexOf(m) < 0)
			return false;
		else
			return true;
	}


	$scope.$watch('selectedDate', function(newValue, oldValue) {

	  	if(newValue != oldValue){
	  		$scope.dateFilter.setDate(today.getDate() - $scope.selectedDate );	
	  		console.log($scope.dateFilter);
	  	}
	  		
	});

	var isMediaExistInArray = function(arr, media){
		return arr.filter(function(obj) { return obj._id == media._id; }).length != 0;
	}
});



var createMediaSelectorFunction = function($modal, mediaList, selectCallback){
	
	return function(){

		var modalInstance = $modal.open({
			templateUrl: 'SingleMediaSelector.html',
			controller: 'ModalMediaInstanceCtrl',
			windowClass: 'app-modal-lg',
			resolve: {
				meidas: function(){
					return mediaList;
				}
			}
		});

		modalInstance.result.then(function (selectedMedia) {
			selectCallback(selectedMedia);
		}, function () {
		  	// done
		});

	};

};


var createMultiMediaSelectorFunction = function($modal, mediaList, mediaSelectedList, selectCallback){
	
	return function(){
		var modalInstance = $modal.open({
			templateUrl: 'MultiMediaSelector.html',
			controller: 'ModalMultiMediaInstanceCtrl',
			windowClass: 'app-modal-lg',
			resolve: {
				meidas: function(){
					return mediaList;
				},
				selectedMeidas: function(){
					return mediaSelectedList;
				}
			}
		});

		modalInstance.result.then(function (selectedMediaList) {
			selectCallback(selectedMediaList);
		}, function () {
		  	// done
		});

	};

};




























