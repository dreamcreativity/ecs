'use strict';

angular.module('adminApp', ['ngResource'])

.controller('SliderController',function SliderController($rootScope,$scope,$location,$http,$window,Sliders,Medias){

	//var token = sessionStorage.token;

	if ( typeof url_params === "undefined" || typeof url_params.id === "undefined"){
		$scope.slider = {
			heading: '',
			sub_heading : '',
			color: '#ffffff',
			direction : 'bottom',
			position : 'CENTER',
			resource : null
		};
	}else{
		$scope.slider = Sliders.get(url_params, function(){
			$scope.slider = $scope.slider.data;	
			console.log($scope.slider);
		});
	}

	$scope.list = getAllSliders();
	$scope.media_list = getAllSliderMedia();

	console.log($scope.list);	


	$scope.colors = [
		{ name: 'Grey', code: '#cccccc'},
		{ name: 'White', code: '#ffffff'},
		{ name: 'Black', code: '#000000'},
		{ name: 'Red', code: '#f00'}
	];

	$scope.directionOption = [ 
		{ class: 'fadeInLeft', label :'Left to Right' },
		{ class: 'fadeInRight', label : 'Right to Left' },
		{ class: 'fadeInDown', label : 'Top to Bottom' },
		{ class: 'fadeInUp', label :'Bottom to Top' }
	];


	$scope.rgb2hex = function (rgb) {
		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		function hex(x) {
		    return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	function getAllSliders(){
		var result =  Sliders.query();
		//console.log(result);
		return result;
	}


	function getAllSliderMedia(){
		return Medias.query();
	}

	$scope.create = function(){
		Sliders.create($scope.slider,function(result){

			if(result.status == 'ok'){
				location = '/admin/slider/edit/'+ result.data._id;
			}else{
				ShowGritterCenter('System Notification','Slider can not be created..' +  result.messages);
				console.log(result.messages);
			}
				
		});
	}

	$scope.update = function(){
		Sliders.update($scope.slider,function(result){
				if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Slider has been updated');
				}else{
					ShowGritterCenter('System Notification','Slider updated fail');
				}
		});
	}

	$scope.delete = function(){
		console.log('delete slider');
		Sliders.delete(url_params,function(result){
				if(result.status == 'ok'){
					window.location = '/admin/slider/all';
				}else{
					ShowGritterCenter('System Notification','Slider can not being delete.');
				}
		});
	}


	$scope.selectResource = function(mediaResource){
		console.log('click');
		$scope.slider.resource = mediaResource;
		console.log($scope.slider);
	}
})


.directive('positionPicker', function() {
  return {
  	link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.slider.position = element.html();
       			scope.$apply();
       			$('.slider-position .tap').removeClass('select');
       			element.parent().addClass('select');
            });
        }
  };
})

.directive('colorPicker', function() {
  return {
  	link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.$parent.slider.color = scope.rgb2hex(element.css('background-color'));
       			scope.$apply();
            });
        }
  };
})

.directive('resourcePicker', function() {
  return {
  	link: function (scope, element, attrs) {
            element.on('click', function () {

            	
            	var newMedia = scope.media;
            	delete newMedia.$$hashKey;
            	console.log(newMedia);
            	//scope.$parent.slider.resource = scope.media;
            	scope.$parent.slider.resource = newMedia._id;
            	scope.$parent.slider.media = scope.media;

            	scope.$parent.$apply();

            });
        }
  };
})

.factory('Sliders',['$resource',
	function($resource){
		return $resource('/api/slider/:id', {}, {
			query:{method: 'GET' },
			get:{method: 'GET', params: {id:'@_id'}},
			create:{ method: 'POST'},
			delete:{ method: 'DELETE',params: {id:'@_id'}},
			update : { method : 'PUT', params: {id:'@_id'}}
	});
}])

.factory('Medias',['$resource',
	function($resource){
		return $resource('/api/media/target/Slider', {}, {
		query:{ method: 'GET'}
	});
}]);
