'use strict';

angular.module('adminApp', ['ngResource'])

.controller('SliderController',function SliderController($rootScope,$scope,$location,$http,$window,Sliders){
	 var token = sessionStorage.token;

	 $scope.colors = [
	 	{ name: 'Grey', code: '#cccccc'},
	 	{ name: 'White', code: '#ffffff'},
	 	{ name: 'Black', code: '#000000'},
	 	{ name: 'Red', code: '#f00'}
	 ];

	 $scope.newSlider = {
	 	heading: '1',
	 	sub_heading : '2',
	 	color: '#cccccc',
	 	direction : '',
	 	position : 'CENTER'
	 };

	 $scope.rgb2hex = function (rgb) {
	    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
	    function hex(x) {
	        return ("0" + parseInt(x).toString(16)).slice(-2);
	    }
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	 }



	 $scope.create = function(){

	 	Sliders.save($scope.newSlider,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			
 		});
	 }


	 $scope.directionOption = [ 
	 	{ name: 'left', label :'From Left to Right' },
	 	{ name: 'right', label : 'From Right to Left' },
	 	{ name: 'top', label : 'From Top to Buttom' },
	 	{ name: 'bottom', label :'From bottom to top' }
	 ];

})


.directive('positionPicker', function() {
  return {

  	link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.newSlider.position = element.html();
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
                scope.$parent.newSlider.color = scope.rgb2hex(element.css('background-color'));
       			scope.$apply();
            });
        }
  };
})

.factory('Sliders',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/slider', {}, {
		create:{ method: 'POST'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}]);
