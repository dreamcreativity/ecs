'use strict';

angular.module('adminApp', ['ngResource'])

.controller('SliderController',function SliderController($rootScope,$scope,$location,$http,$window,Sliders){

	//var token = sessionStorage.token;

	if ( typeof url_params === "undefined" || typeof url_params.id === "undefined"){
		$scope.slider = {
			heading: '',
			sub_heading : '',
			color: '#cccccc',
			direction : 'bottom',
			position : 'CENTER'
		};
	}else{
		$scope.slider = Sliders.get(url_params, function(){
		$scope.slider = $scope.slider.data;	
		});
	}

	$scope.list = getAllSliders();

	console.log($scope.list);	


	$scope.colors = [
		{ name: 'Grey', code: '#cccccc'},
		{ name: 'White', code: '#ffffff'},
		{ name: 'Black', code: '#000000'},
		{ name: 'Red', code: '#f00'}
	];

	$scope.directionOption = [ 
		{ name: 'left', label :'From Left to Right' },
		{ name: 'right', label : 'From Right to Left' },
		{ name: 'top', label : 'From Top to Buttom' },
		{ name: 'bottom', label :'From bottom to top' }
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
	$scope.create = function(){
		Sliders.create($scope.slider,function(result){
				location = '/admin/slider/edit/'+ result.data._id;
		});
	}

	$scope.update = function(){
		Sliders.update($scope.slider,function(result){
				if(result.status = 'ok'){
					ShowGritterCenter('System Notification','Slider has been updated');
				}
		});
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

.factory('Sliders',['$resource',
	function($resource){
		return $resource('/api/slider/:id', {}, {
			query:{method: 'GET' },
			get:{method: 'GET', params: {id:'@_id'}},
			create:{ method: 'POST'},
			update : { method : 'PUT', params: {id:'@_id'}}
	});
}]);
